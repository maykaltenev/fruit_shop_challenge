import React, { useContext } from "react";
import List from "./components/List/List";
import Card from "./components/Card/Card"
import ComplexCard from "./components/ComplexCard/ComplexCard";
import { ProductContext } from "./components/Context/ProductContext";
import SearchInput from "./components/SearchInput/SearchInput";
import NavTabs from "./components/NavTabs/NavTabs";


function App() {
  const { product, result } = useContext(ProductContext);

  return (
    <div>
      <SearchInput />
      <NavTabs />
      <List />
      {product && <Card />}
      {result && result?.map((item, i) => <ComplexCard key={i} product={item} />)}

    </div>
  );
}

export default App;
