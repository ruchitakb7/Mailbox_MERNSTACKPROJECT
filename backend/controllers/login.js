

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
        console.log(user,'backenddd')
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
                    token: generateAccessToken(user._id, user.email),
                    userId:user._id
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



exports.forgotPassword = async (req, res, next) => {
    const { email, newPassword } = req.body;
  
    try {
      
      if (isStringInvalid(email) || isStringInvalid(newPassword)) {
        return res.status(400).json({ message: 'Email or password is missing' });
    }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User with this email does not exist." });
      }
  
      const salt = await bcrypt.genSalt(8);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: "Password successfully reset!" });
    } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ error: "An internal server error occurred." });
    }
  };
  