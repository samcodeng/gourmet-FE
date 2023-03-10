import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "@/context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@/helpers/constants";
import * as cookie from "cookie";
import back from "../../public/images/arrow-down.png";
import Image from "next/image";

function Addresses({ user }: any) {
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const router = useRouter();
  const { setSavedAddress } = useContext(AppContext);
  useEffect((): any => {
    const getAddresses = async () => {
      axios
        .get(API_URL + "/addresses", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setAddresses(response.data);
        })
        .catch(() => {});
    };
    getAddresses();
  }, [user]);
  const deleteAddress = (id: number) => {
    if (confirm("Delete Address?")) {
      setLoading(true);
      axios
        .delete(API_URL + "/address/" + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          let newAddresses = [...addresses];
          newAddresses = addresses.filter((el: any) => {
            return el.id != id;
          });
          setAddresses(newAddresses);
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
    } else {
    }
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
        <div className="wrap">
          <h1>Addresses</h1>
          <div className="auth-select active">
            {addresses.length == 0 ? (
              <p style={{ textAlign: "center", margin: "90px 0px" }}>
                No address added yet
              </p>
            ) : (
              addresses.map((item: any, index) => {
                return (
                  <div
                    onClick={() => {
                      setSavedAddress(item);
                      router.push("/account/address/" + item.id);
                    }}
                    key={index}
                    className="cursor-pointer addressSmall"
                  >
                    <div className="flex">
                      <svg
                        className="del"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteAddress(item.id);
                        }}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 5.98C17.67 5.65 14.32 5.48 10.98 5.48C9 5.48 7.02 5.58 5.04 5.78L3 5.98M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97M18.85 9.14L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5H13.66M9.5 12.5H14.5"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div>
                        <h2>{item.first_name + " " + item.last_name}</h2>
                        <p>{item.address}</p>
                      </div>
                    </div>
                    <svg
                      width="12"
                      height="19"
                      viewBox="0 0 12 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.90621 -5.90353e-08L11.334 9.42857L1.90621 18.8571L0.333985 17.2848L8.19176 9.42857L0.333984 1.57124L1.90621 -5.90353e-08Z"
                        fill="#D5D5D5"
                      />
                    </svg>
                  </div>
                );
              })
            )}
            <Link href="/account/add-address" className="p-btn p-btn1">
              <span>ADD ADDRESS</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Addresses;

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
