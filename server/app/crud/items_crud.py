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
            print(f"Processing item_id: {item_id}")  # Debugging log
            
            if item_id:
                try:
                    # Check if the item_id is a valid ObjectId
                    if ObjectId.is_valid(item_id):
                        item = await itemsCollection.find_one({"_id": ObjectId(item_id)})
                        if item:
                            print(f"Item found for item_id {item_id}: {item}")  # Debug log
                            meeting['item'] = dict(Item(**item))
                        else:
                            print(f"No item found for item_id {item_id}")  # Debug log
                            meeting['item'] = None
                    else:
                        print(f"Invalid ObjectId: {item_id}")  # Debugging log
                        meeting['item'] = None
                except Exception as e:
                    print(f"Error fetching item for item_id {item_id}: {str(e)}")  # Debug log
                    meeting['item'] = None
            else:
                print("No item_id found in meeting")  # Debug log
                meeting['item'] = None

        return meetings
    
    # async def activate_item()



        
    


