var app = app || {};

app.Dish = Parse.Object.extend({

    className:"Dish",

    defaults: {
        name: '',
        namecn: '',
        priceEuro: '',
        priceCentimes: '',
        order: 1,
        dishType: 1
    }

});