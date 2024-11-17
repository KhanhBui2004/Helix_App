import { useContext, useEffect, useState } from "react";
import "./Profile.css";
import {
  getUserPosts,
  likePost,
  getUserLiked,
  unLikePost,
} from "../../services/userService";
import { UserContext } from "../../context/UserContext";
import ModalEditProfile from "./ModalEditProfile";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());
  const [liked, setLiked] = useState([]);

  const [isShowModalEditProfile, setIsShowModalEditProfile] = useState(false);

  const handleLike = async (post_id) => {
    if (liked.includes(post_id)) {
      let response = await unLikePost(post_id);
    } else {
      let response = await likePost(post_id);
    }
    await fetchLike();
  };

  const fetchLike = async () => {
    let response = await getUserLiked();
    let data = [];
    if (response && +response.status === 200) {
      response.posts.forEach((element) => {
        data.push(element.id);
      });
    }
    console.log(data);

    setLiked(data);
  };

  useEffect(() => {
    fetchLike();
  }, [userPosts]);

  const onHideModalEditProfile = () => {
    setIsShowModalEditProfile(false);
  };

  const fetchUserPosts = async (id) => {
    let data = await getUserPosts(id);
    setUserPosts(data.posts);
  };

  const getTimePost = (postDate) => {
    let date2 = new Date(postDate + "+0700");
    const differenceInMilliseconds = dateTime - date2;
    let sencond = Math.floor(differenceInMilliseconds / 1000);
    let minute = Math.floor(differenceInMilliseconds / (1000 * 60));
    let hour = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    let day = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    if (sencond < 60) return sencond + "s";
    if (minute < 60) return minute + "m";
    if (hour < 24) return hour + "h";
    return day + "d";
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 60000); // Cập nhật mỗi phút

    return () => clearInterval(timer); // Xóa timer khi component bị unmount
  }, []);

  useEffect(() => {
    setCurrentUser(user.account);
    fetchUserPosts(2);
  }, [user]);

  return (
    <>
      {" "}
      <div className="container mx-auto my-auto h-100">
        {currentUser ? (
          <>
            <div className="profile">
              <div className="info">
                <div className="content-info">
                  <p className="name">{currentUser.full_name}</p>
                  <p className="username">{currentUser.username}</p>
                  <p className="follower">203 followers</p>
                </div>
                <div className="avt">
                  {/* eslint-disable-next-line */}
                  <img
                    src={"http://localhost:5000" + currentUser.avatar_url}
                  ></img>
                </div>
              </div>
              <div className="btn-profile">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={() => setIsShowModalEditProfile(true)}
                >
                  Edit profiles
                </button>
                <button type="button" class="btn btn-outline-dark">
                  Share profile
                </button>
              </div>
            </div>

            <ModalEditProfile
              show={isShowModalEditProfile}
              onHide={onHideModalEditProfile}
              full_name={currentUser.full_name}
              email={currentUser.email}
              about_me={currentUser.about_me}
              address={currentUser.address}
              avatar_url={currentUser.avatar_url}
            />
          </>
        ) : (
          <></>
        )}

        <div className="threads">
          <div className="title">
            <div className="content-title selected">
              <p>Threads</p>
            </div>
            <div className="content-title">
              <p>Replies</p>
            </div>
          </div>
          {userPosts && userPosts.length > 0 ? (
            <>
              {userPosts.map((item, index) => {
                return (
                  <div className="content-threads">
                    <div className="content">
                      <div className="content-right">
                        <div className="logo">
                          <img
                            src={
                              "http://localhost:5000" + currentUser.avatar_url
                            }
                            alt="logo"
                            width="40"
                            height="40"
                          ></img>
                          <div className="follow">
                            <i class="fa-solid fa-circle-plus"></i>
                          </div>
                        </div>
                      </div>
                      <div className="content-left">
                        <div className="top">
                          <div className="username">
                            {currentUser.username}
                            <i class="fa-solid fa-circle-check"></i>
                          </div>
                          <div className="time">
                            {getTimePost(item.created_at)}{" "}
                            <i class="fa-solid fa-ellipsis"></i>
                          </div>
                        </div>
                        <div className="title">{item.content}</div>
                        {item.media_url ? (
                          <div className="img-content">
                            <img
                              src={"http://localhost:5000" + item.media_url}
                              alt="img"
                              width="100%"
                              height="316"
                            ></img>
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="icon">
                          <i
                            className={
                              liked.includes(item.id)
                                ? "fa-solid fa-heart fa-lg liked"
                                : "fa-regular fa-heart fa-lg"
                            }
                            onClick={() => handleLike(item.id)}
                          ></i>
                          <i class="fa-regular fa-comment fa-lg"></i>
                          <i class="fa-solid fa-retweet fa-lg"></i>
                          <i class="fa-regular fa-share-from-square fa-lg"></i>
                        </div>
                        <div className="replies">4 replies</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
