import { useEffect, useContext } from "react";

//Import MaterialUI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
//Import fetching categories and products
import { getAllCategories } from "../../hooks/fetcher/getCategory";
import { getProduct, getProducts } from "../../hooks/fetcher/getProducts";
//Import Context
import { ProductContext } from "../Context/ProductContext.jsx";

export default function NavTabs() {
  const { category, setCategory, setProduct, product } =
    useContext(ProductContext);
  const handleChange = (event, newValue) => {
    setCategory(newValue);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllCategories();
      console.log(response);
      setCategory(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      const found = category
        ?.map((item) =>
          item?.products?.map(
            (item) => `https://api.predic8.de:443${item?.product_url}`
          )
        )
        .flat();
      console.log(found);
      setProduct(found);
    };

    fetchProduct();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        onChange={handleChange}
        value={0}
        aria-label="Tabs where each tab needs to be selected manually"
      >
        <Tab label="All" />
      </Tabs>
    </Box>
  );
}
