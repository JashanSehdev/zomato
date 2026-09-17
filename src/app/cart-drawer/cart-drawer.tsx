import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useAppSelector } from "../hooks";
import NumberSpinner from './number-spinner/number-spinner';

const vegIcon =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAYdyQeebetBOfS4r29ouOK46COCOVYq8K7bNiqnTU2w&s=10";
const nonVegIcon =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJijLjxV7cCZtAvDWreecHf11BVISMFuJlu2lO2BkA&s=10";

export default function CartDrawer() {
  const [open, setOpen] = React.useState(false);
  const cart = useAppSelector((state) => state.cart.cart);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 500 }} role="presentation" >
      <List>
        {cart.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {" "}
                <Box
                  component={"img"}
                  src={item.food.vegetarian ? vegIcon : nonVegIcon}
                  alt="veg Icon"
                  width={20}
                />
              </ListItemIcon>
              <ListItemText primary={item.food.dish_name} />
              <NumberSpinner cartItem={item} label="quantity" size="small" min={0} max={10} value={item.quantity}  />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <ShoppingCartOutlinedIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
