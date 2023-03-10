import { BACKEND_URL } from "@/helpers/constants";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Rating from "./Rating";

function ProductItem({ item }: any) {
  const { currency, addtocart, formatNumber } = useContext(AppContext);
  return (
    <Link href={"/product/" + item.slug} className="product">
      <div className="img-hold">
        {item?.cover_image && (
          <Image
            src={BACKEND_URL + "/images/" + item?.cover_image}
            alt={item?.name}
            fill
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
      <h4 className="mt-4 text-md">{item?.name}</h4>
      <div className="flex items-center justify-between">
        <p className="text-sm">₦ {formatNumber(item?.price)}</p>
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
