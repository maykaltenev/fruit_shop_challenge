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
import CategoryCard from "./components/CategoryCard/CategoryCard";
import ActionAreaCard from "./components/Card/Card";
import RecentlyViewed from "./components/RecentlyViewed/RecentlyViewed";
import ViewedCard from "./components/ViewedCard/ViewedCard";
function App() {


  return (
    <div>
      <RecentlyViewed />
      <Routes >
        <Route path="/" />
        <Route path="/list" element={<ActionAreaCard />} />
        <Route path="/tabs" element={<CategoryCard />} />
        <Route path="/viewed/:name/:store" element={<ViewedCard />} />
        <Route path="/product/:name" element={<DetailedPage />} />
        <Route path="/product/:name/:store" element={<DetailedPage />} />
      </Routes>


    </div>
  );
}

export default App;
