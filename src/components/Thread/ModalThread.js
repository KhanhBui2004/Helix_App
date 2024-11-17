import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ModalThread.css";
import { toast } from "react-toastify";
import { postComment, getPostComments } from "../../services/userService";

const ModalThread = (props) => {
  const { currentPost, user, dateTime, liked } = props;
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState({});

  const handlePostComment = async () => {
    if (comment === "") {
      toast.error("You haven't comment!!!");
      return;
    }
    let data = {
      post_id: currentPost.id,
      content: comment,
    };
    let response = await postComment(data);
    if (response && +response.status === 201) {
      await fetchComment();
      setComment("");
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const fetchComment = async () => {
    let response = await getPostComments(currentPost.id);
    if (response && +response.status === 200) {
      setPostComments(response.comments);
    }
  };

  const handleCloseModalThread = () => {
    setComment("");
    setPostComments({});
    props.onHide();
  };

  const handleLike = async (post_id) => {
    props.setLiked(!liked, post_id);
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
    if (props.show) {
      fetchComment();
    }
  }, [props.show, currentPost.id]);

  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        onHide={() => handleCloseModalThread()}
        backdropClassName="custom-backdrop"
      >
        <Modal.Body>
          <div className="content">
            <div className="content-right">
              <div className="logo">
                <img
                  src={"http://localhost:5000" + currentPost.avatar}
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
                <Link
                  className="link-profile"
                  to={
                    user.account.username === currentPost.author
                      ? "/profile"
                      : `/profile/${currentPost.author}`
                  }
                >
                  <div className="username">
                    {currentPost.author}
                    <i class="fa-solid fa-circle-check"></i>
                  </div>
                </Link>

                <div className="time">
                  {getTimePost(currentPost.created_at)}{" "}
                  <i class="fa-solid fa-ellipsis"></i>
                </div>
              </div>
              <div className="title">{currentPost.content}</div>
              {currentPost.media_url ? (
                <div className="img-content">
                  <img
                    src={"http://localhost:5000" + currentPost.media_url}
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
                    liked === true
                      ? "fa-solid fa-heart fa-lg liked"
                      : "fa-regular fa-heart fa-lg"
                  }
                  onClick={() => handleLike(currentPost.id)}
                ></i>
                <i class="fa-regular fa-comment fa-lg"></i>
                <i class="fa-solid fa-retweet fa-lg"></i>
                <i class="fa-regular fa-share-from-square fa-lg"></i>
              </div>
            </div>
          </div>
          <div className="comment">
            <div className="user-comment">
              <div className="avt col-1">
                <img
                  src={"http://localhost:5000" + currentPost.avatar}
                  alt="logo"
                  width="40"
                  height="40"
                ></img>
              </div>
              <div className="title col-10">
                <textarea
                  className="user-comment-area"
                  name="userCommentArea"
                  placeholder="Comment"
                  value={comment}
                  onChange={handleCommentChange}
                />
              </div>
              <div className="btn-comment col-1">
                <i
                  class="fa-solid fa-paper-plane fa-2x"
                  onClick={() => handlePostComment()}
                ></i>
              </div>
            </div>
            <div className="list-comment">
              {postComments && postComments.length > 0 ? (
                <>
                  {postComments.map((item, index) => {
                    return (
                      <>
                        <div className="content-comment">
                          <div className="user">
                            <div className="avt">
                              <img
                                src={"http://localhost:5000" + item.user.avt}
                                alt="logo"
                                width="40"
                                height="40"
                              ></img>
                              <p>{item.user.username}</p>
                            </div>
                            <div className="report">
                              <i class="fa-solid fa-flag"></i>
                            </div>
                          </div>
                          <div className="title">
                            <textarea
                              className="comment-area"
                              name="comment-area"
                              value={item.content}
                            />
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalThread;
