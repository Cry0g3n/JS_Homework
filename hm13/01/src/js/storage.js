let mapStorage = sessionStorage;
mapStorage.clear();
let Map = require('./map');

let Storage = {
    addComment: function (location, commentData) {
        if (location) {
            let commentsStorage = JSON.parse(mapStorage.getItem('commentsStorage') || '{}');
            let commentsList = commentsStorage[location] || [];
            commentsList.push(commentData);
            commentsStorage[location] = commentsList;
            mapStorage.setItem('commentsStorage', JSON.stringify(commentsStorage));
        }
    },

    getComments: function (location) {
        if (location) {
            let commentsStorage = JSON.parse(mapStorage.getItem('commentsStorage') || '{}');
            return commentsStorage[location];
        }
    }
};

module.exports = Storage;