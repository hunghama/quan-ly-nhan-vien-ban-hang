// =========================================================================
// 1. MẢNG DỮ LIỆU ẢO (MOCK DATA) - KHỚP CẤU TRÚC API MONGO
// =========================================================================
const mockEmployees = [
    { id: "65b2c1a8e4b0f32a1c000001", name: "Nguyễn Văn Khương", role: "Ca Sáng", hourly_rate: 50000 },
    { id: "65b2c21fe4b0f32a1c000002", name: "Trần Thị B", role: "Ca Chiều", hourly_rate: 45000 },
    { id: "65b2c246e4b0f32a1c000003", name: "Lê Văn C", role: "Quản lý", hourly_rate: 80000 }
];

// =========================================================================
// 2. PHẦN VIỆC CỦA KHƯƠNG: LOGIC RENDER TABLE & XÓA GIẢ LẬP
// =========================================================================
function renderEmployees(employeeList) {
    // Nhắm thẳng vào phần thân (tbody) của bảng hiển thị trong file Frontend.html gốc
    const tableBody = document.querySelector("table tbody");
    if (!tableBody) return;

    tableBody.innerHTML = ""; // Xóa sạch các hàng dữ liệu cũ nếu có

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

function executeDeleteEmployee(id) {
    const index = mockEmployees.findIndex(item => item.id === id);
    if (index !== -1) {
        if (confirm("Bạn có chắc chắn muốn xóa nhân viên này khỏi danh sách?")) {
            mockEmployees.splice(index, 1);
            renderEmployees(mockEmployees); // Vẽ lại bảng ngay lập tức
        }
    }
}

// =========================================================================
// 3. PHẦN VIỆC CỦA BẮC: XỬ LÝ LOGIC FORM SUBMIT
// =========================================================================
const form = document.getElementById('employeeForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Chặn reload trang
        
        const tenNhanVien = document.getElementById('name').value;
const caLamViec = document.getElementById('role').value;
        const luongTheoGio = document.getElementById('hourly_rate').value;
        
        const nhanVienMoi = {
            name: tenNhanVien,
            role: caLamViec,
            hourly_rate: Number(luongTheoGio)
        };
        
        console.log("Dữ liệu nhân viên vừa nhập là:", nhanVienMoi);
        alert("Thu thập dữ liệu từ Form thành công! Mời sếp check F12 Console.");
    });
}

// =========================================================================
// 4. KÍCH HOẠT HÀM RENDER KHI TRANG WEB TẢI XONG
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    renderEmployees(mockEmployees);
});