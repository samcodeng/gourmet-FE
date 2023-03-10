import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "js-cookie";
import * as cookie from "cookie";
import { API_URL } from "@/helpers/constants";

function PersonalDetails({ user }: any) {
  const [loading, setLoading] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [firstNameError, setfirstNameError] = useState("");
  const [lastName, setlastName] = useState("");
  const [lastNameError, setlastNameError] = useState("");
  const [number, setnumber] = useState("");
  const [numberError, setnumberError] = useState("");
  const [alternateNumber, setalternateNumber] = useState("");
  const [alternateNumberError, setaltNumberError] = useState("");
  useEffect(() => {
    const cred = async () => {
      console.log(user);
      setfirstName(user?.user?.first_name ? user?.user?.first_name : "");
      setlastName(user?.user?.last_name ? user?.user?.last_name : "");
      setnumber(user?.user?.phone ? user?.user?.phone : "");
      setalternateNumber(
        user?.user?.alt_phone_number ? user?.user?.alt_phone_number : ""
      );
    };
    cred();
  }, [user]);
  const update = () => {
    setLoading(true);
    axios
      .post(
        API_URL + "/updateProfile",
        {
          phone: number,
          alt_phone_number: alternateNumber,
          first_name: firstName,
          last_name: lastName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
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
        let newUser = user;
        newUser.user = response.data;
        newUser = JSON.stringify(newUser);
        Cookies.set("gourmetUser", newUser, {
          expires: 7,
        });
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error!", {
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
      });
  };
  const router = useRouter();

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
          <h1>Personal Details</h1>
          <div className="auth-select active ">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className="m-input"
                placeholder="First Name"
                value={firstName}
                onChange={(event) => {
                  setfirstName(event.target.value);
                }}
              />
              {firstNameError && <p className="error">{firstNameError}</p>}
              <input
                className="m-input"
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => {
                  setlastName(event.target.value);
                }}
              />
              {lastNameError && <p className="error">{lastNameError}</p>}

              <input
                className="m-input"
                placeholder="Phone number"
                value={number}
                onChange={(event) => {
                  setnumber(event.target.value);
                }}
              />
              {numberError && <p className="error">{numberError}</p>}

              <input
                className="m-input"
                placeholder="Alt. Phone number"
                value={alternateNumber}
                onChange={(event) => {
                  setalternateNumber(event.target.value);
                }}
              />
              {alternateNumberError && (
                <p className="error">{alternateNumberError}</p>
              )}

              <button className="p-btn p-btn2" onClick={() => update()}>
                <span>UPDATE PROFILE</span>{" "}
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

export default PersonalDetails;
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
