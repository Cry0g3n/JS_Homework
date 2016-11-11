'use strict';

let _forEach = function (array, callback) {
    array = array || [];
    if (typeof callback === 'function') {
        for (let item of array) {
            callback(item);
        }
    }
};

let _filter = function (array, callback) {
    array = array || [];
    let items = [];
    if (typeof callback === 'function') {
        for (let item of array) {
            if (callback(item)) {
                items.push(item);
            }
        }
        return items;
    }
};

let _map = function (array, callback) {
    array = array || [];
    let items = [];
    if (typeof callback === 'function') {
        for (let item of array) {
            items.push(callback(item));
        }
        return items;
    }
};

let _slice = function (array, begin, end) {
    array = array || [];
    let result = [];

    let checkIdx = idx => {
        if (idx < 0) {
            idx = array.length + idx;
        }
        return idx;
    };

    if (!end || end > array.length) {
        end = array.length;
        end = checkIdx(end);
    }

    begin = checkIdx(begin);
    if (begin < 0) {
        begin = 0;
    }

    for (let i = begin; i < end; i++) {
        result.push(array[i]);
    }

    return result;
};

let _reduce = function (array, callback, initialValue) {
    if (!array.length && !initialValue) {
        throw Error('Reduce of empty array with no initial value');
    }
    if (!initialValue) {
        initialValue = array[0];
    }
    let result = initialValue;

    for (let i = 1, l = array.length; i < l; i++) {
        result = callback(result, array[i], i, array);
    }

    return result;
};

let _splice = function (array, start, deleteCount) {
    array = array || [];
    let insertArr = [],
        _arrayConcat = function () {
            let result = [];
            _forEach(arguments, arr => {
                for (var item of arr) {
                    result.push(item);
                }
            });
            return result;
        },
        updateArray = function (originalArray, newArray) {
            originalArray.length = newArray.length;
            for (let i = 0; i < newArray.length; i++) {
                originalArray[i] = newArray[i];
            }
        };

    if (start > array.length) {
        start = array.length;
    }
    else if (start < 0) {
        start = array.length + start;
    }

    if (!deleteCount) {
        deleteCount = array.length - start;
    }

    if (deleteCount < 0) {
        deleteCount = 0;
    }

    let leftPart = _slice(array, 0, start),
        rightPart = _slice(array, start + deleteCount),
        removed = _slice(array, start, start + deleteCount);

    if (arguments.length > 3) {
        insertArr = _slice(arguments, 3);
    }

    updateArray(array, _arrayConcat(leftPart, insertArr, rightPart));
    return removed;
};

module.exports = {
    forEach: _forEach,
    filter: _filter,
    map: _map,
    slice: _slice,
    reduce: _reduce,
    splice: _splice
};