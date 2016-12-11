let friendTemplate = document.querySelector('#friend-template').innerHTML;
let baseFriendList = [];
let customFriendList = [];
let baseFriendListContainer = document.querySelector('.filter_list--base-content');
let customFriendListContainer = document.querySelector('.filter_list--custom-content');
let baseFilterValue;
let customFilterValue;
let origin;
let dragItem;
let btnSave = document.querySelector('.save');

let getUserFullName = function (user) {
    return [user['last_name'], user['first_name']].join(' ');
};

let getUserImage = function (user) {
    return user['photo_50'];
};

let insertTemplate = function (template, data, elem) {
    let templateFn = Handlebars.compile(template);
    elem.innerHTML = templateFn({storage: data});
};

let refreshData = function (srcList, dstList, userId) {
    userId = parseInt(userId);
    for (let i = 0; i < srcList.length; i++) {
        if (srcList[i].userId === userId) {
            let item = srcList.splice(i, 1)[0];
            dstList.push(item);
            break;
        }
    }
};

let filterFriendList = function (friendsList, filterValue) {
    if (filterValue) {
        return friendsList.filter(function (item) {
            return item.fullName.toLowerCase().includes(filterValue.toLowerCase());
        });
    }
    return friendsList;
};

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragLeave(e) {
    e.preventDefault();
}

function handleDrop(e) {
    if (e.currentTarget === dragItem) {
        let id = e.dataTransfer.getData('text');
        if (e.currentTarget.dataset.kind === 'custom-content') {
            refreshData(baseFriendList, customFriendList, id);
        }
        else {
            refreshData(customFriendList, baseFriendList, id);
        }
        insertTemplate(friendTemplate, {friends: filterFriendList(baseFriendList, baseFilterValue)}, baseFriendListContainer);
        insertTemplate(friendTemplate, {
            friends: filterFriendList(customFriendList, customFilterValue),
            isSelected: true
        }, customFriendListContainer);
    }
    e.stopPropagation();
}

document.addEventListener('dragstart', function (e) {
    if (e.target.classList.contains('friend')) {
        origin = e.target.parentNode;
        dragItem = origin.dataset.kind === 'base-content' ? customFriendListContainer : baseFriendListContainer;

        e.target.style.visibility = 'hidden';
        e.dataTransfer.effectAllowed = 'move';

        e.dataTransfer.setData('text', e.target.getAttribute('data-id'));
    }
});

document.addEventListener('input', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('search--base')) {
        baseFilterValue = e.target.value;
        insertTemplate(friendTemplate, {friends: filterFriendList(baseFriendList, baseFilterValue)}, baseFriendListContainer);
    }
    else if (e.target.classList.contains('search--custom')) {
        customFilterValue = e.target.value;
        insertTemplate(friendTemplate, {
            friends: filterFriendList(customFriendList, customFilterValue),
            isSelected: true
        }, customFriendListContainer);
    }
});

document.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('add')) {
        let id = e.target.closest('.friend').dataset.id;
        refreshData(baseFriendList, customFriendList, id);
    }
    if (e.target.classList.contains('remove')) {
        let id = e.target.closest('.friend').dataset.id;
        refreshData(customFriendList, baseFriendList, id);
    }
    insertTemplate(friendTemplate, {friends: filterFriendList(baseFriendList, baseFilterValue)}, baseFriendListContainer);
    insertTemplate(friendTemplate, {
        friends: filterFriendList(customFriendList, customFilterValue),
        isSelected: true
    }, customFriendListContainer);
});

customFriendListContainer.addEventListener('dragover', handleDragOver);
baseFriendListContainer.addEventListener('dragover', handleDragOver);

customFriendListContainer.addEventListener('dragleave', handleDragLeave);
baseFriendListContainer.addEventListener('dragleave', handleDragLeave);

customFriendListContainer.addEventListener('drop', handleDrop);
baseFriendListContainer.addEventListener('drop', handleDrop);

document.addEventListener('dragend', function (e) {
    e.target.style.visibility = '';
    customFriendListContainer.style.outlineColor = 'transparent';
    baseFriendListContainer.style.outlineColor = 'transparent';
});

btnSave.addEventListener('click', function (e) {
    e.preventDefault();
    sessionStorage.setItem('baseFriendList', JSON.stringify(baseFriendList));
    sessionStorage.setItem('customFriendList', JSON.stringify(customFriendList));
    alert('Сохранено!');
});

if (!sessionStorage.getItem('baseFriendList') && !sessionStorage.getItem('customFriendList')) {
    new Promise(function (resolve) {
        if (document.readyState === 'complete') {
            resolve();
        } else {
            window.onload = resolve;
        }
    }).then(function () {
        return new Promise(function (resolve, reject) {
            VK.init({
                apiId: 5759463
            });

            VK.Auth.login(function (response) {
                if (response.session) {
                    resolve(response);
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, 2);
        });
    }).then(function () {
        return new Promise(function (resolve, reject) {
            VK.api('friends.get', {'fields': 'photo_50'}, function (response) {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    let friendList = [];
                    for (let friend of response['response']) {
                        friendList.push({
                            userId: friend['user_id'],
                            fullName: getUserFullName(friend),
                            photoUrl: getUserImage(friend),
                        });
                    }
                    baseFriendList = friendList;
                    insertTemplate(friendTemplate, {friends: friendList}, baseFriendListContainer);
                    resolve();
                }
            });
        })
    });
}
else {
    baseFriendList = JSON.parse(sessionStorage.getItem('baseFriendList'));
    customFriendList = JSON.parse(sessionStorage.getItem('customFriendList'));
    insertTemplate(friendTemplate, {friends: baseFriendList}, baseFriendListContainer);
    insertTemplate(friendTemplate, {
        friends: customFriendList,
        isSelected: true
    }, customFriendListContainer);
}