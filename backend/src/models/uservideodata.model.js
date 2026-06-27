import mongoose from "mongoose";

const userVideoDataSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        video: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
            required: true,
        },
        notes: {
            type: String,
            default: "",
        },
        chatHistory: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const UserVideoData = mongoose.model("UserVideoData", userVideoDataSchema);
export default UserVideoData;
