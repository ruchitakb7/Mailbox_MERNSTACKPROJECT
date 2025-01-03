const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate = async (req, res,next) => {

   console.log('welcome to middleware')
    try {
        const token = req.header('Authorization');
        const user = jwt.verify(token, 'secretkey');
        //console.log(user)
        
        User.findById(user.id).then(user => {
          
            req.user = user; 
            next();
        })

      } catch(err) {
        console.log(err);
        return res.status(401).json({success: false})
        
      }

}

