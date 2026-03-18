import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    username: {type: String, unique: true, sparse: true}, // sparse allows multiple null values
    email: {
        type: String, 
        required: true, 
        unique: true,
        trim: true, 
        lowercase: true
    },
    fullName: { 
        type: String,
        required: true,
        trim: true, 
        index: true
    }, 
    avatar: { type: String },
    password: {
        type: String,
        required: [function() { return !this.googleId; }, 'Password is required if not using Google Auth']
    },
    googleId: { type: String },
    currentMotive: {type: String, default: ''},
    isOnboardingComplete: { type: Boolean, default: false }
}, {timestamps: true});

// Encrypt password before saving
userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Check if password is correct
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model('User', userSchema);