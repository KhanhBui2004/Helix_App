import React from "react";
import "./Notification.css";

const Notification = () => {
  return (
    <div className="container mx-auto my-auto">
      <div className="option">
        <button className="all-btn">All</button>
        <button className="follow-btn">Follows</button>
        <button className="reply-btn">Replies</button>
        <button className="mention-btn">Mentions</button>
        <button className="repost-btn">Reposts</button>
        <p>New Folower</p>
      </div>
      <div className="list-user">
        <div className="item">
          <div className="avt">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img
              src="https://drive.google.com/file/d/1epZnlwSsHMsTOSptE7fak6q3tT_sRIV7/view?usp=sharing"
              width={50}
              height={50}
            />
          </div>
          <div className="info-user">
            <div className="info1">
              <p className="username">User</p>
              <p className="followers">22k followers</p>
            </div>
            <div className="btn-follow">
              <button type="button" class="btn btn-outline-dark">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
