from pydantic import BaseModel, Field
from typing import Optional

# Khuôn mẫu ép Frontend phải gửi đúng định dạng này khi thêm nhân viên
class StaffModel(BaseModel):
    name: str = Field(..., description="Tên nhân viên")
    role: str = Field(..., description="Ca làm việc hoặc chức vụ")
    hourly_rate: float = Field(..., description="Mức lương theo giờ")

class UpdateStaffModel(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    hourly_rate: Optional[float] = None