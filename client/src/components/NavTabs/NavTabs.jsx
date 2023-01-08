import { useEffect, useState, useContext } from "react";

//Import MaterialUI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// Router
import { useNavigate } from "react-router-dom";
//Import fetching categories and products
import { getAllCategories } from "../../hooks/fetcher/getCategory";
import { getProducts } from "../../hooks/fetcher/getProducts";
import { getACategory } from "../../hooks/fetcher/getCategory";
import { getStore } from "../../hooks/fetcher/getStore";
import { getSubstring } from "../../hooks/helper/getSubstring";
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
  } = useContext(ProductContext);
  const [valueCategoryTab, setValueCategoryTab] = useState("0");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setCategory(newValue);
    setProduct(null);
    navigate("/tabs");
  };

  useEffect(() => {
    const fetchData = () => {
      setTimeout(async () => {
        let response = await getAllCategories();
        const allProducts = response.map((item) => item.products).flat();
        const all = { name: "All", products: allProducts };
        const allCategoryUpdated = [all, ...response];
        setAllCategory(allCategoryUpdated);
      }, 2000);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      let result;
      let counter = 0;
      const maxAttempts = 99;
      console.log(category);
      do {
        try {
          if (category !== undefined) {
            const found = allCategory?.find((item) => item?.name === category);
            const foundIndex = allCategory?.findIndex((item) => item === found);
            setValueCategoryTab(foundIndex);
            const aCategory = await getACategory(category);
            let tabProducts;
            if (aCategory && category !== "All") {
              tabProducts = aCategory?.map(
                (item) => `https://api.predic8.de:443${item?.product_url}`
              );
            } else {
              tabProducts = found?.products?.map(
                (item) => `https://api.predic8.de:443${item?.product_url}`
              );
            }

            result = await getProducts(tabProducts);
            if (result !== undefined) {
              let resolvedValues = await Promise.all(
                result.map(async (item) => {
                  let category = getSubstring(item?.category_url);
                  let store = await getStore(item?.vendor_url).then(
                    (data) => data?.name
                  );
                  return { ...item, category, store };
                })
              );
              localStorage.setItem("result", JSON.stringify(resolvedValues));
              setResult(resolvedValues);
            } else {
              throw "Error fetching products";
            }
          }
        } catch (error) {
          console.log(error);
        }
        counter++;
      } while (result === undefined && counter < maxAttempts);
    };
    fetchProduct();
  }, [category]);

  return (
    <Box sx={{ width: "50%" }}>
      {allCategory ? (
        <Tabs
          onChange={handleChange}
          value={allCategory[valueCategoryTab]?.name}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          {allCategory?.map((allCategory, i) => (
            <Tab key={i} label={allCategory?.name} value={allCategory?.name} />
          ))}
        </Tabs>
      ) : (
        "Loading..."
      )}
    </Box>
  );
}
