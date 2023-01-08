import React from "react";
import SearchInput from "../SearchInput/SearchInput";
import NavTabs from "../NavTabs/NavTabs";
import List from "../List/List";
import { Box } from "@mui/material";
export default function Home() {
  return (
    <Box
      sx={{
        width: "80%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <NavTabs />
      <List />
      <SearchInput />
    </Box>
  );
}
