import React, { useState } from "react";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice";
import { toast } from "react-toastify";
import { MdOutlineAddShoppingCart } from "react-icons/md";

const ProductItem = ({ product }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const _id = product.title;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        product: product,
      },
    });
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product.id,
        title: product.title,
        quantity: 1,
        image: product.image,
        price: product.price,
        description: product.description,
      })
    );
    toast.success(t("cart.productAddedToCart"));
  };

  const fullStars = Math.floor(3.4);
  let starAverage = 3.4;

  const starArr = [];

  for (let i = 1; i <= fullStars; i++) {
    starArr.push(1);
  }

  if (starAverage < 5) {
    const partialStar = starAverage - fullStars;

    starArr.push(partialStar);

    const emptyStars = 5 - starArr.length;

    for (let i = 1; i <= emptyStars; i++) {
      starArr.push(0);
    }
  }
  return (
    <div
      key={product?.id}
      className="group flex flex-col relative border-2 border-gray-100 border-solid rounded-xl p-2 overflow-hidden"
    >
      <div
        onClick={handleProductDetails}
        className="z-10 cursor-pointer overflow-hidden rounded-md bg-gray-200 hover:opacity-75 hover:scale-125 duration-300 lg:h-80"
      >
        <img
          src={product?.image}
          alt={product?.title}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <hr class="flex mx-auto mt-8 mb-2 h-px w-[90%] bg-gray-200 border-0" />
      <div className=" flex flex-row items-center justify-between text-sm capitalize text-gray-500 mb-1">
        {product?.category}
        <MdOutlineAddShoppingCart
          className="text-2xl text-primaryVariant cursor-pointer z-10"
          onClick={() => handleAddToCart()}
        />
      </div>
      <div className="mt-1 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={product?.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </a>
          </h3>
        </div>
        <p className="text-base font-bold text-primary">{product.price}</p>
      </div>
      <div class="grid grid-cols-[50%,40%] justify-between items-center pt-2 pb-1">
        <StarRating rating={product?.rating?.rate} width="4" height="4" />
        <div className="flex justify-center items-center">
          <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            {product?.rating?.rate}
          </p>
          <p class="ms-1 mx-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            {t("shop.out_of")}
          </p>
          <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            5
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
