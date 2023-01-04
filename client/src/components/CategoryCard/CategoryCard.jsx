import React, { useContext } from "react";
import ComplexCard from "../ComplexCard/ComplexCard";
import { ProductContext } from "../Context/ProductContext";

export default function CategoryCard() {
  const { result } = useContext(ProductContext);

  return (
    <div>
      {result &&
        result?.map((item, i) => <ComplexCard key={i} product={item} />)}
    </div>
  );
}
