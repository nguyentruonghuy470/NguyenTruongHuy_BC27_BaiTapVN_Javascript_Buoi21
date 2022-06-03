function Staff(tk, name, email, password, date, salary, position, timework) {
  this.tk = tk;
  this.name = name;
  this.email = email;
  this.password = password;
  this.date = date;
  this.salary = salary;
  this.position = position;
  this.timework = timework;

  Staff.prototype.tinhTongLuong = function () {
    var tongLuong = 0;
    if (this.position === "Sếp") {
      tongLuong = this.salary * 3;
    } else if (this.position === "Trưởng phòng") {
      tongLuong = this.salary * 2;
    } else {
      tongLuong = this.salary * 1;
    }
    return tongLuong;
    console.log(tongLuong);
  };

  Staff.prototype.xepLoaiNV = function () {
    if (this.timework >= 192) {
      return "Nhân viên Xuất Sắc";
    } else if (this.timework >= 176 && this.timework < 192) {
      return "Nhân viên Giỏi";
    } else if (this.timework >= 160 && this.timework < 176) {
      return "Nhân viên Khá";
    } else {
      return "Nhân viên Trung Bình";
    }
  };
}

var Staffs = [];
function selectNV(tentk){

  var index = findNV(tentk);

  var staff = Staffs[index];
  
  document.getElementById("tknv").value=staff.tk;
  document.getElementById("name").value=staff.name;
  document.getElementById("email").value=staff.email;
  document.getElementById("password").value=staff.password;
  document.getElementById("datepicker").value=staff.date;
  document.getElementById("luongCB").value=staff.salary;
  document.getElementById("chucvu").value=staff.position;
  document.getElementById("gioLam").value=staff.timework;

  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").disabled = true;
}

function addStaff() {

  var tk = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var salary = document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var timework = document.getElementById("gioLam").value;


  var isValid = validation();
  while (!isValid) {
    alert("Vui lòng nhập vào các giá trị");
    return;
  }

  var staff = new Staff(
    tk,
    name,
    email,
    password,
    date,
    salary,
    position,
    timework
  );
  Staffs.push(staff);
  display(Staffs);
}

function findNV(nametk){
  
  var index = -1;
  for (var i = 0; i < Staffs.length; i++) {
    if (Staffs[i].tk === nametk) {
      index = i;
    }
  }
  return index;
}

function updateNV(){

  var tk = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var salary = document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var timework = document.getElementById("gioLam").value;

  var isValid = validation();
  while (!isValid) {
    alert("Vui lòng nhập vào các giá trị");
    return;
  }
  var staff = new Staff(
    tk,
    name,
    email,
    password,
    date,
    salary,
    position,
    timework
  );

  var index = findNV(staff.tk);
  Staffs[index] =staff;

  display(Staffs);
 
  resetForm();

  $('#myModal').modal('hide');
}

function resetForm(){
  document.getElementById("tknv").value ="";
  document.getElementById("name").value ="";
  document.getElementById("email").value ="";
  document.getElementById("password").value ="";
  document.getElementById("datepicker").value ="";
  document.getElementById("luongCB").value ="";
  document.getElementById("chucvu").value ="";
  document.getElementById("gioLam").value ="";

  
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").disabled = false;
}

function display(Staffs) {
  tbodyNV = document.getElementById("tableDanhSach");

  html = "";
  for (var i = 0; i < Staffs.length; i++) {
    var staff = Staffs[i];
    html += `
       <tr>
            <td>${staff.tk}</td>
            <td>${staff.name}</td>
            <td>${staff.email}</td>
            <td>${staff.date}</td>
            <td>${staff.position}</td>
            <td>${staff.tinhTongLuong()}</td>
            <td>${staff.xepLoaiNV()}</td>
            <td>
              <button class="btn btn-success" onclick="selectNV('${
                staff.tk
              }')" data-target="#myModal" data-toggle="modal">Chọn</button>
            </td>
            <td>
               <button class="btn btn-danger" onclick="deleteNV('${
                 staff.tk
               }')">Xóa</button>
            </td>
       </tr>
    `;
  }
  tbodyNV.innerHTML= html;
}

function isRequired(value) {
  if (!value) {
    return false;
  }
  return true;
}

function validation() {
  var tk = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var position = document.getElementById("chucvu").value;
  var timework = +document.getElementById("gioLam").value;
  var salary = +document.getElementById("luongCB").value;
  var date = document.getElementById("datepicker").value;

  var tkPattern = /^[0-9\d]{4,6}$/;
  var namePattern = new RegExp("^[A-Za-z]+$");
  var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  var pwPattern =
    /^(?=.*[A-Z])(?=.*[!&%\/()=\?\^\*\+\]\[#><;:,\._-|@])(?=.*[0-9])(?=.*[a-z]).{6,10}$/;
  var pwDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

  var isValid = true;

  if (!isRequired(tk)) {
    document.getElementById("tbTKNV").style.display = "block";
    isValid = false;
    document.getElementById("tbTKNV").innerHTML =
      "Tên tài khoản không được để trống";
  } else if (!tkPattern.test(tk)) {
    isValid = false;
    document.getElementById("tbTKNV").style.display = "block";
    document.getElementById("tbTKNV").innerHTML =
      "Định dạng tên tài khoản không hợp lệ";
  } else document.getElementById("tbTKNV").innerHTML = "";

  // Validation Tên NV
  if (!isRequired(name)) {
    isValid = false;
    document.getElementById("tbTen").style.display = "block";
    document.getElementById("tbTen").innerHTML =
      "Tên nhân viên không được để trống";
  } else if (!namePattern.test(name)) {
    isValid = false;
    document.getElementById("tbTen").style.display = "block";
    document.getElementById("tbTen").innerHTML =
      "Định dạng tên nhân viên không hợp lệ";
  } else document.getElementById("tbTen").innerHTML = "";

  if (!isRequired(email)) {
    isValid = false;
    document.getElementById("tbEmail").style.display = "block";
    document.getElementById("tbEmail").innerHTML = "Email không được để trống";
  } else if (!emailPattern.test(email)) {
    isValid = false;
    document.getElementById("tbEmail").style.display = "block";
    document.getElementById("tbEmail").innerHTML =
      "Định dạng email không hợp lệ";
  } else document.getElementById("tbEmail").innerHTML = "";

  if (!isRequired(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").style.display = "block";
    document.getElementById("tbMatKhau").innerHTML =
      "Mật Khẩu không được để trống";
  } else if (!pwPattern.test(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").style.display = "block";
    document.getElementById("tbMatKhau").innerHTML =
      "Mật khẩu không đúng định dạng";
    console.log(password);
  } else document.getElementById("tbMatKhau").innerHTML = "";

  if (!isRequired(position)) {
    isValid = false;
    document.getElementById("tbChucVu").style.display = "block";
    document.getElementById("tbChucVu").innerHTML =
      "Vị trí không được để trống";
  } else if (
    !(
      position === "Sếp" ||
      position === "Trưởng phòng" ||
      position === "Nhân viên"
    )
  ) {
    isValid = false;
    document.getElementById("tbChucVu").style.display = "block";
    document.getElementById("tbChucVu").innerHTML = "Vị trí không hợp lệ";
  } else document.getElementById("tbChucVu").innerHTML = "";

  if (!isRequired(timework)) {
    isValid = false;
    document.getElementById("tbGiolam").style.display = "block";
    document.getElementById("tbGiolam").innerHTML =
      "Giờ làm không được để trống";
  } else if (!(timework >= 80 && timework <= 200)) {
    isValid = false;
    document.getElementById("tbGiolam").style.display = "block";
    document.getElementById("tbGiolam").innerHTML = "Giờ làm không hợp lệ";
  } else document.getElementById("tbGiolam").innerHTML = "";

  if (!isRequired(salary)) {
    isValid = false;
    document.getElementById("tbLuongCB").style.display = "block";
    document.getElementById("tbLuongCB").innerHTML =
      "Lương cơ bản không được để trống";
  } else if (!(salary >= 1000000 && salary <= 20000000)) {
    isValid = false;
    document.getElementById("tbLuongCB").style.display = "block";
    document.getElementById("tbLuongCB").innerHTML =
      "Lương cơ bản không hợp lệ";
  } else document.getElementById("tbLuongCB").innerHTML = "";

  if (!isRequired(date)) {
    isValid = false;
    document.getElementById("tbNgay").style.display = "block";
    document.getElementById("tbNgay").innerHTML =
      "Ngày làm không được để trống";
  } else if (!pwDate.test(date)) {
    isValid = false;
    document.getElementById("tbNgay").style.display = "block";
    document.getElementById("tbNgay").innerHTML =
      "Định dạng ngày làm không hợp lệ";
  } else document.getElementById("tbNgay").innerHTML = "";
  return isValid;
}

function deleteNV(tk) {
  var index = -1;
  for (var i = 0; i < Staffs.length; i++) {
    if (Staffs[i].tk === tk) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    Staffs.splice(index, 1);
    display(Staffs);
  }
}

function searchNV() {
  var search = document.getElementById("searchName").value;
  search = search.toLowerCase();

  var newStaff = [];

  for (var i = 0; i < Staffs.length; i++) {
    var staff = Staffs[i];
    var searchName = staff.xepLoaiNV().toLowerCase();
    // Dùng Indexof dùng để xét chuỗi con
    if (searchName.indexOf(search) !== -1) {
      newStaff.push(staff);
    }
  }
  display(newStaff);
}

function unlockbtnThem() {
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").disabled = false;
}
