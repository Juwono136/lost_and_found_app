from fastapi import APIRouter, HTTPException
# from models import Item, ItemResponse, ItemPostResponse
from db import meetingsCollection, itemsCollection
from bson import ObjectId
from models import Meeting, MeetingResponse, MeetingsCollection, UpdateMeeting, MeetingStatus, Item
from crud.items_crud import ItemsCrud
meetings_router = APIRouter()


@meetings_router.post("/request", response_description="Request a meeting")
async def create_request(meeting: Meeting):
    

    result = await meetingsCollection.insert_one(dict(meeting))
    if result.inserted_id:
        return {"message": "Meeting posted successfully"}
    
    else:
        raise HTTPException(status_code=500, detail="Failed to post item")
    
    
@meetings_router.get("/", response_description="List all meetings with item details", response_model=MeetingsCollection)
async def list_meetings():
    try:
        # Fetch all meetings
        meetings = await meetingsCollection.find().to_list(1000)

        ItemsCrud.add_item_details(meetings)

        return {"meetings": meetings}
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Debug log for errors
        raise HTTPException(status_code=500, detail=str(e))



@meetings_router.get("/meetings/{user_id}", response_description="Get list of meetings for a user", response_model=MeetingsCollection)
async def get_user_meetings(user_id: int):
    try:
        # Query to find meetings for the specific user
        cursor = meetingsCollection.find({"user_id": user_id})
        meetings = await cursor.to_list(length=1000)

        ItemsCrud.add_item_details(meetings)

        if not meetings:
            raise HTTPException(status_code=404, detail=f"No meetings found for user {user_id}")

        # Fetch item details for each meeting
        

        return {"meetings": meetings}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@meetings_router.get("/see_requests", response_description="List all meeting requests with item details", response_model=MeetingsCollection)
async def list_requests():
    try:
        # Fetch all meetings with status "Not Approved"
        cursor = meetingsCollection.find({"status": "Not Approved"})
        meetings = await cursor.to_list(length=1000)

        if not meetings:
            raise HTTPException(status_code=404, detail="No unapproved meetings found")

        ItemsCrud.add_item_details(meetings)
        return {"meetings": meetings}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@meetings_router.put("/update/{meeting_id}", response_description="Update meeting details", response_model=Meeting)
async def update_meeting(id: str, update: UpdateMeeting ):
    object_id = ObjectId(id)
    update_fields = {
        "meeting_date": update.meeting_date,
        "location": update.location
    }

    # update
    result = await meetingsCollection.update_one(
        {"_id": object_id},
        {"$set": update_fields}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Meeting not found")

    # Fetch the updated item
    updated_item = await meetingsCollection.find_one({"_id": object_id})

    if updated_item:
        return MeetingResponse(**updated_item)
    else:
        raise HTTPException(status_code=404, detail="Meeting not found")
    

@meetings_router.put("/update_status/{meeting_id}", response_description="Update if request approved or not", response_model=Meeting)
async def update_meeting_status(id: str, status: str):
    object_id = ObjectId(id)

    # update
    result = await meetingsCollection.update_one(
        {"_id": object_id},
        {"$set": {"status": status}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Meeting not found")

    # Fetch the updated item
    updated_item = await meetingsCollection.find_one({"_id": object_id})

    if updated_item:
        return MeetingResponse(**updated_item)
    else:
        raise HTTPException(status_code=404, detail="Meeting not found")
    

@meetings_router.delete("/cancel/{meeting_id}", response_description="Cancel/delete a meeting")
async def delete_meeting(meeting_id: str):
    try:
        object_id = ObjectId(meeting_id)
        result = await meetingsCollection.delete_one({"_id": object_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Meeting not found")
        
        return {"message": "Meeting successfully deleted"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


