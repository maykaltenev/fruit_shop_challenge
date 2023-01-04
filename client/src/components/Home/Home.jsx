import React from "react";
import SearchInput from "../SearchInput/SearchInput";
import NavTabs from "../NavTabs/NavTabs";
import List from "../List/List";
export default function Home() {
  return (
    <div>
      <SearchInput />
      <NavTabs />
      <List />
    </div>
  );
}
