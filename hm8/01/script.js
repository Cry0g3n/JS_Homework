let getCities = function (url) {
    return new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest();
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
};

let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

getCities(url).then(function (res) {
    let resList = JSON.parse(res) || [],
        cityInput = document.querySelector('.city'),
        template = Handlebars.compile(document.querySelector('#city_template').innerHTML);

    let cityInputHandler = function () {
        let cityListElem = document.querySelector('.city_list'),
            searchValue = this.value;

        let filterList = resList.filter(function (city) {
            if (!searchValue || city['name'].toLowerCase().includes(searchValue.toLowerCase())) {
                return true;
            }
        }).sort(function (a, b) {
            if (a['name'] > b['name']) {
                return 1;
            }
            return -1;
        });

        if (filterList.length) {
            cityListElem.innerHTML = template({cities: filterList});
        }
        else {
            cityListElem.innerHTML = "";
        }
    };

    cityInputHandler();
    cityInput.addEventListener('input', cityInputHandler);
});