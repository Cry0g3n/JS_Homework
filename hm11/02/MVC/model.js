let timer = function (interval) {
    return new Promise(function (resolve) {
        setTimeout(resolve, interval);
    });
};

function waterfall(list) {
    return list.reduce(function (prev, current) {
        return prev.then(current);
    }, Promise.resolve());
}

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
        let photoList = [];
        let commentList = [];
        let photoCount = 0;
        let commentCount = 0;
        let photoPromises = [];
        let commentPromises = [];
        let vkReqPhotoCount = 200;
        let vkReqCommentCount = 100;
        let vkReqInterval = 350;

        let getPhotoRange = function (offset, count) {
            return Model.callApi('photos.getAll', {
                count: count,
                offset: offset,
                extended: 1,
                v: 5.60
            });
        };

        let getCommentRange = function (offset, count) {
            return Model.callApi('photos.getAllComments', {
                count: count,
                offset: offset,
                extended: 1,
                v: 5.60
            });
        };

        return getPhotoRange(0, vkReqPhotoCount).then(function (result) {
            photoCount = result.count;
            photoList = photoList.concat(result.items);
            for (let i = 1; vkReqPhotoCount * i < photoCount; i++) {
                photoPromises.push(function (result) {
                    if (result && result.items) {
                        photoList = photoList.concat(result.items);
                    }
                    return timer(vkReqInterval).then(function () {
                        return getPhotoRange(i * vkReqPhotoCount, vkReqPhotoCount);
                    });
                });
            }

            return waterfall(photoPromises).then(function (result) {
                if (result && result.items) {
                    photoList = photoList.concat(result.items);
                    photoList = photoList.slice(0, photoCount);
                }
                return timer(0).then(function () {
                    return getCommentRange(0, vkReqCommentCount).then(function (result) {
                        commentCount = result.count;
                        commentList = commentList.concat(result.items);
                        for (let i = 1; vkReqCommentCount * i < commentCount; i++) {
                            commentPromises.push(function (result) {
                                if (result && result.items) {
                                    commentList = commentList.concat(result.items);
                                }
                                return timer(vkReqInterval).then(function () {
                                    return getCommentRange(i * vkReqCommentCount, vkReqCommentCount);
                                });
                            });
                        }

                        return waterfall(commentPromises).then(function () {
                            if (result && result.items) {
                                commentList = commentList.concat(result.items);
                                commentList = commentList.slice(0, commentCount);
                            }
                            return new Promise(function (resolve) {
                                for (let photo of photoList) {
                                    let photoId = photo['id'];
                                    photo.comments = photo.comments || {};
                                    photo.comments.count = photo.comments.count || 0;
                                    for (let comment of commentList) {
                                        let commentPhotoId = comment['pid'];
                                        if (photoId == commentPhotoId) {
                                            photo.comments.count++;
                                        }
                                    }
                                }
                                resolve(photoList);
                            });
                        });
                    });
                });
            });
        });
    }
};
