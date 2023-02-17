import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Link from "next/link";
import Review from "../components/Review";
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
const animation = { duration: 25000, easing: (t: number) => t };

export default function Home({ products, categories }: any) {
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
          <h1>Your skin at it's best</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et,
            scelerisque ut sapien, posuere non. Faucibus egestas
          </p>
          <Link href="/shop">
            <button className="p-btn hvr-bounce-to-bottom">
              <span>Shop Now</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="featured">
        <div className="wrap">
          <div className="flex items-center justify-center">
            <h1 className="mb-4 m-h1">Our Menu</h1>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {categories.map((item: any, index: number) => {
              return (
                <Link
                  className="flex flex-col items-center justify-center p-4 menu-g"
                  key={index}
                  href={`/category/${item?.attributes?.slug}`}
                >
                  <h1>{item?.attributes?.title}</h1>
                  {item?.attributes?.minimum_price && (
                    <p>From ₦{formatNumber(item?.attributes?.minimum_price)}</p>
                  )}
                  {item?.attributes?.image.data ? (
                    <img
                      src={
                        "http://localhost:1337" +
                        item?.attributes?.image?.data?.attributes?.url
                      }
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
            <Link href="/shop" className="mt-0 more">
              See all products <img src="/images/arrow-right.png" />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {products.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <ProductItem item={item.attributes} />
                </div>
              );
            })}
          </div>
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

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  let products: any = [];
  let categories: any = [];
  try {
    const res = await fetch(
      "http://localhost:1337/api/products?sort=createdAt%3ADesc&populate=images,slug"
    );
    products = await res.json();
    products = products.data;
    const res2 = await fetch(
      "http://localhost:1337/api/categories?sort=createdAt%3ADesc&populate=image,slug"
    );
    categories = await res2.json();
    categories = categories.data;
  } catch {}
  return {
    props: {
      products,
      categories,
    },
  };
}
