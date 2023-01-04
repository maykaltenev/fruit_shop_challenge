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

// Import Context
import { ProductContext } from "../Context/ProductContext.jsx";
const List = () => {
  const { product, setProduct, setResult } = useContext(ProductContext);
  const [data, setData] = useState(null);
  const [select, setSelected] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    console.log(e.target.value);
    setSelected(e.target.value);
    setProduct(null);
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
      const found = data?.find((item) => item?.name === select);
      const result = await getProduct(found?.product_url);
      setProduct(result);
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
