var app = app || {};

var Router = Parse.Router.extend({
    routes: {
        '': 'restos',
        'edit':'editResto',
        'edit/:id':'editResto',
        'edit/:id/menu':'editMenu',
        'edit/:id/photo':'editPhoto',
        'edit/:id/contact':'editContact'
    }
}
)
var router = new Router();
app.resto = null; // resto en train d'être édité
router.on('route:restos', function(){
   var restaurantsView = new RestaurantsView();
   restaurantsView.render();
});
var restaurantManagementView = new RestaurantManagementView();

router.on('route:editResto', function(id){

    restaurantManagementView.render(id,'basicinfo');
    var restaurantView = new RestaurantView(id);
    restaurantView.render();

});
router.on('route:editMenu', function(id){
    restaurantManagementView.render(id,'menu');
    var menuView = new MenuView(id);
    menuView.render();

});
router.on('route:editPhoto', function(id){
    restaurantManagementView.render(id,'photo');
    var photosView = new PhotosView(id);
    photosView.render();

});
router.on('route:editContact', function(id){
    restaurantManagementView.render(id,'contact');
    var contactView = new ContactView(id);
    contactView.render();

});
Parse.history.start();