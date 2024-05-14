import React, { useState } from "react";
import { useSelector } from "react-redux";
import { handleProductsList } from "../../redux/slice";
import { useTranslation } from "react-i18next";

const Sort = ({ handleSortedData, productList }) => {
  const { t } = useTranslation();

  const productData = useSelector(
    (state) => state.rootReducer.searchProductList
  );
  const [selectedSort, setSelectedSort] = useState("");

  const handleClearSort = () => {
    //using stored data used it in search
    handleSortedData(productData);
    setSelectedSort("");
  };

  const handleSort = (sortProperty) => {
    let sortedPeople;
    if (productList.length > 0) {
      if (sortProperty === "price") {
        sortedPeople = [...productList].sort((a, b) => a.price - b.price);
        setSelectedSort("price");
      } else {
        sortedPeople = [...productList].sort(
          (a, b) => b.rating.rate - a.rating.rate
        );
        setSelectedSort("rate");
      }
      handleSortedData(sortedPeople);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-primary text-2xl py-4 font-bold">Sort by</h1>
        <span
          className="text-primaryVariant cursor-pointer underline-offset-1"
          onClick={handleClearSort}
        >
          {t("shop.clear")}
        </span>
      </div>
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          <li
            onClick={() => handleSort("price")}
            className="cursor-pointer border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
          >
            <span
              className={`${selectedSort === "price" && "text-primaryVariant"}`}
            >
              {t("shop.price")}
            </span>
          </li>
          <li
            onClick={() => handleSort("rate")}
            className="cursor-pointer border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
          >
            <span
              className={`${selectedSort === "rate" && "text-primaryVariant"}`}
            >
              {t("shop.rate")}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sort;
