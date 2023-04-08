import Person from "./Person.js";
export default class Teacher extends Person {
    constructor(id, name, address, email, workingDays, dailySalary) {
        super(id, name, address, email);
        this.days = days;
        this.salaryUnit = salaryUnit;
        this.salary = 0;
        this.calculateSalary = () => {
            this.salary = this.days * this.salaryUnit;
        }
    }

}