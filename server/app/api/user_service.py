from fastapi import APIRouter, HTTPException
from crud.user_service_crud import UserCrud
from models import UserSignUp
user_router= APIRouter()



# POST route for user signup
@user_router.post("/signup", response_description="Sign up a new user")
async def signup(user: UserSignUp):
    """Sign up a new user by forwarding data to an external API."""
    result = await UserCrud.signup(user)
    return {"message": "User signed up successfully", "data": result}

