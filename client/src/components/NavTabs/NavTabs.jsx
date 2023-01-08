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
    result,
    setResult,
    setCategory,
    setProduct,
    setDetailed,
    detailed,
  } = useContext(ProductContext);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
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
      let result;
      let counter = 0;
      const maxAttempts = 99;
      do {
        try {
          if (category !== 0 && category !== undefined) {
            const aCategory = await getACategory(category);
            if (aCategory) {
              const found = aCategory?.map(
                (item) => `https://api.predic8.de:443${item?.product_url}`
              );
              result = await getProducts(found);
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
            } else {
              const found = allCategory
                ?.map((item) =>
                  item?.products?.map(
                    (item) => `https://api.predic8.de:443${item?.product_url}`
                  )
                )
                .flat();
              if (found !== undefined) {
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
                  console.log("all resolved", resolvedValues);
                  localStorage.setItem(
                    "result",
                    JSON.stringify(resolvedValues)
                  );
                  setResult(resolvedValues);
                } else {
                  throw "Error fetching products";
                }
              }
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
      ) : (
        "Loading..."
      )}
    </Box>
  );
}
