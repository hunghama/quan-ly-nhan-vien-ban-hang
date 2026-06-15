// 1. Mảng dữ liệu ảo (Mock Data) chuẩn cấu trúc API của Hùng
const mockStaffList = [
    { id: "65b2c1a8e4b0f32a1c000001", name: "Nguyễn Văn Khương", role: "Ca Sáng", hourly_rate: 50000 },
    { id: "65b2c21fe4b0f32a1c000002", name: "Trần Thị B", role: "Ca Chiều", hourly_rate: 45000 },
    { id: "65b2c246e4b0f32a1c000003", name: "Lê Văn C", role: "Quản lý", hourly_rate: 80000 }
];

// 2. Hàm tự động tìm bảng và Render danh sách nhân viên động
function renderStaffTable() {
    // Nhắm thẳng vào phần thân (tbody) của bảng hiển thị trong file Frontend.html gốc
    const tableBody = document.querySelector("table tbody");
    if (!tableBody) return;

    tableBody.innerHTML = ""; // Xóa sạch các hàng dữ liệu tĩnh cũ của nhóm nếu có

    mockStaffList.forEach((staff, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="text-center">${index + 1}</td>
            <td class="text-muted font-monospace" style="font-size: 0.85rem;">${staff.id}</td>
            <td class="fw-bold text-secondary">${staff.name}</td>
            <td><span class="badge bg-info text-dark">${staff.role}</span></td>
            <td class="text-end fw-semibold">${staff.hourly_rate.toLocaleString('vi-VN')} đ</td>
            <td class="text-center">
                <button class="btn btn-warning btn-sm me-1 text-dark" onclick="alert('Sẵn sàng sửa ID: ${staff.id}')">
                    <i class="bi bi-pencil-square"></i> Sửa
                </button>
                <button class="btn btn-danger btn-sm" onclick="executeDeleteStaff('${staff.id}')">
                    <i class="bi bi-trash"></i> Xóa
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// 3. Hàm xử lý Xóa giả lập (giữ nguyên logic chạy thử nghiệm Phase 2)
function executeDeleteStaff(id) {
    const index = mockStaffList.findIndex(item => item.id === id);
    if (index !== -1) {
        if (confirm("Bạn có chắc chắn muốn xóa nhân viên này khỏi danh sách?")) {
            mockStaffList.splice(index, 1);
            renderStaffTable(); // Gọi lại hàm render để cập nhật bảng ngay lập tức
        }
    }
}

// 4. Kích hoạt render dữ liệu ngay khi trình duyệt tải xong cấu trúc DOM
document.addEventListener("DOMContentLoaded", renderStaffTable);


// =========================================================================
// PHẦN VIỆC CỦA KHƯƠNG: LOGIC RENDER DANH SÁCH NHÂN VIÊN (MOCK DATA)
// =========================================================================

// 1. Mảng dữ liệu ảo (Mock Data) chuẩn cấu trúc API của Hùng
const mockEmployees = [
    { id: "65b2c1a8e4b0f32a1c000001", name: "Nguyễn Văn Khương", role: "Ca Sáng", hourly_rate: 50000 },
    { id: "65b2c21fe4b0f32a1c000002", name: "Trần Thị B", role: "Ca Chiều", hourly_rate: 45000 },
    { id: "65b2c246e4b0f32a1c000003", name: "Lê Văn C", role: "Quản lý", hourly_rate: 80000 }
];

// 2. Hàm tự động tìm bảng trong Frontend.html và Render dữ liệu động
function renderEmployees(employeeList) {
    // Tìm đến thẻ tbody đầu tiên bên trong table của file HTML gốc của nhóm
    const tableBody = document.querySelector("table tbody");
    if (!tableBody) return;

    // Xóa sạch các hàng dữ liệu tĩnh cũ của nhóm để đổ dữ liệu động
    tableBody.innerHTML = ""; 

    employeeList.forEach((employee, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="text-center">${index + 1}</td>
            <td class="text-muted font-monospace" style="font-size: 0.85rem;">${employee.id}</td>
            <td class="fw-bold text-secondary">${employee.name}</td>
            <td><span class="badge bg-info text-dark">${employee.role}</span></td>
            <td class="text-end fw-semibold">${employee.hourly_rate.toLocaleString('vi-VN')} đ</td>
            <td class="text-center">
                <button class="btn btn-warning btn-sm me-1 text-dark" onclick="alert('Sẵn sàng sửa nhân viên ID: ${employee.id}')">
                    <i class="bi bi-pencil-square"></i> Sửa
                </button>
                <button class="btn btn-danger btn-sm" onclick="executeDeleteEmployee('${employee.id}')">
                    <i class="bi bi-trash"></i> Xóa
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// 3. Hàm xử lý Xóa giả lập trên mảng ảo để Demo chạy mượt cho Phase 2
function executeDeleteEmployee(id) {
    const index = mockEmployees.findIndex(item => item.id === id);
    if (index !== -1) {
        if (confirm("Bạn có chắc chắn muốn xóa nhân viên này khỏi danh sách?")) {
            mockEmployees.splice(index, 1); // Xóa khỏi mảng ảo
            renderEmployees(mockEmployees); // Gọi hàm vẽ lại bảng mới
        }
    }
}

// 4. Kích hoạt render bảng ngay khi trang web tải xong giao diện HTML
document.addEventListener("DOMContentLoaded", () => {
    renderEmployees(mockEmployees);
});