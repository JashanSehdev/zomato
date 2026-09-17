import { CartItems, Food } from "@/types/restaurant.type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addCartItem = createAsyncThunk(
    'cart/addToCart',
    ({food, restaurant_name } : {food : Food, restaurant_name: string}) => {
        const cartItem : CartItems = {
            food,
            restaurant_name,
            quantity : 1
        }

        return cartItem;
    }   
)
