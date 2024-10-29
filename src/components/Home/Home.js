import "./Home.css";
const Home = (props) => {
  return (
    <>
      <div className="container mx-auto">
        <div className="content">
          <div className="content-right">
            <div className="logo">
              <img
                src="https://s3-alpha-sig.figma.com/img/ca90/278b/f58ea0a1bf503decb9c4af199a562b47?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M8YW7tpvAYv4b1SWHqFUQO4iei-EU0dFSsc72UFu5zktFM1B19NwfkZ3WEPtXV1KGs~2x20pfggu5BbQWQy~2D0GPjnDJoZWN3Vs-xQrE7TJojCj0UUHIG~9Ho0GD3m2Sl6yK2rJ56LPIrwOouuE3zYRJ4h-6GQxJG~26Kp2-ZB~z1gWjl6mH7L4DvPSWbObdvfpJH57LLxdWe1SocCExrkka-AXKtZ-QjgyTyB9NVzQkaSFg8l8wn1I5~LWWXEZHNqEA0wCFxNCAHhsk88qpVSa1w45sAYi85b3P3Eev77SMLymkPSY7eGC~NQGC-eS~KOehAqnHeP-IqA6Uh80eA__"
                alt="logo"
                width="36"
                height="36"
              ></img>
              <div className="follow">
                <i class="fa-solid fa-circle-plus"></i>
              </div>
            </div>
          </div>
          <div className="content-left">
            <div className="top">
              <div className="username">
                paulo.neves
                <i class="fa-solid fa-circle-check"></i>
              </div>
              <div className="time">
                12m <i class="fa-solid fa-ellipsis"></i>
              </div>
            </div>
            <div className="title">
              "It's mushroom risotto night over here! Who else loves cooking on
              Friday nights?
            </div>
            <div className="img-content">
              <img
                src="https://s3-alpha-sig.figma.com/img/8a43/0bc7/af5a1a1f09d20351ee03ca4516da513f?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=INsCzOqwVbwbIVh5x8BRI~J9sxWUFAVqIIuGAKnK~idw8lxsgW1~gAv2XofE3hBpjuOsxh~1JL0djk0HrCu6wVXUlGWao2JITK7o6sfg2votJJgR4OH253bN7EF7nIBtxBLWYWN8xLHWjoNizfmk9gxf0plsd53LzqGNuwQDuirKhgrrJ2aDM2JpRp0Pix7DjzK8vYnr-5EcG5vrJ7kQtqw2-wzuGFundAeb8gQ9hjbtunYjAxNPBe7eo0dm8Y0i6XOBiR88YJlutfbaLzpAfyDcQ-BFxGO~3aaZd7WVqPTkLFooneRWwajQZUQa~v1Us035Cbrljme9obBYdP4IeQ__"
                alt="img"
                width="100%"
                height="316"
              ></img>
            </div>
            <div className="icon">
              <i class="fa-regular fa-heart fa-lg"></i>
              <i class="fa-regular fa-comment fa-lg"></i>
              <i class="fa-solid fa-retweet fa-lg"></i>
              <i class="fa-regular fa-share-from-square fa-lg"></i>
            </div>
            <div className="replies">4 replies</div>
          </div>
        </div>

        <div className="content">
          <div className="content-right">
            <div className="logo">
              <img
                src="https://s3-alpha-sig.figma.com/img/df7f/00ca/524bc81bec138086d77ae6cf7c219a52?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SY0QJxlZcfF9Ywva4kWxBqmo0CFW4pBl3NnzIVSnWAxKCn7KF--ZZHkSq~RTqAHr-vOU-zsxo8Ib6xpqvniMGdHsJYx~0OSZ3bQSOq~RUkJd6dVmnP7dbC3sx3cOrF3g9PA-KVh9wGTLgPXYmxv~nwvHHzAY8gklyNbnKyI7pSljNeCINuTpCfASDBuww-haxTteRvWwUSeAZy~CR-ARwHcA3kEgZvCiJyf7R-8NVwKNirpfJCkk9GOr1LV1TnEsJxI4JS6Pc6nJYAarOTNH5SWcgIHADbe-Ie776k3fNKGh4TVjZWAY6wUK0Aa9wVDrdtMqAlMxdZZ7DWfg1Y6lxw__"
                alt="logo"
                width="36"
                height="36"
              ></img>
              <div className="follow">
                <i class="fa-solid fa-circle-plus"></i>
              </div>
            </div>
          </div>
          <div className="content-left">
            <div className="top">
              <div className="username">
                Juliasouza
                <i class="fa-solid fa-circle-check"></i>
              </div>
              <div className="time">
                12m <i class="fa-solid fa-ellipsis"></i>
              </div>
            </div>
            <div className="title">
              "Today's outfit is a floral dress with combat boots. Who said we
              can't mix and match?
            </div>
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
    </>
  );
};
export default Home;
