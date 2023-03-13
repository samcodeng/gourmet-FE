import React from "react";
import Header from "../../layout/Header";
import ProductItem from "../../components/ProductItem";
import Footer from "../../layout/Footer";
import { Parallax } from "react-parallax";
import { useRouter } from "next/router";
import { createClient } from "contentful";
import axios from "axios";
import { API_URL } from "@/helpers/constants";

function Category({ products, categories }: any) {
  const route = useRouter();
  const category = () => {
    let name: any;
    categories.filter((el: any) => {
      if (el.slug == route.query.slug) {
        name = el.name;
      }
    });
    return name;
  };
  return (
    <>
      <Header categories={categories} />
      <Parallax bgImage="/images/main1.jpg" strength={150}>
        <div className="parallax-inner">
          <div className="wrap">
            <h1 className="pt-12 pb-4 text-lg text-center text-white">
              {category()}
            </h1>
            <p className="text-white max-w-[500px] text-center m-auto">
              Gourmet Nibbles ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </Parallax>
      <div className="m-breadcrumb">
        <div className="wrap">
          <p>
            <strong>Category</strong> + {category()}
          </p>
        </div>
      </div>

      <div className="featured" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid grid-cols-4 gap-4">
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

export default Category;

export async function getServerSideProps({ params }: any) {
  let products: any = [];
  let categories: any = [];
  await axios
    .get(API_URL + "/categories")
    .then((response) => {
      categories = response.data;
    })
    .catch((err) => {});
  await axios
    .get(API_URL + "/category/" + params.slug)
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
