let timer = function (interval) {
    return new Promise(function (resolve) {
        setTimeout(resolve, interval);
    });
};

module.exports = timer;