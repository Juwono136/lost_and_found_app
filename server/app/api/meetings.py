from fastapi import APIRouter, HTTPException
# from models import Item, ItemResponse, ItemPostResponse
from db import meetingsCollection, itemsCollection
from bson import ObjectId
from models import Meeting, MeetingResponse, MeetingsCollection, UpdateMeeting, MeetingCompletion 
from crud.items_crud import ItemsCrud
from datetime import datetime
meetings_router = APIRouter()


@meetings_router.post("/request", response_description="Request a meeting", response_model=MeetingResponse)
async def create_request(meeting: Meeting):

    # Convert the `item_id` to ObjectId if necessary
    try:
        item_id = ObjectId(meeting.item_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid item_id format")

    # Update the item status to 'On Hold'
    updated_item = await ItemsCrud.set_item_status(meeting.item_id, "on hold")
    
    if not updated_item:
        raise HTTPException(status_code=500, detail="Failed to update item status to 'On Hold'")
    
    # Retrieve the updated Item from the itemsCollection
    item = await itemsCollection.find_one({"_id": item_id})
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    # Add the retrieved Item document to the meeting document
    meeting_data = dict(meeting)
    meeting_data["item"] = item  # Insert the Item document in the Meeting

    # Insert the Meeting document into the meetingsCollection
    result = await meetingsCollection.insert_one(meeting_data)
    
    if result.inserted_id:
        # Fetch the newly inserted meeting to return it
        inserted_meeting = await meetingsCollection.find_one({"_id": result.inserted_id})
        if inserted_meeting:
            # Convert `_id` to string for the response
            inserted_meeting["_id"] = str(inserted_meeting["_id"])
            return MeetingResponse(**inserted_meeting)
        
        raise HTTPException(status_code=500, detail="Failed to retrieve inserted meeting")
    else:
        raise HTTPException(status_code=500, detail="Failed to post meeting")

    
@meetings_router.get("/", response_description="List all meetings with item details", response_model=MeetingsCollection)
async def list_meetings():
    try:
        # Fetch all meetings
        meetings = await meetingsCollection.find().to_list(1000)
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
    

@meetings_router.put("/complete/", response_description="Complete a meeting and claim the item")
async def complete_meeting(meeting_completion: MeetingCompletion):
    meeting_id = meeting_completion.meeting_id

    # Fetch the meeting details
    meeting = await meetingsCollection.find_one({"_id": ObjectId(meeting_id)})
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    user_id = meeting.get("user_id")
    if not user_id:
        raise HTTPException(status_code=404, detail="User not found in the meeting")

    # Update the meeting status to "completed"
    result = await meetingsCollection.update_one(
        {"_id": ObjectId(meeting_id)},
        {"$set": {"status": "completed"}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Meeting not found")

    # Update the item status to "claimed"
    item_id = meeting.get("item_id")
    if item_id:
        update_fields = {
            "status": "claimed",
            "claimed_by": user_id,
            "claim_date": datetime.now()
        }
        updated_item = await ItemsCrud.update_item_status(itemsCollection, item_id, update_fields)

        if not updated_item:
            raise HTTPException(status_code=404, detail="Item not found")

    return {"message": "Meeting completed and item claimed successfully"}