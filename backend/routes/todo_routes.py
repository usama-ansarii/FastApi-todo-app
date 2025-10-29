from fastapi import APIRouter,HTTPException,status
from models.todo_model import Todo
from config.db import todos_collection
from services.todo_services import add_todo_service,get_all_todo_service,update_todo_service,delete_todo_service,get_single_todo_service


router = APIRouter(prefix="/todos",tags=["Todos"])

@router.post("/",status_code=status.HTTP_201_CREATED)
async def add_todo(todo: Todo):
    try:
        result = await add_todo_service(todo)
        return result
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/",status_code=status.HTTP_200_OK)
async def get_all():
    try:
        result = await get_all_todo_service()
        return result
    
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))


@router.get("/{id}",status_code=status.HTTP_200_OK)
async def get_single_todo(id: str):
    try:
        return await get_single_todo_service(id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
    
@router.put("/{id}")
async def update(id: str, todo: Todo):
    try:
        return await update_todo_service(id, todo)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{id}")
async def delete(id: str):
    try:
        return await delete_todo_service(id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))