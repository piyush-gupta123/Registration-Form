const express = require('express');
const user = require('./Database/userSchema')
const path = require('path');
const bodyParser = require('body-parser');
require('./Database/config');

const app = express();
app.use(express.json());
// app.use(require('./router/auth'));

const static_path = path.join(__dirname,'\\Frontend\\public')
app.use(express.static(static_path));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

app.get('/',(req,res)=>{
    res.set({
        "ALLow-access-ALLow-Origin": '*'
    })
    return res.redirect('index.html')
})

// app.post('/register',async (req,res)=>{
//     const name=req.body.name
//     const dob=req.body.dob
//     const contact=req.body.contact
//     const gender= req.body.gender
//     const email=req.body.email
//     const state=req.body.state

//     if(!name || !dob || !contact || !gender || !email || !state){
//         return res.status(422).json({error: "Required Field"});
//     }
        
//     try{
//         const UserExist= await user.findOne({email: email})
//         if(UserExist){
//             return window.alert("Email already exists")
//             // return res.status(422).json({error: "Email already exists"});
//         }
        
//         const User = new user({name, dob, contact, gender, email, state})
        
//         const saved = await User.save();
//         if(saved){
//             // res.status(201).json("Registration Suscessful")
//             return res.redirect('final.html')
//         }
//         else{
//             return window.alert("Registration Failed")
//             // res.status(500).json({error: "Failed"})
//         }
        
//     }
//     catch(err){
//         res.send({error:`Registration failed`})
//     }

// })

app.post('/register',async (req,res)=>{
    const {Name, dob, contact, gender, email, state, select} = req.body;
    if(!Name || !dob || !contact || !gender || !email || !state || !select){
        return res.status("0");
    }
   
    const UserExist= await user.findOne({email: email})
    if(UserExist){
        // return res.status(422).json({error: "Email already exists"});
        res.send("1");
    }

    const User = new user({Name, dob, contact, gender, email, state, select})
let  saved;
    try{
     saved = await User.save();

  
    if(saved){
        // res.status(201).json("Registration Successfull")
       // res.redirect('final.html')
        res.send("2");
    }
    else{
        // res.status(500).json({error: "Failed"})
        res.send("3")
    }


        // res.send({error:`Registration failed`})
        console.warn("err");
      //  res.send('Error Occured');
 } catch(e){
        console.warm(e.message);
    }
    res.end();
})
app.listen(5000);
