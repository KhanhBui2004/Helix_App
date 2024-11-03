import "./Profile.css";
const Profile = () => {
  return (
    <>
      {" "}
      <div className="container mx-auto my-auto h-100">
        <div className="profile">
          <div className="info">
            <div className="content-info">
              <p className="name">Name</p>
              <p className="username">username</p>
              <p className="follower">203 followers</p>
            </div>
            <div className="avt">
              <img src="https://s3-alpha-sig.figma.com/img/3f15/d45c/91f82e58c67b01ea096be1b0d8ea7095?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=msJ0gc7W71Rps7Fn0sf7ZuydzAIohRSqyWs9MTiVJP30ajjCO~Wj8Pr9ZUYrNGWDW8dzYpgUjjbiippZHsQHH13y4jxRpm~hMXgXeTg45wuHy5RS48wliaI9kMV2r~6PuV4SaFTsv4MNhuLhI3ry-QJ066m7Ef3kUkszZraFUpH629TG946sHzHQ2qmIpNxIQnaUEPNxu8cKHLk6fwiEmqGYka8M-Y2g070I0WrBdtT4uTLF3emW4MbwgcukOcjADb8GZs4FPWMMZr0GuMkaDi-T56m1JcZvCeJijBSQvJq3Qj6xLlTqg1YdGXlVJxv2LN9paGCrSJQRvg74K4U3lQ__"></img>
            </div>
          </div>
          <div className="btn-profile">
            <button type="button" class="btn btn-outline-dark">
              Edit profiles
            </button>
            <button type="button" class="btn btn-outline-dark">
              Share profile
            </button>
          </div>
        </div>
        <div className="threads">
          <div className="title">
            <div className="content-title selected">
              <p>Threads</p>
            </div>
            <div className="content-title">
              <p>Replies</p>
            </div>
          </div>
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
                    paulo.neves
                    <i class="fa-solid fa-circle-check"></i>
                  </div>
                  <div className="time">
                    12m <i class="fa-solid fa-ellipsis"></i>
                  </div>
                </div>
                <div className="title">
                  "It's mushroom risotto night over here! Who else loves cooking
                  on Friday nights?
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
                    src="https://s3-alpha-sig.figma.com/img/3f15/d45c/91f82e58c67b01ea096be1b0d8ea7095?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=msJ0gc7W71Rps7Fn0sf7ZuydzAIohRSqyWs9MTiVJP30ajjCO~Wj8Pr9ZUYrNGWDW8dzYpgUjjbiippZHsQHH13y4jxRpm~hMXgXeTg45wuHy5RS48wliaI9kMV2r~6PuV4SaFTsv4MNhuLhI3ry-QJ066m7Ef3kUkszZraFUpH629TG946sHzHQ2qmIpNxIQnaUEPNxu8cKHLk6fwiEmqGYka8M-Y2g070I0WrBdtT4uTLF3emW4MbwgcukOcjADb8GZs4FPWMMZr0GuMkaDi-T56m1JcZvCeJijBSQvJq3Qj6xLlTqg1YdGXlVJxv2LN9paGCrSJQRvg74K4U3lQ__"
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
                  "Today's outfit is a floral dress with combat boots. Who said
                  we can't mix and match?
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
        </div>
      </div>
    </>
  );
};

export default Profile;
