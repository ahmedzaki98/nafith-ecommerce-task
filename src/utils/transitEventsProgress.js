export const handleCategoryTranslation = (value, t) => {
  switch (value) {
    case "electronics":
      return t("shop.electronics");
    case "men's clothing":
      return t("shop.men_clothing");
    case "women's clothing":
      return t("shop.women_clothing");
    case "jewelery":
      return t("shop.jewelery");
    default:
    // code block
  }
};
