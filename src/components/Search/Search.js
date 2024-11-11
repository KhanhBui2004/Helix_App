import "./Search.css";
import { useEffect, useState } from "react";
import { getUserByUsername } from "../../services/userService";

const Search = () => {
  const [valueSearch, setValueSearch] = useState("");
  const [listUser, setListUser] = useState([]);

  const fetchListUser = async (username) => {
    let response = await getUserByUsername(username);
    if (response && +response.status === 200) setListUser(response.users);
    else setListUser([]);
  };

  useEffect(() => {
    console.log(valueSearch);

    if (valueSearch != "") fetchListUser(valueSearch);
  }, [valueSearch]);

  return (
    <>
      <div className="container mx-auto my-auto h-100">
        <form className="form-search">
          <label for="search">
            <i class="fa-solid fa-magnifying-glass "></i>
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search"
            value={valueSearch}
            onChange={(event) => setValueSearch(event.target.value)}
          ></input>
        </form>

        <div className="search-content">
          {listUser && listUser.length > 0 ? (
            <>
              {listUser.map((item, index) => {
                return (
                  <>
                    <div className="item">
                      <div className="avt">
                        <img
                          src={"http://localhost:5000" + item.media_url}
                          width={50}
                          height={50}
                        ></img>
                      </div>
                      <div className="info-user">
                        <div className="info">
                          <p className="username">{item.username}</p>
                          <p className="followers">22k followers</p>
                        </div>
                        <div className="btn-follow">
                          <button type="button" class="btn btn-outline-dark">
                            Follow
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <>Không tìm thấy người dùng</>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
