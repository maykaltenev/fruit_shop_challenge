import { useContext } from "react";

import { ProductContext } from "../Context/ProductContext";
import ComplexCard from "../ComplexCard/ComplexCard";
import { useParams } from "react-router-dom";
export default function ActionAreaCard() {
  const { detailed } = useContext(ProductContext);
  const { store } = useParams();

  return (
    <div>
      <ComplexCard product={detailed} store={store} name={"searchInput"} />
    </div>
  );
}
