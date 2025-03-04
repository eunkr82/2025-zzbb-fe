import React from "react";
import "../styles/Notification.css";

const NotificationTabs = ({ activeTab, onTabChange }) => {
    return (
        <section className="notificationTabContainer">
            <div
                className={`tabItem ${activeTab === "myPosts" ? "active" : ""}`}
                onClick={() => onTabChange("myPosts")}
            >
                <p>내가 쓴 글</p>
                {activeTab === "myPosts" && <div className="tabUnderline"></div>}
            </div>
            <div
                className={`tabItem ${activeTab === "scrapedPosts" ? "active" : ""}`}
                onClick={() => onTabChange("myScraps")}
            >
                <p>스크랩</p>
                {activeTab === "myScraps" && <div className="tabUnderline"></div>}
            </div>
        </section>
    );
};

export default NotificationTabs;
