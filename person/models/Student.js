import Person from "../models/Person.js";
export class Student extends Person {
    constructor(id, name, address, email, mathScore, physicsScore, chemistryScore) {
        super(id, name, address, email);
        this.mathScore = mathScore;
        this.physicsScore = physicsScore;
        this.chemistryScore = chemistryScore;
    }

    calculateAverageScore() {
        return ((+this.mathScore) + (+this.physicsScore) + (+this.chemistryScore)) / 3;
    }
}