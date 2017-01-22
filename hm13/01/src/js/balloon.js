let Balloon = {
    getTemplateHTML: function (template, data) {
        let templateFn = Handlebars.compile(template);
        return templateFn({storage: data});
    },

    prepareCommentData: function () {
        let name = document.querySelector('.add_comment--name').value,
            place = document.querySelector('.add_comment--place').value,
            description = document.querySelector('.add_comment--description').value,
            date = new Date();

        return {
            name: name,
            place: place,
            description: description,
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString()
        }
    },

    clearCommentData: function () {
        document.querySelector('.add_comment--name').value = '';
        document.querySelector('.add_comment--place').value = '';
        document.querySelector('.add_comment--description').value = '';
    },

    openBalloon: function (map, location, data) {
        let balloonTemplate = ymaps.templateLayoutFactory.createClass(
            Handlebars.compile(document.querySelector('#form').innerHTML)({
                address: data.address,
                comments: data.comments
            }), {
                build: function () {
                    this.constructor.superclass.build.call(this);
                    this.element = document.querySelector('.balloon');
                }
            }
        );
        map.balloon.open(location,
            {}, {
                closeButton: false,
                minHeight: '530px',
                minWidth: '380px',
                layout: balloonTemplate,
                balloonPane: 'outerBalloon'
            });
    },

    checkCommentForm: function () {
        let errorMsg = 'Необходимо заполнить следующие поля: ',
            checkResult = true;

        let name = document.querySelector('.add_comment--name').value,
            place = document.querySelector('.add_comment--place').value,
            description = document.querySelector('.add_comment--description').value;


        if (!name) {
            errorMsg += '\n' + 'Имя';
            checkResult = false;
        }
        if (!place) {
            errorMsg += '\n' + 'Место';
            checkResult = false;
        }
        if (!description) {
            errorMsg += '\n' + 'Впечатления';
            checkResult = false;
        }
        if (!checkResult) {
            alert(errorMsg);
        }
        return checkResult;
    }
};

module.exports = Balloon;