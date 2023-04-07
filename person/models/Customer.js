import Person from "../models/Person";
export class Customer extends Person {
    constructor(id, name, address, email, companyName, bill, rating) {
        super(id, name, address, email);
        this.companyName = companyName;
        this.bill = bill;
        this.rating = rating;
    }
}