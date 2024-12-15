
// const User=require('../models/user');
// const path= require('path');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken')

// function generateAccessToken(id,name){
    
//     return jwt.sign({id:id,name:name}, 'secretkey');
// }

// function isstringinvalid(string){
//     if(string == undefined ||string.length === 0){
//         return true
//     } else {
//         return false
//     }
// }

// exports.login= async(req,res,next) =>{

//     try{ 
//         const {userdata}=req.body
//         console.log(userdata)
//         //   const email = req.body.email;
//         //   const password= req.body.password
//         const {email,password}=userdata

//             if(isstringinvalid(email) || isstringinvalid(password)){
//             return res.status(400).json({message: 'EMail id or password is missing '})
//          }

//         const user=  await User.findOne({email:email});
//         console.log(user)
         
//           if(user)
//           {
              
//               bcrypt.compare(password,user.password, async(err,result)=>{
//                 if (err) 
//                 {
//                   throw new err("something Went Wrong")
//                 }  
//                 if(result==true)
//                 {
//                     return res.status(200).json({success:true, message: "User has been logged in successfully",token:generateAccessToken(user._id,user.name)});

//                 }
//                 else
//                 {
//                     return res.status(400).json({success: false, message: 'Password is incorrect'})
//                 }
//             }) 
//           }
//           else 
//           {
//               return res.status(404).json({success: false,message: 'user not exist'})
//           }
       
//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json({err})
//     }
// }

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'secretkey';

function isStringInvalid(string) {
    return !string || string.trim().length === 0;
}

function generateAccessToken(id, name) {
    return jwt.sign({ id, name }, jwtSecret);
}

exports.login = async (req, res, next) => {
    try {
        console.log(req.body)
        const { userData } = req.body;
        console.log(userData)
        const { email, password } = userData || {};

        if (isStringInvalid(email) || isStringInvalid(password)) {
            return res.status(400).json({ message: 'Email or password is missing' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User does not exist' });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                throw new Error('An error occurred while comparing passwords');
            }
            if (result) {
                return res.status(200).json({
                    success: true,
                    message: 'User has been logged in successfully',
                    token: generateAccessToken(user._id, user.name),
                });
            } else {
                return res.status(400).json({ success: false, message: 'Password is incorrect' });
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An unknown error occurred', error: err });
    }
};
