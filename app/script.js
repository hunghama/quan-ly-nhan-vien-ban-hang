// 1. Mảng dữ liệu ảo (Mock Data) chuẩn cấu trúc API của Hùng
const mockStaffList = [
    { id: "65b2c1a8e4b0f32a1c000001", name: "Nguyễn Văn Khương", role: "Ca Sáng", hourly_rate: 50000 },
    { id: "65b2c21fe4b0f32a1c000002", name: "Trần Thị B", role: "Ca Chiều", hourly_rate: 45000 },
    { id: "65b2c246e4b0f32a1c000003", name: "Lê Văn C", role: "Quản lý", hourly_rate: 80000 }
];

// 2. Hàm Render hiển thị danh sách nhân viên động ra Table của Khương
function renderStaffTable(staffList) {
    const tableBody = document.getElementById("staffTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = ""; // Xóa dữ liệu cũ

    staffList.forEach((staff, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="text-center">${index + 1}</td>
            <td class="text-muted font-monospace" style="font-size: 0.85rem;">${staff.id}</td>
            <td class="fw-bold text-secondary">${staff.name}</td>
            <td><span class="badge bg-info text-dark">${staff.role}</span></td>
            <td class="text-end fw-semibold">${staff.hourly_rate.toLocaleString('vi-VN')} đ</td>
            <td class="text-center">
                <button class="btn btn-warning btn-sm me-1" onclick="alert('Sẵn sàng sửa ID: ${staff.id}')"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger btn-sm" onclick="executeDeleteStaff('${staff.id}')"><i class="bi bi-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Hàm xóa giả lập để chạy thử nghiệm cho mượt
function executeDeleteStaff(id) {
    const index = mockStaffList.findIndex(item => item.id === id);
    if (index !== -1 && confirm("Xóa nhân viên này?")) {
        mockStaffList.splice(index, 1);
        renderStaffTable(mockStaffList);
    }
}

// Tự động kích hoạt hàm hiển thị khi mở trang lên
document.addEventListener("DOMContentLoaded", () => {
    renderStaffTable(mockStaffList);
});