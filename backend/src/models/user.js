import mongoose, {Schema} from 'mongoose';


const userSchema = new Schema({
    username: {type: String, unique: true, sparse: true}, // sparse allows multiple null values
    email: {type: String, required: true, unique: true},
    fullName: { type: String }, 
    avatar: { type: String },
    currentMotive: {type: String, default: ''},
    isOnboardingComplete: { type: Boolean, default: false }
}, {timestamps: true});

export const User = mongoose.model('User', userSchema);