import React, { useState, useEffect } from "react";
import {
  getAllProducts,
  getProduct,
} from "../../hooks/fetcher/getProducts.jsx";

// Material UI Imports
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const List = () => {
  const [data, setData] = useState(null);
  const [select, setSelected] = useState("");
  const [product, setProduct] = useState(null);

  const handleChange = async (e) => {
    setSelected(e.target.value);
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
  console.log(product);
  return (
    <div>
      {data && (
        <Box sx={{ minWidth: 120 }}>
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
