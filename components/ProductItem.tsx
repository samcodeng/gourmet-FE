import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Rating from "./Rating";

function ProductItem({ item }: any) {
  const { currency, addtocart, formatNumber } = useContext(AppContext);
  return (
    <Link href={"/product/" + item.slug} className="product">
      <div className="img-hold">
        {item.images.data && (
          <img
            src={
              "http://localhost:1337" + item?.images?.data[0]?.attributes?.url
            }
            alt={item?.title}
          />
        )}
        <button
          className="p-btn p-btn2"
          style={{ width: "85%" }}
          onClick={(e) => {
            e.preventDefault();
            addtocart(item);
          }}
        >
          <span>Add To Basket</span>
        </button>
      </div>
      <h4 className="mt-4 text-md">{item?.title}</h4>
      <div className="flex justify-between items-center">
        <p className="text-sm">
          <span style={{ display: item?.old_price ? "inline-block" : "none" }}>
            ₦ {formatNumber(item?.regular_price)}
          </span>
          ₦ {formatNumber(item?.sale_price)}
        </p>
        <Rating
          rating={item?.rating ? item?.rating : 5}
          canAdd={false}
          add=""
        />
      </div>
    </Link>
  );
}

export default ProductItem;
