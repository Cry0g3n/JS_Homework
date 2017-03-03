let Storage = require('./storage'),
    Map = require('./map'),
    Balloon = require('./balloon');

let mapInitParams = {
    center: [57.623, 39.887],
    zoom: 15,
    controls: ['geolocationControl', 'zoomControl']
};

let myMap;
let currentLocation;
let currentCoordinates;
let clusterer;
ymaps.ready(function () {
    myMap = new ymaps.Map("map", mapInitParams);
    myMap.behaviors.disable('scrollZoom');
    myMap.container.enterFullscreen();

    myMap.events.add('click', function (e) {
        e.preventDefault();

        currentCoordinates = e.get('coords');
        // myMap.setCenter(currentCoordinates);
        currentLocation = '';
        Map.getAddress(currentCoordinates).then(function (address) {
            currentLocation = address;
            let currentComments = Storage.getComments(address);
            Balloon.openBalloon(myMap, currentCoordinates, {
                address: address,
                comments: currentComments
            });
        });
    });

    myMap.geoObjects.events.add('click', function (e) {
        e.preventDefault();
        let isCluster = e.get('target').options._name == 'cluster';
        if (!isCluster) {
            currentCoordinates = e.get('target').geometry.getCoordinates();
            currentLocation = '';
            Map.getAddress(currentCoordinates).then(function (address) {
                currentLocation = address;
                let currentComments = Storage.getComments(address);
                Balloon.openBalloon(myMap, currentCoordinates, {
                    address: address,
                    comments: currentComments
                });
            });
        }
    });

    // Создаем собственный макет с информацией о выбранном геообъекте.
    let customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
        '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
        '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
        '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
    );

    clusterer = new ymaps.Clusterer({
        /**
         * Через кластеризатор можно указать только стили кластеров,
         * стили для меток нужно назначать каждой метке отдельно.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
         */
        preset: 'islands#invertedVioletClusterIcons',
        /**
         * Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.
         */
        groupByCoordinates: false,
        /**
         * Опции кластеров указываем в кластеризаторе с префиксом "cluster".
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
         */
        clusterDisableClickZoom: true,
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false,

        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        // Устанавливаем стандартный макет балуна кластера "Карусель".
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        // Устанавливаем собственный макет.
        clusterBalloonItemContentLayout: customItemContentLayout,
        // Устанавливаем режим открытия балуна.
        // В данном примере балун никогда не будет открываться в режиме панели.
        clusterBalloonPanelMaxMapArea: 0,
        // Устанавливаем размеры макета контента балуна (в пикселях).
        clusterBalloonContentLayoutWidth: 300,
        clusterBalloonContentLayoutHeight: 200,
        // Устанавливаем максимальное количество элементов в нижней панели на одной странице
        clusterBalloonPagerSize: 5
    })
});

document.addEventListener('click', function (e) {
    e.preventDefault();
    let target = e.target;
    if (target.classList.contains('buttons_panel--add')) {
        if (Balloon.checkCommentForm()) {
            let commentData = Balloon.prepareCommentData();

            // if (!Storage.getComments(currentLocation)) {
                let myGeoObject = new ymaps.GeoObject({
                    geometry: {
                        type: "Point",
                        coordinates: currentCoordinates
                    },

                    properties: {
                        balloonContentHeader: commentData.place,
                        balloonContentBody: `  <p><a href=# class="clusterAddress" >${currentLocation}</a></p><p>${commentData.description}</p>`,
                        balloonContentFooter: commentData.date + ' ' + commentData.time
                    }
                }, {
                    iconColor: '#735184'
                });

                // myMap.geoObjects.add(myGeoObject);
                clusterer.add(myGeoObject);
                myMap.geoObjects.add(clusterer);
            // }

            Storage.addComment(currentLocation, commentData);
            Balloon.clearCommentData();

            myMap.balloon.close();
        }
    }

    if (target.classList.contains('balloon_close')) {
        myMap.balloon.close();
    }

    if (target.classList.contains('clusterAddress')) {
        let address = target.text;
        let currentComments = Storage.getComments(address);
        Balloon.openBalloon(myMap, currentCoordinates, {
            address: address,
            comments: currentComments
        });
    }
});

