import axios from "axios";

export async function getStore(vendor_url) {
  return axios
    .get(`https://api.predic8.de:443` + `${vendor_url}`)
    .then((data) => data?.data)
    .catch((error) => {
      console.error(error);
    });
}
