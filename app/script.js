const form = document.getElementById('employeeForm');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const tenNhanVien = document.getElementById('name').value;
    const caLamViec = document.getElementById('role').value;
    const luongTheoGio = document.getElementById('hourly_rate').value;

    const nhanVienMoi = {
        name: tenNhanVien,
        role: caLamViec,
        hourly_rate: Number(luongTheoGio) 
    };

    console.log("Dữ liệu nhân viên vừa nhập là:", nhanVienMoi);
});