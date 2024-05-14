import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import StarRating from "../components/product/StarRating";
import LanguageDropdown from "../components/language/LanguageDropdown";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  const products = useSelector((state) => state.rootReducer.products);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const productData = useSelector(
    (state) => state.rootReducer.searchProductList
  );

  useEffect(() => {
    const filtered = productData.filter((item) =>
      item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <div className="flex lg:flex-row items-start lg:items-center justify-between w-full px-4 sm:px-2 pb-4 sm:pt-4 lg:pb-0 h-full lg:h-24 sm:gap-2">
          <div className="md:block sm:hidden">
            <LanguageDropdown />
          </div>
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder={t("shop.search")}
            />
            <FaSearch className="w-5 h-5" />
            {searchQuery && (
              <div className="w-full px-2 mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer sm:py-5">
                {searchQuery &&
                  filteredProducts?.map((item) => (
                    <div
                      onClick={() =>
                        navigate(
                          `/product/${item.title
                            .toLowerCase()
                            .split(" ")
                            .join("")}`,
                          {
                            state: {
                              product: item,
                            },
                          }
                        ) & setSearchQuery("")
                      }
                      key={item._id}
                      className="max-w-[600px] min-h-28 h-max bg-gray-100 mb-3 flex items-center gap-3 rounded-md"
                    >
                      <img
                        className="w-24 rounded-md"
                        src={item?.image}
                        alt="productImg"
                      />
                      <div className="flex flex-col gap-1 items-start">
                        <p className="font-semibold text-lg">{item?.title}</p>
                        <p className="text-xs">
                          {item?.description?.length > 100
                            ? `${item?.description?.slice(0, 80)}...`
                            : item?.description}
                        </p>
                        <p className="text-sm">
                          {t("shop.productPrice")}
                          <span className="text-primeColor font-semibold px-1">
                            ${item?.price}
                          </span>
                        </p>
                        <div className="flex flex-row items-center gap-3 justify-center my-1">
                          <div className="flex justify-center items-center h-max">
                            <StarRating
                              rating={item?.rating?.rate}
                              width="4"
                              height="4"
                            />
                          </div>
                          <div className="flex justify-center items-center">
                            <p class="ms-1 text-sm font-semibold text-indigo-600">
                              {item?.rating?.rate}
                            </p>
                            <p class="ms-1 mx-1 text-sm font-semibold text-gray-600">
                              {t("shop.out_of")}
                            </p>
                            <p class="ms-1 text-sm font-semibold text-gray-600">
                              5
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative sm:hidden md:block">
            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart className="w-6 h-6 text-xl text-primary" />
                <div className="w-3 h-3  bg-primaryVariant text-xs text-white rounded-full absolute  top-[-2px] right-[-3px] flex items-center justify-center">
                  {products.length > 0 ? products.length : 0}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
