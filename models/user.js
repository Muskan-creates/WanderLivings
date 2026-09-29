const mongoose=require("mongoose");
const Schema=mongoose.Schema;
// This will save the salt & hashed password and username
const passportLocalMongoose=require("passport-local-mongoose").default;
const userschema=new Schema({
    email:{
        type:String,
        required:true
    }
});

// it will automatically impement hashig salting on password
userschema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userschema);