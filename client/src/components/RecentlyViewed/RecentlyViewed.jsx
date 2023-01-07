import React, { useContext } from "react";
import { useParams } from "react-router-dom";
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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import Looks5Icon from "@mui/icons-material/Looks5";
const drawerWidth = 220;
export default function RecentlyViewed() {
  const { recently } = useContext(ProductContext);
  const { store } = useParams;
  console.log(recently);
  return (
    //  <h1>Recently viewed</h1>
    //   <Box display="flex" flexDirection="row">
    //   {recently &&
    //     recently.map((item) => {
    //       return (
    //         <ComplexCard product={item} store={store} name={"recently"} />
    //       );
    //     })}

    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }}
      >
        {/* <Toolbar>
          <Typography variant="h5" noWrap component="div">
            Fruit Shop
          </Typography>
        </Toolbar> */}
      </AppBar>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}
      >
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
        <Divider />

        <Divider />
        <List>
          {recently?.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ? (
                    <LooksOneIcon />
                  ) : index === 1 ? (
                    <LooksTwoIcon />
                  ) : index === 2 ? (
                    <Looks3Icon />
                  ) : index === 3 ? (
                    <Looks4Icon />
                  ) : index === 4 ? (
                    <Looks5Icon />
                  ) : (
                    ""
                  )}
                </ListItemIcon>
                <ListItemText primary={item?.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
