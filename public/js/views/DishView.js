var DishView = Parse.View.extend({

    //... is a list tag.
    tagName:'tr',

    // Cache the template function for a single item.
    template: _.template($('#dish-template').html()),

    events: {
        'click .destroy': 'clear',
        'click .dishFrenchNameLabel':'frenchNameEdit',
        'blur .dishFrenchNameInput': 'frenchNameEdited',
        'click .dishChineseNameLabel':'chineseNameEdit',
        'blur .dishChineseNameInput': 'chineseNameEdited',
        'click .dishPriceEuroLabel':'dishPriceEuroEdit',
        'blur .dishPriceEuroInput': 'dishPriceEuroEdited',
        'click .dishPriceCentimesLabel':'dishPriceCentimesEdit',
        'blur .dishPriceCentimesInput': 'dishPriceCentimesEdited'
    },

    addEditing:function(className){
        this.$(className).parent().addClass("editing");
        this.$(className).focus();
    },

    removeEditing:function(className){
        this.$(className).parent().removeClass("editing");
    },
    frenchNameEdit:function(){
        this.addEditing(this.dishFrenchNameInputClass);
    },
    frenchNameEdited:function(){
        this.removeEditing(this.dishFrenchNameInputClass);
        this.model.save({
            name:this.$(this.dishFrenchNameInputClass).val()
        });
    },
    chineseNameEdit:function(){
        this.addEditing(this.dishChineseNameInputClass);
    },
    chineseNameEdited:function(){
        this.removeEditing(this.dishChineseNameInputClass);
        this.model.save({
            namecn:this.$(this.dishChineseNameInputClass).val()
        });
    },
    dishPriceEuroEdit:function(){
        this.addEditing(this.dishPriceEuroInputClass);
    },
    dishPriceEuroEdited:function(){
        this.removeEditing(this.dishPriceEuroInputClass);
        this.model.save({
            priceEuro:this.$(this.dishPriceEuroInputClass).val()
        });
    },
    dishPriceCentimesEdit:function(){
        this.addEditing(this.dishPriceCentimesInputClass);

    },
    dishPriceCentimesEdited:function(){
        this.removeEditing(this.dishPriceCentimesInputClass);
        this.model.save({
            priceCentimes:this.$(this.dishPriceCentimesInputClass).val()
        });
    },
    initialize: function() {
        _.bindAll(this,"render","frenchNameEdit","frenchNameEdited","chineseNameEdit","chineseNameEdited",
        "dishPriceEuroEdit","dishPriceEuroEdited","dishPriceCentimesEdit","dishPriceCentimesEdited");
        this.model.bind('change', this.render);
        this.dishFrenchNameInputClass=".dishFrenchNameInput";
        this.dishChineseNameInputClass=".dishChineseNameInput";
        this.dishPriceEuroInputClass=".dishPriceEuroInput";
        this.dishPriceCentimesInputClass=".dishPriceCentimesInput";
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