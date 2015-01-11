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
            resto.save().then(
                function(resto){
                    //maintenant on cherche les métros au tour de ce point

                    var query = new Parse.Query("RatpStation");
                    query.withinKilometers("location", point, 0.3);
                    return query.find();
                }
            ).then(function(ratpStations){
                    if(ratpStations.length==0){
                        var query = new Parse.Query("RatpStation");
                        query.withinKilometers("location", point, 0.5);//another try with 500m
                        query.find().then(function(ratpStations){
                            resto.set("metro", ratpStations);
                            return resto.save();
                        })
                    }else{
                        resto.set("metro", ratpStations);
                        return resto.save();
                    }
                });
        },
        error: function(httpResponse) {
            console.error('Request failed with response code ' + httpResponse.status);
        }
    });

})
