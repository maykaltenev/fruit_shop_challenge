import { useEffect, useContext } from "react";

//Import MaterialUI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

//Import fetching categories and products
import { getAllCategories } from "../../hooks/fetcher/getCategory";
import { getProduct, getProducts } from "../../hooks/fetcher/getProducts";
import { getACategory } from "../../hooks/fetcher/getCategory";
//Import Context
import { ProductContext } from "../Context/ProductContext.jsx";

export default function NavTabs() {
  const {
    allCategory,
    setAllCategory,
    category,
    setResult,
    setCategory,
    setProduct,
    product,
  } = useContext(ProductContext);
  const handleChange = (event, newValue) => {
    console.log("value", newValue);
    setCategory(newValue);
  };

  useEffect(() => {
    const fetchData = () => {
      setTimeout(async () => {
        const response = await getAllCategories();
        setAllCategory(response);
      }, 1000);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (category !== 0 && category !== undefined) {
        const aCategory = await getACategory(category);
        const found = aCategory?.map(
          (item) => `https://api.predic8.de:443${item?.product_url}`
        );
        setTimeout(async () => {
          const productResult = await getProducts(found);
          setResult(productResult);
          setProduct(null);
        }, 1000);
      } else {
        const found = allCategory
          ?.map((item) =>
            item?.products?.map(
              (item) => `https://api.predic8.de:443${item?.product_url}`
            )
          )
          .flat();
        setTimeout(async () => {
          const productResult = await getProducts(found);
          setResult(productResult);
          setProduct(null);
        }, 1000);
      }
    };
    fetchProduct();
  }, [category]);

  return (
    <Box sx={{ width: "100%" }}>
      {allCategory && (
        <Tabs
          onChange={handleChange}
          value={category}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="All" />
          {allCategory?.map((allCategory, i) => (
            <Tab key={i} label={allCategory?.name} value={allCategory?.name} />
          ))}
        </Tabs>
      )}
    </Box>
  );
}
