import { useEffect, useState } from "react";
import getAllCategory from "../apis/category/getAllCategory";

const useCategory = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const fetchData = async () => {
        const res = await getAllCategory();
        if (res?.status) {
          setCategoryList(res?.data);
        }
      };
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return { categoryList };
};

export default useCategory;
