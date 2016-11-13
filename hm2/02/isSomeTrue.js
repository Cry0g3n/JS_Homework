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

module.exports = isSomeTrue;