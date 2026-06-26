import express from "express";
import {
    getVideo,
    getAllVideos,
    getAns,
    saveNotes,
} from "../controllers/video.controller.js";
import protectRoute from "../middlewares/protectRoute.middleware.js";

const router = express.Router();
router.get("/getAllVideos", protectRoute, getAllVideos);
router.post("/getVideo", protectRoute, getVideo);
router.post("/chat", protectRoute, getAns);
router.post("/saveNotes", protectRoute, saveNotes);

export default router;
