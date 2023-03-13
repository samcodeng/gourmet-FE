import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Link from "next/link";
import { createClient } from "contentful";
import ProductItem from "../components/ProductItem";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import main from "../public/images/main.jpg";
import slide1 from "../public/images/slide1.jpg";
import slide2 from "../public/images/slide2.jpg";
import slide3 from "../public/images/slide3.jpg";
import slide4 from "../public/images/slide4.jpg";
import slide5 from "../public/images/slide5.jpg";
import slide6 from "../public/images/slide6.jpg";
import slide7 from "../public/images/slide7.jpg";
import slide8 from "../public/images/slide8.jpg";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Testimonials from "../components/Testimonials";
import { API_URL, BACKEND_URL } from "@/helpers/constants";
const animation = { duration: 25000, easing: (t: number) => t };

export default function Home({ products, categories }: any) {
  console.log(categories);
  const { formatNumber } = useContext(AppContext);
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: true,
    slides: { perView: "auto" },
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });
  return (
    <>
      <Header categories={categories} />

      <div className="main">
        <div className="text">
          <h1>Tasty. Delicious</h1>
          <p>
            Plain or stuffed & drizzled, with sweet & savoury flavours, for
            events & personal orders. Treats & drinks too! 👇🏾
          </p>
          <Link href="/shop">
            <button className="p-btn hvr-bounce-to-bottom">
              <span>Shop Now</span>
            </button>
          </Link>
        </div>
        <div className="bg"></div>
      </div>

      <div className="featured">
        <div className="wrap">
          <div className="flex items-center justify-center">
            <h1 className="mb-4 m-h1">Our Menu</h1>
          </div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
            {categories.map((item: any, index: number) => {
              return (
                <Link
                  className="flex flex-col items-center justify-center p-4 menu-g"
                  key={index}
                  href={`/category/${item?.slug}`}
                >
                  <h1>{item?.name}</h1>
                  {item?.minimum_price && (
                    <p>From ₦{formatNumber(item?.minimum_price)}</p>
                  )}
                  {item?.image ? (
                    <img
                      src={BACKEND_URL + "/images/category/" + item?.image}
                      alt={item?.title}
                    />
                  ) : (
                    <img src="/images/slide1.jpg" alt={item?.title} />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="featured">
        <div className="wrap">
          <div className="flex items-center justify-between">
            <h3 className="m-h3">Featured Products</h3>
            <Link
              href="/shop"
              className="hidden mt-0 text-xs more lg:text-sm lg:flex"
            >
              See all products <img src="/images/arrow-right.png" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-2">
            {products.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <ProductItem item={item} />
                </div>
              );
            })}
          </div>
          <Link
            href="/shop"
            className="flex justify-center mt-4 text-xs more lg:text-sm lg:hidden"
          >
            <span className="mr-2">See all products</span>{" "}
            <img src="/images/arrow-right.png" />
          </Link>
        </div>
      </div>

      <div id="homeSlide">
        <h2>Our Exquisites</h2>
        <div ref={sliderRef} className="keen-slider">
          <div className="keen-slider__slide number-slide1">
            <Image src={slide1} alt="Gourmet nibbles" />
          </div>
          <div className="keen-slider__slide number-slide2">
            <Image src={slide2} alt="Gourmet nibbles" />
          </div>
          <div className="keen-slider__slide number-slide3">
            <Image src={slide3} alt="Gourmet nibbles" />
          </div>
          <div className="keen-slider__slide number-slide4">
            <Image src={slide4} alt="Gourmet nibbles" />
          </div>
          <div className="keen-slider__slide number-slide5">
            <Image src={slide5} alt="Gourmet nibbles" />
          </div>
          <div className="keen-slider__slide number-slide6">
            <Image src={slide6} alt="Gourmet nibbles" />
          </div>
          <div className="keen-slider__slide number-slide7">
            <Image src={slide7} alt="Gourmet nibbles" />
          </div>
          <div className="keen-slider__slide number-slide8">
            <Image src={slide8} alt="Gourmet nibbles" />
          </div>
          <div className="keen-slider__slide no-slide number-slide8"></div>
        </div>
      </div>

      <div className="reviews">
        <div className="wrap">
          <h2>REVIEWS</h2>
          <Testimonials />
        </div>
      </div>
      <div className="py-10">
        <div className="wrap">
          <h1 className="mb-4 font-semibold tracking-widest text-center uppercase">
            Locations
          </h1>
          <div className="flex flex-col items-center justify-center text-center lg:items-start lg:flex-row">
            <div className="flex flex-col items-center justify-center m-3 lg:m-8 max-w-[300px]">
              <svg
                className="mb-2 lg:mb-4"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 13.4299C12.4097 13.4299 12.8154 13.3492 13.194 13.1924C13.5725 13.0357 13.9165 12.8058 14.2062 12.5161C14.4959 12.2264 14.7257 11.8824 14.8825 11.5039C15.0393 11.1254 15.12 10.7197 15.12 10.3099C15.12 9.90022 15.0393 9.49451 14.8825 9.11597C14.7257 8.73743 14.4959 8.39349 14.2062 8.10377C13.9165 7.81405 13.5725 7.58423 13.194 7.42744C12.8154 7.27064 12.4097 7.18994 12 7.18994C11.1725 7.18994 10.3789 7.51865 9.79383 8.10377C9.20872 8.68888 8.88 9.48247 8.88 10.3099C8.88 11.1374 9.20872 11.931 9.79383 12.5161C10.3789 13.1012 11.1725 13.4299 12 13.4299Z"
                  stroke="black"
                  strokeWidth="1.5"
                />
                <path
                  d="M3.62001 8.49C5.59001 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C14.6321 21.4735 13.3398 21.9952 11.995 21.9952C10.6503 21.9952 9.35794 21.4735 8.39001 20.54C5.63001 17.88 2.47001 13.57 3.62001 8.49Z"
                  stroke="black"
                  strokeWidth="1.5"
                />
              </svg>
              <p className="text-sm">
                Quick bites / Curbside outlet : SPG (Ikoyi and VI){" "}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center m-3 lg:m-8 max-w-[300px]">
              <svg
                className="mb-2 lg:mb-4"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 13.4299C12.4097 13.4299 12.8154 13.3492 13.194 13.1924C13.5725 13.0357 13.9165 12.8058 14.2062 12.5161C14.4959 12.2264 14.7257 11.8824 14.8825 11.5039C15.0393 11.1254 15.12 10.7197 15.12 10.3099C15.12 9.90022 15.0393 9.49451 14.8825 9.11597C14.7257 8.73743 14.4959 8.39349 14.2062 8.10377C13.9165 7.81405 13.5725 7.58423 13.194 7.42744C12.8154 7.27064 12.4097 7.18994 12 7.18994C11.1725 7.18994 10.3789 7.51865 9.79383 8.10377C9.20872 8.68888 8.88 9.48247 8.88 10.3099C8.88 11.1374 9.20872 11.931 9.79383 12.5161C10.3789 13.1012 11.1725 13.4299 12 13.4299Z"
                  stroke="black"
                  strokeWidth="1.5"
                />
                <path
                  d="M3.62001 8.49C5.59001 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C14.6321 21.4735 13.3398 21.9952 11.995 21.9952C10.6503 21.9952 9.35794 21.4735 8.39001 20.54C5.63001 17.88 2.47001 13.57 3.62001 8.49Z"
                  stroke="black"
                  strokeWidth="1.5"
                />
              </svg>

              <p className="text-sm"> Beach stall : Stuffed Puffs</p>
            </div>
            <div className="flex flex-col items-center justify-center m-3 lg:m-8 max-w-[300px]">
              <svg
                className="mb-2 lg:mb-4"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 13.4299C12.4097 13.4299 12.8154 13.3492 13.194 13.1924C13.5725 13.0357 13.9165 12.8058 14.2062 12.5161C14.4959 12.2264 14.7257 11.8824 14.8825 11.5039C15.0393 11.1254 15.12 10.7197 15.12 10.3099C15.12 9.90022 15.0393 9.49451 14.8825 9.11597C14.7257 8.73743 14.4959 8.39349 14.2062 8.10377C13.9165 7.81405 13.5725 7.58423 13.194 7.42744C12.8154 7.27064 12.4097 7.18994 12 7.18994C11.1725 7.18994 10.3789 7.51865 9.79383 8.10377C9.20872 8.68888 8.88 9.48247 8.88 10.3099C8.88 11.1374 9.20872 11.931 9.79383 12.5161C10.3789 13.1012 11.1725 13.4299 12 13.4299Z"
                  stroke="black"
                  strokeWidth="1.5"
                />
                <path
                  d="M3.62001 8.49C5.59001 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C14.6321 21.4735 13.3398 21.9952 11.995 21.9952C10.6503 21.9952 9.35794 21.4735 8.39001 20.54C5.63001 17.88 2.47001 13.57 3.62001 8.49Z"
                  stroke="black"
                  strokeWidth="1.5"
                />
              </svg>

              <p className="text-sm">
                Catering: SP Catering and Bespoke event planning
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  let products: any = [];
  let categories: any = [];
  await axios
    .get(API_URL + "/categories")
    .then((response) => {
      categories = response.data;
    })
    .catch((err) => {});
  await axios
    .get(API_URL + "/latestProducts")
    .then((response) => {
      products = response.data;
    })
    .catch((err) => {});
  return {
    props: {
      products,
      categories,
    },
  };
}
