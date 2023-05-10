const User = require("../models/userModel");
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = require("../routes/userRoutes");

//@desc Register new User
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler(async (req,res) => {
    const{username, email, password} = req.body;
    if(!username || !email || !password)
    {
        res.status(400);
        throw new Error ("All fields are mandatory");
    }
    else
    {
        const usedMail = await User.findOne({email});
        if(usedMail)
        {
            res.status(400);
            throw new Error("Email already registered..!");
        }
        
        const newUser = await User.create({
            username,
            email,
            password: await bcrypt.hash(password,10)
        });
    
        if(newUser)
        {
            res.status(201).json({_id:newUser.id, email:email});
            //res.status(201).json(newUser);
        }
        else
        {
            res.status(400);
            throw new Error("User details not valid");
        }
    }
});

//@desc User Login
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password } = req.body;
   
    if(!email || !password)
    {
        res.status(400);
        throw new Error ("Invalid Credentials");
    }
    else
    {
        const user = await User.findOne({email});
        
        // compare password with the hashed password

        if(user && (await bcrypt.compare(password, user.password)))
        {
         
           //genereate an access token
           const accessToken = jwt.sign({
                user:{
                    username: user.username,
                    email : user.email,
                    id: user.id
                }
           }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});

           //return the access token
           res.status(200).json({accessToken}); 
        }
        else{
            res.status(401);
            throw new Error("Invalid Login Credentials...!");
        }
    }

});

//@desc Get Current User Details
//@route GET /api/user/current 
//@access private
const currentUser = asyncHandler( async (req, res) => {
   res.status(200).json(req.user);
})
module.exports = {registerUser, loginUser,currentUser};
