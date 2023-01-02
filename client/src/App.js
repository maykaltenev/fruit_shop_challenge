import React, { useContext } from "react";
import List from "./components/List/List";
import Card from "./components/Card/Card"
import ComplexCard from "./components/ComplexCard/ComplexCard";
import { ProductContext } from "./components/Context/ProductContext";

import NavTabs from "./components/NavTabs/NavTabs";


function App() {
  const { product, result } = useContext(ProductContext);
  return (
    <div>
      <NavTabs />
      <List />
      {product
        && <Card />}
      {result && result?.map(item => <ComplexCard product={item} />)}

    </div>
  );
}

export default App;
