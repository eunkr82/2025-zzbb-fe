import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DbList = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios  
            .get("https://")
            .then((response) => {
                if (response.data.status === 200) {
                    setPosts(response.data.data);
                }
            })
            .catch((error) => {
                console.error("서버 내부 오류가 발생했습니다". error);
            });
    }, []);

    const handleClick = (dbId) => {
        navigate(`https://${dbId}`);
    };

    return (
        <div>
            <ul>
                {posts.map((post) => {
                    <li key={post.dbId} onClick={() => handleClick(post.dbID)}>
                        <p style={{fontSize: "12.3px", padding: "17px", borderTop: "2px solid #f1f1f1"}}>{post.title}</p>
                    </li>
                })}
            </ul>
        </div>

    );
};

export default DbList;