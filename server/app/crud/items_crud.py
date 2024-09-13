from typing import Optional, List

from datetime import datetime
from bson import DBRef

from models import ItemsCollection
from db import itemsCollection

class ItemsCrud:
    # # post
    # @staticmethod
    # async def create_tracker(user: User, data: TrackerCreate) -> Tracker:
    #     tracker = Tracker(**data.dict(), owner=user)
    #     return await tracker.insert()

    # get all data
    @staticmethod
    async def list_allItems() :
        return ItemsCollection(items=await itemsCollection.find().to_list(1000))
    
   

    # @staticmethod
    # async def get_trackers_between_dates(user: User, past_week: datetime, today: datetime) -> List[Tracker]:
    #     owner_ref = DBRef('users', user.id)
    #     trackers = await Tracker.find({"owner": owner_ref, "date": {"$gte": past_week, "$lte": today}}).to_list()
    #     return trackers

