var router=require('express').Router();
//this is created because we want to keep all the routes together.
var passport=require('passport');

//auth login
router.get('/login',function(req,res){
	//use passport
	res.render('login.ejs',{user:req.user});
});

//auth logout
router.get('/logout',function(req,res){
	//passport will be used here
	req.logout();//this is a standard passport function
	res.redirect('/');//redirecting the user to the homepage and removing the id encrypted in the session cookie.
});

router.get('/google',passport.authenticate('google',{
	scope:['profile']//here we state what kind of information we are rtrying to access like, profile, emails, location etc.
}));

router.get('/google/redirect',passport.authenticate('google'),function(req,res){//this passport.authenticate is used to handle the code which is returned by google in the redirected URI.

	//res.send("You have been authenticated!!");
	res.redirect('/profile/');//passport does this on its own and provides us a user object from which we can access data.

});

//exporting this router to app.js so that it can use these routes
module.exports=router;