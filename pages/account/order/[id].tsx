import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as cookie from "cookie";
import { API_URL, BACKEND_URL } from "@/helpers/constants";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import back from "../../../public/images/arrow-down.png";

function Address({ user }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [order, setorder] = useState<any>({});
  const { savedOrder, formatNumber } = useContext(AppContext);
  useEffect(() => {
    const cred = async () => {
      if (savedOrder) {
        setorder(savedOrder);
      } else {
        axios
          .get(API_URL + "/order/" + router.query.id, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((response) => {
            let data = response.data;
            setorder(data);
          })
          .catch(() => {});
      }
    };
    cred();
  }, [router]);
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
          <h1>Order</h1>
          {order?.products?.map((item: any, index: any) => {
            return (
              <Link
                href={`/product/${item.slug}`}
                key={index}
                className="cursor-pointer addressSmall"
              >
                <div className="flex">
                  <Image
                    src={BACKEND_URL + "/images/" + item.cover_image}
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
                      {item.name}
                      <small className="ml-4 font-normal text-black opacity-40"></small>
                    </h1>
                    <h2>
                      ₦{formatNumber(item.price)}
                      <small className="ml-4 text-black opacity-40">
                        {item.category}
                      </small>
                    </h2>
                  </div>
                </div>
              </Link>
            );
          })}
          <h1
            style={{
              margin: 0,
              textAlign: "left",
              marginBottom: 10,
            }}
          >
            Total ₦{formatNumber(order?.amount)}
          </h1>
          <h2>
            {moment(order?.created_at).format("do MMMM, Y.")}
            <small className="ml-4 text-black opacity-40">
              {moment(order?.created_at).format(" h:mm:ss a")}
            </small>
            <small className="ml-4 text-black opacity-40">
              {order?.type} {order?.type == "home" ? "delivery" : "pickup"}
            </small>
          </h2>
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
