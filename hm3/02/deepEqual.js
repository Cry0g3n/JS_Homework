let deepEqual = function (obj1, obj2) {
    obj1 = obj1 || {};
    obj2 = obj2 || {};

    let compareArrays = function (arr1, arr2) {
        if (!arr1 || !arr2 || arr1.length !== arr2.length) {
            return false;
        }
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
                if (!compareArrays(arr1[i], arr2[i])) {
                    return false;
                }
            }
            else if (!deepEqual(arr1[i], arr2[i])) {
                return false;
            }
        }
        return true;
    };

    if (obj1 === obj2) {
        return true;
    }
    else if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }
    else {
        for (let prop in obj1) {
            if (obj2.hasOwnProperty(prop)) {
                let propType = typeof obj1[prop];
                switch (propType) {
                    case 'object':
                        let propValue1 = obj1[prop],
                            propValue2 = obj2[prop];

                        if (propValue1 instanceof Date && propValue2 instanceof Date && !(propValue1.valueOf() === propValue2.valueOf())) {
                            return false;
                        }
                        else if (Array.isArray(propValue1) && Array.isArray(propValue2) && !compareArrays(propValue1, propValue2)) {
                            return false;
                        }
                        else if (!deepEqual(propValue1, propValue2)) {
                            return false;
                        }
                        break;
                    default:
                        if (obj1[prop] !== obj2[prop]) {
                            return false;
                        }
                        break;
                }
            }
        }
    }
    return true;
};

module.exports = deepEqual;