import { Food } from "@/types/restaurant.type";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import styles from './food-card.module.css'
import { useAppSelector } from "@/app/hooks";


type Prop = {
    food : Food
}

const vegIcon =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAYdyQeebetBOfS4r29ouOK46COCOVYq8K7bNiqnTU2w&s=10";
const nonVegIcon =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJijLjxV7cCZtAvDWreecHf11BVISMFuJlu2lO2BkA&s=10";
export default function FoodCard(prop : Prop) {
    const cart = useAppSelector((state) => state.cart.cart)

    const {food} = prop;
    return(
        <Box className={styles.container}>

            <Box
                className={styles.image}
                component={'img'}
                src={food.image}
                alt= {'food image'}
                width={150}
                height={150}
            />

            <Box className={styles.details}>
                <Box sx={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                    <Box 
                    component={'img'}
                    height={10}
                    width={10}
                    src={food.vegetarian ? vegIcon : nonVegIcon }
                    />
                    <Typography sx={{ fontWeight: 'bold' }} >{food.dish_name}</Typography>
                </Box>
                <Typography > ₹{food.price}</Typography>
                <Typography>{food.description}</Typography>
                <button className={styles.addCartButton}>
                    ADD TO CART
                </button>
            </Box>
        </Box>
    )
}   