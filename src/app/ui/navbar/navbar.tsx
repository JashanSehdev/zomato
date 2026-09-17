"use client";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import zomatoLogo from "@/../public/zomato-logo.png";
import Image from "next/image";
import SearchBar from "./searchBar/searchBar";
import styles from "./navbar.module.css";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CartDrawer from "@/app/cart-drawer/cart-drawer";


export default function Navbar() {

  return (
    <Box className={styles.container}>
      <Box className={styles.sub_container}>
        <Image
          className={styles.logo}
          alt={"logo"}
          src={zomatoLogo}
          width={200}
          objectFit="cover"
        />
        <Box className={styles.utilities}>
          <SearchBar />
          <Box className={styles.loginBar}>
            <CartDrawer/>
            <Avatar
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBKgOd_3h1fhtRf_EmM5BxasuTZn-yuMoVK5BOTG2Spg&s"
              }
              alt="user photo"
            />
            <Typography variant="h6" component={"span"}>
              Jashan
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
