import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemCardCopy from "./ItemCard";
import { Link } from "react-router-dom";
import emptyCart from "../../assets/svg/cart.svg";
import { resetCart } from "../../redux/slice";
import addOrder from "../../apis/cart/addOrder";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const products = useSelector((state) => state.rootReducer.products);
  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState(20);

  const handleCheckout = async (products) => {
    try {
      const newProducts = products?.map(({ _id, quantity }) => ({
        productId: _id,
        quantity,
      }));
      const res = await addOrder(newProducts);
      if (res?.status) {
        toast.success("your order was added");
        dispatch(resetCart());
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {}
  };

  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [products]);

  return (
    <section className="py-24 relative">
      {products.length > 0 ? (
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
            {t("cart.title")}
          </h2>
          <div className="flex items-center justify-end m-4">
            <button
              onClick={() => dispatch(resetCart())}
              class="rounded-full group flex items-center justify-center focus-within:outline-red-500"
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  class="fill-red-50 transition-all duration-500 group-hover:fill-primaryVariant"
                  cx="17"
                  cy="17"
                  r="17"
                  fill=""
                />
                <path
                  class="stroke-primaryVariant transition-all duration-500 group-hover:stroke-white"
                  d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                  stroke="#EF4444"
                  stroke-width="1.6"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          {products.map((product) => (
            <div key={product._id}>
              <ItemCardCopy product={product} />
            </div>
          ))}

          <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
            <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">
            {t("cart.total")}
            </h5>

            <div className="flex items-center justify-between gap-5 ">
              <button className="rounded-full py-2.5 px-3 bg-indigo-50 text-primary font-semibold text-xs text-center whitespace-nowrap transition-all duration-500 hover:bg-indigo-100">
                Promo Code
              </button>
            </div>
          </div>
          <div className="flex justify-start items-center max-w-7xl gap-4 mt-4">
            <div className="w-96 flex flex-col gap-4">
              <div className="rounded-xl border border-gray-200 shadow-lg py-5">
                <p className="flex items-center text-gray-500 justify-between  border-gray-400 py-2 text-lg px-4 font-normal">
                {t("cart.Subtotal")}
                  <span className="font-semibold text-primary tracking-wide font-titleFont">
                    ${totalAmt && totalAmt?.toFixed(2)}
                  </span>
                </p>
                <p className="flex items-center text-gray-500 justify-between border-gray-400 py-2 text-lg px-4 font-normal">
                {t("cart.ShippingCharge")}
                  <span className="font-semibold text-primary tracking-wide font-titleFont">
                    ${shippingCharge}
                  </span>
                </p>
                <hr className="flex mx-auto mt-1 mb-2 h-px w-[90%] bg-gray-200 border-0" />
                <p className="flex items-center text-gray-500 justify-between py-2 text-lg px-4 font-normal">
                {t("cart.total")}
                  <span className="font-bold text-primary tracking-wide text-lg font-titleFont">
                    ${totalAmt && (totalAmt + shippingCharge)?.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="max-lg:max-w-lg max-lg:mx-auto">
            <p className="font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6">
            {t("cart.thanks")}
            </p>
            <button
              onClick={() => handleCheckout(products)}
              className="rounded-full py-4 px-6 bg-primary text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700 "
            >
              {t("cart.Checkout")}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 p-8">
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md">
            <h1 className="font-titleFont text-xl font-bold uppercase">
            {t("cart.emptyCart")}
            </h1>
            <Link to="/">
              <button className="bg-primeColor rounded-md cursor-pointer bg-primary px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
              {t("cart.ContinueShopping")}
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
