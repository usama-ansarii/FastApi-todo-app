from fastapi import HTTPException
from config.db import users_collection
from utils.jwt_handler import create_access_token
from utils.password_handler import get_password_hash,verify_password


async def singup_user(user):

    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_pwd = get_password_hash(user.password)
    user_dict = user.model_dump()
    user_dict["password"] = hashed_pwd

    await users_collection.insert_one(user_dict)
    return {
        "message": "User Registered Successfully",
        "fullname": user.fullname,
        "email": user.email,
    }
    

async def login_user(user):
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"email": db_user["email"]})
    return {"message": "Login Successfully", "token": token}