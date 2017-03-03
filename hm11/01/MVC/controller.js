var Controller = {
    musicRoute: function () {
        return Model.getMusic().then(function (music) {
            results.innerHTML = Balloon.render('music', {list: music});
        });
    },
    friendsRoute: function () {
        return Model.getFriends().then(function (friends) {
            results.innerHTML = Balloon.render('friends', {list: friends});
        });
    },
    newsRoute: function () {
        return Model.getNews().then(function (news) {
            results.innerHTML = Balloon.render('news', {list: news.items});
        });
    },
    groupsRoute: function () {
        return Model.getGroups().then(function (groups) {
            results.innerHTML = Balloon.render('groups', {list: groups.items});
        });
    },
    photoRoute: function() {
        return Model.getPhoto().then(function(photos) {
            results.innerHTML = Balloon.render('photos', {list: photos.items});
        });
    }
};
