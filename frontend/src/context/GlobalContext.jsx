import { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error(
            "useGlobalContext must be used within a GlobalContextProvider"
        );
    }

    return context;
};

export const GlobalContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(
        JSON.parse(localStorage.getItem("you-user") || "null")
    );

    const [selectedVideo, setSelectedVideo] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [note, setNote] = useState("");

    return (
        <GlobalContext.Provider
            value={{
                authUser,
                setAuthUser,
                selectedVideo,
                setSelectedVideo,
                chatMessages,
                setChatMessages,
                note,
                setNote,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};