let container = document.querySelector('.container'),
    button = document.querySelector('.button'),
    minSizeValue = 50,
    maxSizeValue = 500,
    minCoordValue = 0,
    maxCoordValue = 500;

function getRandomValueByRange(minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

function getRandomColor() {
    let red = getRandomValueByRange(0, 255),
        green = getRandomValueByRange(0, 255),
        blue = getRandomValueByRange(0, 255);

    return `rgb(${red}, ${green}, ${blue})`;
}

function dragAndDrop() {
    let width = getRandomValueByRange(minSizeValue, maxSizeValue),
        height = getRandomValueByRange(minSizeValue, maxSizeValue),
        left = getRandomValueByRange(minCoordValue, maxCoordValue),
        top = getRandomValueByRange(minCoordValue, maxCoordValue),
        color = getRandomColor(),
        randomRect = document.createElement('div'),
        currentElem = false,
        startX = 0,
        startY = 0;

    randomRect.style.position = 'absolute';
    randomRect.style.width = width + 'px';
    randomRect.style.height = height + 'px';
    randomRect.style.left = left + 'px';
    randomRect.style.top = top + 'px';
    randomRect.style.backgroundColor = color;
    randomRect.className = 'rectangle';

    container.appendChild(randomRect);

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
}

button.addEventListener('click', dragAndDrop);