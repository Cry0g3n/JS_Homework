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
    if (confirm('Удалить cookie с именем ' + cookieName + '?')) {
        let curDate = new Date();
        curDate.setTime(0);
        document.cookie = cookieName + "=" + "; expires=" + curDate.toUTCString();
    }
};

let fillCookieTable = function (cookieList) {
    let createCell = function (content) {
        let td = document.createElement('td');
        td.textContent = content;
        return td;
    };

    let createDeleteButton = function () {
        let button = document.createElement('button');
        button.textContent = 'Удалить';
        button.className = 'delete';
        return button;
    };

    let table = document.querySelector('.cookies');
    cookieList = cookieList || [];
    let tbodyOld = document.querySelector('tbody');
    if (tbodyOld) {
        tbodyOld.remove();
    }
    let tbody = document.createElement('tbody');
    for (let cookie of cookieList) {
        let tr = document.createElement('tr');
        tr.appendChild(createCell(cookie['name']));
        tr.appendChild(createCell(cookie['value']));
        let tdButton = createCell('');
        tdButton.appendChild(createDeleteButton());
        tr.appendChild(tdButton);
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
};

let updateCookieTable = function () {
    let cookieList = getCookieList();
    fillCookieTable(cookieList);
};

updateCookieTable();

document.addEventListener('click', function (e) {
    if (e.target.tagName == 'BUTTON') {
        let button = e.target,
            parent = button.closest('tr'),
            children = parent.children,
            cookieNameElem = children[0],
            cookieName = cookieNameElem.textContent;

        deleteCookie(cookieName);
        updateCookieTable()
    }
});