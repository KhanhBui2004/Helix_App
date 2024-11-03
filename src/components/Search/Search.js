import "./Search.css";
const Search = () => {
  return (
    <>
      <div className="container mx-auto my-auto h-100">
        <form className="form-search">
          <label for="search">
            <i class="fa-solid fa-magnifying-glass "></i>
          </label>
          <input type="text" id="search" placeholder="Search"></input>
        </form>

        <div className="search-content">
          <div className="item">
            <div className="avt">
              <img
                src="https://s3-alpha-sig.figma.com/img/ca90/278b/f58ea0a1bf503decb9c4af199a562b47?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M8YW7tpvAYv4b1SWHqFUQO4iei-EU0dFSsc72UFu5zktFM1B19NwfkZ3WEPtXV1KGs~2x20pfggu5BbQWQy~2D0GPjnDJoZWN3Vs-xQrE7TJojCj0UUHIG~9Ho0GD3m2Sl6yK2rJ56LPIrwOouuE3zYRJ4h-6GQxJG~26Kp2-ZB~z1gWjl6mH7L4DvPSWbObdvfpJH57LLxdWe1SocCExrkka-AXKtZ-QjgyTyB9NVzQkaSFg8l8wn1I5~LWWXEZHNqEA0wCFxNCAHhsk88qpVSa1w45sAYi85b3P3Eev77SMLymkPSY7eGC~NQGC-eS~KOehAqnHeP-IqA6Uh80eA__"
                width={50}
                height={50}
              ></img>
            </div>
            <div className="info-user">
              <div className="info">
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

          <div className="item">
            <div className="avt">
              <img
                src="https://s3-alpha-sig.figma.com/img/ca90/278b/f58ea0a1bf503decb9c4af199a562b47?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M8YW7tpvAYv4b1SWHqFUQO4iei-EU0dFSsc72UFu5zktFM1B19NwfkZ3WEPtXV1KGs~2x20pfggu5BbQWQy~2D0GPjnDJoZWN3Vs-xQrE7TJojCj0UUHIG~9Ho0GD3m2Sl6yK2rJ56LPIrwOouuE3zYRJ4h-6GQxJG~26Kp2-ZB~z1gWjl6mH7L4DvPSWbObdvfpJH57LLxdWe1SocCExrkka-AXKtZ-QjgyTyB9NVzQkaSFg8l8wn1I5~LWWXEZHNqEA0wCFxNCAHhsk88qpVSa1w45sAYi85b3P3Eev77SMLymkPSY7eGC~NQGC-eS~KOehAqnHeP-IqA6Uh80eA__"
                width={50}
                height={50}
              ></img>
            </div>
            <div className="info-user">
              <div className="info">
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

          <div className="item">
            <div className="avt">
              <img
                src="https://s3-alpha-sig.figma.com/img/ca90/278b/f58ea0a1bf503decb9c4af199a562b47?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M8YW7tpvAYv4b1SWHqFUQO4iei-EU0dFSsc72UFu5zktFM1B19NwfkZ3WEPtXV1KGs~2x20pfggu5BbQWQy~2D0GPjnDJoZWN3Vs-xQrE7TJojCj0UUHIG~9Ho0GD3m2Sl6yK2rJ56LPIrwOouuE3zYRJ4h-6GQxJG~26Kp2-ZB~z1gWjl6mH7L4DvPSWbObdvfpJH57LLxdWe1SocCExrkka-AXKtZ-QjgyTyB9NVzQkaSFg8l8wn1I5~LWWXEZHNqEA0wCFxNCAHhsk88qpVSa1w45sAYi85b3P3Eev77SMLymkPSY7eGC~NQGC-eS~KOehAqnHeP-IqA6Uh80eA__"
                width={50}
                height={50}
              ></img>
            </div>
            <div className="info-user">
              <div className="info">
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

          <div className="item">
            <div className="avt">
              <img
                src="https://s3-alpha-sig.figma.com/img/ca90/278b/f58ea0a1bf503decb9c4af199a562b47?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M8YW7tpvAYv4b1SWHqFUQO4iei-EU0dFSsc72UFu5zktFM1B19NwfkZ3WEPtXV1KGs~2x20pfggu5BbQWQy~2D0GPjnDJoZWN3Vs-xQrE7TJojCj0UUHIG~9Ho0GD3m2Sl6yK2rJ56LPIrwOouuE3zYRJ4h-6GQxJG~26Kp2-ZB~z1gWjl6mH7L4DvPSWbObdvfpJH57LLxdWe1SocCExrkka-AXKtZ-QjgyTyB9NVzQkaSFg8l8wn1I5~LWWXEZHNqEA0wCFxNCAHhsk88qpVSa1w45sAYi85b3P3Eev77SMLymkPSY7eGC~NQGC-eS~KOehAqnHeP-IqA6Uh80eA__"
                width={50}
                height={50}
              ></img>
            </div>
            <div className="info-user">
              <div className="info">
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
    </>
  );
};

export default Search;
