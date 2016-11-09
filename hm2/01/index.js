function isAllTrue(source, filterFn) {
    if (!source.length) {
        throw Error('Передан пустой массив');
    }
    var result = true;
    for (var i = 0, l = source.length; i < l; i++) {
        if (!filterFn(source[i])) {
            result = false;
            break;
        }
    }
    return result;
}

var allNumbers = [1, 2, 4, 5, 6, 7, 8],
    someNumbers = [1, 2, 'привет', 4, 5, 'loftschool', 6, 7, 8],
    noNumbers = ['это', 'массив', 'без', 'чисел'],
    emptyArray = [];

function isNumber(val) {
    return typeof val === 'number';
}

try {
    console.log(isAllTrue(allNumbers, isNumber)); //вернет true
    console.log(isAllTrue(someNumbers, isNumber)); //вернет false
    console.log(isAllTrue(noNumbers, isNumber)); //вернет false
    console.log(isAllTrue(emptyArray, isNumber)); //выбросит исключение
}
catch (e) {
    console.log(e.message);
}