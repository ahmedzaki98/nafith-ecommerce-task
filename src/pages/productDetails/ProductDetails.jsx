import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../utils/Breadcrumbs";
import StarRating from "../../components/product/StarRating";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (location?.state?.product) {
      setProduct(location?.state?.product);
    }
  }, [location, product]);

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <div
            role="list"
            className="mx-auto flex max-w-2xl sm:w-full items-center space-x-2 px-4 sm:px-2 lg:max-w-7xl lg:px-8"
          >
            <Breadcrumbs
              head={t("shop.products")}
              title={product?.title}
              category={product?.category}
            />
          </div>
        </nav>
        <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-1 my-8 md:w-[80%] mx-auto">
          {/* Image gallery */}
          <div className=" mx-auto mt-6 max-w-2xl sm:px-6">
            <div className="w-[80%] h-[80%] sm:w-[100%] aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto mt-6 max-w-2xl px-6 pb-16 pt-10 sm:px-6">
            <div className="flex flex-col mt-6 items-center">
              <div className="w-full grid grid-cols-[70%,20%] gap-[10%]">
                <span className="text-base font-bold tracking-tight text-gray-900 sm:text-xl">
                  {product?.title}
                </span>
                <span className="flex justify-end text-base font-bold tracking-tight text-gray-900 sm:text-xl">
                  ${product?.price}
                </span>
              </div>
            </div>
            <div className="my-4 flex md:justify-start sm:justify-center gap-8">
              <StarRating rating={product?.rating?.rate} width="6" height="6" />
              <div className="flex justify-center items-center">
                <p class="ms-1 text-base font-semibold text-indigo-600">
                  {product?.rating?.rate}
                </p>
                <p class="ms-1 mx-1 text-base font-semibold text-gray-600">
                  {t("shop.out_of")}
                </p>
                <p class="ms-1 text-base font-semibold text-gray-600">5</p>
              </div>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <button
                onClick={() => handleAddToCart()}
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {t("products.add_to_cart")}
              </button>
            </div>
            <div className="py-4 flex flex-col justify-center items-start">
              <h3 className="py-5 text-xl font-semibold text-gray-900">
                {t("products.description")}
              </h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {product?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
