const mongoose= require('mongoose');
const express=require('express')
const app= express();

mongoose.connect('mongodb+srv://roybuburpr08:zx3TJMKIiGKBwz2K@cluster0.vfnqtl9.mongodb.net/newdb')

const user=mongoose.model('users',{
    name:String,email:String,password:String
})



app.use(express.json());

app.post('/signup',async (req,res)=>{

    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    let flag= await user.findOne({email:email});
    if(flag){
        res.status(403).json({msg:'user already exists'})
    }
    else{
        const u= user({name: name,email:email,password: password})
        u.save();

    res.status(200).json({msg:'user data saved'})
    }
    
})

app.get('/data',async (req,res)=>{
    const password=req.body.password;
    const email=req.body.email;
    //const password=req.body.password;
    const flag= await user.findOne({email:email});
    if(flag==null){
        res.status(403).json({msg:'user does not exists'})
    }
    
    else{
        if(password==flag.password)res.json({name: flag.name})
        else{res.status(403).json({msg:'password did not match'})}
    }
    
})

app.listen(3000);


