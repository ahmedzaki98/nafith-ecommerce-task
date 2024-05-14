import React, { useEffect, useState } from "react";
import getAllCategory from "../../apis/category/getAllCategory";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "../../redux/slice";
import useCategory from "../../custom-hooks/useCategory";
import { useTranslation } from "react-i18next";
import { handleCategoryTranslation } from "../../utils/transitEventsProgress";

const Category = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const checkedCategory = useSelector(
    (state) => state.rootReducer.checkedCategory
  );

  const onHandleCategory = (category) => {
    dispatch(toggleCategory(category));
  };

  const { categoryList } = useCategory();

  return (
    <div className="w-full">
      <h1 className="text-primary text-2xl py-4 font-bold">
        {t("shop.ShopByCategory")}
      </h1>
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {categoryList.map((value, index) => {
            return (
              <li
                key={index}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
              >
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  name={value}
                  id={value}
                  checked={checkedCategory.includes(value)}
                  onChange={() => onHandleCategory(value)}
                />
                {handleCategoryTranslation(value, t)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Category;
