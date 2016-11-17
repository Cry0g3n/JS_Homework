let _onClick = function (event) {
    let elem = event.target,
        items = document.querySelectorAll('.accordion__item'),
        parent = elem.closest('.accordion__item'),
        isSameNode = false;

    if (!parent) {
        return;
    }

    if (parent.classList.contains('accordion__item_open')) {
        isSameNode = true;
    }

    for (let item of items) {
        item.classList.remove('accordion__item_open');
    }

    if (!isSameNode) {
        parent.classList.toggle('accordion__item_open');
    }

};

let accordion = document.querySelector('.accordion');
accordion.addEventListener('click', _onClick, true);