import "./SignUp.css";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerNewUser } from "../../services/userService";
import { UserContext } from "../../context/UserContext";

const SignUp = (props) => {
  const { user } = useContext(UserContext);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidInput = {
    isFName: true,
    isValidEmail: true,
    isUsername: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  let navigate = useNavigate();

  useEffect(() => {
    if (user && user.isAuthenticated) {
      navigate("/");
    }
  }, []);

  const isValidInput = () => {
    setObjCheckInput(defaultValidInput);

    if (!fullName) {
      toast.error("Full name is required");
      setObjCheckInput({ ...defaultValidInput, isFName: false });
      return false;
    }
    if (!email) {
      toast.error("Email is required");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("Please enter a valid email address");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    if (!username) {
      toast.error("User name is required");
      setObjCheckInput({ ...defaultValidInput, isUsername: false });
      return false;
    } else {
      if (username.length < 3) {
        toast.error("User name is too short!");
        setObjCheckInput({ ...defaultValidInput, isUsername: false });
        return false;
      } else if (username.length > 30) {
        toast.error("User name is too long!");
        setObjCheckInput({ ...defaultValidInput, isUsername: false });
        return false;
      }
    }
    if (!password) {
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      toast.error("Password is required");
      return false;
    }

    if (password !== confirmPassword) {
      setObjCheckInput({
        ...defaultValidInput,
        isValidConfirmPassword: false,
      });
      toast.error("Your password is not the same");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    let check = isValidInput();

    if (check === true) {
      let serverData = await registerNewUser(
        fullName,
        email,
        username,
        password
      );
      if (+serverData.status === 201) {
        toast.success(serverData.message);
        navigate("/login");
      } else {
        toast.error(serverData.message);
      }
    }
  };

  return (
    <>
      <div class="wrapper">
        <div class="d-flex align-items-center justify-content-center my-5 my-lg-0">
          <div class="container-fluid">
            <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
              <div class="col mx-auto">
                <div class="card">
                  <div class="card-body">
                    <div class="border p-4 rounded">
                      <Link to="/">
                        <div class="d-flex align-items-center justify-content-center">
                          <img
                            src="/img/logo_Helix.png"
                            width="50"
                            height="50"
                            className="d-inline-block align-top me-3"
                            alt="Logo"
                          />
                          <h3 class="">Register</h3>
                        </div>
                      </Link>
                      <div className="mb-3 gap-1 d-flex text-center">
                        <p>Already have an account?</p>
                        <Link to="/login"> Login here</Link>
                      </div>
                      <div class="form-body">
                        <form class="row g-3">
                          <div class="col-12">
                            <label for="inputFullName" class="form-label">
                              Full Name
                            </label>
                            <input
                              type="text"
                              className={
                                objCheckInput.isFName
                                  ? "form-control"
                                  : "form-control is-invalid"
                              }
                              id="inputFullName"
                              placeholder="Jhon Athew"
                              onChange={(event) =>
                                setFullName(event.target.value)
                              }
                            ></input>
                          </div>
                          <div class="col-12">
                            <label for="inputEmailAddress" class="form-label">
                              Email Address
                            </label>
                            <input
                              type="text"
                              className={
                                objCheckInput.isValidEmail
                                  ? "form-control"
                                  : "form-control is-invalid"
                              }
                              placeholder="Email address"
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                            />
                          </div>
                          <div class="col-12">
                            <label for="inputEmailAddress" class="form-label">
                              Username
                            </label>
                            <input
                              type="text"
                              className={
                                objCheckInput.isUsername
                                  ? "form-control"
                                  : "form-control is-invalid"
                              }
                              placeholder="Username"
                              value={username}
                              onChange={(event) =>
                                setUsername(event.target.value)
                              }
                            />
                          </div>
                          <div class="col-12">
                            <label for="inputChoosePassword" class="form-label">
                              Password
                            </label>
                            <div class="input-group" id="show_hide_password">
                              <input
                                type="password"
                                className={
                                  objCheckInput.isValidPassword
                                    ? "form-control"
                                    : "form-control is-invalid"
                                }
                                placeholder="Password"
                                value={password}
                                onChange={(event) =>
                                  setPassword(event.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div class="col-12">
                            <label for="inputChoosePassword" class="form-label">
                              Re-Enter Password
                            </label>
                            <div class="input-group" id="show_hide_password">
                              <input
                                type="password"
                                className={
                                  objCheckInput.isValidConfirmPassword
                                    ? "form-control"
                                    : "form-control is-invalid"
                                }
                                placeholder="Re-enter Password"
                                value={confirmPassword}
                                onChange={(event) =>
                                  setConfirmPassword(event.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="d-grid">
                              <button
                                className="btn btn-success"
                                type="button"
                                onClick={() => handleRegister()}
                              >
                                Register
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
