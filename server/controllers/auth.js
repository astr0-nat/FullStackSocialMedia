import bcrypt from "bycryp"
import jwt from "jsonwebtoken" // for authrorization, cookies kinda. confirm logged in
import User from "../models/User.js"

/* REGISTER USER */
/* this is like an api call from front end to back. front end would call this and send in an object with 
all those params in it "firtName" etc. we get that object in the req parameter */
export const register = async (req, res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        }  = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor( Math.random() * 10000),
        });
        const savedUser = await newUser.save() // returning the exact instance of user
        res.status(201).json(savedUser) // we are sending status that we created something, put the user in json format for front end to use


    } catch(err) {
        res.status(500).json({error: err.message})

    }
}