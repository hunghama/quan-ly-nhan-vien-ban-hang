from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from app.database import staff_collection
from app.models import StaffModel

app = FastAPI(title="Hệ thống quản lý bán hàng API")

# Mở cổng CORS để các máy máy khác của team gọi được API vào máy ông
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def staff_helper(staff) -> dict:
    return {
        "id": str(staff["_id"]),
        "name": staff["name"],
        "role": staff["role"],
        "hourly_rate": staff["hourly_rate"]
    }

# API lấy danh sách toàn bộ nhân viên
@app.get("/staff")
async def get_all_staff():
    staffs = []
    async for staff in staff_collection.find():
        staffs.append(staff_helper(staff))
    return staffs

# API thêm một nhân viên mới
@app.post("/staff", status_code=status.HTTP_201_CREATED)
async def add_new_staff(staff: StaffModel):
    staff_dict = staff.model_dump()
    new_staff = await staff_collection.insert_one(staff_dict)
    created_staff = await staff_collection.find_one({"_id": new_staff.inserted_id})
    return staff_helper(created_staff)