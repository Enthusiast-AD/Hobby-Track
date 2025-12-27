import mongoose, {Schema} from "mongoose";

const habitSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    description: {type: String, default: ''},
    type: {type: String, enum: ['daily', 'todo'], default: 'daily'},
    isArchived: {type: Boolean, default: false},
}, {timestamps: true});

export const Habit = mongoose.model('Habit', habitSchema);