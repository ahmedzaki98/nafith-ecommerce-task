import React, { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "../../utils/Breadcrumbs";
import ProductList from "../../components/product/ProductList";
import Category from "../../components/category/Category";
import { useDispatch, useSelector } from "react-redux";
import Sort from "../../components/sort/Sort";
import usePagination from "../../custom-hooks/usePagination";
import getProduct from "../../apis/product/getProduct";
import { searchProductDataList } from "../../redux/slice";
import { useTranslation } from "react-i18next";

const Shop = () => {
  const { t } = useTranslation();

  const category = useSelector((state) => state.rootReducer.checkedCategory);

  const [productsData, setProductsData] = useState([]);
  const [sortedProductsData, setSortedProductsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setCurrentPage, PaginatedList } = usePagination(10);
  const dispatch = useDispatch();

  const cachedProductsData = useMemo(() => productsData, [productsData]);

  const handleSortedData = (data) => {
    setProductsData(data);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setLoading(true);
      const fetchData = async () => {
        const res = await getProduct(category[0]);
        setLoading(false);
        if (res?.status) {
          setProductsData(res?.data);
          dispatch(searchProductDataList(res?.data));
        }
        if (category?.length > 0) {
          setCurrentPage(1);
        }
      };
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [category]);
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs head={t("shop.products")} category={category[0]} />
      <div className="w-full h-full flex lg:flex-row mdl:flex-row sm:flex-col pb-20 gap-10">
        <div className="w-[20%] sm:w-full lgl:w-[25%] mdl:inline-flex h-full">
          <div className="w-full flex flex-col gap-6">
            <Category />
            <Sort
              productList={productsData}
              handleSortedData={handleSortedData}
            />
          </div>
        </div>
        <div className="w-full mdl:w-[80%] sm:w-[100%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductList productsData={cachedProductsData} loading={loading} />
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;
