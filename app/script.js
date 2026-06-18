const API_URL = "http://127.0.0.1:8000/staff"; // Địa chỉ Backend FastAPI của sếp

// =========================================================================
// 1. LẤY DANH SÁCH NHÂN VIÊN TỪ MONGO ĐỔ RA TABLE (GET)
// =========================================================================
async function loadEmployees() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Không thể kết nối đến API Backend");
        
        const employeeList = await response.json();
        renderEmployees(employeeList); 
    } catch (error) {
        console.error("Lỗi khi tải danh sách:", error);
    }
}

function renderEmployees(employeeList) {
    const tableBody = document.querySelector("table tbody");
    if (!tableBody) return;

    tableBody.innerHTML = ""; // Xóa sạch bảng cũ để đổ dữ liệu thật từ DB

    employeeList.forEach((employee, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="text-center">${index + 1}</td>
            <td class="text-muted font-monospace" style="font-size: 0.85rem;">${employee.id}</td>
            <td class="fw-bold text-secondary">${employee.name}</td>
            <td><span class="badge bg-info text-dark">${employee.role}</span></td>
            <td class="text-end fw-semibold">${employee.hourly_rate.toLocaleString('vi-VN')} đ</td>
            <td class="text-center">
                <button class="btn btn-warning btn-sm me-1 text-dark" onclick="openEditModal('${employee.id}', '${employee.name}', '${employee.role}', ${employee.hourly_rate})">
                    <i class="bi bi-pencil-square"></i> Sửa
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteEmployee('${employee.id}')">
                    <i class="bi bi-trash"></i> Xóa
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// =========================================================================
// 2. THÊM NHÂN VIÊN MỚI VÀO DATABASE (POST)
// =========================================================================
const form = document.getElementById('employeeForm');
if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault(); 
        
        const employeeData = {
            name: document.getElementById('name').value,
            role: document.getElementById('role').value,
            hourly_rate: Number(document.getElementById('hourly_rate').value)
        };
        
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employeeData)
            });

            if (response.ok) {
                alert("🎉 Đã thêm nhân viên thành công vào MongoDB!");
                form.reset(); 
                loadEmployees(); 
            } else {
                alert("Có lỗi xảy ra khi thêm dữ liệu!");
            }
        } catch (error) {
            console.error("Lỗi POST API:", error);
        }
    });
}

// =========================================================================
// 3. XÓA NHÂN VIÊN THẬT THEO ID MONGO (DELETE)
// =========================================================================
async function deleteEmployee(id) {
    if (confirm("Sếp có chắc chắn muốn xóa nhân viên này khỏi hệ thống Database thật không?")) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("🗑️ Đã xóa sổ nhân viên khỏi Database!");
                loadEmployees(); 
            } else {
                alert("Không thể xóa, vui lòng kiểm tra lại ID!");
            }
        } catch (error) {
            console.error("Lỗi DELETE API:", error);
        }
    }
}

// =========================================================================
// 4. CHỈNH SỬA THÔNG TIN NHÂN VIÊN (PUT - Dùng Prompt nhập nhanh khi Demo)
// =========================================================================
async function openEditModal(id, currentName, currentRole, currentRate) {
    const newName = prompt("Nhập họ tên mới:", currentName);
    if (newName === null) return; 
    
    const newRole = prompt("Nhập ca làm mới (Ca Sáng/Ca Chiều/Ca Tối):", currentRole);
    const newRate = prompt("Nhập lương/giờ mới:", currentRate);

    const updatedData = {
        name: newName,
        role: newRole,
        hourly_rate: Number(newRate)
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            alert("📝 Cập nhật thông tin thành công!");
            loadEmployees(); 
        }
    } catch (error) {
        console.error("Lỗi PUT API:", error);
    }
}

// KÍCH HOẠT TỰ ĐỘNG TẢI DỮ LIỆU THẬT KHI MỞ TRANG WEB
document.addEventListener("DOMContentLoaded", loadEmployees);
