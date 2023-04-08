class Validation {
    static isNotEmpty(value) {
        return value.trim() !== '';
    }

    static isEmail(value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value);
    }

    static isNumber(value) {
        return /^\d+$/.test(value);
    }

    static isValidName(value) {
        return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value);
    }

    static isValidAddress(value) {
        return /^[0-9a-zA-Z\s,'-]*$/.test(value);
    }

    static isValidCompanyName(value) {
        return /^[0-9a-zA-Z\s,'-]*$/.test(value);
    }

    static isValidGrade(value) {
        return /^([0-10])$/.test(value);
    }

    static isValidBillValue(value) {
        return /^[0-9]*\.?[0-9]*$/.test(value);
    }
}

export default Validation;