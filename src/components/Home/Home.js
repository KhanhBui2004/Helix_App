import { useEffect, useState } from "react";
import "./Home.css";
import { getPosts } from "../../services/userService";
const Home = (props) => {
  const [listView, setListView] = useState(false);
  const [Post, setPost] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());

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

  const getTimePost = (postDate) => {
    let date2 = new Date(postDate + "+0700");
    const differenceInMilliseconds = dateTime - date2;
    let sencond = Math.floor(differenceInMilliseconds / 1000);
    let minute = Math.floor(differenceInMilliseconds / (1000 * 60));
    let hour = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    let day = Math.floor(differenceInMilliseconds / (1000 * 60 * 24));
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
              src="https://s3-alpha-sig.figma.com/img/ca90/278b/f58ea0a1bf503decb9c4af199a562b47?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M8YW7tpvAYv4b1SWHqFUQO4iei-EU0dFSsc72UFu5zktFM1B19NwfkZ3WEPtXV1KGs~2x20pfggu5BbQWQy~2D0GPjnDJoZWN3Vs-xQrE7TJojCj0UUHIG~9Ho0GD3m2Sl6yK2rJ56LPIrwOouuE3zYRJ4h-6GQxJG~26Kp2-ZB~z1gWjl6mH7L4DvPSWbObdvfpJH57LLxdWe1SocCExrkka-AXKtZ-QjgyTyB9NVzQkaSFg8l8wn1I5~LWWXEZHNqEA0wCFxNCAHhsk88qpVSa1w45sAYi85b3P3Eev77SMLymkPSY7eGC~NQGC-eS~KOehAqnHeP-IqA6Uh80eA__"
              alt="logo"
              width="40"
              height="40"
            ></img>
            <a>What's new?</a>
          </div>
          <button type="button" class="btn btn-outline-secondary">
            Post
          </button>
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
                          src="https://s3-alpha-sig.figma.com/img/ca90/278b/f58ea0a1bf503decb9c4af199a562b47?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M8YW7tpvAYv4b1SWHqFUQO4iei-EU0dFSsc72UFu5zktFM1B19NwfkZ3WEPtXV1KGs~2x20pfggu5BbQWQy~2D0GPjnDJoZWN3Vs-xQrE7TJojCj0UUHIG~9Ho0GD3m2Sl6yK2rJ56LPIrwOouuE3zYRJ4h-6GQxJG~26Kp2-ZB~z1gWjl6mH7L4DvPSWbObdvfpJH57LLxdWe1SocCExrkka-AXKtZ-QjgyTyB9NVzQkaSFg8l8wn1I5~LWWXEZHNqEA0wCFxNCAHhsk88qpVSa1w45sAYi85b3P3Eev77SMLymkPSY7eGC~NQGC-eS~KOehAqnHeP-IqA6Uh80eA__"
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
