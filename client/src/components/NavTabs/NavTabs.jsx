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
  const { category, setCategory, setResult, setProduct, product } =
    useContext(ProductContext);
  const handleChange = (event, newValue) => {
    console.log("value", newValue);
    setCategory(newValue);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllCategories();
      console.log("response", response);
      setCategory(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("cat", category);
      const found = category
        ?.map((item) =>
          item?.products?.map(
            (item) => `https://api.predic8.de:443${item?.product_url}`
          )
        )
        .flat();
      const productResult = await getProducts(found);
      console.log(productResult);
      setResult(productResult);
    };
    fetchProduct();
  }, [category]);

  return (
    <Box sx={{ width: "100%" }}>
      {category && (
        <Tabs
          onChange={handleChange}
          value={category}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="All" />
          {category?.map((category, i) => (
            <Tab key={i} label={category?.name} />
          ))}
        </Tabs>
      )}
    </Box>
  );
}
