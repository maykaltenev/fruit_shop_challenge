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
import DetailedPage from './components/DetailedPage/DetailedPage.jsx'
import Home from "./components/Home/Home";

function App() {
  const { product, result } = useContext(ProductContext);

  return (
    <div>
      <Home />
      <Routes >
        <Route path="/" element={< Home />} />
        <Route path="/list" element={<Card />} />
        <Route path="/tabs" element={result?.map((item, i) => <ComplexCard key={i} product={item} />)} />
        < Route path="/product/:name" element={<DetailedPage />} />
      </Routes>


    </div>
  );
}

export default App;
