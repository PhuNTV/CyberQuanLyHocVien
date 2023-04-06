class Student extends Person {
    constructor(id, name, address, email, userType, mathScore, physicsScore, chemistryScore) {
        super(id, name, address, email, userType);
        this.mathScore = mathScore;
        this.physicsScore = physicsScore;
        this.chemistryScore = chemistryScore;
    }

    calculateAverageScore() {
        return (this.mathScore + this.physicsScore + this.chemistryScore) / 3;
    }
}