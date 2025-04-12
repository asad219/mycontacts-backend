const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register a User
//@route POST /api/users/register
//@access public (Now public)
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password){
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ "email":email });
    
    if (userAvailable){
      res.status(400);
      throw new Error("User already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    if (user){
        res.status(201).json({"_id": user.id, "email": user.email, "username": user.username});
    }
    else{
        res.status(400);
        throw new Error("Oops! something wrong");
    }
    
});

//@desc Login a User
//@route POST /api/users/login
//@access public (Now public)
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please enter email and password");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id:user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
        
        {expiresIn: "20min"})
        res.status(200).json({ accessToken });
    }else{
        res.status(401);
        throw new Error("email and password does not match");
    }
  res.json({message: "User logged in"});

});

//@desc Current user information
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
