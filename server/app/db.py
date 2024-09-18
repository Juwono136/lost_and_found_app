import motor.motor_asyncio
import os
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("MONGO_URL")
db = os.getenv("DB_NAME") 



client = motor.motor_asyncio.AsyncIOMotorClient(url)
db = client.get_database(db)
itemsCollection = db.get_collection("items")
meetingsCollection = db.get_collection('meetings')


async def listen_to_changes():
    async with itemsCollection.watch() as stream:
        async for change in stream:
            if change['operationType'] == 'update':
                item_id = change['documentKey']['_id']
                updated_fields = change['updateDescription']['updatedFields']

                # Update meetings with the updated item details
                await meetingsCollection.update_many(
                    {"item._id": item_id},
                    {"$set": {"item.$[elem]": updated_fields}},
                    array_filters=[{"elem._id": item_id}]
                )


# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You have successfully connected to MongoDB!")
# except Exception as e:
#     print(e)




