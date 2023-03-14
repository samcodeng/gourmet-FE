import { useContext, useEffect, useRef, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { AppContext } from "../context/AppContext";
import Modal from "react-modal";
import { useRouter } from "next/router";
import Link from "next/link";
import img from "../public/images/success.gif";
import axios from "axios";
import { usePaystackPayment } from "react-paystack";
import {
  isValidEmail,
  validateEmail,
  validatePassword,
} from "@/helpers/validate";
import Image from "next/image";
import { API_URL, BACKEND_URL } from "@/helpers/constants";
import { v4 as uuid } from "uuid";
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
  const [reference, setReference] = useState("");
  useEffect(() => {
    setReference(uuid());
  }, [router]);
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
          initializePayment(onSuccess, onClose);
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
          initializePayment(onSuccess, onClose);
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

  //////PAYSTACK/////////////
  // you can call this function anything
  const onSuccess = () => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
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
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
    toast.warn("Paystack closed!", {
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
  };

  const initializePayment = usePaystackPayment({
    reference: reference,
    email: "samueelnd@gmail.com",
    amount: subtotal() * 1000,
    publicKey: "pk_test_c9765d4a10ca457b0dac659838eb3ccc798d288b",
  });
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
