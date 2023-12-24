const express=require('express');
const app=express();
const port=3000;
const zod=require('zod');


const schema= zod.array(zod.number());



app.use(express.json()); //for accessing the body in case of post req.

app.get('/health-checkup',(req,res)=>{
    const username=req.headers.username;
    const password=req.headers.password;
    const kidneyId=req.query.kidneyId;

    if(username!='ram'|| password!='pass'){
        res.status(400).json({
            msg:"input1 is wrong!"
        })
        return 
    }

    if(kidneyId!=1 && kidneyId!=2){
        res.status(400).json({
            msg:"input2 is wrong!"
        })
        return 
    }

    res.json({
        msg:'your kidney is fine'}
    )
});


app.post('/health-checkup',(req,res)=>{
    const k =req.body.kidneys;
    const input=schema.safeParse(k);
    if(!input.success){
        res.status(411).json({
            msg: 'input is invalid'
        })
    }
    
    else{
        const l = k.length;
        res.send(
            'no of kidneys '+ l
        )
    }
    
});

app.listen(port);