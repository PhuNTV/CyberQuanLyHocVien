import { Student } from "../models/Student.js";
import { Employee } from "../models/Employee.js";
import { Customer } from "../models/Customer.js";
import { ListPerson } from "../services/ListPerson.js";
import { Validation } from "../controllers/Validation.js";

let personList = getLocalStorage();
renderPerson(personList);

let getElement = (selector) => {
    return document.querySelector(selector);
}

window.createUser = () => {
    const userTypeSelect = getElement("#user-type");

    let id = getElement("#ID").value;
    let name = getElement("#name").value;
    let address = getElement("#address").value;
    let email = getElement("#email").value;
    let mathScore = getElement("#mathScore").value;
    let physicsScore = getElement("#physicsScore").value;
    let chemistryScore = getElement("#chemistryScore").value;
    let workingDays = getElement("#workingDays").value;
    let dailySalary = getElement("#dailySalary").value;
    let companyName = getElement("#companyName").value;
    let bill = getElement("#bill").value;
    let rating = getElement("#rating").value;

    // Xử lý sự kiện onchange của trường loại người dùng
    userTypeSelect.onchange = () => {
        // Lấy giá trị loại người dùng được chọn
        const userType = userTypeSelect.value;

        // Ẩn hiện các trường thuộc tính phù hợp với loại người dùng
        switch (userType) {
            case "student":
                mathScore.style.display = "block";
                physicsScore.style.display = "block";
                chemistryScore.style.display = "block";
                workingDays.style.display = "none";
                dailySalary.style.display = "none";
                companyName.style.display = "none";
                bill.style.display = "none";
                rating.style.display = "none";
                const student = new Student(id, name, address, email, mathScore, physicsScore, chemistryScore);
                break;
            case "employee":
                mathScore.style.display = "none";
                physicsScore.style.display = "none";
                chemistryScore.style.display = "none";
                workingDays.style.display = "block";
                dailySalary.style.display = "block";
                companyName.style.display = "none";
                bill.style.display = "none";
                rating.style.display = "none";
                const employee = new Employee(id, name, address, email, workingDays, dailySalary);
                break;
            case "customer":
                mathScore.style.display = "none";
                physicsScore.style.display = "none";
                chemistryScore.style.display = "none";
                workingDays.style.display = "none";
                dailySalary.style.display = "none";
                companyName.style.display = "block";
                bill.style.display = "block";
                rating.style.display = "block";
                break;
            default:
                break;
        }
    };

    var employee = new Employee(account, name, email, pass, dayStartWork, Number(basicSalary), position, Number(workingHourOfMonth));
    employee.calTotalSalary();
    employee.employRating();

    listEmployee.addEmployee(employee);
    displayTable(listEmployee.empArray);
    setLocalStorage(listEmployee.empArray);




    const student = new Student(id, name, address, email, mathScore, physicsScore, chemistryScore);
    let index = personList.findIndex(person => person.id === id);
    if (index === -1) {
        personList.push(student);
    } else {
        personList[index] = student;
    }
    setLocalStorage();
    renderPerson(personList);
}

let renderPerson = (personList) => {
    let rowPerson = personList.reduce((result, person) => {
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
        `);
    }, "");
    getElement('#tableList').innerHTML = rowPerson;
}

let setLocalStorage = () => {
    const list = [...personList];
    list.forEach((person) => {
        person['type'] = person.constructor.name;
    })
    const json = JSON.stringify(personList);
    localStorage.setItem('personList', json);
}

let getLocalStorage = () => {
    const json = localStorage.getItem('personList');
    if (!json) {
        return [];
    };
    const personList = JSON.parse(json);
    for (const i in personList) {
        const person = personList[i];
        switch (person.type) {
            case "Student":
                person[i] = new Student(person.id, person.name, person.address, person.email, person.userType, person.math, person.physics, person.chemistry);
                break;
            case "Employee":
                person[i] = new Employee(person.id, person.name, person.address, person.email, person.userType, person.days, person.salaryUnit);
                break;
            case "Customer":
                person[i] = new Customer(person.id, person.name, person.address, person.email, person.userType, person.companyName, person.bill, person.rating);
                break;
            default:
                break;
        }
        personList[i] = person[i];
    }
    return personList;
}