import { useState } from "react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import {
  isValidEmail,
  validateEmail,
  validatePassword,
} from "@/helpers/validate";
import { API_URL } from "@/helpers/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "js-cookie";
import * as cookie from "cookie";

function Account() {
  const [active, setActive] = useState(1);
  const [remember, setRemember] = useState(false);
  const [loading, setloading] = useState(false);
  const [showpassword, setshowpassword] = useState(true);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstName, setfirstName] = useState("");
  const [firstNameError, setfirstNameError] = useState("");
  const [lastName, setlastName] = useState("");
  const [lastNameError, setlastNameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const signIn = () => {
    setloading(true);
    axios
      .post(API_URL + "/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        let user = response.data;
        Cookies.set("gourmetUser", JSON.stringify(response.data), {
          expires: 7,
        });
        setloading(false);
        router.push("/account");
      })
      .catch((e) => {
        setError(true);
        setloading(false);
      });
  };
  const signUp = () => {
    setloading(true);
    axios
      .post(API_URL + "/signup", {
        email: email,
        username: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
      })
      .then((response) => {
        let user = response.data;
        Cookies.set("gourmetUser", JSON.stringify(response.data), {
          expires: 7,
        });
        setloading(false);
        router.push("/account");
      })
      .catch((error) => {
        toast.error("Failed", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setloading(false);
        setErrors(error?.response?.data?.errors);
      });
  };
  function isEnableSignUp() {
    return (
      email != "" &&
      password != "" &&
      firstName != "" &&
      emailError == "" &&
      passwordError == "" &&
      firstNameError == ""
    );
  }
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="auth-wrap">
        <div className="wrap">
          <h1>Welcome Back</h1>
          <div className="auth">
            <h3
              className={active == 1 ? "active" : ""}
              onClick={() => setActive(1)}
            >
              Sign In
            </h3>
            <h3
              className={active == 2 ? "active" : ""}
              onClick={() => setActive(2)}
            >
              Create Account
            </h3>
          </div>
          <div className={`auth-select ${active == 1 ? "active" : ""}`}>
            <p></p>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className="m-input"
                placeholder="Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                  validateEmail(event.target.value, setEmailError);
                }}
                value={email}
                autoComplete="false"
              />
              <div className="m-input-wrap">
                <input
                  value={password}
                  className="m-input"
                  placeholder="Password"
                  type={showpassword ? "password" : "text"}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    validatePassword(event.target.value, setPasswordError);
                  }}
                />
                <button
                  className="m-btn"
                  onClick={() => setshowpassword(!showpassword)}
                >
                  show
                </button>
              </div>
              {error && <p className="mt-0 error">Invalid email or password</p>}

              <Link href="/account/forgot-password" className="forgot">
                Forgot password?
              </Link>
              <div className="remember">
                <div
                  className={`m-check ${remember ? "active" : ""}`}
                  onClick={() => setRemember(!remember)}
                ></div>
                <p>Remember me (Optional)</p>
              </div>
              <button className="p-btn p-btn2" onClick={() => signIn()}>
                <span> SIGN IN</span>
                {loading && (
                  <div className="lds-ripple">
                    <div></div>
                    <div></div>
                  </div>
                )}
              </button>
            </form>
          </div>
          <div className={`auth-select ${active == 2 ? "active" : ""}`}>
            <p></p>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className="m-input"
                placeholder="First name"
                onChange={(event) => setfirstName(event.target.value)}
              />
              <span className="error">{errors?.first_name}</span>
              <input
                className="m-input"
                placeholder="Last name"
                onChange={(event) => setlastName(event.target.value)}
              />
              <span className="error">{errors?.last_name}</span>
              <input
                className="m-input"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <span className="error">{errors?.email || emailError}</span>

              <div className="m-input-wrap">
                <input
                  className="m-input"
                  placeholder="Password"
                  autoComplete="false"
                  type={showpassword ? "password" : "text"}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  className="m-btn"
                  onClick={() => setshowpassword(!showpassword)}
                >
                  show
                </button>
              </div>
              <span className="error">{errors?.password || passwordError}</span>
              <button
                className="p-btn p-btn2"
                style={{ opacity: isEnableSignUp() ? 1 : 0.8 }}
                onClick={() => (isEnableSignUp() ? signUp() : "")}
              >
                <span>CREATE ACCOUNT</span>{" "}
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

export default Account;

export async function getServerSideProps(context: any) {
  let cookies = context.req.headers.cookie;
  let userInfo;
  if (cookies) {
    cookies = cookie.parse(cookies);
    userInfo = cookies.gourmetUser;
  }
  if (userInfo) {
    return {
      redirect: {
        permanent: false,
        destination: "/account",
      },
      props: {},
    };
  } else {
    return {
      props: {},
    };
  }
}
