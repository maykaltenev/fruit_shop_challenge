import { useState, useContext, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
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

export default function ComplexCard({ product, store, name }) {
  const [expanded, setExpanded] = useState(false);
  const { data, result, setDetailed, detailed, recently, setRecently } =
    useContext(ProductContext);
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = (e) => {
    const value = e.target.value;

    if (name === "category") {
      let found = result?.find((item) => item?.name === value);

      setDetailed(found);
      handleExpandClick();
      updateRecently(found);
      localStorage.setItem("productName", JSON.stringify(found));
      navigate(`/product/${found?.name}/${found?.store}`);
    } else if (name === "searchInput") {
      handleExpandClick();
      updateRecently(detailed);
      localStorage.setItem("productName", JSON.stringify(detailed));
      navigate(`/product/${detailed?.name}/${detailed?.store}`);
    }
  };
  const updateRecently = (newValue) => {
    setRecently((recently) => {
      const updatedRecently = [newValue, ...recently];
      console.log(updatedRecently);
      if (updatedRecently.length > 5) {
        updatedRecently.pop();
      }
      localStorage.setItem("recently", JSON.stringify(updatedRecently));
      return updatedRecently;
    });
  };

  useEffect(() => {
    if (store) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, [detailed]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ fontSize: 8, bgcolor: red[500] }} aria-label="recipe">
            {product?.name}
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
          onClick={handleClick}
          aria-label="add to favorites"
          value={product?.name}
          sx={name === "recently" ? { fontSize: 12 } : { fontSize: 20 }}
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
        </CardContent>
      </Collapse>
    </Card>
  );
}
