import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as cookie from "cookie";
import { API_URL } from "@/helpers/constants";
import back from "../../../public/images/arrow-down.png";
import Image from "next/image";

function Address({ user }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const refContainer = useRef(null);
  const firstName = useRef<any>(null);
  const lastName = useRef<any>(null);
  const number = useRef<any>(null);
  const alternateNumber = useRef<any>(null);
  const address = useRef<any>(null);
  const zipcode = useRef<any>(null);
  const state = useRef<any>(null);
  const city = useRef<any>(null);
  const [errors, seterrors] = useState<any>({});
  const [addressed, setaddressed] = useState<any>({});
  const { savedAddress } = useContext(AppContext);
  useEffect(() => {
    const cred = async () => {
      if (savedAddress) {
        setaddressed(savedAddress);
      } else {
        axios
          .get(API_URL + "/address/" + router.query.id, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((response) => {
            let data = response.data;
            setaddressed(data);
          })
          .catch(() => {});
      }
    };
    cred();
  }, [router]);
  const add = () => {
    setLoading(true);
    axios
      .post(
        API_URL + "/updateAddress/",
        {
          phone_number: number.current.value,
          alt_phone_number: alternateNumber.current.value,
          first_name: firstName.current.value,
          last_name: lastName.current.value,
          zip_code: zipcode.current.value,
          city: city.current.value,
          state: state.current.value,
          address: address.current.value,
          id: router.query.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        toast.success("Address updated", {
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

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="auth-wrap">
        <Image
          src={back}
          className="goBack"
          onClick={() => router.back()}
          alt="back"
        />
        <div className="wrap f-p">
          <h1>Address</h1>
          <div className="auth-select active ">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className="m-input"
                placeholder="First Name"
                defaultValue={addressed?.first_name}
                ref={firstName}
              />
              <span className="error">{errors?.first_name}</span>

              <input
                className="m-input"
                placeholder="Last Name"
                defaultValue={addressed?.last_name}
                ref={lastName}
              />
              <span className="error">{errors?.last_name}</span>

              <input
                className="m-input"
                placeholder="Phone number"
                defaultValue={addressed?.phone_number}
                ref={number}
              />
              <span className="error">{errors?.phone_number}</span>

              <input
                className="m-input"
                placeholder="Alt. Phone number (optional)"
                ref={alternateNumber}
                defaultValue={addressed?.alt_phone_number}
              />
              <span className="error">{errors?.alt_phone_number}</span>

              <input
                className="m-input"
                placeholder="Address"
                ref={address}
                defaultValue={addressed?.address}
              />
              <span className="error">{errors?.address}</span>

              <input
                className="m-input"
                placeholder="Zip Code (optional)"
                ref={zipcode}
                defaultValue={addressed?.zip_code}
              />
              <span className="error">{errors?.zip_code}</span>

              <input
                className="m-input"
                placeholder="State"
                ref={state}
                defaultValue={addressed?.state}
              />
              <span className="error">{errors?.state}</span>

              <input
                className="m-input"
                placeholder="City"
                ref={city}
                defaultValue={addressed?.city}
              />
              <span className="error">{errors?.city}</span>

              <button className="p-btn p-btn2" onClick={() => add()}>
                <span>UPDATE ADDRESS</span>{" "}
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

export default Address;

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
