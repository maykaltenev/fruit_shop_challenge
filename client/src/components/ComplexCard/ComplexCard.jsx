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
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardActionArea } from "@mui/material";
// Routing
import { useNavigate } from "react-router-dom";
// Fetching Products
import { getProduct } from "../../hooks/fetcher/getProducts";
import { getStore } from "../../hooks/fetcher/getStore";
import { getSubstring } from "../../hooks/helper/getSubstring";
// ProductContext
import { ProductContext } from "../Context/ProductContext.jsx";

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
  const {
    data,
    setData,
    setDetailed,
    setDetailedCategory,
    detailed,
    detailedCategory,
  } = useContext(ProductContext);
  const navigate = useNavigate();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = (e) => {
    console.log(data);
    const value = e.target.value;
    console.log(value);
    const fetchProduct = async (value) => {
      let result;
      let found;
      let counter = 0;
      const maxAttempts = 99;
      do {
        try {
          found = data?.find((item) => item?.name === value);
          result = await getProduct(found?.product_url);
          if (result !== undefined) {
            let category = getSubstring(result?.category_url);
            let store = await getStore(result?.vendor_url);
            console.log(result);
            console.log(category);
            console.log(store.name);
            setDetailed((detailed) => {
              return {
                ...result,
                category: category,
                store: store?.name,
              };
            });
            handleExpandClick();
            localStorage.setItem("productName", JSON.stringify(detailed));
            navigate(`/product/${result?.name}`);
          } else {
            throw "Error result undefined";
          }
        } catch (error) {
          console.error(error);
        }
        counter++;
      } while (result === undefined && counter < maxAttempts);
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
          value={product?.name}
        >
          Show details
        </IconButton>

        <ExpandMore
          expand={expanded}
          aria-expanded={expanded}
          aria-label="show more"
        ></ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Category: {product?.category}</Typography>
          <Typography paragraph>Store: {product?.store}</Typography>
          <Typography paragraph></Typography>
          <Typography paragraph></Typography>
          <Typography></Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
