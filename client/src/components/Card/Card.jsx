import { useContext } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import { CardActionArea } from "@mui/material";
import { ProductContext } from "../Context/ProductContext";
import ComplexCard from "../ComplexCard/ComplexCard";
export default function ActionAreaCard() {
  const { product } = useContext(ProductContext);
  console.log(product);
  return (
    <div>
      <ComplexCard product={product} />
    </div>
  );
}
