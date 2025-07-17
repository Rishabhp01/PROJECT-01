module.exports.profile = function(req,res){
    res.render('user_profile',{
        title: "User Profile"
    });
}
module.exports.about = function(req,res){
    res.end('<h1> hello baba </h1>');
}