const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signupdetails = async (req, res) => {
  try {
    const {formData} =req.body
    const { email, password, confirmPassword } = formData
  
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: " *Email already exists. Please use a different email.*" });
    }

   
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "*Passwords do not match.*" });
    }

   
    const hashedPassword = await bcrypt.hash(password, 8);

   
    await User.create({ email: email, password: hashedPassword });


    res.status(201).json({ message: "User has been successfully created." });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};
