import React, { useContext } from "react";
import List from "./components/List/List";
import Card from "./components/Card/Card"

import { ProductContext } from "./components/Context/ProductContext";

import NavTabs from "./components/NavTabs/NavTabs";


function App() {
  const { product } = useContext(ProductContext);
  return (
    <div>
      <NavTabs />
      <List />
      {product
        && <Card />}

    </div>
  );
}

export default App;
