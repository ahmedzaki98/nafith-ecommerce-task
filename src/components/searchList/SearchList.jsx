import React from "react";
import StarRating from "../product/StarRating";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SearchList = ({ products, SearchQueryValue }) => {
  const { t } = useTranslation();

  return (
    <div
      onClick={() =>
        Navigate(
          `/product/${products.title.toLowerCase().split(" ").join("")}`,
          {
            state: {
              product: products,
            },
          }
        ) & SearchQueryValue("")
      }
      key={products._id}
      className="max-w-[600px] min-h-28 h-max bg-gray-100 mb-3 flex items-center gap-3 rounded-md"
    >
      <img className="w-24 rounded-md" src={products?.image} alt="productImg" />
      <div className="flex flex-col gap-1 items-start">
        <p className="font-semibold text-lg">{products?.title}</p>
        <p className="text-xs">
          {products?.description?.length > 100
            ? `${products?.description?.slice(0, 80)}...`
            : products?.description}
        </p>
        <p className="text-sm">
          {t("shop.productPrice")}
          <span className="text-primeColor font-semibold px-1">
            ${products?.price}
          </span>
        </p>
        <div class="grid grid-cols-[50%,40%] justify-between items-center md:w-[50%] pb-1 sm:w-[80%]">
          <StarRating
            key={products?.rating?.rate}
            rating={products?.rating?.rate}
            width="4"
            height="4"
          />
          <div className="flex justify-center items-center">
            <p class="ms-1 text-sm font-semibold text-indigo-600">
              {products?.rating?.rate}
            </p>
            <p class="ms-1 mx-1 text-sm font-semibold text-gray-600">
              {t("shop.out_of")}
            </p>
            <p class="ms-1 text-sm font-semibold text-gray-600">5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchList;
