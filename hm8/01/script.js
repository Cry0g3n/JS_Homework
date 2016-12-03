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

    cityInput.addEventListener('input', function (e) {
        let cityListElem = document.querySelector('.city_list'),
            searchValue = this.value;

        if (!searchValue) {
            cityListElem.innerHTML = "";
            return;
        }

        let filterList = resList.filter(function (city) {
            if (city['name'].toLowerCase().includes(searchValue.toLowerCase())) {
                return true;
            }
        });

        if (filterList.length) {
            cityListElem.innerHTML = template({cities: filterList});
        }
        else {
            cityListElem.innerHTML = "";
        }
    });
});