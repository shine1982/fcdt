// Provides endpoints for user signup and login

module.exports = function(){
  var express = require('express');
  var app = express();

  app.set('views', 'cloud/views');  // Specify the folder to find templates
  app.set('view engine', 'ejs');    // Set the template engine


    // Renders the signup page
/*
  app.get('/signup', function(req, res) {
    res.render('user/signup');
  });

  // Signs up a new user

  app.post('/signup', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    var user = new Parse.User();
    user.set('username', username);
    user.set('password', password);
    
    user.signUp().then(function(user) {
      res.redirect('/');
    }, function(error) {
      // Show the error message and let the user try again
      res.render('user/signup', { flash: error.message });
    });
  });
*/
  // Render the login page
  app.get('/login', function(req, res) {
    res.render('user/login');
  });

  // Logs in the user
  app.post('/login', function(req, res) {
    Parse.User.logIn(req.body.username, req.body.password).then(function(user) {
      res.redirect('/');
    }, function(error) {
      // Show the error message and let the user try again
      res.render('user/login', { flash: error.message });
    });
  });

  // Logs out the user
  app.post('/logout', function(req, res) {
    Parse.User.logOut();
    res.redirect('/');
  });

  return app;
}();


