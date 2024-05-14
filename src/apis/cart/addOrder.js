import axios from "axios";

const addOrder = async (productList) => {
  const formData = new FormData();
  formData.append("products", JSON.stringify(productList));
  formData.append("userId", "5");
  formData.append("date", "2024-05-13");

  let url = "https://fakestoreapi.com/carts";

  try {
    const res = await axios.post(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
  }
};

export default addOrder;
