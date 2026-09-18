import Image from "next/image";

import { Box, Chip, Typography } from "@mui/material";
import Catalog from "./ui/catalog/catalog";
import styles from './style.module.css'

export default function Home() {
  
  return (
    <Box>
      <Box className={styles.container}>
        <Typography variant="h3" align="center" sx={{marginBottom: "1rem"}} className={styles.title}> Food Delivery Restaurnts in Chandigarh </Typography>
        <Box><Chip label="Cuisine" /></Box>
        <Catalog/>
      </Box>
    </Box>
  );
}
