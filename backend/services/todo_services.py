from fastapi import HTTPException,status
from config.db import todos_collection
from models.todo_model import Todo
from bson import ObjectId


async def add_todo_service(todo):
    await todos_collection.insert_one(todo.model_dump())
    return {"message":"Todo added"}


async def get_all_todo_service():
    todos = []
    async for todo in todos_collection.find({}):
        todo["_id"] = str(todo["_id"])  
        todos.append(todo)
    return todos

async def get_single_todo_service(id):
    todo = await todos_collection.find_one({"_id":ObjectId(id)})
    
    if not todo:
        raise HTTPException(status_code=404, detail= "Todo not found")
    
    todo["_id"] = str(todo["_id"])
    return todo


async def update_todo_service(id, todo):
    result = await todos_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": todo.model_dump()}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    return {"message": "Todo updated successfully"}

async def delete_todo_service(id):
    result = await todos_collection.delete_one({"_id": ObjectId(id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    return {"message": "Todo deleted successfully"}