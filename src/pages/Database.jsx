import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import TabBar from "../components/TabBar";
import SearchField from "../components/SearchField";
import Keyword from "../components/Keyword";
import api from "../axios/Api";
import "../styles/Global.css";
import styles from "../styles/Menu.module.css";

const Database = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api 
            .get('/db')
            .then((response) => {
                if (response.data.status === 200 && Array.isArray(response.data.data)) {
                    setPosts(response.data.data);
                } else {
                    setPosts([]);
                }
                console.log(response.data);
            })

            .catch((error) => {
                console.error("서버 내부 오류가 발생했습니다", error);
                setPosts([]);
            })
    }, []);

    const handleClick = (dbId) => {
        navigate(`/db/${dbId}`);
    }

    if (!posts) {
        return <div>Loading...</div>;  
    }

    return (
        <div className="container">
            <div className="content">
                <div className="componentWrapper">
                    <NavBar />
                    <TabBar />
                    <SearchField />
                </div>
            </div>

            <div className={styles.contentBox}>
                        {posts.map((post) => {
                            return (
                                <li key={post.dbId} onClick={() => handleClick(post.dbId)} className={styles.postContainer}>

                                <p className={styles.postTitle}>{post.title}</p>

                                <div className="keywordContainer">
                                    {Array.isArray(post.keyword) &&
                                        post.keyword.map((keyword, index) => (
                                        <Keyword key={index} text={`# ${keyword}`} />
                                    ))}
                                </div>

                                <p className={styles.postBody}>
                                    {post.body ? (post.body.length > 50 ? post.body.slice(0, 50) + "..." : post.body) : "내용 없음"}
                                </p>
                                </li>
                            );
                        })} 
                </div>
        </div>
    );

}

export default Database;