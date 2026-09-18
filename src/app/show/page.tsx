"use client";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import styles from "./styles.module.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Food } from "@/types/restaurant.type";
import FoodCard from "./food-card/food-card";
import SearchMenu from "./search-food-item/search-menu";
import { setSearch } from "@/features/search/search.slice";

const imageUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVJNTpMZ8SyX5chUSzZsaq79bicemVuYKn2sTV39ZGPw&s=10";

const vegIcon =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAYdyQeebetBOfS4r29ouOK46COCOVYq8K7bNiqnTU2w&s=10";

const nonVegIcon =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJijLjxV7cCZtAvDWreecHf11BVISMFuJlu2lO2BkA&s=10";

export default function Show() {
  const data = useAppSelector((state) => state.restaurant.restaurant);
  const {menuSearch} = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const [menuItem, setMenuItem] = useState<Food[]>([]);
  const [veg, setVeg] = useState<string>("");

  useEffect(() => {
    dispatch(setSearch(""));
  }, []);

  const categorized = data.menu.reduce<Record<string, Food[]>>((acc, food) => {
    if (!acc[food.category]) {
      acc[food.category] = [];
    }

    acc[food.category].push(food);

    return acc;
  }, {});

  let filteredMenu = menuItem.filter((item) => {
    if (menuSearch.length < 2) return true;

    const searchTerm = menuSearch.toLowerCase();

    return item.dish_name.toLowerCase().includes(searchTerm);
  });

  filteredMenu = filteredMenu.filter((item) => {
    if (veg === "") return true;

    if (veg === "nonVeg") {
      return item.vegetarian === false;
    }
    if (veg === "veg") {
      return item.vegetarian === true;
    }
  });

  return (
    <Box>
      <Box className={styles.container}>
        <Box>
          <IconButton
            sx={{ height: "10px", width: "10px", marginBottom: "1rem" }}
            onClick={() => {
              redirect("/");
            }}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
        </Box>

        <Box className={styles.section1}>
          <Typography variant="h2">
            {data.restaurant_name || "Restaurant Name"}
          </Typography>
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
            <LocalPhoneIcon />{" "}
            <Typography>{data.phone_number || `###########`}</Typography>
          </Box>
        </Box>

        <Box
          component={"img"}
          className={styles.image}
          src={data.images || imageUrl}
        />
        <Typography variant="h4">Menu</Typography>
        <Divider />
      </Box>
      <Box>
        <Box className={styles.menuItem}>
          <List>
            {Object.entries(categorized).map(([category, foods]) => (
              <Box
                key={category}
                onClick={() => setMenuItem(foods)}
                className={styles.category}
              >
                <Typography variant="h5">{`${category} (${foods.length})`}</Typography>
              </Box>
            ))}
          </List>
          <Box className={styles.displayFoodItem}>
            <Box className={styles.header}>
              <Typography variant="h4">Order Online</Typography>
              <SearchMenu />
            </Box>
            <Divider />
            <Box>
              <Box sx={{ display: "flex", gap: "1rem", margin:'1rem 1rem' }}>
                {veg === "veg" ? (
                  <Chip
                    variant="outlined"
                    onDelete={() => setVeg("")}
                    avatar={<Avatar src={vegIcon} />}
                    label="veg"
                  />
                ) : (
                  <Chip
                    variant="outlined"
                    onClick={() => {
                      setVeg("veg");
                    }}
                    avatar={<Avatar src={vegIcon} />}
                    label="veg"
                  />
                )}

                {veg === "nonVeg" ? (
                  <Chip
                    variant="outlined"
                    onDelete={() => setVeg("")}
                    avatar={<Avatar src={nonVegIcon} />}
                    label="non Veg"
                  />
                ) : (
                  <Chip
                    variant="outlined"
                    onClick={() => {
                      setVeg("nonVeg");
                    }}
                    avatar={<Avatar src={nonVegIcon} />}
                    label="non veg"
                  />
                )}
              </Box>

              {filteredMenu.map((item) => (
                <FoodCard restaurant_name={data.restaurant_name} food={item} key={item.id} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
