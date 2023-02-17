import React from "react";
import Header from "../../layout/Header";
import ProductItem from "../../components/ProductItem";
import Footer from "../../layout/Footer";
import { Parallax } from "react-parallax";
import { useRouter } from "next/router";

function Category({ products, categories }: any) {
  const route = useRouter();
  const category = () => {
    let title: any;
    categories.filter((el: any) => {
      if (el.attributes.slug == route.query.slug) {
        title = el.attributes.title;
      }
    });
    return title;
  };
  return (
    <>
      <Header categories={categories} />
      <Parallax bgImage="/images/main.jpg" strength={150}>
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
                  <ProductItem item={item.attributes} />
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
  try {
    const res = await fetch(
      "http://localhost:1337/api/products?filters[categories][slug][$in][0]=" +
        params.slug +
        "&sort=createdAt%3ADesc&populate=images,slug"
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