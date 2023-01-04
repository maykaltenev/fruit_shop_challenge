import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import { getSuggestions } from "../../hooks/fetcher/getSuggestion";
import { getProduct } from "../../hooks/fetcher/getProducts";
export default function SearchInput() {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [chosen, setChosen] = useState("");
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
    setChosen(value);
  };
  useEffect(() => {
    const fetchProduct = async () => {
      const found = suggestions?.find((item) => item?.name === chosen);
      const result = await getProduct(found?.product_url);
      console.log(result);
    };
    fetchProduct();
  }, [chosen]);
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
      <button onClick={() => setSuggestions([])}>Clear Suggestions</button>
    </div>
  );
}
