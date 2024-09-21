from fastapi import APIRouter, HTTPException
from db import notifsCollection
from models import Notifications
from bson import ObjectId
from typing import List



notifs_router = APIRouter()


@notifs_router.get("/read/{user_id}", response_description="Fetch notifications by user", response_model=List[Notifications])
async def fetch_notifications_by_user(user_id: int):
    # try:
    #     # Convert user_id to ObjectId
    #     object_id = ObjectId(user_id)
    # except Exception as e:
    #     raise HTTPException(status_code=400, detail="Invalid user ID format")

    # Fetch notifications from the collection
    notifications_cursor = notifsCollection.find({"user_id": user_id}).sort("created_at", -1)  # Sort by newest first
    notifications = await notifications_cursor.to_list(length=100)  # Limit the number of notifications, adjust as needed

    if notifications:
        return [Notifications(**notif) for notif in notifications]
    else:
        raise HTTPException(status_code=404, detail="No notifications found for this user")
    

@notifs_router.put("/change_status/{notification_id}", response_description="Change notification status to read")
async def read_notifications(notification_id: str):
    # Check if the notification ID is valid and convert it to ObjectId
    try:
        notification_object_id = ObjectId(notification_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid notification ID format: {str(e)}")

    # Find the notification in the collection
    notification = await notifsCollection.find_one({"_id": notification_object_id})
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")

    # Update the 'read' status to True
    update_result = await notifsCollection.update_one(
        {"_id": notification_object_id},
        {"$set": {"read": True}}
    )

    if update_result.modified_count == 1:
   
        return {"message": "Notification status updated"}
    
    else:
        raise HTTPException(status_code=500, detail="Failed to update notification status")
