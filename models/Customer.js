import Person from "./Person.js";
export default class Customer extends Person {
    constructor(id, name, address, email, company, bill, rate) {
        super(id, name, address, email);
        this.company = company;
        this.bill = bill;
        this.rate = rate;
    }
}