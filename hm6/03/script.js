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
        cityInput = document.querySelector('.city');

    resList = resList.map(function (item) {
        return item['name'];
    }).sort();

    cityInput.addEventListener('input', function (e) {
        let cityListElemOld = document.querySelector('.cityList'),
            cityListContainer = document.querySelector('.city_container'),
            cityListElem = document.createElement('ul'),
            searchValue = this.value;

        if (cityListElemOld) {
            cityListElemOld.remove();
        }
        if (!searchValue) {
            return;
        }
        cityListElem.className = 'cityList';
        for (let city of resList) {
            if (city.toLowerCase().includes(searchValue.toLowerCase())) {
                let cityElem = document.createElement('li');
                cityElem.textContent = city;
                cityListElem.appendChild(cityElem);
            }
        }
        cityListContainer.appendChild(cityListElem);
    });
});