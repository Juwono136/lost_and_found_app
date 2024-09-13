from pydantic import BaseModel, BeforeValidator, Field
from enum import Enum
from  typing import Annotated, Optional, List, Dict
from bson import ObjectId
from datetime import datetime

# Represents an ObjectId field in the database.
# It will be represented as a `str` on the model so that it can be serialized to JSON.
PyObjectId = Annotated[str, BeforeValidator(str)]


class Item(BaseModel):
    name: str
    category: str
    item_img: Optional[str] = None
    item_desc: Optional[str] = None
    campus: str
    found_at: str
    storing_location: str
    date_reported: str
    status: Optional[str] = "Found" 
    PIC: str #person in charge
    founded_by: Optional[int] = None  # ID of the user who found the item
    claimed_by: Optional[int] = None  # ID of the user who claimed the item
    claim_date: Optional[str] = None
    published_at: Optional[str] = datetime.now().isoformat()     

    class Config:
        orm_mode = True,
        schema_extra = {
            "example": {
                "name": "Dompet hitam",
                "category": "Wallet",
                "item_img": None,
                "item_desc": "Dompet hitam dengan bahan kulit",
                "campus": "FX Sudirman",
                "found_at": "Room 603",
                "storing_location": "Pos security Binus FX Lobby",
                "date_reported": "2024-09-12T14:30:00Z",
                "status": "Claimed",
                "PIC": "Suhaidin Pratama",
                "founded_by": 1,
                "claimed_by": 1,
                "claim_date": "2024-09-12T19:30:00Z",
                "published_at": "2024-09-12T14:45:00Z"
            }
        }

class ItemResponse(Item):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)

    class Config:
        orm_mode = True


class ItemsCollection(BaseModel):
    """
    A container holding a list of `ItemModel` instances.

    This exists because providing a top-level array in a JSON response can be a [vulnerability](https://haacked.com/archive/2009/06/25/json-hijacking.aspx/)
    """

    items: List[ItemResponse]


class ClaimItem(BaseModel):
    claimed_by: int
    claim_date: str



class MeetingStatus(str, Enum):
    not_approved = "Not Approved"
    approved = "Approved"
    declined = "Declined"


class Meeting(BaseModel):
    user_id: int
    item_id: PyObjectId
    meeting_date: str
    location: str
    status: Optional[MeetingStatus]= MeetingStatus.not_approved
    item: Optional[Dict] = None 

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "user_id": 1,
                "item_id": "66e3265dd3279cd0f30238f4",
                "meeting_date": "2024-09-13T11:00:00Z",
                "location": "Pos security di lobby Binus FX",
                "status": "Not Approved"
            }
        }


class MeetingResponse(Meeting):
    id: PyObjectId = Field(alias="_id")

class MeetingsCollection(BaseModel):
    """
    A container holding a list of `MeetingModel` instances.
    """
    meetings: List[MeetingResponse]


class UpdateMeeting(BaseModel):
    meeting_date: str
    location: str


