import axios from "axios";

const getAllCategory = async () => {
  let url = "https://fakestoreapi.com/products/categories";
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

export default getAllCategory;
