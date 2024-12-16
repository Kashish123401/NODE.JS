const express=require('express');
const usermodel=require('./model/index');
const user = require('./model/index');
const app=express();
const port=3000;
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("hello its running")
})
app.post('/create',async(req,res)=>{
    const{username,age,email,password}=req.body;
    try{
        const user= await usermodel.create({
            username,age,email,password
        })
        return res.status(200).json({
            status:true,
            message:"created",
            data:user
        })
    }
    catch(err){
       return res.status(400).json({
        status:false,
        message:"server error",
        data:[]
       })
    }
})
//get user
app.get('/user/:id', async (req, res) => {
    const { id } = req.params; // Extract the user ID from the URL

    try {
        const user = await usermodel.findById(id); // Find the user by ID
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            status: true,
            data: user,
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "An error occurred",
            error: err.message,
        });
    }
});

app.get('/user',async(req,res)=>{
const {email}=req.body;
if(!email){
    res.status(400).json({
        message:"email is required"
    })
}
try{
const user= await usermodel.findOne({email})
if(!user){
    return res.status(400).json({
        message:"user is required"
    })
}
return res.status(200).json({
    message:"user found sucessfully",
    data:userk 
})}
catch{
    return res.status(500).json({
        message:"email is not fetched sucessfully"
    })
}

})
app.put('/user_update/:id',async(req,res)=>{
    const{username,age}=req.body;
    const {id}=req.params;
    if(!id){
        return res.status(400).json({
            message:"email is required"
        })
    }
    try{
       const user= await usermodel.findByIdAndUpdate(id,{username,age},{new:true}) ;
       if(!user){
        return res.status(400).json({
             message:"user is necessary "
        })
       }
       return res.status(200).json({
        message:"user has been Updated sucessfully",
        data:user
       })
    }
    catch{
       return res.status(500).json({
        message:"user update sucessfully"
       }) 
    }
})


app.listen(port,()=>{
    console.log("server has been running ")
})