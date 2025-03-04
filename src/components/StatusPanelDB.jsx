import React, { useState, useEffect } from "react";
import { ReactComponent as LikeIcon } from "../assets/likes.svg"; 
import { ReactComponent as ScrapIcon } from "../assets/scrap.svg";
import api from "../axios/Api";
import "../styles/StatusPanel.css";

const StatusPanel = ({ dbId, initialLikes, initialScraps }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [scraps, setScraps] = useState(initialScraps);

    const [isLiked, setLiked] = useState(false);
    const [isScrapped, setScrapped] = useState(false);


    useEffect(() => {
        console.log(dbId);

        api.get(`/db/${dbId}`)
            .then((response) => {
                if (response.data.status === 200) {
                    setLiked(response.data.liked);
                }
            })
            .catch((error) => console.error("like 상태 불러오기 실패:", error));

        api.get(`db/${dbId}`)
            .then((response) => {
                if(response.data.status === 200) {
                    setScrapped(response.data.data.isScrapped);
                }
            })
            .catch(error => { 
                    console.error("scrap 상태 불러오기 실패", error);
                    console.error("전체 에러: ", error.response)
            });

    }, [dbId]);

    const toggleLike = () => {
        const newLiked = !isLiked;
        setLiked(newLiked);
        setLikes((prev) => (newLiked ? prev + 1 : prev - 1));

        api.post(`/db/${dbId}/like`, { liked: newLiked })
            .catch((error) => console.error("Failed to update like:", error));
    };

    const toggleScrap = () => {
        const newScrapped = !isScrapped;
        setScrapped(newScrapped);
        setScraps((prev) => (newScrapped ? prev + 1 : prev - 1));

        api.post(`/db/${dbId}/scrap`, { scrapped: newScrapped })
            .catch((error) => console.error("Failed to update scrap:", error));
    };

    return (
        <div className="statusPanel">
                <LikeIcon className={`icon ${isLiked ? "active" : ""}`} onClick={toggleLike}/>
                <p>{likes}</p>

                <ScrapIcon className={`icon ${isScrapped ? "active" : ""}`} onClick={toggleScrap}/>
                <p>{scraps}</p>
        </div>
    );
};

export default StatusPanel;
