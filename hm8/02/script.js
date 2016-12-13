let getUserFullName = function (user) {
    return [user['last_name'], user['first_name']].join(' ');
};

let getUserBirthDate = function (user) {
    let bdate = user['bdate'];
    if (!bdate) {
        return '';
    }
    let bdateArr = bdate.split('.'),
        bdateMonth = bdateArr[1];

    if (bdateMonth.length == 1) {
        bdateArr[1] = '0' + bdateMonth;
    }

    return bdateArr.join('.');
};

let getUserAge = function (user) {
    let bdate = user['bdate'];
    if (!bdate) {
        return '';
    }
    let bdateArr = bdate.split('.'),
        bdateRaw = new Date(bdateArr[2], bdateArr[1] - 1, bdateArr[0]).getTime(),
        ageDifferenceRaw = Date.now() - bdateRaw,
        ageDate = new Date(ageDifferenceRaw),
        result = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (!isNaN(result)) {
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
};

let getUserImage = function (user) {
    return user['photo_100'];
};

let getBirthDateDistance = function (user) {
    if (!user['bdate']) {
        return;
    }
    let curDate = new Date(),
        bdateArr = user['bdate'].split('.');

    if (!bdateArr[2]) {
        bdateArr[2] = curDate.getFullYear();
    }
    curDate.setHours(0);
    curDate.setMinutes(0);
    curDate.setSeconds(0);
    curDate.setMilliseconds(0);
    let birthDate = new Date(bdateArr[2], bdateArr[1] - 1, bdateArr[0]);
    birthDate.setFullYear(curDate.getFullYear());
    return birthDate.getTime() - curDate.getTime() ;
};

let sortByBirthDate = function (a, b) {
    if (a['birthDateDistance'] > b['birthDateDistance']) {
        return 1;
    }
    return - 1;
};

let template = Handlebars.compile(document.querySelector('#friend_template').innerHTML);

new Promise(function (resolve) {
    if (document.readyState === 'complete') {
        resolve();
    } else {
        window.onload = resolve;
    }
}).then(function () {
    return new Promise(function (resolve, reject) {
        VK.init({
            apiId: 5759463
        });

        VK.Auth.login(function (response) {
            if (response.session) {
                resolve(response);
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    });
}).then(function () {
    return new Promise(function (resolve, reject) {
        VK.api('friends.get', {'fields': 'bdate,photo_100'}, function (response) {
            if (response.error) {
                reject(new Error(response.error.error_msg));
            } else {
                let friendList = [];
                for (let friend of response['response']) {
                    friendList.push({
                        fullName: getUserFullName(friend),
                        birthDate: getUserBirthDate(friend),
                        age: getUserAge(friend),
                        photoUrl: getUserImage(friend),
                        birthDateDistance: getBirthDateDistance(friend)
                    });
                }

                let currentYearBirthDayList = friendList.filter(function (friend) {
                    return friend['birthDateDistance'] >= 0;
                }).sort(sortByBirthDate);

                let nextYearBirthDayList = friendList.filter(function (friend) {
                    return friend['birthDateDistance'] < 0;
                }).sort(sortByBirthDate);

                let unknownBirthDayList = friendList.filter(function (friend) {
                    return friend['birthDateDistance'] == undefined;
                });

                let sortedFriendList = [];
                sortedFriendList = sortedFriendList.concat(currentYearBirthDayList).concat(nextYearBirthDayList).concat(unknownBirthDayList);

                let friends = {friends: sortedFriendList};
                let container = document.querySelector('.container');
                container.innerHTML = template(friends);
                resolve();
            }
        });
    })
});