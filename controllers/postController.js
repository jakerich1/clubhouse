const Post = require('../models/post');
const User = require('../models/user');
const { body,validationResult } = require('express-validator');
const { render } = require('../app');

exports.post_homepage = function(req, res) {

    Post.find()
    .sort([['timestamp', 'descending']])
    .populate('user', {username: 1})
    .exec(function (err, list_posts) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('index', { title: 'Clubhouse home', posts: list_posts});
    });

}

exports.post_delete_post = function(req, res) {
    if(req.user.admin){

        Post.findByIdAndRemove(req.params.id, function deletePost(err) {
            if (err) { return next(err); }
            // Success - go to author list
            res.redirect('/')
        })

    }else{
        res.redirect('/')
    }
};

exports.post_create_get = function(req, res) {
    res.render('create', {title: 'create new post'})
};

exports.post_create_post = [

    // Validate post
    body('content').trim().isLength({ min: 1 }).escape().withMessage('Post must contain at least one character.'),
    
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('create', { title: 'create post', errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            var post = new Post(
                {
                    content: req.body.content,
                    user: req.user._id,
                    timestamp: new Date()
                }
            );
            post.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect('/');
            });
        }
        
    }

]