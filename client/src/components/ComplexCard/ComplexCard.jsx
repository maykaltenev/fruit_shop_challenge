import { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardActionArea } from "@mui/material";

import { getProduct } from "../../hooks/fetcher/getProducts";
import { ProductContext } from "../Context/ProductContext.jsx";
import { useNavigate } from "react-router-dom";
export const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ComplexCard({ product }) {
  const [expanded, setExpanded] = useState(false);
  const { data, setData, setDetailed } = useContext(ProductContext);
  const navigate = useNavigate();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClick = (e) => {
    console.log(data);
    const value = e.target.value;
    console.log(value);
    const fetchProduct = async (value) => {
      console.log("insideFetch", value);
      try {
        const found = data?.find((item) => item?.name === value);
        console.log("found", found);
        const result = await getProduct(found?.product_url);
        console.log("result", result);
        if (result !== undefined) {
          setDetailed(result);
          localStorage.setItem("productName", JSON.stringify(result));
          navigate(`/product/${result?.name}`);
        } else {
          throw console.error("Value is undefined");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct(value);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ fontSize: 8, bgcolor: red[500] }} aria-label="recipe">
            {product.name}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={product?.name}
        subheader={product?.price + " €"}
      />
      <CardMedia
        component="img"
        height="140"
        image={`https://api.predic8.de:443${product?.photo_url}`}
        alt={product?.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary"></Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleClick}
          value={product.name}
        >
          Show more
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Category:</Typography>
          <Typography paragraph></Typography>
          <Typography paragraph></Typography>
          <Typography paragraph></Typography>
          <Typography></Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
