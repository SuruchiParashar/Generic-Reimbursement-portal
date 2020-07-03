var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var UserSchema=new mongoose.Schema({
   username:String,
    password:String
});

//this will add the bunch of codes that come inside the passport-local-mongoose package to our UserSchema
//now we dont have to add the serialize and deserialize methods here, because the passport local mongoose automatically adds in those two.
UserSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",UserSchema);