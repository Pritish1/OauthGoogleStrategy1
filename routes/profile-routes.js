const router=require('express').Router();

const authCheck=function(req,res,next){
	if(!req.user)
	{//if the user is not logged in 
		res.redirect('/auth/login');
	}
	else
	{//if the user is logged in then the next piecce of the middleware will be fired 
		next();
	}
}

router.get('/',authCheck,function(req,res){
	//res.send('You are logged in as :'+req.user.username);
	res.render('profile',{data:req.user});
});

module.exports=router;