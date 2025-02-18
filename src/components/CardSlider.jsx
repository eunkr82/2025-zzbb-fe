import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import styles from "../styles/CardSlider.module.css";

const CardSlider = () => {
    const [cards, setCards] = useState([]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
    }

    useEffect (() => {
        axios 
            .get("qna/brief")
            .then((response => {
                const sortedData = response.data.sort((a,b) => new Date(b.date) - new Date(a.date));
                setCards(sortedData);
            }))

            .catch((error) => console.log("데이터 불러오기 실패", error));


        }, []);

    return (
        <div>
            <Slider {...settings}>
                {cards.map((card) => (
                    <div key={card.id} className={styles.card} style={{ backgroundImage: `url(${card.thumbnail})` }}>
                        <div className={styles.overlay}></div>
                        <p className={styles.title}>{card.title}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default CardSlider;