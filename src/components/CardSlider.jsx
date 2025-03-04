import React, { useEffect, useState } from "react";
import api from "../axios/Api"; 
import { useNavigate } from "react-router-dom"; 
import styles from "../styles/CardSlider.module.css"; 

const CardSlider = () => {
    const [cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate(); 

    useEffect(() => {
        api
            .get("/qna/brief") 
            .then((response) => {
                const sortedData = response.data.data
                    .sort((a, b) => new Date(b.generatedTime) - new Date(a.generatedTime)); 
                setCards(sortedData);
                console.log("불러온 데이터:", sortedData);
            })
            .catch((error) => console.log("데이터 불러오기 실패", error));
    }, []);

    useEffect(() => {
        if (cards.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => 
                    prev + 2 < cards.length ? prev + 2 : 0
                ); 
            }, 5000); 

            return () => clearInterval(interval);
        }
    }, [cards]);

    const handleClick = (qnaId) => {
        navigate(`/qna/${qnaId}`); 
    };

    return (
        <div className={styles.sliderContainer}>
            <div className={styles.cardWrapper}>
                <div
                    className={styles.slider}
                    style={{ transform: `translateX(-${currentIndex * 50}%)` }}
                >
                    {cards.map((card) => (
                        <div
                            key={card.qnaId}
                            className={styles.card}
                            style={{
                                backgroundImage: card.image ? `url(${card.image})` : "none",
                                backgroundColor: card.image ? "transparent" : "green",
                            }}
                            onClick={() => handleClick(card.qnaId)}
                        >
                            <div className={styles.overlay}></div>
                            <p className={styles.cardTitle}>{card.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardSlider;
