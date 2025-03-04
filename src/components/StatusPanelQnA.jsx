import React, { useState, useEffect } from "react";
import { ReactComponent as LikeIcon } from "../assets/likes.svg"; 
import { ReactComponent as ScrapIcon } from "../assets/scrap.svg";
import { ReactComponent as CommentIcon } from "../assets/comment.svg";
import api from "../axios/Api";
import "../styles/StatusPanel.css";

const StatusPanelQnA = ({ qnaId, initialLikes, initialScraps, initialComments }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [scraps, setScraps] = useState(initialScraps);
    const [comments, setComments] = useState(initialComments);

    const [isLiked, setLiked] = useState(false);
    const [isScrapped, setScrapped] = useState(false);


    useEffect(() => {
        api.get(`/qna/${qnaId}`)
            .then((response) => {
                if (response.data.status === 200){
                    setComments(response.data.data.numberOfComments);
                }
            })
            .catch((error) => console.log("comments 상태 불러오기 실패", error));

        api.get(`/qna/${qnaId}`)
            .then((response) => {
                if (response.data.status === 200) {
                    setLiked(response.data.liked);
                }
            })
            .catch((error) => console.error("likes 상태 불러오기 실패:", error));

        api.get(`qna/${qnaId}`)
            .then((response) => {
                if(response.data.status === 200) {
                    setScrapped(response.data.data.isScrapped);
                }
            })
            .catch(error => { 
                    console.error("scrap 상태 불러오기 실패", error);
            });

    }, [qnaId]);

    const toggleLike = () => {
        if (!isLiked){
        const newLiked = !isLiked;
        setLiked(newLiked);
        setLikes((prev) => prev + 1);

        api.post(`/qna/${qnaId}/like`, { liked: newLiked })
            .catch((error) => console.error("Failed to update like:", error));
    
        }
    };

    const toggleScrap = () => {
        if (!isScrapped) {
        const newScrapped = !isScrapped;
        setScrapped(newScrapped);
        setScraps((prev) => prev + 1 );

        api.post(`/qna/${qnaId}/scrap`, { scrapped: newScrapped })
            .catch((error) => console.error("Failed to update scrap:", error));
        }
    };

    return (
        <div className="statusPanel">
                <CommentIcon/>
                <p>{comments}</p>

                <LikeIcon className={`icon ${isLiked ? "active" : ""}`} onClick={toggleLike}/>
                <p>{likes}</p>

                <ScrapIcon className={`icon ${isScrapped ? "active" : ""}`} onClick={toggleScrap}/>
                <p>{scraps}</p>
        </div>
    );
};

export default StatusPanelQnA;
