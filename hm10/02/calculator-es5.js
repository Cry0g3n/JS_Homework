function inherit(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
    child.prototype.parent = parent;
}

var Calculator = function (firstNumber) {
    this.firstNumber = firstNumber;
};

Calculator.prototype.sum = function () {
    var result = this.firstNumber;
    for (var i = 0; i < arguments.length; i++) {
        result += arguments[i];
    }
    return result;
};

Calculator.prototype.dif = function () {
    var result = this.firstNumber;
    for (var i = 0; i < arguments.length; i++) {
        result -= arguments[i];
    }
    return result;
};

Calculator.prototype.div = function () {
    var result = this.firstNumber;
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] == 0)
            throw new Error('На ноль делить нельзя!');
        result /= arguments[i];
    }
    return result;
};

Calculator.prototype.mul = function () {
    var result = this.firstNumber;
    for (var i = 0; i < arguments.length; i++) {
        result *= arguments[i];
    }
    return result;
};

var SqrCalc = function (firstNumber) {
    Calculator.call(this, firstNumber);
};

inherit(SqrCalc, Calculator);

SqrCalc.prototype.pow2 = function (number) {
    return Math.pow(number, 2);
};

SqrCalc.prototype.sum = function () {
    var result = Calculator.prototype.sum.apply(this, arguments);
    return SqrCalc.prototype.pow2(result);
};

SqrCalc.prototype.dif = function () {
    var result = Calculator.prototype.dif.apply(this, arguments);
    return SqrCalc.prototype.pow2(result);
};

SqrCalc.prototype.div = function () {
    var result = Calculator.prototype.div.apply(this, arguments);
    return SqrCalc.prototype.pow2(result);
};

SqrCalc.prototype.mul = function () {
    var result = Calculator.prototype.mul.apply(this, arguments);
    return SqrCalc.prototype.pow2(result);
};

module.exports = {
    Calculator: Calculator,
    SqrCalc: SqrCalc
};