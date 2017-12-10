const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const User=require('../models/user-model');


passport.serializeUser(function(user,done){//stuffing the user information into a cookie and sending it to the browser.
	done(null,user.id);
});

passport.deserializeUser(function(id,done){ // getting a cookie from the browser and checking whether the user is in our db.
	User.findById(id).then(function(user){
		done(null,user);
	});
});


//the id property here is the database id and not the googleid.

passport.use(
	new GoogleStrategy({
		//options for the google strategy
		callbackURL:'/auth/google/redirect',
		clientID:'102418321646-qpvpefhobd8ke9uubrvaj7jkqe2st578.apps.googleusercontent.com',
		clientSecret:'b03efXWePCHOgzS-R2hWQjH1'
	},function(accessToken,refreshToken,profile,done){//this function takes many parameters i.e. accessToken,refreshToken,profile and the donee function.accessToken is needed to read the emails etc and the refreshToken is neede to refresh the accessToken because it expires.
		//passport callback function
		//check if the user already exists
		User.findOne({googleId:profile.id}).then((currentUser)=>{
			if(currentUser){
				console.log(currentUser);
				done(null,currentUser);
			}

			else{
				new User({
					username:profile.displayName,
					googleId:profile.id,
					thumbnail:profile._json.image.url
					}).save().then((newUser)=>{
					console.log('new User created :'+newUser);
					});
					done(null,newUser);
				}


		});
		
	})

)