import mongoose from "mongoose"; //  helps us set up schema
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true, // says name will be required input
            min: 2,
            max: 50,
        }, 
        lastName: {
            type: String,
            required: true, // says name will be required input
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true, // says name will be required input
            unique: true,
            max: 50,
        },
        password: {
            type: String,
            required: true, // says name will be required input
            min: 5,
        },
        picturePath: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: [],
        },
        location: String, 
        occupation: String,
        viewedProfile: Number,
        impressions: Number,
    }, 
    {timestamps: true} // gives us timestamps when object is made
    );

    const User = mongoose.model("User", UserSchema)
    export default User