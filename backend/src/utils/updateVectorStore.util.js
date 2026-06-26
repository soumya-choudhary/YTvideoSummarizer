import config from "../config/config.js";
import { AppError } from "./AppError.util.js";

const updateVecStore = async (transcript) => {
  const transcriptText = transcript.map((segment) => segment.text).join(" ");
  try {
    const flask_res = await fetch(
      `${config.FLASK_URI}/api/update-vector-store`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript_text: transcriptText,
        }),
      },
    );

    const data = await flask_res.json();
    if (data.error) {
      throw new AppError(data.error || "Failed to update vector store", 500);
    }
  } catch (error) {
    console.error("Error in updateVecStore", error);
  }
};

export { updateVecStore };
