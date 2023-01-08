import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ComplexCard from "../ComplexCard/ComplexCard";
import { ProductContext } from "../Context/ProductContext";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ViewedCard from "../ViewedCard/ViewedCard";
import Home from "../Home/Home";

const drawerWidth = 140;
export default function RecentlyViewed() {
  const { recently, fromRecentFive, setFromRecentFive } =
    useContext(ProductContext);
  const navigate = useNavigate();
  const { store } = useParams;

  const handleChange = (e) => {
    const name = e.target.getAttribute("name");
    const found = recently?.find((item) => item?.name === name);
    setFromRecentFive(found);
    navigate("/viewed");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#FF9933",
          width: `calc(100% - ${drawerWidth}px)`,
          mr: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Home />
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Toolbar />
      </Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />

        <Typography sx={{ fontSize: 25 }} variant="h6" noWrap component="div">
          Fruit Shop
        </Typography>
        <Divider />
        <List sx={{ bgcolor: "#FF9933", height: "100%" }}>
          <ListItem>
            <ListItemText primary={"Last 5 Viewed"} />
          </ListItem>
          {recently?.map((item, index) => (
            <ListItem onClick={handleChange} key={index} disablePadding>
              <div
                name={item?.name}
                style={{
                  fontSize: 14,
                  width: "100%",
                  cursor: "pointer",
                  padding: 9,
                  borderBottom: "2px red solid",
                }}
              >
                {item?.name}
              </div>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
