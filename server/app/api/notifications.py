from fastapi import APIRouter, HTTPException
from db import notifsCollection
from models import Notifications
from bson import ObjectId
from typing import List



notifs_router = APIRouter()


@notifs_router.get("/notifications/{user_id}", response_description="Fetch notifications by user", response_model=List[Notifications])
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