import { createContext, useEffect, useState } from "react";
const ProductContext = createContext(null);
const ProductContextProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  const [allCategory, setAllCategory] = useState(0);
  const [category, setCategory] = useState(0);
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState(null);
  const getAnswersFromLocalStorage = () => {
    const product = localStorage.getItem("productName");
    if (product) {
      return JSON.parse(localStorage.getItem("productName"));
    } else {
      return "[]";
    }
  };
  const [detailed, setDetailed] = useState(getAnswersFromLocalStorage());

  return (
    <ProductContext.Provider
      value={{
        suggestions,
        setSuggestions,
        product,
        setProduct,
        category,
        setCategory,
        allCategory,
        setAllCategory,
        result,
        setResult,
        detailed,
        setDetailed,
        data,
        setData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export { ProductContext, ProductContextProvider };
