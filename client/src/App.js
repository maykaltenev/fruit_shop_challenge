import React, { useContext } from "react";
// Routes
import { Route, Routes } from "react-router-dom";
// Context
import { ProductContext } from "./components/Context/ProductContext";
// Components
import List from "./components/List/List";
import Card from "./components/Card/Card"
import ComplexCard from "./components/ComplexCard/ComplexCard";
import SearchInput from "./components/SearchInput/SearchInput";
import NavTabs from "./components/NavTabs/NavTabs";
import DetailedPage from './components/DetailedPage/DetailedPage'

function App() {
  const { product, result } = useContext(ProductContext);

  return (
    <div>

      <Routes>
        <Route path="/" element={<SearchInput />} />
        <Route path="/product/:id" element={<DetailedPage />} />
      </Routes>
      <NavTabs />
      <List />
      {product && <Card />}
      {result && result?.map((item, i) => <ComplexCard key={i} product={item} />)}

    </div>
  );
}

export default App;
