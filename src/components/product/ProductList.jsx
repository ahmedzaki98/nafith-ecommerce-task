import React from "react";
import usePagination from "../../custom-hooks/usePagination";
import Spinner from "../../utils/Spinner";
import emptyList from "../../assets/svg/productEmpty.svg";
import { useTranslation } from "react-i18next";

const ProductList = ({ productsData, loading }) => {
  const { t } = useTranslation();

  const { PaginatedList } = usePagination(10);

  return (
    <div className="mx-auto max-w-2xl px-4 py-2 sm:py-2 lg:max-w-7xl lg:px-8">
      {productsData?.length > 0 ? (
        loading ? (
          <Spinner />
        ) : (
          <PaginatedList items={productsData} loading={loading} />
        )
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 p-8">
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyList}
              alt="emptyList"
            />
          </div>
          <div className="max-w-[500px] px-4 py-8 flex gap-4 flex-col items-center rounded-md">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              {t("products.empty")}
            </h1>
          </div>
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default ProductList;
