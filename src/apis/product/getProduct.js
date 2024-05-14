import axios from "axios";

const getProduct = async (cat) => {
  let url;
  if (cat) {
    url = `https://fakestoreapi.com/products/category/${cat}`;
  } else {
    url = "https://fakestoreapi.com/products";
  }
  try {
    const res = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
  }
};

export default getProduct;
