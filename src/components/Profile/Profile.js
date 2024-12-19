import { useContext, useEffect, useState } from "react";
import "./Profile.css";
import {
  getUserPosts,
  likePost,
  getUserLiked,
  unLikePost,
  getUserFollowers,
} from "../../services/userService";
import { UserContext } from "../../context/UserContext";
import ModalEditProfile from "./ModalEditProfile";
import ModalThread from "../Thread/ModalThread";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [liked, setLiked] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());
  const [isShowModalEditProfile, setIsShowModalEditProfile] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isShowModalThread, setIsShowModalThread] = useState(false);

  const onHideModalThread = () => {
    setIsShowModalThread(false);
    setSelectedItem(null);
  };

  const getLikedFromModal = (state, post_id) => {
    if (state === true) {
      setLiked((prev) => [...prev, post_id]);
      likePost(post_id);
    } else {
      setLiked(liked.filter((likedId) => likedId !== post_id));
      unLikePost(post_id);
    }
  };

  // Trạng thái để quản lý tab đang chọn
  const [activeTab, setActiveTab] = useState("Threads");

  const handleLike = async (post_id) => {
    if (liked.includes(post_id)) {
      await unLikePost(post_id);
    } else {
      await likePost(post_id);
    }
    await fetchLike();
  };

  const fetchFollow = async (id) => {
    let response = await getUserFollowers(id);
    if (response && +response.status === 200) {
      setFollowers(response.followers);
    }
  };

  const fetchLike = async () => {
    let response = await getUserLiked();
    let data = [];
    if (response && +response.status === 200) {
      response.posts.forEach((element) => {
        data.push(element.id);
      });
    }
    setLiked(data);
  };

  const fetchUserPosts = async (id) => {
    let response = await getUserPosts(id);
    if (response && +response.status === 200) {
      setUserPosts(response.posts);
    }
  };

  useEffect(() => {
    setCurrentUser(user.account);
    fetchUserPosts(user.account.id);
    fetchFollow(user.account.id);
  }, [user]);

  useEffect(() => {
    fetchLike();
  }, [userPosts]);

  const onHideModalEditProfile = () => {
    setIsShowModalEditProfile(false);
  };

  return (
    <div className="container mx-auto my-auto">
      {currentUser ? (
        <>
          <div className="profile">
            <div className="info">
              <div className="content-info">
                <p className="name">{currentUser.full_name}</p>
                <p className="username">{currentUser.username}</p>
                <p className="follower">{followers.length} followers</p>
              </div>
              <div className="avt">
                <img
                  src={"http://localhost:5000" + currentUser.avatar_url}
                  alt="avatar"
                />
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
              <button type="button" className="btn btn-outline-dark">
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
      ) : null}

      {/* Tabs */}
      <div className="threads">
        <div className="title">
          <div
            className={`content-title ${
              activeTab === "Threads" ? "selected" : ""
            }`}
            onClick={() => setActiveTab("Threads")}
          >
            <p>Threads</p>
          </div>
          <div
            className={`content-title ${
              activeTab === "Followers" ? "selected" : ""
            }`}
            onClick={() => setActiveTab("Followers")}
          >
            <p>Followers</p>
          </div>
        </div>

        {/* Nội dung của tab */}
        {activeTab === "Threads" && (
          <>
            {userPosts && userPosts.length > 0 ? (
              <>
                {userPosts.map((item) => (
                  <div className="content-post" key={item.id}>
                    {/* <div className="content"> */}
                    <div className="content-right">
                      <div className="logo">
                        <img
                          src={"http://localhost:5000" + currentUser.avatar_url}
                          alt="logo"
                          width="40"
                          height="40"
                        />
                        <div className="follow">
                          <i className="fa-solid fa-circle-plus"></i>
                        </div>
                      </div>
                    </div>
                    <div className="content-left">
                      <div className="top">
                        <div className="username">
                          {currentUser.username}
                          <i className="fa-solid fa-circle-check"></i>
                        </div>
                        <div className="time">
                          {new Date(item.created_at).toLocaleString()}{" "}
                          <i className="fa-solid fa-ellipsis"></i>
                        </div>
                      </div>
                      <div className="title">{item.content}</div>
                      {item.media_url && (
                        <div className="img-content">
                          <img
                            src={"http://localhost:5000" + item.media_url}
                            alt="img"
                            width="100%"
                            height="316"
                          />
                        </div>
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
                        <i
                          className="fa-regular fa-comment fa-lg"
                          onClick={() => {
                            setSelectedItem(item);
                            setIsShowModalThread(true);
                          }}
                        ></i>
                        <i className="fa-solid fa-retweet fa-lg"></i>
                        <i className="fa-regular fa-share-from-square fa-lg"></i>
                      </div>
                      {/* <div className="replies">4 replies</div> */}
                    </div>
                    {/* </div> */}
                  </div>
                ))}
              </>
            ) : (
              <p>No threads available.</p>
            )}
          </>
        )}

        {activeTab === "Followers" && (
          <div className="followers-list">
            {followers && followers.length > 0 ? (
              followers.map((follower) => (
                <div className="item">
                  <div className="avt">
                    <img
                      src={"http://localhost:5000" + follower.media_url}
                      width={50}
                      height={50}
                    ></img>
                  </div>
                  <div className="info-user">
                    <div className="info">
                      <p className="username">{follower.username}</p>
                      {/* <p className="followers">22k followers</p> */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No followers yet.</p>
            )}
          </div>
        )}
        {selectedItem ? (
          <>
            <ModalThread
              show={isShowModalThread}
              onHide={onHideModalThread}
              setLiked={(state, post_id) => getLikedFromModal(state, post_id)}
              liked={liked.includes(selectedItem.id)}
              currentPost={selectedItem}
              user={user}
              dateTime={dateTime}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profile;
