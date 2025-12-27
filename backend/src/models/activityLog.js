import mongoose, {Schema} from "mongoose";

const activityLogSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true, },
    habitId: {type: Schema.Types.ObjectId, ref: 'Habit', required: true,},
    date: {type: Date, required: true},
    count: {type: Number, default: 1},
}, {timestamps: true});

activityLogSchema.index({ userId: 1, date: -1});

export const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);