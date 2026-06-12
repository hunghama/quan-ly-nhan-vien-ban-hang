from fastapi import FastAPI, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.database import staff_collection
from app.models import StaffModel, UpdateStaffModel
from bson import ObjectId  # Cần thiết để làm việc với ID của MongoDB

app = FastAPI(title="Hệ thống quản lý bán hàng API")

# Mở cổng CORS để các máy khác của team gọi được API vào máy ông
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hàm helper chuyển đổi dữ liệu MongoDB sang JSON chuẩn cho Frontend dễ dùng
def staff_helper(staff) -> dict:
    return {
        "id": str(staff["_id"]),
        "name": staff["name"],
        "role": staff["role"],
        "hourly_rate": staff["hourly_rate"]
    }

# 1. [GET] API lấy danh sách toàn bộ nhân viên
@app.get("/staff")
async def get_all_staff():
    staffs = []
    async for staff in staff_collection.find():
        staffs.append(staff_helper(staff))
    return staffs

# 2. [POST] API thêm một nhân viên mới
@app.post("/staff", status_code=status.HTTP_201_CREATED)
async def add_new_staff(staff: StaffModel):
    staff_dict = staff.model_dump()
    new_staff = await staff_collection.insert_one(staff_dict)
    created_staff = await staff_collection.find_one({"_id": new_staff.inserted_id})
    return staff_helper(created_staff)

# 3. [DELETE] API xóa nhân viên theo ID (Phục vụ nút Xóa của Khương)
@app.delete("/staff/{staff_id}")
async def delete_staff(staff_id: str):
    # Kiểm tra định dạng ID hợp lệ của MongoDB trước khi xóa
    if not ObjectId.is_valid(staff_id):
        raise HTTPException(status_code=400, detail="Mã ID nhân viên không hợp lệ")
        
    delete_result = await staff_collection.delete_one({"_id": ObjectId(staff_id)})
    
    if delete_result.deleted_count == 1:
        return {"message": "Xóa nhân viên thành công"}
        
    raise HTTPException(status_code=404, detail="Không tìm thấy nhân viên để xóa")

# 4. [PUT] API sửa thông tin nhân viên theo ID (Phục vụ nút Sửa của Khương)
@app.put("/staff/{staff_id}")
async def update_staff(staff_id: str, staff_data: UpdateStaffModel):
    if not ObjectId.is_valid(staff_id):
        raise HTTPException(status_code=400, detail="Mã ID nhân viên không hợp lệ")
    
    # Lọc bỏ các trường bị gửi lên dạng None (chỉ cập nhật những gì thay đổi)
    update_data = {k: v for k, v in staff_data.model_dump().items() if v is not None}
    
    if len(update_data) >= 1:
        update_result = await staff_collection.update_one(
            {"_id": ObjectId(staff_id)}, {"$set": update_data}
        )
        if update_result.modified_count == 1:
            updated_staff = await staff_collection.find_one({"_id": ObjectId(staff_id)})
            if updated_staff:
                return staff_helper(updated_staff)
                
    # Nếu không có gì thay đổi nhưng nhân viên vẫn tồn tại thì trả về thông tin cũ
    existing_staff = await staff_collection.find_one({"_id": ObjectId(staff_id)})
    if existing_staff:
        return staff_helper(existing_staff)
        
    raise HTTPException(status_code=404, detail="Không tìm thấy nhân viên để cập nhật")
