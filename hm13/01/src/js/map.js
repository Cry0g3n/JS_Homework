let Map = {
    getAddress: function (location) {
        return new Promise(function (resolve) {
            return ymaps.geocode(location).then(function (result) {
                let currentGeoObject = result.geoObjects.get(0);
                let address = currentGeoObject.properties.get('text');
                if (address) {
                    resolve(address);
                }
            })
        });
    },

    roundLocation: function (location) {
        let longitude = parseFloat(location[0].toPrecision(5)),
        latitude = parseFloat(location[1].toPrecision(5));

        return [longitude, latitude];
    }
};

module.exports = Map;