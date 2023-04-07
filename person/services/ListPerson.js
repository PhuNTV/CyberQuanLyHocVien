export class ListPerson {
    constructor() {
        this.persons = [];
    }

    addPerson(person) {
        this.persons.push(person);
    }

    removePerson(id) {
        this.persons = this.persons.filter(person => person.id !== id);
    }

    updatePerson(id, newData) {
        const index = this.persons.findIndex(person => person.id === id);
        if (index >= 0) {
            this.persons[index] = {...this.persons[index], ...newData };
        }
    }

    findById(id) {
        return this.list.find((person) => person.id === id);
    }

    sortByFullName(order) {
        if (order === "asc") {
            this.persons.sort((a, b) => a.fullName.localeCompare(b.fullName));
        } else if (order === "desc") {
            this.persons.sort((a, b) => b.fullName.localeCompare(a.fullName));
        }
    }

    filterByType(type) {
        return this.persons.filter(person => person instanceof type);
    }
}