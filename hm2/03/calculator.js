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

module.exports = calculator;