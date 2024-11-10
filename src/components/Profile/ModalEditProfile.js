import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { updateUser } from "../../services/userService";
import { toast } from "react-toastify";

const ModalEditProfile = (props) => {
  const { full_name, email, about_me, address, avatar_url } = props;

  const [info, setInfo] = useState({
    full_name: "",
    email: "",
    about_me: "",
    address: "",
    avatar_url: "",
  });

  useEffect(() => {
    info.full_name = full_name;
    info.email = email;
    info.about_me = about_me;
    info.address = address;
    info.avatar_url = avatar_url;
  }, [full_name, email, about_me, address, avatar_url]);

  const changeInfo = (key, dataChange) => {
    setInfo((prevState) => ({
      ...prevState,
      [key]: dataChange,
    }));
  };

  const handleUpdateUser = async () => {
    const formData = new FormData(document.getElementById("profileForm"));

    for (let [key, value] of formData.entries()) {
      console.log(key, value); // Kiểm tra từng phần tử trong formData
    }

    try {
      let response = await updateUser(formData);
      if (response && +response.status === 200) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to update profile.");
    }
  };

  useEffect(() => {
    console.log(info);
  }, [info]);

  const handleCloseModalSelectJob = () => {
    props.onHide();
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        onHide={() => handleCloseModalSelectJob()}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>Profile</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-lg-12">
            <div className="row gap-3">
              <form id="profileForm">
                <div className="col-md-12">
                  <label for="name" class="form-label">
                    Name:
                  </label>
                  <input
                    id="name"
                    name="full_name"
                    type="text"
                    class="form-control"
                    value={info.full_name}
                    onChange={(event) =>
                      changeInfo("full_name", event.target.value)
                    }
                  />
                </div>
                <div className="col-md-12">
                  <label for="email" class="form-label">
                    Email:
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    class="form-control"
                    value={info.email}
                    onChange={(event) =>
                      changeInfo("email", event.target.value)
                    }
                  />
                </div>
                <div className="col-md-12">
                  <label for="about_me" class="form-label">
                    About Me:
                  </label>
                  <input
                    id="about_me"
                    name="about_me"
                    type="text"
                    class="form-control"
                    value={info.about_me}
                    onChange={(event) =>
                      changeInfo("about_me", event.target.value)
                    }
                  />
                </div>
                <div className="col-md-12">
                  <label for="address" class="form-label">
                    Address:
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    class="form-control"
                    value={info.address}
                    onChange={(event) =>
                      changeInfo("address", event.target.value)
                    }
                  />
                </div>
                <div className="col-md-12">
                  <label for="media_url" class="form-label">
                    Avatar:
                  </label>
                  <input
                    id="avatar"
                    name="media_url"
                    type="file"
                    class="form-control"
                    // value={info.avatar_url}
                    // onChange={(event) =>
                    //   changeInfo("avatar_url", event.target.value)
                    // }
                  />
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => handleUpdateUser()}>
            Update
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleCloseModalSelectJob()}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditProfile;
