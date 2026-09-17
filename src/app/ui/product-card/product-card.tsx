import { Restaurant } from "@/types/restaurant.type";
import { Box, Typography } from "@mui/material";
import styles from './product-card.module.css'
import { useAppDispatch } from "@/app/hooks";
import { fetch_restaurant } from "@/features/restaurants/restaurant-list/restaurant.action";
import { redirect } from "next/navigation";

type Prop = {
    data ?: Restaurant
}
const image_placeholder = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThPLYDXSPTiHVS9e-7Y4avlB6ZZ0nIWL7aj8ptp-IS5Q&s=10"

export default function ProductCard (prop : Prop) {
    const dispatch = useAppDispatch()
    const {data} = prop;

    const handleClick = () => {
        if (prop.data){
            dispatch(fetch_restaurant(prop?.data))
            redirect('/show');
        }
    }

    return(
        <Box className ={styles.container} onClick={handleClick}>
            <Box 
                className = {styles.image}
                component={'img'}
                alt="food image"
                src={data?.images || image_placeholder}
                />
            <Box >
                <Box className={styles.section1}>
                    <Typography className={styles.name}>
                        {data?.restaurant_name || "Restaurant Name"}
                    </Typography>
                    <Box className={styles.rating}>
                        {data?.average_rating || '0.0' }
                    </Box>
                </Box>
                <Box className={styles.section2}>
                    <Typography>
                        {data?.cuisine_type || "cuisine Type"}
                    </Typography>
                </Box>
                
            </Box>
        </Box>
    )
}