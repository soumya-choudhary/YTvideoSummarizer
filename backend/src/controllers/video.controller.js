import { AppError } from "../utils/AppError.util.js";
import config from "../config/config.js";
import Video from "../models/video.model.js";
import UserVideoData from "../models/uservideodata.model.js";
import { updateVecStore } from "../utils/updateVectorStore.js";

const getAllVideos = async (req, res, next) => {
    try {
        const user = req.user;
        const userId = user?._id;
        if (!userId) {
            throw new AppError("User does not have a _id", 500);
        }
        const videos = await UserVideoData.find({ user: userId })
            .sort({ createdAt: -1 })
            .select("video notes chatHistory")
            .populate("video");

        const requiredVideosFields = videos.map((record) => {
            return {
                _id: record.video._id,
                video_url: record.video.video_url,
                title: record.video.title,
                summary: record.video.summary,
                transcript: record.video.transcript,
                chapter: record.video.chapter,
                notes: record.notes,
                chatHistory: record.chatHistory,
            };
        });
        res.status(200).json(requiredVideosFields);
    } catch (error) {
        console.log("Error in getAllVideos controller");
        next(error);
    }
};

const getVideo = async (req, res, next) => {
    try {
        const user = req.user;
        const userId = user?._id;
        const { video_url } = req.body;
        if (!userId) {
            throw new AppError("User does not have a _id", 500);
        }
        if (!video_url) {
            throw new AppError("video url is required!", 400);
        }

        const videoData = await Video.findOne({ video_url });

        if (videoData) {
            updateVecStore(videoData.transcript);
            const userVideoRecord = await UserVideoData.findOne({
                user: userId,
                video: videoData._id,
            })
                .select("video notes chatHistory")
                .populate("video");

            if (userVideoRecord) {
                res.status(200).json({
                    _id: videoData._id,
                    video_url: videoData.video_url,
                    title: videoData.title,
                    summary: videoData.summary,
                    transcript: videoData.transcript,
                    chapter: videoData.chapter,
                    notes: userVideoRecord.notes,
                    chatHistory: userVideoRecord.chatHistory,
                });
                return;
            }
            const newUserVideoRecord = await UserVideoData.create({
                user: userId,
                video: videoData._id,
                notes: "",
                chatHistory: [],
            });

            res.status(200).json({
                _id: videoData._id,
                video_url: videoData.video_url,
                title: videoData.title,
                summary: videoData.summary,
                transcript: videoData.transcript,
                chapter: videoData.chapter,
                notes: newUserVideoRecord.notes,
                chatHistory: newUserVideoRecord.chatHistory,
            });
            return;
        }

        const flask_res = await fetch(`${config.FLASK_URI}/api/get-video-details`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ video_url }),
        });

        const data = await flask_res.json();

        if (data.error) {
            throw new AppError(data.error, 500);
        }

        const newVideo = await Video.create({
            ...data,
            video_url,
        });

        const newUserVideoRecord = await UserVideoData.create({
            user: userId,
            video: newVideo._id,
        });

        updateVecStore(newVideo.transcript);

        res.status(200).json({
            _id: newVideo._id,
            video_url: newVideo.video_url,
            title: newVideo.title,
            summary: newVideo.summary,
            transcript: newVideo.transcript,
            chapter: newVideo.chapter,
            notes: newUserVideoRecord.notes,
            chatHistory: newUserVideoRecord.chatHistory,
        });
    } catch (error) {
        console.log("Error in getDetails controller");
        next(error);
    }
};

const getAns = async (req, res, next) => {
    try {
        const user = req.user;
        const userId = user?._id;

        if (!userId) {
            throw new AppError("User does not have a _id", 500);
        }
        const { question } = req.body;
        if (!question) {
            throw new AppError("question is required!", 400);
        }

        const flask_res = await fetch(`${config.FLASK_URI}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question }),
        });

        const data = await flask_res.json();

        if (data.error) {
            throw new AppError(data.error, 500);
        }

        res.status(200).json(data);
    } catch (error) {
        console.log("Error in getAns controller");
        next(error);
    }
};

const saveNotes = async (req, res, next) => {
    try {
        const user = req.user;
        const userId = user?._id;

        if (!userId) {
            throw new AppError("User does not have a _id", 500);
        }

        const { videoID, notes } = req.body;

        if (!videoID || typeof notes !== "string") {
            throw new AppError("Invalid videoID or notes", 400);
        }

        const userVideoRecord = await UserVideoData.findOne({
            user: userId,
            video: videoID,
        });

        if (!userVideoRecord) {
            throw new AppError("User video data not found", 404);
        }

        userVideoRecord.notes = notes;
        await userVideoRecord.save();

        res.status(200).json({ notes });
    } catch (error) {
        console.log("Error in saveNotes controller");
        next(error);
    }
};

export { getAllVideos, getVideo, getAns, saveNotes };
