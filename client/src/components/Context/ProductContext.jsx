import { createContext, useEffect, useState } from "react";
const ProductContext = createContext(null);
const ProductContextProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  const [allCategory, setAllCategory] = useState(0);
  const [category, setCategory] = useState(0);
  const [result, setResult] = useState(null);
  const [detailed, setDetailed] = useState(null);
  return (
    <ProductContext.Provider
      value={{
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export { ProductContext, ProductContextProvider };
