import React from "react";
import api from "../axios/Api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DbList.css";

const DbList = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api  
            .get("db/brief")
            .then((response) => {
                if (response.data.status === 200) {
                    setPosts(response.data.data);
                }
            })
            
            .catch((error) => {
                console.error("서버 내부 오류가 발생했습니다", error);
            });
    }, []);

    const handleClick = (dbId) => {
        navigate(`/db/${dbId}`);
    };

    return (
        <div>
            <ul className="dbList">
                {posts.slice(0, 5) .map((post) => (
                    <li key={post.dbId} onClick={() => handleClick(post.dbId)}>
                        <p className="dbListTitle">{post.title}</p>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default DbList;