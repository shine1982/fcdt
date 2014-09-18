require('cloud/app.js');

var saveImage = require("cloud/lib/image/save-image");

Parse.Cloud.beforeSave("Photo", function(req, res) {
    return saveImage(req,res);
});

