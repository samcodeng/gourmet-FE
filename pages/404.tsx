import Link from "next/link";
import Image from "next/image";
import React from "react";
import img from "../public/images/search.png";
function NotFound() {
  return (
    <div
      style={{ marginTop: 200 }}
      className="flex flex-col items-center justify-center text-center image-container"
    >
      <Image src={img} className="image" alt="Not Found" />
      <h1 style={{ fontSize: 40 }}>404 - Page Not Found</h1>
      <p style={{ marginTop: 20, marginBottom: 20 }}>
        We can't find the page you're looking for, but we can get you back home
      </p>
      <Link href="/">
        <b className="relative z-10">← Back to homepage</b>
      </Link>
    </div>
  );
}

export default NotFound;
