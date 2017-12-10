const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var userSchema=new Schema({
	username:String,
	googleId:String,
	thumbnail:String
});

var User=mongoose.model('user',userSchema);

module.exports=User;