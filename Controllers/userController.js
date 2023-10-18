const expressAsyncHandler = require("express-async-handler")
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const User = require('../Models/userModel')
//@desc register a user
//@route post api/users/register
//@access public
const registerUser = expressAsyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error('All fields are mandatory')
    }
    const checkUser = await User.findOne({ email })     //Check if a user is present
    if (checkUser) {
        res.status(400)
        throw new Error('User already exists!')
    }
    const hashedPassword = await bcrypt.hash(password, 10)   //Hash the password
    console.log('Hashed Password ' + hashedPassword)
    const user = await User.create({         //Create user   
        username,
        email,
        password: hashedPassword         //Syntax remember
    })
    res.json({ _id: user._id, email: user.email })
    console.log('User Created ' + username)
})

//@desc login user
//@route post api/contacts/login
//@access public
const loginUser = expressAsyncHandler(async (req, res) => {
    const {email,password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error('Email and Password is mandatory!')
    }
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,            //Payload
                email: user.email,
                id: user.id
            }
        }, 
        process.env.ACCESS_TOKEN_SECRET, {expiresIn:"15m"})   //Secret key
        res.json({accessToken})
    }
    else{
        res.status(401)
        throw new Error('Unauthorized: Email/Password not valid')
    }
})

//@desc get a user
//@route get api/users/current
//@access private
const currentUser = expressAsyncHandler(async (req, res) => {
    res.send(req.user)
}
)
module.exports = { registerUser, loginUser, currentUser }