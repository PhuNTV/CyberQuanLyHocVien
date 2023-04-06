class Customer extends Person {
    constructor(id, name, address, email, userType, companyName, billValue, rating) {
        super(id, name, address, email, userType);
        this.companyName = companyName;
        this.billValue = billValue;
        this.rating = rating;
    }
}