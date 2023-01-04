import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { getSuggestions } from "../../hooks/fetcher/getSuggestion";

export default function SearchInput() {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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
    console.log(value);
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
      <button onClick={() => setSuggestions([])}>Clear Suggestions</button>
    </div>
  );
}
