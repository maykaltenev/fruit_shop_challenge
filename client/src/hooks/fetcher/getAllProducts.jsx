import axios from "axios";

const getAllProducts = () => {
  return axios
    .get("https://api.predic8.de:443/shop/products/")
    .then((data) => data?.data?.products)
    .catch((error) => {
      console.error(error);
    });
};

export default getAllProducts;
