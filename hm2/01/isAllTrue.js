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

module.exports = isAllTrue;