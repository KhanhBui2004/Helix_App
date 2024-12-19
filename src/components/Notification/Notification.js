import React from "react";
import "./Notification.css";
import { acceptFollow, getPostFollow } from "../../services/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Notification = () => {
  const [postFollow, setPostFollow] = useState([]);

  const fetchPostFollow = async () => {
    let data = await getPostFollow();
    console.log(data);
    setPostFollow(data.followers);
  };

  useEffect(() => {
    fetchPostFollow();
  }, []);

  const handleAcceptFollow = async (id) => {
    try {
      let response = await acceptFollow(id);
      if (response && response.status === 200) {
        toast.success("Accept thành công!");
      } else {
        toast.error("Accept thất bại!");
      }
    } catch (error) {
      toast.error("Accept thất bại!");
    }
  };

  return (
    <div className="container mx-auto my-auto">
      <div className="list-user">
        {postFollow && postFollow.length > 0 ? (
          <>
            {postFollow.map((item, index) => {
              return (
                <div className="item">
                  <div className="avt">
                    <img
                      src={"http://localhost:5000" + item.media_url}
                      width={50}
                      height={50}
                    ></img>
                  </div>
                  <div className="info-user">
                    <div className="info1">
                      <p className="username">{item.username}</p>
                      {/* <p className="followers">22k followers</p> */}
                    </div>
                    <div className="btn-follow">
                      <button
                        type="button"
                        class="btn btn-outline-dark"
                        onClick={() => handleAcceptFollow(item.id)}
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <p>Không có thông báo nào</p>
        )}
      </div>
    </div>
  );
};

export default Notification;
