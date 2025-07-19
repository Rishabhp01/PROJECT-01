const User = require('../models/user');


//module.exports.profile = function(req,res){
 //   res.render('user_profile',{
  //      title: 'User Profile'
 //   });
    
//}
/*module.exports.profile = function(req,res){
   if(req.cookies.user_id){
    User.findById(req.cookies.user_id, function(err, user){
        if(user){
             return res.render('user_profile',{
                title:"User Profile",
                user: user
             })
        }
         return res.redirect('/users/sign-in');
        
    });

   }else{
    return res.redirect('/users/sign-in');
   }
    };*/


  //FOR PROFILE PAGE **




module.exports.profile = async function(req, res) {
    try {
        if (req.cookies.user_id) {
            const user = await User.findById(req.cookies.user_id);
            
            if (user) {
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                });
            } else {
                return res.redirect('/users/sign-in');
            }
        } else {
            return res.redirect('/users/sign-in');
        }
    } catch (err) {
        console.error('Error in fetching user for profile:', err);
        return res.status(500).send('Internal Server Error');
    }
};

  

 module.exports.signUp = function(req,res){
    res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
 }

 module.exports.signIn = function(req,res){
    res.render('user_sign_in',{
        title: "Codeial | Sign In"
 })
 }

 // get the sign_up Data

 /*module.exports.create = function(req,res){
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
     });
 }

// sign in and create the session for user

 /*module.exports.createSession = function(req,res){
    
    //steps to authenticate
    //find the user
      
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing ip'); return}
    
         
     // handle user found

        if(user){

             // handle password which dont match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
             //handle session creation 
            res.cookie('user_id', user.id);
            return res.redirect('/user/profile');

        }else{
             // handle user not found

             return res.redirect('back');
        }
       

         
 });
}*/

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
            return res.redirect('/users/sign-up');
        }

    } catch (err) {
        console.log('Error in user sign-up:', err);
        return res.redirect('/users/sign-up');
    }
};
// for sign in
module.exports.createSession = async function(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            if (user.password !== req.body.password) {
                return res.redirect('/users/sign-in');
            }

            // Session creation (simplified)
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        } else {
            return res.redirect('/users/sign-in');
        }

    } catch (err) {
        console.log('Error in user sign-in:', err);
        return res.redirect('/users/sign-in');
    }
};
