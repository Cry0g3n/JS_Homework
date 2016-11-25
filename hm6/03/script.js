let getCities = function (url) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = function () {
            if (req.status == 200) {
                resolve(req.response);
            }
            else {
                reject(req.statusText);
            }
        };
        req.send();
    });
}

let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

getCities(url).then(function (res) {
    let resList = JSON.parse(res) || [],
        cityListElem = document.querySelector('.city_list');

    resList = resList.map(function (item) {
        return item['name'];
    }).sort();

    for (let city of resList) {
        let cityElem = document.createElement('option');
        cityElem.value = city;
        cityListElem.appendChild(cityElem);
    }
});