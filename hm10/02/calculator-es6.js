class Calculator {
    constructor(firstNumber) {
        this.firstNumber = firstNumber;
    }

    sum() {
        let result = this.firstNumber;
        for (let i = 0; i < arguments.length; i++) {
            result += arguments[i];
        }
        return result;
    }

    dif() {
        let result = this.firstNumber;
        for (let i = 0; i < arguments.length; i++) {
            result -= arguments[i];
        }
        return result;
    }

    div() {
        let result = this.firstNumber;
        for (let i = 0; i < arguments.length; i++) {
            if (arguments[i] == 0)
                throw new Error('На ноль делить нельзя!');
            result /= arguments[i];
        }
        return result;
    }

    mul() {
        let result = this.firstNumber;
        for (let i = 0; i < arguments.length; i++) {
            result *= arguments[i];
        }
        return result;
    }
}

class SqrCalc extends Calculator {
    static pow2(number) {
        return Math.pow(number, 2);
    }

    sum() {
        let result = super.sum.apply(this, arguments);
        return SqrCalc.pow2(result);
    }

    dif() {
        let result = super.dif.apply(this, arguments);
        return SqrCalc.pow2(result);
    }

    div() {
        let result = super.div.apply(this, arguments);
        return SqrCalc.pow2(result);
    }

    mul() {
        let result = super.mul.apply(this, arguments);
        return SqrCalc.pow2(result);
    }
}

module.exports = {
    SqrCalc: SqrCalc
};