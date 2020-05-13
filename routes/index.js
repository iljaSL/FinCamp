var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// Root Route

router.get("/", function(req, res) {
    res.render("landing");
})

// Register Form Route

router.get("/register", function(req, res){
    res.render("register", {page: 'register'});
 });

// Handles Register Logic

router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(error, user) {
        if (error) {
            return res.render("register", {"error": error.message});
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to FinCamp " + user.username);
            res.redirect("/campgrounds");
        })
    })
})

// Show Login Form Route

router.get("/login", function(req, res){
    res.render("login", {page: 'login'});
 });

// Handles Login Logic

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(res, req) {
})

// Logout Route

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You are logged out!");
    res.redirect("/campgrounds");
})

module.exports = router;