from pydantic import BaseModel,Field

class Todo(BaseModel):
    task : str = Field(...,min_length=3)
    description : str = Field(...,min_length=5)