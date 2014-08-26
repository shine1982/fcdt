var app = app || {};

app.Menu = Parse.Object.extend({
    className:"Menu",

    initialize: function (attrs, options) {
        this.sound = "Rawr"
    }
});