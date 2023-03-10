import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as cookie from "cookie";
import { API_URL, BACKEND_URL } from "@/helpers/constants";
import axios from "axios";
import moment from "moment";
import Image from "next/image";

function Orders({ user }: any) {
  const [open, setopen] = useState(false);
  const [rating, setrating] = useState(0);
  const router = useRouter();
  const [myOrders, setMyOrders] = useState<any>([]);
  const { setSavedOrder, formatNumber } = useContext(AppContext);
  useEffect((): any => {
    const getOrders = async () => {
      axios
        .get(API_URL + "/orders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setMyOrders(response.data.data);
        })
        .catch(() => {});
    };
    getOrders();
  }, [user]);
  return (
    <>
      <Header />
      <div className="auth-wrap">
        <img
          src="/images/arrow-down.png"
          className="goBack"
          onClick={() => router.back()}
        />
        <div className="wrap max-w-[600px]">
          <h1>Orders</h1>
          <div className="auth-select active">
            {myOrders.length == 0 ? (
              <p style={{ textAlign: "center" }}>
                No orders have been made yet, continue shopping to add orders
              </p>
            ) : (
              <></>
            )}

            {myOrders.map((item: any, index: number) => {
              return (
                <div
                  onClick={() => {
                    setSavedOrder(item);
                    router.push("/account/order/" + item.id);
                  }}
                  key={index}
                  className="cursor-pointer addressSmall"
                >
                  <div className="flex">
                    <Image
                      src={
                        BACKEND_URL + "/images/" + item.products[0]?.cover_image
                      }
                      alt={item.name}
                      width={60}
                      height={60}
                      className="mr-6 rounded-md"
                    />
                    <div>
                      <h1
                        style={{
                          margin: 0,
                          textAlign: "left",
                          marginBottom: 10,
                        }}
                      >
                        ₦{formatNumber(item.amount)}
                        <small className="ml-4 font-normal text-black opacity-40">
                          {item.products.length} Item(s)
                        </small>
                      </h1>
                      <h2>
                        {moment(item.created_at).format("do MMMM, Y.")}
                        <small className="ml-4 text-black opacity-40">
                          {moment(item.created_at).format(" h:mm:ss a")}
                        </small>
                        <small className="ml-4 text-black opacity-40">
                          {item.type}{" "}
                          {item.type == "home" ? "delivery" : "pickup"}
                        </small>
                      </h2>
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
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Orders;

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
      redirect: {
        permanent: false,
        destination: "/account/auth",
      },
      props: {},
    };
  }
}
