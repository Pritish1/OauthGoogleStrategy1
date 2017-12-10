const express=require('express');
const authRoutes=require('./routes/auth-routes');//importing the router we created in auth-routes.js
const profileRoutes=require('./routes/profile-routes');
const passportSetup=require('./config/passport-setup');
const mongoose=require('mongoose');
const passport=require('passport');
const cookieSession=require('cookie-session');

const app =express();

app.set('view engine','ejs');

app.use(cookieSession({
	maxAge:24*60*60*1000,//the maximum tiem for which the cookie will be valid.
	keys:['thenetninjaisawesomeiguess']//used to encrypt the cookie.
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());


//connect to mongodb
mongoose.connect('mongodb://pritisher:pritisher@ds159254.mlab.com:59254/oauth',()=>{
	console.log("Connected to mongodb!!");
});

app.use('/auth',authRoutes);//with these we will have routes as /auth/login and /auth/google etc.
app.use('/profile',profileRoutes);


app.get('/',function(req,res){
	res.render('home.ejs',{user:req.user});
});

app.listen(3002,function(){
	console.log('You are currently listening to port number 3000');
});


