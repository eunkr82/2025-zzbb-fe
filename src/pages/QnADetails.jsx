import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../axios/Api";
import DetailPageNavBar from "../components/DetailPageNavBar";
import Keyword from "../components/Keyword.jsx";
import StatusPanelQnA from "../components/StatusPanelQnA.jsx";
import "../styles/DetailPage.css";
import "../styles/Global.css";

const QnADetails = () => {
    const { qnaId } = useParams();
    const [post, setPost] = useState(null);
    const [keyword, setKeyword] = useState([]);

    useEffect(() => {
        api 
            .get(`/qna/${qnaId}`)
            .then((response) => {
                setPost(response.data.data);
            })
            
            .catch((error) => {
                console.error("상세 데이터 불러오기 실패", error);
            });
    }, [qnaId]);


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
                    {post.qnaId && (
                        <StatusPanelQnA
                            qnaId={post.qnaId}
                            initialLikes={post.numberOfLikes}
                            initialScraps={post.numberOfScraps}
                            initialComments={post.numberOfComments}
                            />
                    )}
                </div>
                
                <div className="commentContainer">
                    {post.comments && post.comments.length > 0 ? (
                        post.comments.map((comment, index) => (
                            <li key={index} className="comment">
                                <p className="nickname">{comment.nickname}:</p>{" "}
                                <p className="commentBody">{comment.body}</p>
                            </li>
                        ))
                    ) : (
                          <p>댓글 없음</p>
                    )}
                    
                </div>
            </section>
        </section>
    );
};

export default QnADetails;