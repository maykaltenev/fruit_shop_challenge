import axios from "axios";

export const getAllCategories = () => {
  let request1 = axios.get("https://api.predic8.de/shop/categories/Fruits");
  let request2 = axios.get("https://api.predic8.de/shop/categories/Dried");
  let request3 = axios.get("https://api.predic8.de/shop/categories/Fresh");
  let request4 = axios.get("https://api.predic8.de/shop/categories/Exotic");
  let request5 = axios.get("https://api.predic8.de/shop/categories/Nuts");
  return axios
    .all([request1, request2, request3, request4, request5])
    .then((data) => data?.map((data) => data?.data))
    .catch((error) => {
      console.error(error);
    });
};
