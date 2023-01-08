import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import ComplexCard from "../ComplexCard/ComplexCard.jsx";
import { ProductContext } from "../Context/ProductContext.jsx";

export default function DetailedPage() {
  const { detailed } = useContext(ProductContext);
  const { store } = useParams();
  return (
    <div>
      <ComplexCard product={detailed} store={store} name={"searchInput"} />
    </div>
  );
}
