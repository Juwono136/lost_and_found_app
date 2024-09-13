from fastapi import APIRouter, HTTPException
from db import itemsCollection, meetingsCollection
from models import Item, ItemsCollection, ItemResponse, ClaimItem
from bson import ObjectId
from crud.items_crud import ItemsCrud



items_router = APIRouter()

@items_router.post("/new", response_description="Post a new lost item")
async def create_item(item: Item):

    result = await itemsCollection.insert_one(dict(item))
    if result.inserted_id:
        return {"message": "Item posted successfully"}
    
    else:
        raise HTTPException(status_code=500, detail="Failed to post item")

@items_router.get(
    "/",
    response_description="List all items",
    response_model=ItemsCollection,
    response_model_by_alias=False,
)

async def list_items():
    """
    List all of the items in the database.

    The response is unpaginated and limited to 1000 results.
    """
    return await ItemsCrud.list_allItems()


@items_router.get("/{id}", response_description="Get a specific item", response_model=Item)
async def get_item(id: str):
    item = await itemsCollection.find_one({"_id": ObjectId(id)})
    if item is not None:
        return item
    
    raise HTTPException(status_code=404, detail="Item not found")



@items_router.delete("/delete/{id}", response_description="Delete an item")
async def delete_item(id: str):
    result = await itemsCollection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count:
        return {"message": "Item deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Item not found")



@items_router.put("/claim/{id}", response_description="Claim an item", response_model=Item)
async def claim_item(id: str, claim: ClaimItem):
    # Convert the id to ObjectId
    object_id = ObjectId(id)
    
    # Define the updated fields
    update_fields = {
        "status": "Claimed",
        "claimed_by": claim.claimed_by,
        "claim_date": claim.claim_date
    }

    # update
    result = await itemsCollection.update_one(
        {"_id": object_id},
        {"$set": update_fields}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")

    # Fetch the updated item
    updated_item = await itemsCollection.find_one({"_id": object_id})

    if updated_item:
        return ItemResponse(**updated_item)
    else:
        raise HTTPException(status_code=404, detail="Item not found")
    


