const Post = require('../models/post');
const User = require('../models/user');
const async = require('async');
const bcrypt = require('bcryptjs')
const { body,validationResult } = require('express-validator');
const { NotExtended } = require('http-errors');
const passport = require('passport');

exports.signup_get = function(req, res) {
    res.render('sign-up', { title: 'Sign Up' })
}

exports.signup_post = function(req, res, next) {

    async.parallel({
        user: function(callback) {
            User.find({ 'username': req.body.username }).exec(callback)
        },
        encrypt: function(callback){
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                callback(err, hashedPassword)
            })
        }
        }, function(err, results) {
            if (err) { return next(err); } 
            if (results.user.length == 0 && results.encrypt.length > 0){
                const user = new User({
                    username: req.body.username,
                    password: results.encrypt,
                    first_name: req.body.firstname,
                    last_name: req.body.lastname,
                    admin: false,
                    member: false
                }).save(err => {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/')
                })
            }   
    })
}

exports.login_get = function(req, res) {
    const problem = req.query.problem
    res.render('log-in', { title: 'Log In', problem: problem ? true : false })
}

exports.login_post = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?problem=true'
})

exports.logout_post = function(req, res) {
    req.logout();
    res.redirect('/')
}

exports.member_get = function(req, res) {
    res.render('member', {title: 'member page'})
}

exports.member_post = function(req, res) {
    if(req.user){
        if(req.body.memberpass === 'jacobmember'){
            User.updateOne({ _id: req.user._id }, {member: true}, function(err, res) {
                if (err) { return next(err); } 
            })
        }
    }
    res.redirect('/')
}

exports.admin_get = function(req, res) {
    res.render('admin', {title: 'admin page'})
}

exports.admin_post = function(req, res) {
    if(req.user){
        if(req.body.adminpass === 'jacobadmin'){
            User.updateOne({ _id: req.user._id }, {admin: true}, function(err, res) {
                if (err) { return next(err); } 
            })
        }
    }
    res.redirect('/')
}