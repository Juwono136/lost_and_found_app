from pydantic import BaseModel, BeforeValidator, Field
from enum import Enum
from  typing import Annotated, Optional, List, Dict
from bson import ObjectId
from datetime import datetime

PyObjectId = Annotated[str, BeforeValidator(str)]

class NotifStatus(str, Enum):
    claim_initiated = "claim_initiated"
    claim_under_review = "claim_under_review"
    meeting_approved = "meeting_approved"
    meeting_rejected = "meeting_rejected"
    item_claimed = "item_claimed"
    verification_request = " verification_request"
    

class Notifications:
    user_id:PyObjectId
    item_id:PyObjectId
    message: str
    read : bool
    type: NotifStatus
    created_at: str = datetime.now()
  

  