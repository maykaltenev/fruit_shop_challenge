import React, { useState, useEffect, useContext } from "react";
import {
  getAllProducts,
  getProduct,
} from "../../hooks/fetcher/getProducts.jsx";
// Router
import { useNavigate } from "react-router-dom";
// Material UI Imports
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getStore } from "../../hooks/fetcher/getStore";
import { getSubstring } from "../../hooks/helper/getSubstring";
// Import Context
import { ProductContext } from "../Context/ProductContext.jsx";
const List = () => {
  const { data, setData, product, setProduct, setResult, setDetailed } =
    useContext(ProductContext);

  const [select, setSelected] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSelected(e.target.value);
    navigate("/list");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllProducts();
      setData(response);
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
          const found = data?.find((item) => item?.name === select);
          result = await getProduct(found?.product_url);
          if (result !== undefined) {
            let category = getSubstring(result?.category_url);
            let store = await getStore(result?.vendor_url);
            setDetailed((detailed) => {
              return {
                ...result,
                category: category,
                store: store?.name,
              };
            });
            navigate(`/product/${result?.name}`);
          } else {
            throw "Error fetching products";
          }
        } catch (error) {
          console.log(error);
        }
        counter++;
      } while (result === undefined && counter < maxAttempts);

      console.log(result);
    };
    fetchProduct();
  }, [select]);

  return (
    <div>
      {data && (
        <Box sx={{ maxWidth: 220, marginY: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Fruit</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={select}
              label="Fruit"
              onChange={handleChange}
            >
              {data?.map((product, i) => (
                <MenuItem key={i} value={product?.name}>
                  {product?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </div>
  );
};

export default List;
