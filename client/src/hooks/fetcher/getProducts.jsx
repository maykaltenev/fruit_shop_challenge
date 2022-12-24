import axios from "axios";

export const getAllProducts = () => {
  return axios
    .get("https://api.predic8.de:443/shop/products/?page=1&limit=33")
    .then((data) => data?.data?.products)
    .catch((error) => {
      console.error(error);
    });
};

export const getProduct = (productUrl) => {
  return axios
    .get(`https://api.predic8.de:443${productUrl}`)
    .then((data) => data?.data)
    .catch((error) => {
      console.error(error);
    });
};

export const getProducts = (productUrl) => {
  console.log(productUrl);
  return axios
    .all(productUrl.map((url) => axios.get(url)))
    .then((data) => data.map((data) => data?.data))
    .catch((error) => {
      console.error(error);
    });
};
