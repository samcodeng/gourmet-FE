import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import CartDrawer from "./CartDrawer";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import MenuDrawer from "./MenuDrawer";
function Header({ categories }: any) {
  const [active, setActive] = useState(false);
  const [toggle, settoggle] = useState(false);
  const { count, currency, setcurrency, opencart, setopencart, setopenmenu } =
    useContext(AppContext);

  let router = useRouter();
  const [search, setsearch] = useState(false);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [router]);
  return (
    <>
      <Head>
        <meta name="description" content="Gourmet Nibbles skin care" />
        <title>Gourmet Nibbles — Your Skin At It's Best</title>
      </Head>
      <div className="header">
        <div className="wrap">
          <div
            className={`toggle-menu ${toggle ? "switch" : ""}`}
            onClick={() => {
              settoggle(!toggle);
              setActive(false);
            }}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="ul-nav sm-no">
            <Link href="/" className="mr">
              Home
            </Link>
            <a
              onClick={(e) => {
                e.preventDefault();
                setopenmenu(true);
              }}
              href="#"
            >
              Our Menu
            </a>
          </div>
          <Link href="/">
            {/* <Image
              src="/images/logo.png"
              className="logo"
              alt="logo"
              width={148}
              height={76}
              priority
            />*/}
            <h1 className="text-lg font-black">LOGO.</h1>
          </Link>
          <div className="ul-nav ul-nav1">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setsearch(!search);
              }}
            >
              <Image
                alt="search"
                src="/images/search.png"
                width={20}
                height={20}
              />
            </a>
            <Link href="/account" className="sm-no">
              <Image alt="user" src="/images/user.png" width={20} height={20} />
            </Link>
            <Link
              href="/cart"
              onClick={(e) => {
                e.preventDefault();
                setopencart(true);
              }}
            >
              <Image alt="cart" src="/images/bag.png" width={20} height={20} />
              <span id="cartCount">{count}</span>
            </Link>
          </div>
        </div>
      </div>
      <CartDrawer />
      <MenuDrawer categories={categories} />
      <div className={`search-wrap ${search ? "active" : ""}`}>
        <div className="m-input-wrap">
          <input
            className="m-input"
            placeholder="Search for items"
            autoComplete="false"
          />
          <button className="m-btn">
            <Image
              alt="search"
              src="/images/search.png"
              width={20}
              height={20}
            ></Image>
          </button>
        </div>
      </div>
      <div className={`side-nav ${toggle ? "active" : ""}`}>
        <Link href="/shop">Shop</Link>
        <Link href="/locations">Locations</Link>
        <Link href="/account">My Account</Link>
        <a
          onClick={(e) => {
            e.preventDefault();
            setActive(!active);
          }}
          href="#"
          id="drop"
          className="sm-no"
        >
          {currency}
          <Image
            alt="toggle"
            src="/images/arrow-down.png"
            width={20}
            height={20}
          />
        </a>
      </div>
    </>
  );
}

export default Header;
