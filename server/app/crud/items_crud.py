from typing import List

from fastapi import HTTPException
from bson import ObjectId

from models import ItemsCollection, Meeting,Item
from db import itemsCollection

class ItemsCrud:

    # get all data

    async def list_allItems() :
        return ItemsCollection(items=await itemsCollection.find().to_list(1000))
    
 
    async def create_item(item):
        return await itemsCollection.insert_one(dict(item))

    async def get_item_byId(id):
        return await itemsCollection.find_one({"_id": ObjectId(id)})

    async def delete_item(id):
        return await itemsCollection.delete_one({"_id": ObjectId(id)})

    async def update_item_status(items_collection , id, update_fields):
        # Convert the id to ObjectId
        object_id = ObjectId(id)

        # Update the item
        result = await items_collection.update_one(
            {"_id": object_id},
            {"$set": update_fields}
        )

        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Item not found")

        # Fetch the updated item
        updated_item = await items_collection.find_one({"_id": object_id})
        
        if updated_item:
            return updated_item
        else:
            raise HTTPException(status_code=404, detail="Item not found")
        
        


    async def add_item_details(meetings: List[Meeting]) -> List[Meeting]:
        for meeting in meetings:
            item_id = meeting.get('item_id')
            if item_id:
                try:
                    item = await itemsCollection.find_one({"_id": ObjectId(item_id)})
                    if item:
                        meeting['item'] = dict(Item(**item))
                    else:
                        meeting['item'] = None
                except Exception as e:
                    meeting['item'] = None
            else:
                meeting['item'] = None
        return meetings

    
   


