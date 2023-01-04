import { useEffect, useContext } from "react";

//Import MaterialUI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// Router
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    console.log("value", newValue);
    setCategory(newValue);
    setProduct(null);
    navigate("/tabs");
  };

  useEffect(() => {
    const fetchData = () => {
      setTimeout(async () => {
        const response = await getAllCategories();
        console.log(response);
        setAllCategory(response);
      }, 2000);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (category !== 0 && category !== undefined) {
        setTimeout(async () => {
          const aCategory = await getACategory(category);
          const found = aCategory?.map(
            (item) => `https://api.predic8.de:443${item?.product_url}`
          );
          const productResult = await getProducts(found);
          setResult(productResult);
        }, 2000);
      } else {
        setTimeout(async () => {
          const found = allCategory
            ?.map((item) =>
              item?.products?.map(
                (item) => `https://api.predic8.de:443${item?.product_url}`
              )
            )
            .flat();
          const productResult = await getProducts(found);
          setResult(productResult);
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
