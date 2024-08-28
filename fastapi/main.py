# # from fastapi import FastAPI, HTTPException
# # from pydantic import BaseModel
# # from pymongo import MongoClient, ASCENDING
# # from pymongo.errors import DuplicateKeyError
# # from pymongo import MongoClient
# # from typing import Optional


# # app = FastAPI()

# # from fastapi.middleware.cors import CORSMiddleware

# # # Add CORS middleware to the FastAPI application
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],  # Allow all origins or specify allowed origins
# #     allow_credentials=True,
# #     allow_methods=["*"],  # Allow all methods or specify allowed methods
# #     allow_headers=["*"],  # Allow all headers or specify allowed headers
# # )


# # # Local MongoDB connection details
# # MONGO_DETAILS = "mongodb://localhost:27017/"

# # client = MongoClient(MONGO_DETAILS)
# # database = client["sproc"]
# # collection = database["user-details"]
# # class FormDetails(BaseModel):
# #     Name: str
# #     email: str
# #     MobNo: str
# #     RegNo: int
# #     year: int
# #     Branch: str
# #     Sec: str
# # collection.create_index([("RegNo", ASCENDING)], unique=True)
# # @app.get("/")
# # async def idx():
# #     return {"message":"home"}

# # @app.post("/submit")
# # async def submit_form(details: FormDetails):
# #     try:
# #         print(details)
# #         result = collection.insert_one(details.dict())
# #         return {"message": "Details stored successfully!", "id": str(result.inserted_id)}
# #     except Exception as e:
# #         raise HTTPException(status_code=500, detail=str(e))
    
# # if __name__=='__main__':
# #     app.run()

# from fastapi import FastAPI, HTTPException,Request,Form
# from fastapi.staticfiles import StaticFiles
# from pydantic import BaseModel
# from pymongo import MongoClient, ASCENDING
# from pymongo.errors import DuplicateKeyError
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.templating import Jinja2Templates
# from fastapi.responses import FileResponse
# from bson import ObjectId
# from typing import Optional
# import os

# templates = Jinja2Templates(directory="templates")

# app = FastAPI()

# app.mount("/static", StaticFiles(directory="static"), name="static")
# # CORS settings
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # MongoDB connection details
# MONGO_DETAILS = "mongodb://localhost:27017/"
# client = MongoClient(MONGO_DETAILS)
# database = client["sproc"]
# collection = database["user-details"]

# # Define the model for form data
# class FormDetails(BaseModel):
#     Name: str
#     email: str
#     MobNo: str
#     RegNo: int
#     year: int
#     Branch: str
#     Sec: str

# # Define the model for user details response
# class UserResponse(BaseModel):
#     id: str
#     Name: str
#     email: str
#     MobNo: str
#     RegNo: int
#     year: int
#     Branch: str
#     Sec: str
#     pseudoCodeAnswers: Optional[dict] = None

# # Utility function to convert ObjectId to string
# def object_id_to_str(doc):
#     doc['id'] = str(doc.pop('_id'))
#     return doc

# # Create a unique index on RegNo
# collection.create_index([("RegNo", ASCENDING)], unique=True)

# @app.get("/")
# async def fn(request: Request):
#     return templates.TemplateResponse("welcome.html", {"request": request})

# @app.get("/")
# async def posts(request:Request):
#     return templates.TemplateResponse("details1.html",{"request":request})


# @app.get("/")
# async def pseudo(request:Request):
#     return templates.TemplateResponse("pseudo.html",{"request":request})

# @app.post("/submit")
# async def submit_form(details: FormDetails):
#     try:
#         result = collection.insert_one(details.dict())
#         return {"message": "Details stored successfully!", "id": str(result.inserted_id)}
#     except DuplicateKeyError:
#         raise HTTPException(status_code=400, detail="Register number already exists.")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# @app.get("/get-user-details/{reg_no}", response_model=UserResponse)
# async def get_user_details(reg_no: int):
#     try:
#         user_details = collection.find_one({"RegNo": reg_no})
#         if not user_details:
#             raise HTTPException(status_code=404, detail="User not found.")
        
#         # Convert ObjectId to string
#         user_details = object_id_to_str(user_details)
#         return user_details
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# @app.put("/submit-answers/{reg_no}")
# async def submit_answers(reg_no: int, answers: dict):
#     try:
#         # Explicitly update the `pseudoCodeAnswers` field in the document
#         update_result = collection.update_one(
#             {"RegNo": reg_no},  # Filter by register number
#             {"$set": {"pseudoCodeAnswers": answers}}  # Set the pseudoCodeAnswers field
#         )
        
#         if update_result.matched_count == 0:
#             raise HTTPException(status_code=404, detail="User not found.")
        
#         return {"message": "Answers updated successfully!"}
    
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# if __name__ == '__main__':
#     app.run()
from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from pymongo import MongoClient, ASCENDING
from pymongo.errors import DuplicateKeyError
from pydantic import BaseModel
from bson import ObjectId
from typing import Optional

app = FastAPI()

# Serve static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection details
MONGO_DETAILS = "mongodb://localhost:27017/"
client = MongoClient(MONGO_DETAILS)
database = client["sproc"]
collection = database["user-details"]

# Jinja2 templates
templates = Jinja2Templates(directory="templates")

# Create a unique index on RegNo
collection.create_index([("RegNo", ASCENDING)], unique=True)

# Define the model for form data
class FormDetails(BaseModel):
    Name: str
    email: str
    MobNo: str
    RegNo: int
    year: int
    Branch: str
    Sec: str

# Define the model for user details response
class UserResponse(BaseModel):
    id: str
    Name: str
    email: str
    MobNo: str
    RegNo: int
    year: int
    Branch: str
    Sec: str
    pseudoCodeAnswers: Optional[dict] = None

# Utility function to convert ObjectId to string
def object_id_to_str(doc):
    doc['id'] = str(doc.pop('_id'))
    return doc

@app.get("/")
async def welcome(request: Request):
    return templates.TemplateResponse("welcome.html", {"request": request})

@app.get("/continue")
async def continue_to_website():
    return RedirectResponse(url='/details', status_code=303)

@app.get("/details")
async def details(request: Request):
    return templates.TemplateResponse("details1.html", {"request": request})

@app.get("/continue1")
async def continue_to_pseudo():
    return RedirectResponse(url='/pseudo', status_code=303)

@app.get("/pseudo", response_class=HTMLResponse)
async def pseudo(request: Request):
    return templates.TemplateResponse("pseudo.html", {"request": request})

@app.get("/submit1")
async def continue_to_thank():
    return RedirectResponse(url='/thank', status_code=303)

@app.get("/thank", response_class=HTMLResponse)
async def thank(request: Request):
    return templates.TemplateResponse("thank.html", {"request": request})

@app.post("/submit")
async def submit_form(details: FormDetails):
    print(details)
    try:
        result = collection.insert_one(details.dict())
        return {"message": "Details stored successfully!", "id": str(result.inserted_id)}
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Register number already exists.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/get-user-details/{reg_no}", response_model=UserResponse)
async def get_user_details(reg_no: int):
    try:
        user_details = collection.find_one({"RegNo": reg_no})
        if not user_details:
            raise HTTPException(status_code=404, detail="User not found.")
        
        # Convert ObjectId to string
        user_details = object_id_to_str(user_details)
        return user_details
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/submit-answers/{reg_no}")
async def submit_answers(reg_no: int, answers: dict):
    try:
        update_result = collection.update_one(
            {"RegNo": reg_no},
            {"$set": {"pseudoCodeAnswers": answers}}
        )
        
        if update_result.matched_count == 0:
            raise HTTPException(status_code=404, detail="User not found.")
        
        return {"message": "Answers updated successfully!"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
