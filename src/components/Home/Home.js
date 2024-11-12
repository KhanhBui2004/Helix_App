import { useContext, useEffect, useState } from "react";
import "./Home.css";
import {
  getPosts,
  likePost,
  getLiked,
  unLikePost,
} from "../../services/userService";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

const Home = (props) => {
  const { user } = useContext(UserContext);
  const [listView, setListView] = useState(false);
  const [Post, setPost] = useState([]);
  const [liked, setLiked] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());

  const handleLike = async (post_id) => {
    if (liked.includes(post_id)) {
      let response = await unLikePost(post_id);
    } else {
      let response = await likePost(post_id);
    }
    await fetchLike();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 60000); // Cập nhật mỗi phút

    return () => clearInterval(timer); // Xóa timer khi component bị unmount
  }, []);

  const fetchPost = async () => {
    let data = await getPosts();
    setPost(data.posts);
  };

  const fetchLike = async () => {
    let data = [];
    for (let element of Post) {
      let response = await getLiked(element.id); // Chờ từng response trước khi tiếp tục
      if (response && +response.status === 200) {
        data.push(element.id);
      }
    }

    setLiked(data);
  };

  useEffect(() => {
    fetchLike();
  }, [Post]);

  useEffect(() => {
    console.log("liked: " + liked);
  }, [liked]);

  const getTimePost = (postDate) => {
    let date2 = new Date(postDate + " GMT+0700");

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
    fetchPost();
  }, []);

  return (
    <>
      <div className="aaaa">
        For you{" "}
        <i
          class="fa-solid fa-angle-down"
          onClick={() => setListView(!listView)}
        ></i>
        <div className={listView ? "list-view" : "hide-list-view"}>
          <ul>
            <li>For you</li>
            <li>Following</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto my-auto">
        <div className="post">
          <div className="logo">
            <img
              src={"http://localhost:5000" + user.account.avatar_url}
              alt="logo"
              width="40"
              height="40"
            ></img>
            <a>What's new?</a>
          </div>
          <Link to={"/new-thread"}>
            <button type="button" class="btn btn-outline-secondary">
              Post
            </button>
          </Link>
        </div>

        {Post && Post.length > 0 ? (
          <>
            {Post.map((item, index) => {
              return (
                <>
                  <div className="content">
                    <div className="content-right">
                      <div className="logo">
                        <img
                          src={"http://localhost:5000" + item.avatar}
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
                          {item.author}
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
                </>
              );
            })}
          </>
        ) : (
          <> Không có bài đăng</>
        )}
      </div>
    </>
  );
};
export default Home;
