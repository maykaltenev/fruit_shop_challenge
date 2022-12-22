import React, { useState, useEffect } from "react";
import getAllProducts from "../../hooks/fetcher/getAllProducts.jsx";

// Material UI Imports
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const List = () => {
  const [data, setData] = useState(null);
  const [select, setSelected] = useState("");

  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  console.log(select);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllProducts();
      setData(response);
    };
    fetchData();
  }, []);
  console.log(data);
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
