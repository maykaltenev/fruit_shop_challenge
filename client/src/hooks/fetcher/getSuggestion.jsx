import axios from "axios";

export async function getSuggestions(searchText) {
  const response = await axios
    .get("https://api.predic8.de:443/shop/products/?page=1&limit=34")
    .then((data) =>
      data?.data?.products?.filter((product) =>
        product?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
      )
    );
  return response;
}
