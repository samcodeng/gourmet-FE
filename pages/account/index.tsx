import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "@/context/AppContext";

import Cookies from "js-cookie";
import * as cookie from "cookie";

function Dashboard({ user }: any) {
  const router = useRouter();
  const { getUser } = useContext(AppContext);
  const signOut = () => {
    Cookies.remove("gourmetUser");
    router.push("/account/auth");
  };
  useEffect((): any => {
    getUser();
  }, []);
  return (
    <>
      <Header />
      <div className="account-wrap">
        <div className="wrap">
          <h1>Account</h1>
          <h4>Welcome back {user.user.first_name}</h4>
          <ul className="account-ul">
            <li>
              <Link href="/account/orders">
                <div>
                  <h3>Orders</h3>
                  <span>View your orders</span>
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
              </Link>
            </li>
            <li>
              <Link href="/account/personal-details">
                <div>
                  <h3>Personal Details</h3>
                  <span>View and edit your personal details</span>
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
              </Link>
            </li>
            <li>
              <Link href="/account/addresses">
                <div>
                  <h3>Addresses</h3>
                  <span>View and edit your addresses</span>
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
              </Link>
            </li>
            <li>
              <Link href="/account/password">
                <div>
                  <h3>Password</h3>
                  <span>Edit your password</span>
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
              </Link>
            </li>
          </ul>
        </div>
        <button onClick={() => signOut()} className="signout">
          Sign Out
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;

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
