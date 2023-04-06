class Employee extends Person {
    constructor(id, name, address, email, userType, workingDays, dailySalary) {
        super(id, name, address, email, userType);
        this.workingDays = workingDays;
        this.dailySalary = dailySalary;
    }

    calculateSalary() {
        return this.workingDays * this.dailySalary;
    }
}