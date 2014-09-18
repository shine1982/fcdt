var requireUser = require('cloud/require-user');

module.exports = function(){

    var recReasons = [ //type1: 环境 type2: 服务 type3: 菜品
        {"label":"环境高雅","type":1},
        {"label":"环境奢华","type":1},
        {"label":"环境现代","type":1},
        {"label":"环境古典","type":1},
        {"label":"环境温馨","type":1},
        {"label":"服务周到","type":2},
        {"label":"服务热情","type":2},
        {"label":"菜品精致","type":3},
        {"label":"菜量实惠","type":3},
        {"label":"配菜丰富","type":3}
    ];

    var express = require('express');
    var app = express();

    app.set('views', 'cloud/views');  // Specify the folder to find templates
    app.set('view engine', 'ejs');

    app.locals._ = require('underscore');

    app.get('/initRecReasons', requireUser, function(req, res) {
/*

        console.log("init recommand reasons");
        var RecReason = Parse.Object.extend("RecReason");
        for(var i=0; i<recReasons.length; i++){
            var recReason = new RecReason();
            recReason.set("label", recReasons[i].label);
            recReason.set("type", recReasons[i].type);
            recReason.save();
        }
        console.log("done of init recommand reasons");*/
    });
    return app;
}();