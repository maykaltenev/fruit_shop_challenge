import { createContext, useEffect, useState } from "react";
const ProductContext = createContext(null);
const ProductContextProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  return (
    <ProductContext.Provider
      value={{ product, setProduct, category, setCategory }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export { ProductContext, ProductContextProvider };
