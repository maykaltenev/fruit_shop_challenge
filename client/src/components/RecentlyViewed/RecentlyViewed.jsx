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
import HistoryIcon from "@mui/icons-material/History";
import Looks5Icon from "@mui/icons-material/Looks5";
import Home from "../Home/Home";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";
const drawerWidth = 140;
export default function RecentlyViewed() {
  const { recently, fromRecentFive, setFromRecentFive } =
    useContext(ProductContext);
  const [valueTab, setValueTab] = useState(0);
  const navigate = useNavigate();
  const { store } = useParams;

  const handleChange = (e) => {
    const name = e.target.getAttribute("name");
    console.log("name", name);

    const found = recently?.find((item) => item?.name === name);

    const indexValue = recently.findIndex((item) => item === found);
    console.log("index", indexValue);
    setValueTab(indexValue);
    setFromRecentFive(found);

    navigate(`/viewed/${found?.name}/${found?.store}`);
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

        <Typography sx={{ fontSize: 27 }} variant="h6" noWrap component="div">
          Fruit Shop
        </Typography>
        <Divider />
        <List sx={{ bgcolor: "#FF9933", p: 1, height: "100%" }}>
          <Box display="flex" justifyContent="center" sx={{ p: 2 }}>
            <Looks5Icon />
            <HistoryIcon />
          </Box>
          <Divider />
          <Tabs
            orientation="vertical"
            variant="scrollable"
            onChange={handleChange}
            value={valueTab}
            scrollButtons
            allowScrollButtonsMobile
          >
            {recently?.map((recently, i) => (
              <Tab key={i} label={recently?.name} name={recently?.name} />
            ))}
          </Tabs>
        </List>
      </Drawer>
    </Box>
  );
}
