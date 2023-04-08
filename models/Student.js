import Person from "./Person.js";
export default class Student extends Person {
  constructor(id, name, address, email, math, physics, chemistry) {
    super(id, name, address, email);
    this.math = math;
    this.physics = physics;
    this.chemistry = chemistry;
    this.average = 0;
    this.calculateAverage = () => {
      this.average = (this.math + this.physics + this.chemistry) / 3;
    }
  }

}
