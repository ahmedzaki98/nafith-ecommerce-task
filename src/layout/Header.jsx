import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LanguageDropdown from "../components/language/LanguageDropdown";
import { useTranslation } from "react-i18next";
import StarRating from "../components/product/StarRating";
import SearchList from "../components/searchList/SearchList";

const Header = () => {
  const { t } = useTranslation();

  const products = useSelector((state) => state.rootReducer.products);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearchQueryValue = (value) => {
    setSearchQuery(value);
  };

  const productData = useSelector(
    (state) => state.rootReducer.searchProductList
  );


  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handleSearch = (value) => {
    if (value.length > 0) {
      const filtered = productData.filter((item) =>
        item?.title?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };
  const debouncedSearch = debounce(handleSearch, 800);

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
              onChange={(e) => {
                const { value } = e.target;
                setSearchQuery(value);
                debouncedSearch(value);
            }}
              value={searchQuery}
              placeholder={t("shop.search")}
            />
            <FaSearch className="w-5 h-5" />
            {searchQuery && (
              <div className="w-full px-2 mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer sm:py-5">
                {searchQuery &&
                  filteredProducts?.map((item) => (
                    <SearchList
                      products={item}
                      SearchQueryValue={handleSearchQueryValue}
                    />
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
