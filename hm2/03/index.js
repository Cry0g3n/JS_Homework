function calculator(firstNumber) {
    return {
        sum: function () {
            var result = firstNumber;
            for (var i = 0, l = arguments.length; i < l; i++) {
                result += arguments[i];
            }
            return result;
        },
        dif: function () {
            var result = firstNumber;
            for (var i = 0, l = arguments.length; i < l; i++) {
                result -= arguments[i];
            }
            return result;
        },
        div: function () {
            var result = firstNumber;
            for (var i = 0, l = arguments.length; i < l; i++) {
                if (arguments[i] === 0) {
                    throw Error('На ноль делить нельзя!');
                }
                result /= arguments[i];
            }
            return result;
        },
        mul: function () {
            var result = firstNumber;
            for (var i = 0, l = arguments.length; i < l; i++) {
                result *= arguments[i];
            }
            return result;
        }
    }
}

var myCalculator = calculator(100);

console.log(myCalculator.sum(1, 2, 3)); //вернет 106
console.log(myCalculator.dif(10, 20)); //вернет 70
console.log(myCalculator.div(2, 2)); //вернет 25
console.log(myCalculator.mul(2, 2)); //вернет 400