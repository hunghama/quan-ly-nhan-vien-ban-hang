import motor.motor_asyncio

# Chuỗi kết nối đến MongoDB Atlas (Sau này nhóm thay tài khoản/mật khẩu vào đây)
MONGO_DETAILS = "mongodb+srv://root:123456@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

# Tạo một Database mới tinh hoàn toàn tách biệt để làm đồ án
database = client.QuanLyBanHang

# Tạo bảng (Collection) chứa thông tin nhân viên
staff_collection = database.get_collection("staff_collection")