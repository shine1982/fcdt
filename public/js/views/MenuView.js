Parse.Events.listenTo = Parse.Events.on;
var MenuView = Parse.View.extend({

    //... is a list tag.
    el:'#restoManagement',

    // Cache the template function for a single item.
    template: _.template($('#menu-template').html()),

    events: {
        'click .addDish': 'saveDish'
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function(id) {
       var that = this;
        that.idResto = id;
       if(id){
           if(app.resto && app.resto.id === id){
               this.initMenu();
           }else{
               var query = new Parse.Query(app.Restaurant);
               query.get(id, {
                   success: function(resto) {
                       app.resto = resto;
                       that.initMenu();
                   },
                   error: function(object, error) {
                       showMsg(3,"Error pour récuperer le resto avec id "+that.idResto +" ("+error+")");
                   }
               });
           }
       }



    },

    initMenu:function(){
      app.resto.menu = new app.Menu();
      app.resto.menu.on('add', this.addOne);


        var queryDishes = new Parse.Query(app.Dish);
        queryDishes.equalTo("resto", app.resto);
        queryDishes.find({
            success: function(results){
                app.resto.menu.add(results);
            }
        });
    },
    addOne:function(dish){
        var dishView = new DishView({model:dish})
        var idSelector = "#starter";
        if(dish.get("dishType")==2){
            idSelector = "#maincourse";
        }else if(dish.get("dishType")==3){
            idSelector = "#dessert";
        }
        $(idSelector + " tr:last-child").before(dishView.render().el);
    },

    saveDish:function(e){
        var dishType = e.target.value;
        var dishName = $("#dishName"+dishType).val();
        var dishNameCn = $("#dishNameCn"+dishType).val();
        var dishPriceEuro = $("#dishPriceEuro"+dishType).val();
        var dishPriceCentimes = $("#dishPriceCentimes"+dishType).val();
        this.saveDishToParse(dishName,dishNameCn,dishPriceEuro,dishPriceCentimes,dishType);
        $("#dishName"+dishType).val('');
        $("#dishNameCn"+dishType).val('');
        $("#dishPriceEuro"+dishType).val('');
    },

    saveDishToParse: function(name, nameCN, priceEuro, priceCentimes, dishType){//Type 1 entree, type 2 plat, type 3 dessert
        var dish = new app.Dish();
        dish.set("resto",app.resto);
        dish.set("name",name);
        dish.set("namecn",nameCN);
        dish.set("priceEuro",priceEuro);
        dish.set("priceCentimes",priceCentimes);
        dish.set("dishType",dishType);
        dish.set("order", app.resto.menu.nextOrder(dishType));
        dish.save().then(
           function(dish){
               app.resto.menu.add(dish);
            },
            function(dish,error){
                showMsg(3,error);
            }
        )
    },

    render: function() {
        this.$el.html( this.template());
        return this;
    }
});