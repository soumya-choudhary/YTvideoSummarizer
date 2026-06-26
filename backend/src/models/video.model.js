import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        video_url: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
            required: true,
        },
        transcript: [
            {
                timestamp: {
                    type: String,
                    required: true,
                },
                text: {
                    type: String,
                    required: true,
                },
            },
        ],
        chapter: [
            {
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
                startTime: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true },
);

const Video = mongoose.model("Video", videoSchema);
export default Video;
