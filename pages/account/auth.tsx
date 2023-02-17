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
    console.log(email);
    axios
      .post("http://localhost:1337/api/auth/local/", {
        identifier: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem(
          "1ooampmsxmaopiyquqioamnomdiibsuvbubeiiowp",
          JSON.stringify(response.data)
        );
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
      .post("http://localhost:1337/api/auth/local/register", {
        email: email,
        username: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      })
      .then((response) => {
        localStorage.setItem(
          "1ooampmsxmaopiyquqioamnomdiibsuvbubeiiowp",
          JSON.stringify(response.data)
        );
        console.log(response.data);
        setloading(false);
        router.push("/account");
      })
      .catch((e) => {
        if (e.response.data.error.message) {
          if (
            (e.response.data.error.message =
              "Email or Username are already taken")
          ) {
            let nn = { ...errors };
            nn.email = "Email already taken";
            setErrors(nn);
          }
        }
        setloading(false);
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
              {error && <p className="error">Invalid email or password</p>}

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
              {firstNameError && <p className="error">{firstNameError}</p>}
              <input
                className="m-input"
                placeholder="Last name"
                onChange={(event) => setlastName(event.target.value)}
              />
              {lastNameError && <p className="error">{lastNameError}</p>}
              <input
                className="m-input"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
              {emailError ||
                (errors.email && (
                  <p className="error">{emailError || errors.email}</p>
                ))}
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
              {passwordError && <p className="error">{passwordError}</p>}
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
