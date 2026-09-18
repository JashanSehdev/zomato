import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import styles from "./cart-drawer.style.module.css";
import { IconButton, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useAppSelector } from "../hooks";
import NumberSpinner from "./number-spinner/number-spinner";

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
    <Box sx={{ width: 500 }} role="presentation">
      <Typography variant="h3" className={styles.title}>
        {" "}
        Cart
      </Typography>
      <List>
        {cart.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "90dvh",
              scrollbarWidth: "none",
            }}
          >
            <Typography>Cart is Empty</Typography>
          </Box>
        ) : (
          cart.map((item, index) => (
            <ListItem key={index} disablePadding sx={{marginBottom:'0.5rem'}}>
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
                <Box>
                  <Typography sx={{fontWeight:'bold'}}>{item.food.dish_name}</Typography>
                  <Typography>{item.restaurant_name}</Typography>
                </Box>
                
              </ListItemButton>
              <NumberSpinner
                  foodId={item.food.id}
                  label="quantity"
                  size="small"
                  min={0}
                  max={10}
                  value={item.quantity}
                />
            </ListItem>
          ))
        )}
      </List>
      <Divider />
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
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
