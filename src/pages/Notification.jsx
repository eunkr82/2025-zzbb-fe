import React, { useState, useEffect } from "react";
import api from "../axios/Api";
import NotificationTabs from "../components/NotificationTabs.jsx";
import DetailPageNavBar from "../components/DetailPageNavBar.jsx";
import "../styles/Notification.css";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [activeTab, setActiveTab] = useState("myPosts");

    useEffect(() => {
        api .get("/user/notice")
            .then((response) => {
                if (response.data.status === 200) {
                    setNotifications(response.data.data);
                    filterNotifications(response.data.data, "myPosts"); 
                    console.log(response.data);
                } 
            })
            .catch((error) => console.error("알림 가져오기 실패", error))
    }, []);

    const filterNotifications = (data, tab) => {
        if (tab === "myPosts") {
            setFilteredNotifications(data.filter((item) => !item.isScraped));
        } else {
            setFilteredNotifications(data.filter((item) => item.isScraped));
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        filterNotifications(notifications, tab);
    };

    return (
        <div className="container">
            <div className="content">
            <DetailPageNavBar />
            <NotificationTabs activeTab={activeTab} onTabChange={handleTabChange} />
            <ul className="notificationList">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notice) => (
                        <li key={notice.noticeId} className={`notificationItem ${notice.isRead ? "" : "unread"}`}>
                            <h3 className="notificationTitle">{notice.title}</h3>
                            <p className="notificationComment">
                                <p style={{color: "#058053", margin: "0"}}>새로운 댓글:</p>
                                {notice.commentBody}
                            </p>
                        </li>
                    ))
                ) : (
                    <p className="noNotifications">새로운 알림이 없습니다.</p>
                )}
            </ul>
            </div>
        </div>
    );
};

export default Notification;
