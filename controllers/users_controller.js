const User = require('../models/user');



module.exports.profile = function(req,res){
    res.render('user_profile',{
        title: "User Profile"
    });
}
 module.exports.signUp = function(req,res){
    res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    })
 }

 module.exports.signIn = function(req,res){
    res.render('user_sign_in',{
        title: "Codeial | Sign In"
 })
 }

 // get the sign_up Data
//this was not running due to mongoose version

 /* 
 module.exports.create = function(req,res){
     if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
     }

     User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err,user){
                        if(err){console.log('error in creating user in signing up'); return}

                        return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
     })
 } */

// CODE FOR NEWER MONGOOSE VERSION

     module.exports.create = async function(req, res) {
    try {
        if (req.body.password !== req.body.confirm_password) {
            return res.redirect('/users/sign-up');
        }

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('/users/sign-u');
        }

    } catch (err) {
        console.log('Error in user sign-up:', err);
        return res.redirect('/users/sign-u');
    }
};

// sign in and create the session foe user

 module.exports.createSession = function(req,res){
//to do later
 }
