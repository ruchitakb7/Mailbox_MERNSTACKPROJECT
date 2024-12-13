const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.signupdetails = async (req, res, next) => {
    try {
        const { email, password, confirmPassword } = req.body;
      
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists. Please use a different email." });
        }

   
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

      
        const saltrounds = 8;
        bcrypt.hash(password, saltrounds, async (err, hash) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            const signupdetail = await User.create({ email: email, password: hash });
            res.status(201).json({ message: "User has been successfully created." });
        });

    } catch (e) {
        res.status(500).json({ error: e });
    }
};


