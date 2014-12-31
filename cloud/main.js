require('cloud/app.js');

var saveImage = require("cloud/lib/image/save-image");

Parse.Cloud.beforeSave("Photo", function(req, res) {
    return saveImage(req,res);
});

Parse.Cloud.afterSave("Restaurant",function(req){
    var resto = req.object;
    var address = resto.get("address");
    var city = resto.get("city");
    var postalCode = resto.get("postalCode");
    var queryString = address+", "+postalCode+", "+city+", FR";

    Parse.Cloud.httpRequest({
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        params: {
            address : queryString,
            key : 'AIzaSyA9odZ-917yCv0JZWxpNa8TYBRk7HDgg_w'
        },
        success: function(httpResponse) {
            var geoLocation = httpResponse.data.results[0].geometry.location;
            var point = new Parse.GeoPoint({latitude: geoLocation.lat, longitude: geoLocation.lng});
            resto.set("location",point);
            resto.save();
            console.log("saved location");
        },
        error: function(httpResponse) {
            console.error('Request failed with response code ' + httpResponse.status);
        }
    });

})
