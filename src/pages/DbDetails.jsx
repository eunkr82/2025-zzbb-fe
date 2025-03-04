import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../axios/Api";
import DetailPageNavBar from "../components/DetailPageNavBar";
import Keyword from "../components/Keyword.jsx";
import StatusPanelDB from "../components/StatusPanelDB.jsx";
import "../styles/DetailPage.css";
import "../styles/Global.css";

const DbDetails = () => {
    const { dbId } = useParams();
    const [post, setPost] = useState(null);
    const [keyword, setKeyword] = useState([]);

    useEffect(() => {
        api 
            .get(`/db/${dbId}`)
            .then((response) => {
                setPost(response.data.data);
            })
            
            .catch((error) => {
                console.error("상세 데이터 불러오기 실패", error);
            });
    }, [dbId]);


    if (!post) {
        return <div>Loading...</div>;  
    }

    return (
        <section className="container">
            <section className="content">
                <DetailPageNavBar/>
                <p className="detailPageTitle">{post.title}</p>
                <div className="keywordContainer">
                    {keyword.map((keyword, index) => (
                        <Keyword key={index} text={`# ${keyword}`} />
                    ))}
                </div>
                <p className="detailPageContent">{post.body}</p>
                <div className="detailPageImageContainer">
                    {post.imageUrls.map((url, index) => (
                        <img key={index} src={url} className="detailImage" />
                    ))}
                </div>

                <hr/>

                <div className="reactionWrapper">
                    {post.dbId && (
                        <StatusPanelDB
                            dbId={post.dbId}
                            initialLikes={post.numberOfLikes}
                            initialScraps={post.numberOfScraps}
                            />
                    )}
                </div>
            </section>
        </section>
    );
};

export default DbDetails;