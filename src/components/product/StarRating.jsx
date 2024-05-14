import React from "react";
import { useTranslation } from "react-i18next";

const StarRating = ({ rating, width, height }) => {
  const { i18n } = useTranslation();

  const generateStars = () => {
    const maxRating = 5;
    const fullStars = Math.floor(rating); // Get the integer part of the rating
    const decimalPart = rating % 1; // Get the decimal part of the rating

    const stars = [];

    // Generate full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          className={`w-${width} h-${height} text-yellow-300 me-1`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }

    // Generate half star if applicable
    if (decimalPart >= 0.5) {
      stars.push(
        <svg
          className={`w-${width} h-${height} text-yellow-300 me-1`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 22 20"
        >
          <defs>
            <linearGradient
              id="half-color-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              {i18n.language === "en" ? (
                <>
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="gray" />
                </>
              ) : (
                <>
                  <stop offset="50%" stopColor="gray" />
                  <stop offset="50%" stopColor="currentColor" />
                </>
              )}
              {/* <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="gray" /> */}
            </linearGradient>
          </defs>
          <path
            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
            fill="url(#half-color-gradient)"
          />
        </svg>
      );
    } else if (decimalPart > 0) {
      console.log("🚀 ~ generateStars ~ decimalPart:", decimalPart.toFixed(2));
      stars.push(
        <svg
          className={`w-${width} h-${height} text-yellow-300 me-1`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 22 20"
        >
          <defs>
            <linearGradient
              id="half-color-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              {i18n.language === "en" ? (
                <>
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="gray" />
                </>
              ) : (
                <>
                  <stop offset="50%" stopColor="gray" />
                  <stop offset="50%" stopColor="currentColor" />
                </>
              )}
            </linearGradient>
          </defs>
          <path
            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
            fill="url(#half-color-gradient)"
          />
        </svg>
      );
    }

    // Generate remaining empty stars
    for (let i = fullStars + 1; i < maxRating; i++) {
      stars.push(
        <svg
          className={`w-${width} h-${height} text-gray-300 me-1`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="flex justify-center items-center gap-1 h-max">
      {generateStars()}
    </div>
  );
};

export default StarRating;
