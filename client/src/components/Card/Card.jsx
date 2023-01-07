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
