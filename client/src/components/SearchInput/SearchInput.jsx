import React, { useState, useEffect, useContext } from "react";

// Routes
import { useNavigate, useParams } from "react-router-dom";
// MaterialUI Components
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
// Context
import { ProductContext } from "../Context/ProductContext.jsx";

// Fetchers
import { getSuggestions } from "../../hooks/fetcher/getSuggestion";
import { getProduct } from "../../hooks/fetcher/getProducts";

export default function SearchInput() {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const { detailed, setDetailed } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchText(e.target.value);
    if (searchText === "") {
      setSuggestions([]);
    }
    // Get suggestions based on the search text
    if (e.target.value === "") {
      setSuggestions([]);
    } else {
      getSuggestions(e.target.value).then((response) => {
        console.log(response);
        setSuggestions(response);
      });
    }
  };
  // Using vanilla innerHTML to grab the rendered value, because "e.target.value" ref to 0
  const handleClick = (e) => {
    const value = e.target.innerHTML.substring(
      0,
      e.target.innerHTML.indexOf("<")
    );
    const fetchProduct = async (value) => {
      const found = suggestions?.find((item) => item?.name === value);
      const result = await getProduct(found?.product_url);
      setDetailed(result);
      navigate(`/product/${result?.name}`);
      setSearchText("");
      setSuggestions([]);
    };
    fetchProduct(value);
  };
  const handleClear = () => {
    setSuggestions([]);
    setSearchText("");
  };

  return (
    <div>
      <input type="text" value={searchText} onChange={handleChange} />
      <ul onClick={handleClick}>
        {suggestions?.map((suggestion, i) => (
          <MenuItem value={suggestion?.name} sx={{ width: 300 }} key={i}>
            {suggestion?.name}
          </MenuItem>
        ))}
      </ul>
      {searchText !== "" && (
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleClear}
        >
          Clear
        </Button>
      )}
    </div>
  );
}
