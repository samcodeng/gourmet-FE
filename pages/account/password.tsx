import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useRouter } from "next/router";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validatePassword } from "@/helpers/validate";
import Cookies from "js-cookie";
import * as cookie from "cookie";
import { API_URL } from "@/helpers/constants";
function Password({ user }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentPassword, setcurrentPassword] = useState("");
  const [currentPasswordError, setcurrentPasswordError] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [newPasswordError, setnewPasswordError] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState("");

  const update = () => {
    setLoading(true);
    axios
      .post(
        API_URL + "/updatePassword",
        {
          password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        toast.success("Password updated!", {
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
        toast.error(`${e?.response?.data?.message}`, {
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
                <p className="mt-0 error">{currentPasswordError}</p>
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
              {newPasswordError && (
                <p className="mt-0 error">{newPasswordError}</p>
              )}

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
                <p className="mt-0 error">{confirmPasswordError}</p>
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

export async function getServerSideProps(context: any) {
  let cookies = context.req.headers.cookie;
  let userInfo;
  let user;
  if (cookies) {
    cookies = cookie.parse(cookies);
    userInfo = cookies.gourmetUser;
    if (userInfo) {
      user = JSON.parse(userInfo);
    }
  }
  if (userInfo) {
    return {
      props: { user },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/account/auth",
      },
      props: {},
    };
  }
}
