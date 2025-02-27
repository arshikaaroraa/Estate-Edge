import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationCode:String,
    otpExpiry: { type: Date },
    savedHomes: [
        {
            type: mongoose.Schema.Types.ObjectId, // Storing ObjectIds for related listings
            ref: 'Listing', // Reference to the Listing model
        },
    ],
    compareHomes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Listing'
        }
    ]
}, {timestamps: true} );

// 01.10.00
const User = mongoose.model('User', userSchema);

export default User;