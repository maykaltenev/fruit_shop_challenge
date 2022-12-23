import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { getAllCategories } from "../../hooks/fetcher/getCategory";

export default function NavTabs() {
  const [value, setValue] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllCategories();
      console.log(response);
      setValue(response);
    };
    fetchData();
  }, []);
  console.log(value);
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where each tab needs to be selected manually"
      >
        <Tab label="All" />
      </Tabs>
    </Box>
  );
}
