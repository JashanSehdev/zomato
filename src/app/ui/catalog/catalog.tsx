"use client";
import { Box } from "@mui/material";
import styles from "./catalog.module.css";
import ProductCard from "../product-card/product-card";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect, useMemo, useState } from "react";
import { fetch_all_restaurants } from "@/features/restaurants/restaurant-list/restaurant.action";
import { Restaurant } from "@/types/restaurant.type";

export default function Catalog() {
  const dispatch = useAppDispatch();
  const restaurants = useAppSelector((state) => state.restaurant.restaurants);
  const search = useAppSelector((state) => state.search.search);

  useEffect(() => {
    dispatch(fetch_all_restaurants());
  }, [dispatch]);

  const filteredRestaurants = useMemo(() => {
  return restaurants.filter((item) => {
    if (search.length < 3) return true;
    const searchTerm = search.toLowerCase();

    return item.restaurant_name.toLowerCase().includes(searchTerm); 
  });
}, [restaurants, search]);
  return (
    <Box className={styles.container}>
      {filteredRestaurants.map((item) => (
        <ProductCard key={item.id} data={item} />
      ))}
    </Box>
  );
}
