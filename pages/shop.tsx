import React from "react";
import Header from "../layout/Header";
import ProductItem from "../components/ProductItem";
import Footer from "../layout/Footer";
import { Parallax } from "react-parallax";
import { API_URL } from "@/helpers/constants";
import axios from "axios";

function Shop({ products, categories }: any) {
  return (
    <>
      <Header categories={categories} />
      <Parallax bgImage="/images/main1.jpg" strength={80}>
        <div className="parallax-inner">
          <div className="wrap">
            <h1 className="pt-12 pb-4 text-lg text-center text-white">Shop</h1>
            <p className="text-white max-w-[500px] text-center m-auto">
              Gourmet Nibbles ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </Parallax>
      <div className="m-breadcrumb">
        <div className="wrap">
          <p>
            <strong>Shop</strong> + All Products
          </p>
        </div>
      </div>

      <div className="featured" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-2">
            {products.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <ProductItem item={item} />
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

export default Shop;

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
