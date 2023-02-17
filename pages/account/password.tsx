import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useRouter } from "next/router";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validatePassword } from "@/helpers/validate";
function Password() {
  const router = useRouter();
  const { user, getUser } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [currentPassword, setcurrentPassword] = useState("");
  const [currentPasswordError, setcurrentPasswordError] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [newPasswordError, setnewPasswordError] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState("");

  useEffect(() => {
    const cred = async () => {
      if (user.jwt == undefined) {
        await getUser();
      }
    };
    cred();
  }, [user]);
  const update = () => {
    setLoading(true);
    axios
      .post(
        "http://localhost:1337/api/auth/change-password",
        {
          currentPassword: currentPassword,
          password: newPassword,
          passwordConfirmation: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      )
      .then((response) => {
        toast.success("Profile updated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setLoading(false);
        setcurrentPassword("");
        setnewPassword("");
        setconfirmPassword("");
      })
      .catch((e) => {
        toast.error(`${e?.response?.data?.error?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
        setLoading(false);
      });
  };
  function isEnableUpdate() {
    return (
      currentPassword != "" &&
      currentPasswordError == "" &&
      newPassword != "" &&
      newPasswordError == "" &&
      confirmPassword != "" &&
      confirmPasswordError == ""
    );
  }
  return (
    <>
      <ToastContainer />
      <Header />
      <div className="auth-wrap">
        <img
          src="/images/arrow-down.png"
          className="goBack"
          onClick={() => router.back()}
        />
        <div className="wrap f-p">
          <h1>Password</h1>
          <div className="auth-select active ">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className="m-input"
                placeholder="Current Password"
                type="password"
                value={currentPassword}
                onChange={(event) => {
                  setcurrentPassword(event.target.value);
                }}
              />
              {currentPasswordError && (
                <p className="error">{currentPasswordError}</p>
              )}
              <input
                className="m-input"
                placeholder="New Password"
                type="password"
                value={newPassword}
                onChange={(event) => {
                  setnewPassword(event.target.value);
                  validatePassword(newPassword, setnewPasswordError);
                }}
              />
              {newPasswordError && <p className="error">{newPasswordError}</p>}

              <input
                className="m-input"
                placeholder="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(event) => {
                  setconfirmPassword(event.target.value);
                  if (event.target.value != newPassword) {
                    setconfirmPasswordError("Password mismatch");
                  } else {
                    setconfirmPasswordError("");
                  }
                }}
              />
              {confirmPasswordError && (
                <p className="error">{confirmPasswordError}</p>
              )}

              <button
                className="p-btn p-btn2"
                style={{ opacity: isEnableUpdate() ? 1 : 0.8 }}
                onClick={() => (isEnableUpdate() ? update() : "")}
              >
                <span>Change Password</span>
                {loading && (
                  <div className="lds-ripple">
                    <div></div>
                    <div></div>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Password;
