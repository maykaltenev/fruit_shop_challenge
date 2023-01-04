import React, { useContext } from "react";
import ComplexCard from "../ComplexCard/ComplexCard.jsx";
import { ProductContext } from "../Context/ProductContext.jsx";

export default function DetailedPage() {
  const { detailed } = useContext(ProductContext);
  console.log(detailed);
  return (
    <div>
      <ComplexCard product={detailed} />
    </div>
  );
}
