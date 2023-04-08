import Person from "./Person.js";
export default class Teacher extends Person {
    constructor(id, name, address, email, days, salaryUnit) {
        super(id, name, address, email);
        this.days = days;
        this.salaryUnit = salaryUnit;
    }
    calculateSalary = () => this.days * this.salaryUnit;
}