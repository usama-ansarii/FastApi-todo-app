from fastapi import APIRouter, HTTPException,status
from models.user_model import Userlogin, UserSignup
from services.auth_services import singup_user,login_user


router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup",status_code=status.HTTP_201_CREATED)
async def signup(user: UserSignup):
    try:
        result = await singup_user(user)

        return result
    
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))


@router.post("/login")
async def login(user: Userlogin):
    try:
        result = await login_user(user)
        return result
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))