import React, { useEffect, useRef, useState } from "react";
import ProductItem from "../components/product/ProductItem";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import emptyList from "../assets/svg/productEmpty.svg";

const usePagination = (itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextClick = (totalPages) => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    if (containerRef.current) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [currentPage]);

  const PaginatedList = ({ items, loading }) => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);

    return (
      <div ref={containerRef}>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-3 xl:gap-x-4">
          {currentItems?.map((item) => (
            <ProductItem product={item} />
          ))}
        </div>
        <div className=" mt-8">
          <div className="flex md:flex-row sm:flex-col items-center lg:justify-between sm:justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div>
              <p className="text-sm text-gray-700">
                Showing
                <span className="font-medium px-1 text-primary">
                  {currentItems?.[0]?.id}
                </span>
                to
                <span className="font-medium px-1 text-primary">
                  {currentItems?.slice(-1)[0]?.id}
                </span>
                of
                <span className="font-medium px-1 text-primary">
                  {items?.length}
                </span>
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  disabled={currentPage === 1}
                  onClick={handlePrevClick}
                  className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <GrFormPrevious className="h-5 w-5" aria-hidden="true" />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      disabled={currentPage === page}
                      className={
                        currentPage === page
                          ? "current-page"
                          : "pagination-cell"
                      }
                    >
                      {page}
                    </button>
                  </nav>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handleNextClick(totalPages)}
                  className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <GrFormNext className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return { currentPage, setCurrentPage, handlePageChange, PaginatedList };
};

export default usePagination;
