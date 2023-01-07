import { createContext, useEffect, useState } from "react";
const ProductContext = createContext(null);
const ProductContextProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  const [allCategory, setAllCategory] = useState(0);
  const [category, setCategory] = useState(0);
  const [detailedCategory, setDetailedCategory] = useState(null);

  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState(null);

  const getProductFromLocalStorage = () => {
    const product = localStorage.getItem("productName");
    if (product) {
      return JSON.parse(localStorage.getItem("productName"));
    } else {
      return {};
    }
  };
  const getResultProductFromLocalStorage = () => {
    const result = localStorage.getItem("result");
    if (result) {
      return JSON.parse(localStorage.getItem("result"));
    } else {
      return [];
    }
  };
  const getRecentlyViewed = () => {
    const recently = localStorage.getItem("recently");
    if (recently) {
      return JSON.parse(localStorage.getItem("recently"));
    } else {
      return [];
    }
  };
  const [recently, setRecently] = useState(getRecentlyViewed());
  const [detailed, setDetailed] = useState(getProductFromLocalStorage());
  const [result, setResult] = useState(getResultProductFromLocalStorage());
  return (
    <ProductContext.Provider
      value={{
        suggestions,
        setSuggestions,
        product,
        setProduct,
        category,
        setCategory,
        detailedCategory,
        setDetailedCategory,
        allCategory,
        setAllCategory,
        result,
        setResult,
        detailed,
        setDetailed,
        data,
        setData,
        recently,
        setRecently,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export { ProductContext, ProductContextProvider };
