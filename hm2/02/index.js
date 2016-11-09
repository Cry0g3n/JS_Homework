function isSomeTrue(source, filterFn) {
    if (!source.length) {
        throw Error('Передан пустой массив');
    }
    var result = false;
    for (var i = 0, l = source.length; i < l; i++) {
        if (filterFn(source[i])) {
            result = true;
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
    console.log(isSomeTrue(allNumbers, isNumber)); //вернет true
    console.log(isSomeTrue(someNumbers, isNumber)); //вернет true
    console.log(isSomeTrue(noNumbers, isNumber)); //вернет false
    console.log(isSomeTrue(emptyArray, isNumber)); //выбросит исключение
}
catch (e) {
    console.log(e.message);
}