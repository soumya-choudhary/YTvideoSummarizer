import toast from "react-hot-toast";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { LeftPanel, RightPanel } from "../components/LearningPage";

function LearningPage() {
    const { id } = useParams();
    const { setSelectedVideo, authUser, setNote } = useGlobalContext();

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BACKEND_URI}/api/video/getVideo`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + authUser?.token,
                        },
                        body: JSON.stringify({
                            video_url: `https://www.youtube.com/watch?v=${id}`,
                        }),
                    }
                );

                const data = await res.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                const { notes, ...videoDataWithoutNotes } = data;

                setSelectedVideo(videoDataWithoutNotes);
                setNote(notes);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchVideoData();

        return () => {
            setSelectedVideo(null);
        };
    }, []);

    return (
        <div className="Learning-container flex h-[90vh] overflow-hidden font-roboto">
            {/* Left Panel */}
            <LeftPanel />

            {/* Right Panel */}
            <RightPanel />
        </div>
    );
}

export default LearningPage;