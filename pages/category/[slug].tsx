import React from "react";
import Header from "../../layout/Header";
import ProductItem from "../../components/ProductItem";
import Footer from "../../layout/Footer";
import { Parallax } from "react-parallax";
import { useRouter } from "next/router";
import { createClient } from "contentful";

function Category({ products, categories }: any) {
  const route = useRouter();
  console.log(products);
  const category = () => {
    let title: any;
    categories.filter((el: any) => {
      if (el.fields.slug == route.query.slug) {
        title = el.fields.title;
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
                  <ProductItem item={item.fields} />
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
  const client = createClient({
    space: `${process.env.CONTENTFUL_SPACE}`,
    accessToken: `${process.env.CONTENTFUL_KEY}`,
  });
  let products: any = [];
  let categories: any = [];
  try {
    const res2 = await client.getEntries({
      content_type: "categories",
    });
    categories = res2.items;
    let category = categories.filter((el: any) => {
      if (el.fields.slug == params.slug) {
        return el;
      }
    });
    console.log(category[0].sys.id);
    const res = await client.getEntries({
      content_type: "products",
      "fields.category.sys.id": category[0].sys.id,
    });
    products = await res.items;
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      products,
      categories,
    },
  };
}
