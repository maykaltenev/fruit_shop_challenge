import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import ComplexCard from "../ComplexCard/ComplexCard.jsx";
import { ProductContext } from "../Context/ProductContext.jsx";

export default function ViewedCard() {
  const { fromRecentFive } = useContext(ProductContext);
  const { store } = useParams();
  return (
    <div>
      <ComplexCard product={fromRecentFive} store={store} name={"recently"} />
    </div>
  );
}
