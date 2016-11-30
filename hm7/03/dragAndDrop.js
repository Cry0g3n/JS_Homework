let container = document.querySelector('.container'),
    button = document.querySelector('.button'),
    saveBtn = document.querySelector('.save'),
    rectList = [],
    minSizeValue = 50,
    maxSizeValue = 500,
    minCoordValue = 0,
    maxCoordValue = 500;

let getRandomValueByRange = function (minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

let getRandomColor = function () {
    let red = getRandomValueByRange(0, 255),
        green = getRandomValueByRange(0, 255),
        blue = getRandomValueByRange(0, 255);

    return `rgb(${red}, ${green}, ${blue})`;
};

let addListeners = function (randomRect) {
    let currentElem = false,
        startX = 0,
        startY = 0;

    randomRect.addEventListener('mousedown', function (e) {
        let children = document.querySelectorAll('.rectangle');
        for (let item of children) {
            item.style.zIndex = 1;
        }
        e.target.style.zIndex = 1000;
        currentElem = e.target;
        startY = e.layerY;
        startX = e.layerX;
    });

    randomRect.addEventListener('mouseup', function () {
        currentElem = undefined;
    });

    randomRect.addEventListener('mousemove', function (e) {
        if (currentElem) {
            randomRect.style.top = e.clientY - startY + 'px';
            randomRect.style.left = e.clientX - startX + 'px';
        }
    });
};

let dragAndDrop = function () {
    let width = getRandomValueByRange(minSizeValue, maxSizeValue),
        height = getRandomValueByRange(minSizeValue, maxSizeValue),
        left = getRandomValueByRange(minCoordValue, maxCoordValue),
        top = getRandomValueByRange(minCoordValue, maxCoordValue),
        color = getRandomColor(),
        randomRect = document.createElement('div');

    randomRect.style.position = 'absolute';
    randomRect.style.width = width + 'px';
    randomRect.style.height = height + 'px';
    randomRect.style.left = left + 'px';
    randomRect.style.top = top + 'px';
    randomRect.style.backgroundColor = color;
    randomRect.className = 'rectangle';

    container.appendChild(randomRect);
    rectList.push(randomRect);

    addListeners(randomRect);
};

let addCookie = function (cookie) {
    let date = new Date();
    date.setTime(date.getTime() + cookie.expiredDate * 86400000);
    document.cookie = `${cookie['name']}=${cookie['value']}; expires=${date.toUTCString()}`;
};

let getCookieList = function () {
    if (!document.cookie) {
        return;
    }
    let cookies = document.cookie.split(';'),
        cookieList = [];

    for (let i = 0; i < cookies.length; i++) {
        let cookieArr = cookies[i].split('=');
        let cookie = {
            name: cookieArr[0],
            value: cookieArr[1]
        };
        cookieList.push(cookie);
    }

    return cookieList;
};

let deleteCookie = function (cookieName) {
    let curDate = new Date();
    curDate.setTime(0);
    document.cookie = cookieName + "=" + "; expires=" + curDate.toUTCString();
};

let cookieList = getCookieList();
for (let cookie of cookieList) {
    if (cookie['name'] == 'rectangles') {
        let value = cookie['value'];
        let styles = value.replace(/-X-/gim, ';').split('-Y-');

        for (let style of styles) {
            if (style) {
                let randomRect = document.createElement('div');
                randomRect.style.cssText = style;
                randomRect.className = 'rectangle';
                rectList.push(randomRect);
                container.appendChild(randomRect);
                addListeners(randomRect);
            }
        }

        break;
    }
}

let saveRectPosition = function () {
    deleteCookie('rectangles');
    let cookieValue = '';
    for (let rectangle of rectList) {
        cookieValue += rectangle.style.cssText + '-Y-';
    }
    addCookie({
        name: 'rectangles',
        value: cookieValue.replace(/;/gim, '-X-'),
        expiredDate: 1
    });
};

button.addEventListener('click', dragAndDrop);
saveBtn.addEventListener('click', saveRectPosition);