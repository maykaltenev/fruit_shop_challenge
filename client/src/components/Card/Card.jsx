import { useContext } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { CardActionArea } from "@mui/material";
import { ProductContext } from "../Context/ProductContext";

export default function ActionAreaCard() {
  const { product } = useContext(ProductContext);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`https://api.predic8.de:443${product?.photo_url}`}
          alt={product?.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product?.name}
            <Stack direction="row" spacing={1}>
              <Chip label={product?.price + "€"} />
            </Stack>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
