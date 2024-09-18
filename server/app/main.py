from fastapi import FastAPI
from api import items, meetings, user_service
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items.items_router, prefix="/items", tags=["items"])
app.include_router(meetings.meetings_router, prefix="/meeting", tags=["meetings"])
app.include_router(user_service.user_router, prefix="/user", tags=["user"])


@app.get("/")
async def index():
    return {"message" : "Welcome to our API!"}







