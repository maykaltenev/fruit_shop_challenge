import React, { useContext } from "react";
import ComplexCard from "../ComplexCard/ComplexCard";
import { ProductContext } from "../Context/ProductContext";
import { useParams } from "react-router-dom";
export default function CategoryCard() {
  const { result } = useContext(ProductContext);

  const { store } = useParams();
  return (
    <div>
      {result &&
        result?.map((item, i) => (
          <ComplexCard key={i} product={item} store={store} name={"category"} />
        ))}
    </div>
  );
}
