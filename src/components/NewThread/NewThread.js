// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "./NewThread.css";
import { postContent } from "../../services/userService";
import { UserContext } from "../../context/UserContext";

const NewThread = () => {
  const [Content, setContent] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const { user } = useContext(UserContext);

  const defaultValidInput = {
    isUrl: true,
    isContent: true,
  };

  // eslint-disable-next-line no-unused-vars
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const invalidInput = () => {
    if (!Content) {
      setObjCheckInput({ ...defaultValidInput, isContent: false });
      if (!imageSrc) {
        setObjCheckInput({ ...defaultValidInput, isUrl: false });
        toast.error("Please enter content or file!");
        return false;
      }
    }

    return true;
  };
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const handlePost = async () => {
    // Thêm logic đăng bài tại đây
    let check = invalidInput();

    if (check === true) {
      let serverData = await postContent(user.account.role, Content, imageSrc);
      if (+serverData.status === 201) {
        toast.success(serverData.message);
        setContent(""); // Xóa nội dung sau khi đăng
        setImageSrc("");
        navigate(-1);
      } else {
        toast.error(serverData.message);
      }
    }
  };

  const handleExit = () => {
    //Thoát giao diện thêm Thread
    navigate(-1);
  };

  const handleClickAddLink = () => {
    fileInputRef.current.click();
    // Thực hiện các hành động khác ở đây khi icon được nhấn
  };

  // Hàm xử lý khi chọn file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // Cập nhật URL hình ảnh vào state
      };
      reader.readAsDataURL(file);
      // Thực hiện các thao tác khác với file nếu cần, ví dụ: upload hoặc hiển thị ảnh
    }
  };

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // Reset lại chiều cao
    textarea.style.height = textarea.scrollHeight + "px"; // Đặt chiều cao dựa trên chiều cao nội dung
    setContent(textarea.value);
  };

  return (
    <Modal
      show={true}
      onHide={handleExit}
      centered
      className="custom-modal-size"
    >
      <Modal.Header closeButton>
        <Modal.Title>New Thread</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="Thread-input">
          <img src={user.account.avatar_url} alt="avatar" />
          <div className="right-part">
            <p className="username">{user.account.full_name}</p>
            <textarea
              className="post"
              placeholder="Start a thread"
              value={Content}
              rows={1}
              onChange={handleInput}
            />
            {imageSrc && (
              <div className="image-container" style={{ marginTop: "5px" }}>
                <img src={imageSrc} alt="Selected" />
              </div>
            )}
            <i
              class="fa-solid fa-link"
              onClick={handleClickAddLink}
              style={{ cursor: "pointer" }}
            ></i>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="post-button">
          <Button onClick={handlePost}>Post</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default NewThread;
