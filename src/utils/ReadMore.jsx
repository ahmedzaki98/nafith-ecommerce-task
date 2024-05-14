import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ReadMore = ({ children }) => {
  const { t } = useTranslation();

  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const sliceLength = 160;

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, sliceLength) : text}
      {text.length > sliceLength && (
        <span
          onClick={toggleReadMore}
          className="text-primary font-medium text-base cursor-pointer"
        >
          {isReadMore ? t("common.readMore"): t("common.showLess")}
        </span>
      )}
    </p>
  );
};

export default ReadMore;
