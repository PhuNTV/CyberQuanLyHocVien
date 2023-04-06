class ListPerson {
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

    sortByName() {
        this.persons.sort((a, b) => a.name.localeCompare(b.name));
    }

    filterByType(type) {
        return this.persons.filter(person => person instanceof type);
    }

    renderRow(person) {
        let row = "<tr>";
        if (person instanceof Employee) {
            row += `<td>${person.name}</td>
            <td>${person.id}</td>
            <td>${person.address}</td>
            <td>${person.email}</td>
            <td>${person.workDays}</td>
            <td>${person.salary}</td>
            <td></td>`;
        } else if (person instanceof Student) {
            row += `<td>${person.name}</td>
            <td>${person.id}</td>
            <td>${person.address}</td>
            <td>${person.email}</td>
            <td>${person.mathScore}</td>
            <td>${person.phyScore}</td>
            <td>${person.chemScore}</td>`;
        } else if (person instanceof Customer) {
            row += `<td>${person.name}</td>
            <td>${person.id}</td>
            <td>${person.address}</td>
            <td>${person.email}</td>
            <td></td>
            <td></td>
            <td>${person.companyName}</td>
            <td>${person.billValue}</td>
            <td>${person.rating}</td>`;
        }
        row += "</tr>";
        return row;
    }
}