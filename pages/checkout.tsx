import { useContext, useEffect, useRef, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { AppContext } from "../context/AppContext";
import Modal from "react-modal";
import { useRouter } from "next/router";
import Link from "next/link";
import img from "../public/images/success.gif";
import axios from "axios";
import {
  isValidEmail,
  validateEmail,
  validatePassword,
} from "@/helpers/validate";
import Image from "next/image";
import { API_URL, BACKEND_URL } from "@/helpers/constants";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import down from "../public/images/arrow-down.png";
import Cookies from "js-cookie";
import * as cookie from "cookie";

function CheckOut({ user }: any) {
  Modal.setAppElement("#__next");
  const { cartitems, formatNumber } = useContext(AppContext);
  const [loading, setloading] = useState(false);
  const [cloading, setcloading] = useState(false);
  const [password, setPassword] = useState("");
  const [delivery, setDelivery] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(false);
  const [active, setActive] = useState(1);
  const [addresses, setAddresses] = useState(user?.addresses);
  const [newAddress, setNewAddress] = useState(!user ? true : false);
  const [selectedAddress, setSelectedAddress] = useState<any>({});
  const [showpassword, setshowpassword] = useState(true);
  const [save, setsave] = useState(true);
  const [open, setopen] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  ////ADDRESS

  const firstName = useRef<any>(null);
  const lastName = useRef<any>(null);
  const number = useRef<any>(null);
  const alternateNumber = useRef<any>(null);
  const address = useRef<any>(null);
  const zipcode = useRef<any>(null);
  const state = useRef<any>(null);
  const city = useRef<any>(null);
  const [errors, seterrors] = useState<any>({});
  ////
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
        setAddresses(user.addresses);
        setloading(false);
        router.push("/checkout");
      })
      .catch((e) => {
        setError(true);
        setloading(false);
      });
  };
  const subtotal = () => {
    let price = 0;
    cartitems.filter((el: any) => {
      price = price + el.price * el.count;
    });
    return price;
  };
  const checkout = () => {
    if (user.token == undefined) {
      toast.error("Login to continue", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }
    if (delivery == "") {
      toast.error("Select a delivery option", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }
    if (
      selectedAddress.address == undefined &&
      delivery == "home" &&
      !newAddress
    ) {
      toast.error("Select an address", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }
    setcloading(true);
    if (newAddress) {
      axios
        .post(
          API_URL + "/order/",
          {
            phone_number: number.current.value,
            alt_phone_number: alternateNumber.current.value,
            first_name: firstName.current.value,
            last_name: lastName.current.value,
            zip_code: zipcode.current.value,
            city: city.current.value,
            state: state.current.value,
            address: address.current.value,
            newAddress: true,
            products: cartitems,
            type: delivery,
            amount: subtotal(),
            user_id: user.user.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((response) => {
          toast.success("Ordered! 😊", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setcloading(false);
          setSuccess(true);
          localStorage.deleteItem("mcart");
        })
        .catch((error) => {
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
          seterrors(error?.response?.data?.errors);
          setcloading(false);
          setSuccess(true);
          //localStorage.deleteItem("mcart");
        });
    } else {
      axios
        .post(
          API_URL + "/order/",
          {
            address: selectedAddress,
            products: cartitems,
            type: delivery,
            amount: subtotal(),
            user_id: user.user.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((response) => {
          toast.success("Ordered! 😊", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setcloading(false);
          setSuccess(true);
          //localStorage.deleteItem("mcart");
        })
        .catch((error) => {
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
          seterrors(error?.response?.data?.errors);
          setcloading(false);
        });
    }
  };
  return (
    <>
      <ToastContainer />
      <Header />
      <div className="checkout-wrap checkout-auth">
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          <Image
            src={down}
            className="goBack goBack1"
            onClick={() => router.back()}
            alt="back"
          />
        </Link>
        {!success && (
          <div className="wrap">
            <h1>Check Out</h1>
            <div className="flex">
              {/* items mobile*/}
              <div className="w-1/2 sm-show">
                <div className="sticky-div">
                  <div className="subtotal msub">
                    {cartitems.map((item: any, index: number) => {
                      return (
                        <div className="info" key={index}>
                          <div className="flex">
                            <div className="mr-2 img-hold">
                              <Image
                                src={
                                  BACKEND_URL + "/images/" + item?.cover_image
                                }
                                alt={item.name}
                                width={200}
                                height={200}
                              />
                            </div>
                            <div className="div">
                              <h3>{item.name}</h3>
                              <div>
                                <p>QTY {item.count}</p>
                              </div>
                            </div>
                          </div>
                          <h3 className="sm-hide">₦{item.price}</h3>
                        </div>
                      );
                    })}
                    <li>
                      <span>Subtotal</span>
                      <span>₦{subtotal()}</span>
                    </li>
                    <li>
                      <span>Delivery Information</span>
                      <span>---</span>
                    </li>
                    <li className="total">
                      <b>Total</b>
                      <b>₦{subtotal()}</b>
                    </li>
                  </div>
                </div>
              </div>
              {/*items*/}
              <div className="w-1/2 pr-50">
                {!user.token ? (
                  <>
                    <h2 className="nt">Sign In</h2>
                    <h5>Sign in to proceed to payment. </h5>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="flex">
                        <div className="w-full">
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
                                validatePassword(
                                  event.target.value,
                                  setPasswordError
                                );
                              }}
                            />
                            <button
                              className="m-btn"
                              onClick={() => setshowpassword(!showpassword)}
                            >
                              show
                            </button>
                          </div>
                          {error && (
                            <p className="error">Invalid email or password</p>
                          )}

                          <div className="flex items-center justify-between w-full">
                            <button
                              className="w-1/2 p-btn p-btn2"
                              onClick={() => signIn()}
                            >
                              <span>LOGIN</span>
                              {loading && (
                                <div className="lds-ripple">
                                  <div></div>
                                  <div></div>
                                </div>
                              )}
                            </button>
                            <Link
                              href="/account/forgot-password"
                              className="forgot"
                            >
                              Forgot password?
                            </Link>
                          </div>

                          <p className="sac">
                            <span>Dont have an account?</span>
                            <Link href="/account/auth" className="forgot">
                              Sign Up
                            </Link>
                          </p>
                        </div>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <h5>
                      {user?.user?.last_name} {user?.user?.first_name}
                    </h5>
                  </>
                )}
                <h2>Delivery Options</h2>
                <div className="addressSmall">
                  <div
                    className="flex cursor-pointer"
                    onClick={() => setDelivery("store")}
                  >
                    <div className="mr-2 form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault1"
                        onChange={() => setDelivery("store")}
                        checked={delivery == "store" ? true : false}
                      />
                    </div>
                    <div>
                      <p>Store Pickup (Reservation)</p>
                    </div>
                  </div>
                  <div
                    className="flex cursor-pointer"
                    onClick={() => setDelivery("home")}
                  >
                    <div className="mr-2 form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault1"
                        onChange={() => setDelivery("home")}
                        checked={delivery == "home" ? true : false}
                      />
                    </div>
                    <div>
                      <p>Home Delivery</p>
                    </div>
                  </div>
                </div>
                <>
                  {delivery == "home" && (
                    <>
                      <h2>Delivery Details</h2>
                      {!newAddress &&
                        addresses.map((item: any, index: any) => {
                          return (
                            <div key={index} className="addressSmall">
                              <div className="flex">
                                <div>
                                  <h3>
                                    {item.first_name + " " + item.last_name}
                                  </h3>
                                  <p>{item.address}</p>
                                </div>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  onChange={() => setSelectedAddress(item)}
                                  checked={
                                    selectedAddress?.id == item.id
                                      ? true
                                      : false
                                  }
                                />
                              </div>
                            </div>
                          );
                        })}
                      {newAddress && (
                        <>
                          <div className="flex justify-between">
                            <div className="w-[48%]">
                              <input
                                className="m-input"
                                placeholder="First Name"
                                ref={firstName}
                              />
                              <span className="error">
                                {errors?.first_name}
                              </span>
                            </div>
                            <div className="w-[48%]">
                              <input
                                className="m-input"
                                placeholder="Last Name"
                                ref={lastName}
                              />
                              <span className="error">{errors?.last_name}</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="w-[48%]">
                              <input
                                className="m-input"
                                placeholder="Phone number"
                                ref={number}
                              />
                              <span className="error">
                                {errors?.phone_number}
                              </span>
                            </div>
                            <div className="w-[48%]">
                              <input
                                className="m-input"
                                placeholder="Alt. Phone number (optional)"
                                ref={alternateNumber}
                              />
                              <span className="error">
                                {errors?.alt_phone_number}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="w-[48%]">
                              <input
                                className="m-input"
                                placeholder="Address"
                                ref={address}
                              />
                              <span className="error">{errors?.address}</span>
                            </div>
                            <div className="w-[48%]">
                              <input
                                className="m-input"
                                placeholder="Zip Code (optional)"
                                ref={zipcode}
                              />
                              <span className="error">{errors?.zip_code}</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="w-[48%]">
                              <input
                                className="m-input"
                                placeholder="State"
                                ref={state}
                              />
                              <span className="error">{errors?.state}</span>
                            </div>
                            <div className="w-[48%]">
                              <input
                                className="m-input"
                                placeholder="City"
                                ref={city}
                              />
                              <span className="error">{errors?.city}</span>
                            </div>
                          </div>
                        </>
                      )}
                      {user.token && (
                        <div className="w-[48%]">
                          <button
                            className="w-full p-btn p-btn1"
                            onClick={() => setNewAddress(!newAddress)}
                          >
                            <span>
                              {!newAddress
                                ? "Use New Address"
                                : "Use Saved Address"}
                            </span>
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </>

                <br></br>
                <div className="flex items-center justify-between">
                  <div className="w-[48%]">
                    <button
                      className="w-full p-btn p-btn2"
                      onClick={() => checkout()}
                    >
                      <span>CONFIRM</span>
                      {cloading && (
                        <div className="lds-ripple">
                          <div></div>
                          <div></div>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* items mobile*/}
              <div className="w-1/2 sm-hide">
                <div className="sticky-div">
                  <div className="subtotal msub">
                    {cartitems.map((item: any, index: number) => {
                      return (
                        <div className="info" key={index}>
                          <div className="flex">
                            <div className="mr-2 img-hold">
                              <Image
                                src={
                                  BACKEND_URL + "/images/" + item?.cover_image
                                }
                                alt={item.name}
                                width={200}
                                height={200}
                              />
                            </div>
                            <div className="div">
                              <h3>{item.name}</h3>
                              <div>
                                <p>QTY {item.count}</p>
                              </div>
                            </div>
                          </div>
                          <h3 className="sm-hide">
                            ₦{formatNumber(item.price)}
                          </h3>
                        </div>
                      );
                    })}
                    <li>
                      <span>Subtotal</span>
                      <span>₦{subtotal()}</span>
                    </li>
                    <li>
                      <span>Delivery Information</span>
                      <span>---</span>
                    </li>
                    <li className="total">
                      <b>Total</b>
                      <b>₦{subtotal()}</b>
                    </li>
                  </div>
                </div>
              </div>
              {/*items*/}
            </div>
          </div>
        )}
        {success && (
          <div className="wrap">
            <div
              style={{ marginTop: 50, marginBottom: 150 }}
              className="flex flex-col items-center justify-center text-center image-container"
            >
              <Image
                src={img}
                className="image max-w-[270px]"
                alt="Not Found"
              />
              <h1 style={{ fontSize: 40, marginBottom: 0 }}>
                Order Successful
              </h1>
              <p className="my-2 max-w-[500px] mb-4">
                We have received your order and it's currently been processed,
                we'll be in touch shortly, cheers!
              </p>
              <Link href="/shop">
                <b className="relative z-10">← Continue shopping</b>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
      {/*--modal---*/}
      <Modal
        isOpen={open}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => setopen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="successModal">
          <h2>Order Successful</h2>
          <svg
            width="67"
            height="66"
            viewBox="0 0 67 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.5 61.875C25.8419 61.875 18.4974 58.8328 13.0823 53.4177C7.66718 48.0026 4.625 40.6581 4.625 33C4.625 25.3419 7.66718 17.9974 13.0823 12.5823C18.4974 7.16718 25.8419 4.125 33.5 4.125C41.1581 4.125 48.5026 7.16718 53.9177 12.5823C59.3328 17.9974 62.375 25.3419 62.375 33C62.375 40.6581 59.3328 48.0026 53.9177 53.4177C48.5026 58.8328 41.1581 61.875 33.5 61.875ZM33.5 66C42.2521 66 50.6458 62.5232 56.8345 56.3345C63.0232 50.1458 66.5 41.7521 66.5 33C66.5 24.2479 63.0232 15.8542 56.8345 9.66548C50.6458 3.47678 42.2521 0 33.5 0C24.7479 0 16.3542 3.47678 10.1655 9.66548C3.97678 15.8542 0.5 24.2479 0.5 33C0.5 41.7521 3.97678 50.1458 10.1655 56.3345C16.3542 62.5232 24.7479 66 33.5 66Z"
              fill="#46312A"
            />
            <path
              d="M45.751 20.5013C45.7216 20.5298 45.694 20.5601 45.6685 20.5921L31.3423 38.8452L22.7087 30.2074C22.1222 29.661 21.3465 29.3635 20.545 29.3776C19.7435 29.3917 18.9788 29.7164 18.412 30.2833C17.8452 30.8501 17.5205 31.6148 17.5063 32.4163C17.4922 33.2178 17.7897 33.9935 18.3362 34.5799L29.2509 45.4988C29.545 45.7923 29.8951 46.0236 30.2805 46.1789C30.6658 46.3341 31.0785 46.4101 31.4939 46.4024C31.9093 46.3947 32.3189 46.3035 32.6982 46.134C33.0775 45.9646 33.4189 45.7205 33.7018 45.4163L50.1688 24.8326C50.7295 24.2441 51.0361 23.4585 51.0223 22.6458C51.0084 21.833 50.6753 21.0584 50.0948 20.4893C49.5144 19.9203 48.7333 19.6025 47.9204 19.6047C47.1076 19.607 46.3283 19.9291 45.751 20.5013Z"
              fill="#46312A"
            />
          </svg>
          <p>Thank you for your purchase !</p>
          <h4>Your order ID is: 234258350</h4>
          <p>You will recieve a confirmation email with order details</p>
          <Link href="/shop">
            <button className="p-btn p-btn2">
              <span>CONTINUE SHOPPING</span>
            </button>
          </Link>
        </div>
      </Modal>
    </>
  );
}

export default CheckOut;

const customStyles = {
  content: {
    top: "150px",
    left: "0",
    right: "0",
    bottom: "auto",
    transform: "0",
    transition: "all .4s ease-in-out",
    border: 0,
  },
};

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
      props: {
        user: {},
      },
    };
  }
}
