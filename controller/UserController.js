const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../model/User')

const signup = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log(req.body)

        // Check if user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const userModel = new UserModel({ email, password: hashedPassword, role });
        await userModel.save();

        return res.status(201).json({ message: 'Signup successful' });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: 'Server error' });
    }
};


const login = async(req, res) => {
    try{
        const {email, password} = req.body
        const user = await UserModel.findOne({email})
        if (!user){
            return res.status(403).json({message: 'user is not exist, you have to signup'})
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch){
            return res.status(403).json({message: 'Invalid Password'})
        }
        const jwtToken = jwt.sign({email: user.email, _id: user._id, role: user.role}, process.env.JWT_SECRET)
        console.log(user.role)
        return res.status(200).json({message: 'login successfully', jwtToken, role: user.role})
    } catch(err){
        console.log(err)
        res.status(500).json({message: 'server error'})
    }
}

module.exports = {signup, login}