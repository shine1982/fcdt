var DishView = Parse.View.extend({

    //... is a list tag.
    tagName:'tr',

    // Cache the template function for a single item.
    template: _.template($('#dish-template').html()),

    events: {
        'click .destroy': 'clear',
        'dblclick .dishFrenchNameLabel':'frenchNameEdit',
        'blur .dishFrenchNameInput': 'frenchNameEdited',
        'dblclick .dishChineseNameLabel':'chineseNameEdit',
        'blur .dishChineseNameInput': 'chineseNameEdited',
        'dblclick .dishPriceEuroLabel':'dishPriceEuroEdit',
        'blur .dishPriceEuroInput': 'dishPriceEuroEdited',
        'dblclick .dishPriceCentimesLabel':'dishPriceCentimesEdit',
        'blur .dishPriceCentimesInput': 'dishPriceCentimesEdited'
    },

    addEditing:function(className){
        this.$("."+className).parent().addClass("editing");
    },

    removeEditing:function(className){
        this.$("."+className).parent().removeClass("editing");
    },
    frenchNameEdit:function(){
        this.addEditing("dishFrenchNameLabel");
    },
    frenchNameEdited:function(){
        this.removeEditing("dishFrenchNameLabel");
        this.model.save({
            name:this.$(".dishFrenchNameInput").val()
        });
    },
    chineseNameEdit:function(){
        this.addEditing("dishChineseNameLabel");
    },
    chineseNameEdited:function(){
        this.removeEditing("dishChineseNameLabel");
        this.model.save({
            namecn:this.$(".dishChineseNameInput").val()
        });
    },
    dishPriceEuroEdit:function(){
        this.addEditing("dishPriceEuroLabel");
    },
    dishPriceEuroEdited:function(){
        this.removeEditing("dishPriceEuroLabel");
        this.model.save({
            priceEuro:this.$(".dishPriceEuroInput").val()
        });
    },
    dishPriceCentimesEdit:function(){
        this.addEditing("dishPriceCentimesLabel");

    },
    dishPriceCentimesEdited:function(){
        this.removeEditing("dishPriceCentimesLabel");
        this.model.save({
            priceCentimes:this.$(".dishPriceCentimesInput").val()
        });
    },
    initialize: function() {
        _.bindAll(this,"render","frenchNameEdit","frenchNameEdited","chineseNameEdit","chineseNameEdited",
        "dishPriceEuroEdit","dishPriceEuroEdited","dishPriceCentimesEdit","dishPriceCentimesEdited");
        this.model.bind('change', this.render);
    },

    render: function() {
        this.$el.html( this.template( this.model.attributes ));
        return this;
    },

    clear: function(){
        this.model.destroy();
        this.remove();
    }
});