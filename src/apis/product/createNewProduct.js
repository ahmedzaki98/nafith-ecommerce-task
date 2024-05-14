import axios from "axios";

const createNewProduct = async (product) => {
  const formData = new FormData();
  formData.append("title", product.title);
  formData.append("price", product.price);
  formData.append("description", product.description);
  formData.append("category", product.category);
  formData.append("image", product.image.name);

  let url = "https://fakestoreapi.com/products";

  try {
    const res = await axios.post(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {}
};

export default createNewProduct;
