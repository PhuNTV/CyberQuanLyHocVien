
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import Customer from "../models/Customer.js";
import Validation from "./Validation.js";

let personList = getLocalStorage();

// DOM
const getElement = (selector) => {
    return document.querySelector(selector);
}

// Render
let renderPerson = (personList) => {
    let html = personList.reduce((result, person) => {
        return (result += `
        <tr>
        <td>${person.id}</td>
        <td>${person.name}</td>
        <td>${person.address}</td>
        <td>${person.email}</td>
        <td>${person.constructor.name}</td>        
        <td>
            <button type="button" class="btn btn-success" onclick="editPerson('${person.id}')">Edit</button>
            <button class='btn btn-danger' onclick="deletePerson('${person.id}')">Delete</button>
            <button class='btn btn-warning' onclick="showInfo('${person.id}')" data-bs-toggle="modal" data-bs-target="#detailsModal">Show Info</button>
        </td>
    </tr>
        `
        );
    }, "");
    getElement('#tableList').innerHTML = html;
}
renderPerson(personList);

// Add Student
window.createStudent = () => {
    let id = getElement("#studentId").value;
    let name = getElement("#studentName").value;
    let address = getElement("#studentAddress").value;
    let email = getElement("#studentEmail").value;
    let math = Number(getElement("#math").value);
    let physics = Number(getElement("#physics").value);
    let chemistry = Number(getElement("#chemistry").value);

    let isValid = true;

    isValid &= Validation.checkEmpty(id, "tbIdStudent", "Thông tin không được để trống!") && Validation.checkIdExist(id, "tbIdStudent", "ID đã tồn tại", personList);
    isValid &= Validation.checkEmpty(name, "tbNameStudent", "Thông tin không được để trống!") && Validation.checkName(name, "tbNameStudent", "Thông tin không hợp lệ!");
    isValid &= Validation.checkEmpty(address, "tbAdressStudent", "Thông tin không được để trống!");
    isValid &= Validation.checkEmpty(email, "tbMailStudent", "Thông tin không được để trống!") && Validation.checkEmail(email, "tbMailStudent", "Thông tin email chưa hợp lệ!");
    isValid &= Validation.checkEmpty(math, "tbMathStudent", "Thông tin không được để trống!") && Validation.checkScore(math, "tbMathStudent", "Điểm chưa hợp lệ!");
    isValid &= Validation.checkEmpty(physics, "tbPhysicsStudent", "Thông tin không được để trống!") && Validation.checkScore(physics, "tbPhysicsStudent", "Điểm chưa hợp lệ!");
    isValid &= Validation.checkEmpty(chemistry, "tbChemistryStudent", "Thông tin không được để trống!") && Validation.checkScore(chemistry, "tbChemistryStudent", "Điểm chưa hợp lệ!");

    if (isValid) {
        const student = new Student(id, name, address, email, Number(math), Number(physics), Number(chemistry));
        personList.push(student);
        setLocalStorage();
        renderPerson(personList);
        resetStudent();
        alert("Thêm Thành Công");
        document.querySelector("#exampleModalStudent .btn-close").click();
    }

}
getElement("#btnAddStudent").onclick = () => {
    getElement("#studentId").disabled = false;
    getElement(".label-student").innerHTML = "Thêm Học Viên";
    getElement("#modal-footer-S").innerHTML = `
  <button type="button" class="btn btn-primary" onclick="createStudent()">Thêm</button>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
  `;

}


// Add teacher
window.createTeacher = () => {
    let id = getElement("#teacherId").value;
    let name = getElement("#teacherName").value;
    let address = getElement("#teacherAddress").value;
    let email = getElement("#teacherEmail").value;
    let days = Number(getElement("#days").value);
    let salaryUnit = Number(getElement("#salaryUnit").value);

    let isValid = true;

    isValid &= Validation.checkEmpty(id, "tbIdTeacher", "Thông tin không được để trống!") && Validation.checkIdExist(id, "tbIdTeacher", "ID đã tồn tại", personList);
    isValid &= Validation.checkEmpty(name, "tbNameTeacher", "Thông tin không được để trống!") && Validation.checkName(name, "tbNameTeacher", "Thông tin không hợp lệ!");
    isValid &= Validation.checkEmpty(address, "tbAdressTeacher", "Thông tin không được để trống!");
    isValid &= Validation.checkEmpty(email, "tbMailTeacher", "Thông tin không được để trống!") && Validation.checkEmail(email, "tbMailTeacher", "Thông tin email chưa hợp lệ!");
    isValid &= Validation.checkEmpty(days, "tbDays", "Thông tin không được để trống!") && Validation.checkDays(days, "tbDays", "Ngày chưa hợp lệ!");
    isValid &= Validation.checkEmpty(salaryUnit, "tbSalaryUnit", "Thông tin không được để trống!") && Validation.checkDailySalary(salaryUnit, "tbSalaryUnit", "Lương chưa chưa hợp lệ!");

    if (isValid) {
        const teacher = new Teacher(id, name, address, email, Number(days), Number(salaryUnit));
        personList.push(teacher);
        setLocalStorage();
        renderPerson(personList);
        resetTeacher();
        alert("Thêm Thành Công");
        document.querySelector("#exampleModalTeacher .btn-close").click();
    }

}
getElement("#btnAddTeacher").onclick = () => {
    getElement("#teacherId").disabled = false;
    getElement(".label-teacher").innerHTML = "Thêm Giảng Viên";
    getElement("#modal-footer-T").innerHTML = `
  <button type="button" class="btn btn-primary" onclick="createTeacher()">Thêm</button>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
  `;
}

// Add Customer
window.createCustomer = () => {
    let id = getElement("#customerId").value;
    let name = getElement("#customerName").value;
    let address = getElement("#customerAddress").value;
    let email = getElement("#customerEmail").value;
    let company = getElement("#company").value;
    let bill = Number(getElement("#billValue").value);
    let rate = getElement("#inputRate").value;
    switch (rate) {
        case 'Good': {
            rate = "Good";
        }
            break;
        case 'Bad': {
            rate = "Bad";
        }
            break;
        default: {
            rate = "Choose";
        }
    }

    let isValid = true;

    isValid &= Validation.checkEmpty(id, "tbIdCustomer", "Thông tin không được để trống!") && Validation.checkIdExist(id, "tbIdCustomer", "ID đã tồn tại", personList);
    isValid &= Validation.checkEmpty(name, "tbNameCustomer", "Thông tin không được để trống!") && Validation.checkName(name, "tbNameCustomer", "Thông tin không hợp lệ!");
    isValid &= Validation.checkEmpty(address, "tbAdressCustomer", "Thông tin không được để trống!");
    isValid &= Validation.checkEmpty(email, "tbMailCustomer", "Thông tin không được để trống!") && Validation.checkEmail(email, "tbMailCustomer", "Thông tin email chưa hợp lệ!");
    isValid &= Validation.checkEmpty(company, "tbCompanyName", "Thông tin không được để trống!");
    isValid &= Validation.checkEmpty(bill, "tbBill", "Thông tin không được để trống!") && Validation.checkBill(bill, "tbBill", "Giá trị chưa chưa hợp lệ!");
    isValid &= Validation.checkSelect("inputRate", "tbRate", "Thông tin chưa hợp lệ!");

    if (isValid) {
        const customer = new Customer(id, name, address, email, company, bill, rate);
        personList.push(customer);
        setLocalStorage();
        renderPerson(personList);
        resetTeacher();
        alert("Thêm Thành Công");
        document.querySelector("#exampleModalCustomer .btn-close").click();
    }


}
getElement("#btnAddCustomer").onclick = () => {
    getElement("#customerId").disabled = false;
    getElement(".label-customer").innerHTML = "Thêm Khách Hàng";
    getElement("#modal-footer-C").innerHTML = `
  <button type="button" class="btn btn-primary" onclick="createCustomer()">Thêm</button>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
  `;
}

// Delete học viên
window.deletePerson = (personId) => {
    personList = personList.filter((person) => {
        return person.id !== personId;
    });
    setLocalStorage();
    renderPerson(personList);
}

// Edit Học viên
window.editPerson = (personId) => {
    let person = personList.find(person => person.id === personId);
    switch (person.constructor.name) {
        case 'Student': {
            getElement("#studentId").value = person.id;
            getElement("#studentName").value = person.name;
            getElement("#studentAddress").value = person.address;
            getElement("#studentEmail").value = person.email;
            getElement("#math").value = person.math;
            getElement("#physics").value = person.physics;
            getElement("#chemistry").value = person.chemistry;
            getElement("#studentId").disabled = true;
            getElement(".label-student").innerHTML = "EDIT STUDENT";
            getElement("#modal-footer-S").innerHTML = `
        <button type="button" class="btn btn-primary"  onclick="updateStudent('${person.id}')">Cập nhật</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
      `;
            $("#exampleModalStudent").modal("show");
        }
            break;
        case 'Teacher': {
            getElement("#teacherId").value = person.id;
            getElement("#teacherName").value = person.name;
            getElement("#teacherAddress").value = person.address;
            getElement("#teacherEmail").value = person.email;
            getElement("#days").value = person.days;
            getElement("#salaryUnit").value = person.salaryUnit;
            getElement("#teacherId").disabled = true;
            getElement(".label-teacher").innerHTML = "EDIT Teacher";
            getElement("#modal-footer-T").innerHTML = `
            <button type="button" class="btn btn-primary"  onclick="updateTeacher('${person.id}')">Cập nhật</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
          `;
            $("#exampleModalTeacher").modal("show");
        }
            break;
        case 'Customer': {
            getElement("#customerId").value = person.id;
            getElement("#customerName").value = person.name;
            getElement("#customerAddress").value = person.address;
            getElement("#customerEmail").value = person.email;
            getElement("#company").value = person.company;
            getElement("#billValue").value = person.bill;
            getElement("#inputRate").value = person.rate;
            getElement("#customerId").disabled = true;
            getElement(".label-customer").innerHTML = "EDIT CUSTOMER";
            getElement("#modal-footer-C").innerHTML = `
            <button type="button" class="btn btn-primary"  onclick="updateCustomer('${person.id}')">Cập nhật</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
          `;
            $("#exampleModalCustomer").modal("show");
        }
            break;
    }
}

window.updateStudent = () => {
    let id = getElement("#studentId").value;
    let name = getElement("#studentName").value;
    let address = getElement("#studentAddress").value;
    let email = getElement("#studentEmail").value;
    let math = Number(getElement("#math").value);
    let physics = Number(getElement("#physics").value);
    let chemistry = Number(getElement("#chemistry").value);

    let isValid = true;
    isValid &= Validation.checkEmpty(name, "tbNameStudent", "Thông tin không được để trống!") && Validation.checkName(name, "tbNameStudent", "Thông tin không hợp lệ!");
    isValid &= Validation.checkEmpty(address, "tbAdressStudent", "Thông tin không được để trống!");
    isValid &= Validation.checkEmpty(email, "tbMailStudent", "Thông tin không được để trống!") && Validation.checkEmail(email, "tbMailStudent", "Thông tin email chưa hợp lệ!");
    isValid &= Validation.checkEmpty(math, "tbMathStudent", "Thông tin không được để trống!") && Validation.checkScore(math, "tbMathStudent", "Điểm chưa hợp lệ!");
    isValid &= Validation.checkEmpty(physics, "tbPhysicsStudent", "Thông tin không được để trống!") && Validation.checkScore(physics, "tbPhysicsStudent", "Điểm chưa hợp lệ!");
    isValid &= Validation.checkEmpty(chemistry, "tbChemistryStudent", "Thông tin không được để trống!") && Validation.checkScore(chemistry, "tbChemistryStudent", "Điểm chưa hợp lệ!");

    if (isValid) {
        const student = new Student(id, name, address, email, Number(math), Number(physics), Number(chemistry));
        personList.push(student);
        setLocalStorage();
        renderPerson(personList);
        resetStudent();
        alert("Cập Nhập Thành Công");
        document.querySelector("#exampleModalStudent .btn-close").click();
    }
}

window.updateTeacher = () => {
    let id = getElement("#teacherId").value;
    let name = getElement("#teacherName").value;
    let address = getElement("#teacherAddress").value;
    let email = getElement("#teacherEmail").value;
    let days = Number(getElement("#days").value);
    let salaryUnit = Number(getElement("#salaryUnit").value);
    let isValid = true;

    isValid &= Validation.checkEmpty(name, "tbNameTeacher", "Thông tin không được để trống!") && Validation.checkName(name, "tbNameTeacher", "Thông tin không hợp lệ!");
    isValid &= Validation.checkEmpty(address, "tbAdressTeacher", "Thông tin không được để trống!");
    isValid &= Validation.checkEmpty(email, "tbMailTeacher", "Thông tin không được để trống!") && Validation.checkEmail(email, "tbMailTeacher", "Thông tin email chưa hợp lệ!");
    isValid &= Validation.checkEmpty(days, "tbDays", "Thông tin không được để trống!") && Validation.checkDays(days, "tbDays", "Ngày chưa hợp lệ!");
    isValid &= Validation.checkEmpty(salaryUnit, "tbSalaryUnit", "Thông tin không được để trống!") && Validation.checkDailySalary(salaryUnit, "tbSalaryUnit", "Lương chưa chưa hợp lệ!");

    if (isValid) {
        const teacher = new Teacher(id, name, address, email, Number(days), Number(salaryUnit));
        personList.push(teacher);
        setLocalStorage();
        renderPerson(personList);
        resetTeacher();
        alert("Cập Nhập Thành Công");
        document.querySelector("#exampleModalTeacher .btn-close").click();
    }
}

window.updateCustomer = () => {
    let id = getElement("#customerId").value;
    let name = getElement("#customerName").value;
    let address = getElement("#customerAddress").value;
    let email = getElement("#customerEmail").value;
    let company = getElement("#company").value;
    let bill = getElement("#billValue").value;
    let rate = getElement("#inputRate").value;
    switch (rate) {
        case 'Good': {
            rate = "Good";
        }
            break;
        case 'Bad': {
            rate = "Bad";
        }
            break;
        default: {
            rate = "Choose";
        }
    }
    let isValid = true;

    isValid &= Validation.checkEmpty(name, "tbNameCustomer", "Thông tin không được để trống!") && Validation.checkName(name, "tbNameCustomer", "Thông tin không hợp lệ!");
    isValid &= Validation.checkEmpty(address, "tbAdressCustomer", "Thông tin không được để trống!");
    isValid &= Validation.checkEmpty(email, "tbMailCustomer", "Thông tin không được để trống!") && Validation.checkEmail(email, "tbMailCustomer", "Thông tin email chưa hợp lệ!");
    isValid &= Validation.checkEmpty(company, "tbCompanyName", "Thông tin không được để trống!");
    isValid &= Validation.checkEmpty(bill, "tbBill", "Thông tin không được để trống!") && Validation.checkBill(bill, "tbBill", "Giá trị chưa chưa hợp lệ!");
    isValid &= Validation.checkSelect("inputRate", "tbRate", "Thông tin chưa hợp lệ!");

    if (isValid) {
        const customer = new Customer(id, name, address, email, company, bill, rate);
        personList.push(customer);
        setLocalStorage();
        renderPerson(personList);
        resetTeacher();
        alert("Cập Nhập Thành Công");
        document.querySelector("#exampleModalCustomer .btn-close").click();
    }
}

// tạo hàm sắp xếp 


const sortPersonList = () => {
    let selectElement = getElement("#arrangeName");
    let selectedValue = selectElement.value;

    switch (selectedValue) {
        case "1":
            sortByFirstNameAZ(personList);
            break;
        case "2":
            sortByFirstNameZA(personList);
            break;
        default:
            break;
    }
    renderPerson(personList);
};

let selectElement = getElement("#arrangeName");
selectElement.addEventListener("click", sortPersonList);


const sortByFirstNameAZ = (list) => {
    return list.sort((a, b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();

        if (nameA < nameB) {
            return -1;
        }

        if (nameA > nameB) {
            return 1;
        }

        return 0;
    });
};


const sortByFirstNameZA = (list) => {
    return list.sort((a, b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();

        if (nameA < nameB) {
            return 1;
        }

        if (nameA > nameB) {
            return -1;
        }

        return 0;
    });
};

//lọc danh sách theo type

const filterPerson = (userType) => {
    let filteredList = [];
    switch (userType) {
        case "1":
            filteredList = personList.filter((person) => person instanceof Student);
            break;
        case "2":
            filteredList = personList.filter((person) => person instanceof Teacher);
            break;
        case "3":
            filteredList = personList.filter((person) => person instanceof Customer);
            break;
        default: filteredList = personList;
            break;
    }
    return filteredList;
};

const userTypeSelect = getElement("#typePerson");

userTypeSelect.onclick = () => {
    const userType = userTypeSelect.value;
    const filteredList = filterPerson(userType);
    renderPerson(filteredList);
};



// Show chi tiết Học viên
window.showInfo = (personId) => {
    let person = personList.find(person => person.id === personId);

    let average = () => {
        if (person instanceof Student) {
            return person.calculateAverage();
        }
    }

    let salary = () => {
        if (person instanceof Teacher) {
            return person.calculateSalary();
        }
    }


    getElement("#detailsTitle").innerHTML = person.constructor.name;
    let html = `
    <label class='fw-bold'>ID: </label>
    <span>${person.id}</span><br>
    <label class='fw-bold'>Name: </label>
    <span>${person.name}</span><br>
    <label class='fw-bold'>Address: </label>
    <span>${person.address}</span><br>
    <label class='fw-bold'>Email: </label>
    <span>${person.email}</span><br>
    `;
    switch (person.constructor.name) {
        case 'Student': {
            html += `
            <label class='fw-bold'>Math: </label>
            <span>${person.math}</span><br>
            <label class='fw-bold'>Physics: </label>
            <span>${person.physics}</span><br>
            <label class='fw-bold'>Chemistry: </label>
            <span>${person.chemistry}</span><br>
            <label class='fw-bold'>Average score: </label>
            <span>${average().toFixed(2)}</span>
            `
        }
            break;
        case 'Teacher': {
            html += `
            <label class='fw-bold'>Working day: </label>
            <span>${person.days}</span><br>
            <label class='fw-bold'>Salary day: </label>
            <span>${new Intl.NumberFormat('vn-VN').format(person.salaryUnit)}VND</span><br>
            <label class='fw-bold'>Total salary: </label>
            <span>${new Intl.NumberFormat('vn-VN').format(salary())}VND</span>
            `
        }
            break;
        case 'Customer': {
            html += `
            <label class='fw-bold'>Name of company: </label>
            <span>${person.company}</span><br>
            <label class='fw-bold'>Bill: </label>
            <span>${person.bill}</span><br>
            <label class='fw-bold'>Feedback: </label>
            <span>${person.rate}</span>
            `
        }
    }
    getElement('#detailsBody').innerHTML = html;
}

// Reset Học viên
let resetStudent = () => {
    getElement("#studentId").value = "";
    getElement("#studentName").value = "";
    getElement("#studentAddress").value = "";
    getElement("#studentEmail").value = "";
    getElement("#math").value = "";
    getElement("#physics").value = "";
    getElement("#chemistry").value = "";
}

let resetTeacher = () => {
    getElement("#teacherId").value = "";
    getElement("#teacherName").value = "";
    getElement("#teacherAddress").value = "";
    getElement("#teacherEmail").value = "";
    getElement("#days").value = "";
    getElement("#salaryUnit").value = "";
}

let resetCustomer = () => {
    getElement("#customerId").value = "";
    getElement("#customerName").value = "";
    getElement("#customerAddress").value = "";
    getElement("#customerEmail").value = "";
    getElement("#company").value = "";
    getElement("#billValue").value = "";
    getElement("#inputRate").value = "";
}



// Validation

// Set local storage
function setLocalStorage() {
    const list = [...personList];
    list.forEach((person) => {
        person['type'] = person.constructor.name;
    })
    const json = JSON.stringify(personList);
    localStorage.setItem('personList', json);
}

// Get local storage
function getLocalStorage() {
    const json = localStorage.getItem('personList');
    if (!json) {
        return [];
    };
    const personList = JSON.parse(json);
    for (let i = 0; i < personList.length; i++) {
        const person = personList[i];
        switch (person.type) {
            case "Student":
                person[i] = new Student(person.id, person.name, person.address, person.email, person.math, person.physics, person.chemistry);
                break;
            case "Teacher":
                person[i] = new Teacher(person.id, person.name, person.address, person.email, person.days, person.salaryUnit);
                break;
            case "Customer":
                person[i] = new Customer(person.id, person.name, person.address, person.email, person.company, person.bill, person.rate);
                break;
            default: break;
        }
        personList[i] = person[i];
    }
    return personList;
}



