import React, { useState } from "react";
import { getSuggestions } from "../../hooks/fetcher/getSuggestion";

import axios from "axios";
import { useEffect } from "react";

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

  return (
    <div>
      <input type="text" value={searchText} onChange={handleChange} />
      <ul>
        {suggestions?.map((suggestion, i) => (
          <li key={i}>{suggestion?.name}</li>
        ))}
      </ul>
      <button onClick={() => setSuggestions([])}>Clear Suggestions</button>
    </div>
  );
}
