import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import logo from "../assets/svg/logo.svg";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "../components/language/LanguageDropdown";

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const products = useSelector((state) => state.rootReducer.products);

  const [showMenu, setShowMenu] = useState(true);
  const [sideNav, setSideNav] = useState(false);
  const location = useLocation();

  const navBarList = [
    {
      _id: 1,
      title: t("navbar.Shop"),
      link: "/",
    },
    {
      _id: 2,
      title: t("navbar.AddProduct"),
      link: "/add-product",
    },
    {
      _id: 3,
      title: t("navbar.cart"),
      link: "/cart",
    },
  ];
  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <div className="flex items-center justify-between h-full gap-2">
          <Link to="/">
            <div>
              <img className="w-32 object-cover" src={logo} alt="logo" />
            </div>
          </Link>
          <div className="md:hidden sm:block w-[80%]">
            <LanguageDropdown />
          </div>
          <div>
            {showMenu && (
              <div className="flex items-center w-auto z-50 p-0 gap-2">
                {navBarList.map(({ _id, title, link }) => (
                  <NavLink
                    key={_id}
                    className={`list-none flex hover:font-bold max-w-25 h-6 justify-center items-center px-12 text-[18px] font-semibold text-primary hover:text-primaryVariant md:border-r-[2px] border-r-gray-300
                    ${
                      i18n.language === "en"
                        ? "last:border-r-0"
                        : "first:border-r-0"
                    }`}
                    to={link}
                    state={{ data: location.pathname.split("/")[1] }}
                  >
                    <span>{title}</span>
                  </NavLink>
                ))}
              </div>
            )}
            <div className="flex flex-row items-center justify-center gap-2 md:hidden">
              <div>
                <HiMenuAlt2
                  onClick={() => setSideNav(!sideNav)}
                  className="inline-block md:hidden cursor-pointer w-8 h-6"
                />
              </div>
            </div>

            {sideNav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                <div className="w-[80%] h-full relative">
                  <div className="w-full h-full bg-primeColor p-6">
                    <img className="w-28 mb-6" src={logo} alt="logo" />
                    <ul className="text-gray-200 flex flex-col gap-2">
                      {navBarList.map((item) => (
                        <li
                          className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                          key={item._id}
                        >
                          <NavLink
                            to={item.link}
                            state={{ data: location.pathname.split("/")[1] }}
                            onClick={() => setSideNav(false)}
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span
                    onClick={() => setSideNav(false)}
                    className={`top-2 w-8 h-8 border-[1px] border-gray-300 absolute text-gray-300 text-2xl flex justify-center items-center cursor-pointer duration-700
                    ${i18n.language === "en" ? " -right-10" : "-left-10"}`}
                  >
                    <MdClose />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
