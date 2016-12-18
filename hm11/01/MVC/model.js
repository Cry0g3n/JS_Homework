var Model = {
    login: function (appId, perms) {
        return new Promise(function (resolve, reject) {
            VK.init({
                apiId: appId
            });

            VK.Auth.login(function (response) {
                if (response.session) {
                    resolve(response);
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, perms);
        });
    },
    callApi: function (method, params) {
        return new Promise(function (resolve, reject) {
            VK.api(method, params, function (response) {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    resolve(response.response);
                }
            });
        });
    },
    getUser: function () {
        return this.callApi('users.get', {});
    },
    getMusic: function () {
        return this.callApi('audio.get', {});
    },
    getFriends: function () {
        return this.callApi('friends.get', {fields: 'photo_100'});
    },
    getNews: function () {
        return this.callApi('newsfeed.get', {filters: 'post', count: 20});
    },
    getGroups: function () {
        return this.callApi('groups.get', {extended: 1, v: 5.60});
    },
    getPhoto: function () {
        return this.callApi('photos.getAll', {extended: 1, v: 5.60}).then(function (photos) {
            return Model.getPhotoComments().then(function (comments) {
                return new Promise(function (resolve) {
                    for (let photo of photos.items) {
                        let photoId = photo['id'];
                        photo.comments = photo.comments || {};
                        photo.comments.count = photo.comments.count || 0;
                        for (let comment of comments.items) {
                            let commentPhotoId = comment['pid'];
                            if (photoId == commentPhotoId) {
                                photo.comments.count++;
                            }
                        }
                    }
                    resolve(photos);
                });
            })
        });
    },
    getPhotoComments: function () {
        return this.callApi('photos.getAllComments', {extended: 1, v: 5.60});
    }
};
