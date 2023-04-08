
import Student from "/models/Student.js";
import Teacher from "/models/Teacher.js";
import Customer from "/models/Customer.js";

let personList = getLocalStorage();
renderPerson(personList);
// DOM
function getElement(selector) {
    return document.querySelector(selector);
}

// Add Student 
window.createStudent = () => {
    let id = getElement("#studentId").value;
    let name = getElement("#studentName").value;
    let address = getElement("#studentAddress").value;
    let email = getElement("#studentEmail").value;
    let math = Number(getElement("#math").value);
    let physics = Number(getElement("#physics").value);
    let chemistry = Number(getElement("#chemistry").value);
    const student = new Student(id, name, address, email, Number(math), Number(physics), Number(chemistry));
    student.calculateAverageScore();
    let index = personList.findIndex(person => person.id === id);
    if (index === -1) {
        personList.push(student);
    } else {
        personList[index] = student;
    }
    setLocalStorage();
    renderPerson(personList);
}
getElement("#btnAddStudent").onclick = () => {
    getElement("#studentId").disabled = false;
    getElement(".label-student").innerHTML = "Thêm Học Viên";
    getElement("#modal-footer-S").innerHTML = `
  <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="createStudent()">Thêm</button>
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
    const teacher = new Teacher(id, name, address, email, Number(days), Number(salaryUnit));
    teacher.calculateSalary();
    let index = personList.findIndex(person => person.id === id)
    if (index === -1) {
        personList.push(teacher);
    } else {
        personList[index] = teacher;
    }
    setLocalStorage();
    renderPerson(personList);
}
getElement("#btnAddTeacher").onclick = () => {
    getElement("#teacherId").disabled = false;
    getElement(".label-teacher").innerHTML = "Thêm Giảng Viên";
    getElement("#modal-footer-T").innerHTML = `
  <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="createTeacher()">Thêm</button>
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

    const customer = new Customer(id, name, address, email, company, bill, rate);
    let index = personList.findIndex(person => person.id === id)
    if (index === -1) {
        personList.push(customer);
    } else {
        personList[index] = customer;
    }
    setLocalStorage();
    renderPerson(personList);
}
getElement("#btnAddCustomer").onclick = () => {
    getElement("#customerId").disabled = false;
    getElement(".label-customer").innerHTML = "Thêm Khách Hàng";
    getElement("#modal-footer-C").innerHTML = `
  <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="createCustomer()">Thêm</button>
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
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="updateStudent('${person.id}')">Cập nhật</button>
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
            getElement("#modal-footer-E").innerHTML = `
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="updateTeacher('${person.id}')">Cập nhật</button>
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
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="updateCustomer('${person.id}')">Cập nhật</button>
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
    const student = new Student(id, name, address, email, Number(math), Number(physics), Number(chemistry));
    let index = personList.findIndex((student) => {
        return student.id === id;
    });
    personList[index] = student;
    renderPerson(personList);
    setLocalStorage();
    resetStudent();
}

window.updateTeacher = () => {
    let id = getElement("#teacherId").value;
    let name = getElement("#teacherName").value;
    let address = getElement("#teacherAddress").value;
    let email = getElement("#teacherEmail").value;
    let days = Number(getElement("#days").value);
    let salaryUnit = Number(getElement("#salaryUnit").value);
    const teacher = new Teacher(id, name, address, email, Number(days), Number(salaryUnit));
    let index = personList.findIndex((teacher) => {
        return teacher.id === id;
    });
    personList[index] = teacher;
    renderPerson(personList);
    setLocalStorage();
    resetTeacher()
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
    const customer = new Customer(id, name, address, email, company, bill, rate);
    let index = personList.findIndex((customer) => {
        return customer.id === id;
    });
    personList[index] = customer;
    renderPerson(personList);
    setLocalStorage();
    resetCustomer();
}

// const sortNames = (order) => {
//   const namesList = document.querySelectorAll('.name'); // Lấy danh sách tên cần sắp xếp
//   const sortedNames = Array.from(namesList).sort((a, b) => {
//     const nameA = a.textContent.trim().split(' '); // Tách tên thành 2 phần họ và tên đệm
//     const nameB = b.textContent.trim().split(' '); // Tách tên thành 2 phần họ và tên đệm
//     const lastNameA = nameA[nameA.length - 1]; // Lấy phần tên cuối cùng của tên A
//     const lastNameB = nameB[nameB.length - 1]; // Lấy phần tên cuối cùng của tên B

//     if (order === 'asc') { // Sắp xếp tăng dần
//       if (lastNameA < lastNameB) return -1;
//       if (lastNameA > lastNameB) return 1;
//       if (lastNameA === lastNameB) {
//         if (nameA[0] < nameB[0]) return -1;
//         if (nameA[0] > nameB[0]) return 1;
//         return 0;
//       }
//     } else if (order === 'desc') { // Sắp xếp giảm dần
//       if (lastNameA > lastNameB) return -1;
//       if (lastNameA < lastNameB) return 1;
//       if (lastNameA === lastNameB) {
//         if (nameA[0] > nameB[0]) return -1;
//         if (nameA[0] < nameB[0]) return 1;
//         return 0;
//       }
//     }
//   });

//   // Thêm lại các phần tử đã sắp xếp vào danh sách
//   const parent = namesList[0].parentNode;
//   parent.innerHTML = '';
//   sortedNames.forEach((name) => parent.appendChild(name));
// };

// const arrangeNameSelect = document.getElementById('arrangeName'); // Lấy select
// arrangeNameSelect.addEventListener('change', (event) => {
//   const order = event.target.value; // Lấy giá trị của option được chọn
//   sortNames(order); // Sắp xếp danh sách theo thứ tự họ tên
// });

// Show chi tiết Học viên
window.showInfo = (personId) => {
    let person = personList.find(person => person.id === personId);
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
            <span>${person.average}</span>
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
            <span>${new Intl.NumberFormat('vn-VN').format(person.salary)}VND</span>
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
function resetStudent() {
    getElement("#studentId").value = "";
    getElement("#studentName").value = "";
    getElement("#studentAddress").value = "";
    getElement("#studentEmail").value = "";
    getElement("#math").value = "";
    getElement("#physics").value = "";
    getElement("#chemistry").value = "";
}

function resetTeacher() {
    getElement("#teacherId").value = "";
    getElement("#teacherName").value = "";
    getElement("#teacherAddress").value = "";
    getElement("#teacherEmail").value = "";
    getElement("#days").value = "";
    getElement("#salaryUnit").value = "";
}

function resetCustomer() {
    getElement("#customerId").value = "";
    getElement("#customerName").value = "";
    getElement("#customerAddress").value = "";
    getElement("#customerEmail").value = "";
    getElement("#company").value = "";
    getElement("#billValue").value = "";
    getElement("#inputRate").value = "";
}

// Render
function renderPerson(personList) {
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



