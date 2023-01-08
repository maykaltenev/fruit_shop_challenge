import React, { useContext } from "react";
import ComplexCard from "../ComplexCard/ComplexCard";
import { ProductContext } from "../Context/ProductContext";
import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";

export default function CategoryCard() {
  const { result } = useContext(ProductContext);

  const { store } = useParams();
  return (
    <Grid container spacing={2}>
      {result &&
        result?.map((item, i) => (
          <Grid item xs={12} sm={6} md={3.5} key={i}>
            <ComplexCard product={item} store={store} name={"category"} />
          </Grid>
        ))}
    </Grid>
  );
}
