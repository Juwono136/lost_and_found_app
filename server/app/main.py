from fastapi import FastAPI
from api import items, meetings
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(items.items_router, prefix="/items", tags=["items"])
app.include_router(meetings.meetings_router, prefix="/meeting", tags=["meetings"])

@app.get("/")
async def index():
    return {"message" : "Welcome to our API!"}







