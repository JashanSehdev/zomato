"use client";
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import styles from "./styles.module.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { pink } from "@mui/material/colors";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import chef from "@/../public/cooking.png";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { redirect } from "next/navigation";
import { addCartItem } from "@/features/cart/cart-list/cart.action";
import { useMemo } from "react";

const imageUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVJNTpMZ8SyX5chUSzZsaq79bicemVuYKn2sTV39ZGPw&s=10";
const vegIcon =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAYdyQeebetBOfS4r29ouOK46COCOVYq8K7bNiqnTU2w&s=10";
const nonVegIcon =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJijLjxV7cCZtAvDWreecHf11BVISMFuJlu2lO2BkA&s=10";
export default function Show() {
  const data = useAppSelector((state) => state.restaurant.restaurant);
  const cart = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();

  const search = useAppSelector((state) => state.search.search);
  const filteredMenu = useMemo(() => {
    return data.menu.filter((item) => {
      if (search.length < 3) return true;
      const searchTerm = search.toLowerCase();
  
      return item.dish_name.toLowerCase().includes(searchTerm); 
    });
  }, [data.menu, search]);

  return (
    <Box>
      <Box className={styles.container}>
        <Box>
          <IconButton
          sx={{height:'10px', width:'10px',marginBottom: "1rem"}}
            onClick={() => {
              redirect("/");
            }}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
        </Box>

        <Box className={styles.section1}>
          <Typography variant="h2">{data.restaurant_name || "Restaurant Name"}</Typography>
          <Box className={styles.rating}>
            <Typography variant="h5">{data.average_rating || "0.0"}</Typography>
          </Box>
        </Box>
        <Box className={styles.section2}>
          <Typography variant="h5" sx={{ color: "#696969" }}>
            {data.cuisine_type || "Cuisine type"}
          </Typography>
          <Typography sx={{ color: "#b6b0c2" }} variant="h6">
            {data.address || "this is address"}
          </Typography>
        </Box>
        <Box className={styles.section3}>
          <Box className={styles.opensAt}>
            <Typography sx={{ color: "orange" }}>Opens at</Typography> -{" "}
            <Typography>{data.opening_hours || "opening hour"}</Typography>
          </Box>
          |
          <Box className={styles.phone}>
            <LocalPhoneIcon /> <Typography>{data.phone_number || `###########`}</Typography>
          </Box>
        </Box>

        <Box component={"img"} className={styles.image} src={data.images || imageUrl} />
        <Divider />
        <Typography variant="h4">Menu</Typography>
        <Box>
          <Box className={styles.menuItem}>
            <List>
              {filteredMenu.map((item, index) => (
                <ListItem key={index} className={styles.ListItem}>
                  <Checkbox
                    checked = {cart.some((i) => i.restaurant_name === data.restaurant_name && i.food.dish_name === item.dish_name)}
                    onChange={() => dispatch(addCartItem({restaurant_name : data.restaurant_name, food : item}))}
                    className={styles.checkbox}
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                  />
                  <Box
                    className={styles.isVeg}
                    component={"img"}
                    src={item.vegetarian ? vegIcon : nonVegIcon}
                    alt="veg Icon"
                    width={20}
                  />
                  <ListItemText primary={item.dish_name} className={styles.foodName} />
                  
                  {item.chef_special ? (
                    <Avatar className={styles.chef}>
                      <Image src={chef} height={30} alt="chef" />
                    </Avatar>
                  ) : (
                    <p className={styles.chef}></p>
                  )}

                  <Chip
                    avatar={
                      <Avatar>
                        <CurrencyRupeeIcon />
                      </Avatar>
                    }
                    label={item.price}
                    className={styles.price}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box></Box>
        </Box>
      </Box>
    </Box>
  );
}
