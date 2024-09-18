from fastapi import APIRouter, HTTPException
from crud.user_service_crud import UserCrud
from models import UserSignUp, UserSignIn
user_router= APIRouter()



# POST route for user signup
@user_router.post("/signup", response_description="Sign up a new user")
async def signup(user: UserSignUp):
    """Sign up a new user by forwarding data to an external API."""
    result = await UserCrud.signup(user)
    return {"message": "User signed up successfully", "data": result}

# POST route for user signin
@user_router.post("/signin", response_description="User login")
async def signup(user: UserSignIn):
    result = await UserCrud.signin(user)
    return {"message": "User signed in successfully", "data": result}


@user_router.get("/logout", response_description="User log out")
async def signup():
    result = await UserCrud.logout()
    return {"message": "User logged out successfully", "data": result}


