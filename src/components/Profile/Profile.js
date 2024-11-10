import { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { getUserPosts } from "../../services/userService";
import { UserContext } from "../../context/UserContext";
import ModalEditProfile from "./ModalEditProfile";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());

  const [isShowModalEditProfile, setIsShowModalEditProfile] = useState(false);

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
    fetchUserPosts(7);
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
                  <img src={currentUser.avatar_url}></img>
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
                            src="https://s3-alpha-sig.figma.com/img/3f15/d45c/91f82e58c67b01ea096be1b0d8ea7095?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=msJ0gc7W71Rps7Fn0sf7ZuydzAIohRSqyWs9MTiVJP30ajjCO~Wj8Pr9ZUYrNGWDW8dzYpgUjjbiippZHsQHH13y4jxRpm~hMXgXeTg45wuHy5RS48wliaI9kMV2r~6PuV4SaFTsv4MNhuLhI3ry-QJ066m7Ef3kUkszZraFUpH629TG946sHzHQ2qmIpNxIQnaUEPNxu8cKHLk6fwiEmqGYka8M-Y2g070I0WrBdtT4uTLF3emW4MbwgcukOcjADb8GZs4FPWMMZr0GuMkaDi-T56m1JcZvCeJijBSQvJq3Qj6xLlTqg1YdGXlVJxv2LN9paGCrSJQRvg74K4U3lQ__"
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
                              src={item.media_url}
                              alt="img"
                              width="100%"
                              height="316"
                            ></img>
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="icon">
                          <i class="fa-regular fa-heart fa-lg"></i>
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
