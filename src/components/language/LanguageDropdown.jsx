import React, { useEffect, useRef, useState } from "react";
import flagUs from "../../assets/flags/us.svg";
import flagArabic from "../../assets/flags/ar.svg";
import { useTranslation } from "react-i18next";

const languages = [
  {
    lang: "en",
    label: "English",
    flag: flagUs,
  },
  {
    lang: "ar",
    label: "Arabic",
    flag: flagArabic,
  },
];

const LanguageDropdown = () => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const [selectedLang, setSelectedLang] = useState(localStorage.getItem("i18nextLng"));


  const onChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.body.dir = i18n.dir();
    setSelectedLang(lng);
    setShow(false);
  };
  const handleSelectedLang = () => {
    if (selectedLang === "en") {
      return (
        <li
          key={selectedLang}
          className="flex w-full flex-row items-center justify-between "
        >
          <span className="block px-4 py-2 ">{t("common.English")}</span>
          <img className="rounded-full w-6 h-6" src={flagUs} alt="English" />
        </li>
      );
    } else {
      return (
        <li
          key={selectedLang}
          className="flex w-full flex-row items-center justify-between "
        >
          <span className="block px-4 py-2 ">{t("common.Arabic")}</span>
          <img
            className="rounded-full w-6 h-6"
            src={flagArabic}
            alt="English"
          />
        </li>
      );
    }
  };


  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative w-44 text-base text-primeColor flex items-center gap-2 justify-between rounded-xl">
      <button
        className="text-primary w-full bg-white  font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center"
        onClick={() => setShow(!show)}
      >
        {handleSelectedLang()}
      </button>
      {show && (
        <div className="w-30 rounded-lg mx-auto bg-white top-11 absolute left-0 right-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer">
          <ul
            class="py-2 text-sm text-primary"
            aria-labelledby="dropdownDefaultButton"
          >
            {languages.map((lang, index) => (
              <>
                <section
                  key={index}
                  className={`flex flex-row items-center justify-between hover:bg-primaryVariant ${
                    selectedLang === lang.lang ? "bg-primaryVariant" : "bg-red"
                  }`}
                  onClick={() => {
                    onChangeLanguage(lang.lang);
                    //   setSelectedLang((prevState) => [...prevState, lang]);
                  }}
                >
                  <div className="w-full flex flex-row items-center justify-between px-2">
                    <span href="#" className="block px-4 py-2 ">
                      {t(`common.${lang.label}`)}
                    </span>
                    <img
                      className="rounded-full w-6 h-6"
                      src={lang.flag}
                      alt=""
                    />
                  </div>
                </section>
                <hr class="flex mx-auto h-px w-[90%] bg-gray-200 border-0 last:hidden" />
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
