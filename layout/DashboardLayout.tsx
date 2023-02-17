import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";

function DashboardLayout({ children }: any) {
  const router = useRouter();
  useEffect(() => {
    let user: any = localStorage.getItem(
      "1ooampmsxmaopiyquqioamnomdiibsuvbubeiiowp"
    );
    if (user == null) {
      router.push("/account/auth");
    }
    user = JSON.parse(user);
  });
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default DashboardLayout;
