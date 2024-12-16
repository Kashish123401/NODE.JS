const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/example').then(console.log("running")).catch((err)=>{
    console.log("not running");
});
const userschema=new mongoose.Schema({
    username:{type:String},
    age:{type:Number},
    email:{type:String,unique:true},
    password:{type:String}
})
const user=mongoose.model("user",userschema);
module.exports=user;