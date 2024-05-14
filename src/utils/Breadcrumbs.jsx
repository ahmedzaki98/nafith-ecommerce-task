import React from "react";
import { handleCategoryTranslation } from "./transitEventsProgress";
import { useTranslation } from "react-i18next";

const Breadcrumbs = ({ head, category, title }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full py-10 xl:py-10 flex flex-col gap-3">
      <p className="text-base font-semibold text-black capitalize flex items-center">
        {head && <span>{head}</span>}
        <span className="px-1 font-normal text-lightText">\</span>
        {category && (
          <>
            <span className="break-normal whitespace-nowrap">{handleCategoryTranslation(category, t)}</span>
            <span className="px-1 font-normal text-lightText">\</span>
          </>
        )}
        <span className="capitalize font-normal break-all whitespace-pre-line text-lightText">{title}</span>
      </p>
    </div>
  );
};

export default Breadcrumbs;
