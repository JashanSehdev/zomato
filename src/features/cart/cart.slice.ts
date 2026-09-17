import { CartItems} from "@/types/restaurant.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addCartItem } from "./cart-list/cart.action";



type InitialState = {
    cart : CartItems[]
}

const initialState : InitialState= {
    cart: []
}

const cartSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers : {
        decrease : (state, action : PayloadAction<CartItems>) => {
            const foodItem = state.cart.find((item) => item.food.dish_name === action.payload.food.dish_name && item.restaurant_name === action.payload.restaurant_name)
            if (foodItem) {
                if (foodItem.quantity === 1) {
                    state.cart = state.cart.filter((item) => {
                        if (item.food.dish_name !== action.payload.food.dish_name || item.restaurant_name !== action.payload.restaurant_name){ return item}
                        else{return}
                    })
                } else {
                    foodItem.quantity -= 1;
                }
            }
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase (addCartItem.fulfilled, (state, action : PayloadAction<CartItems>) => {
                const foodItem = state.cart.find((item) => item.food.dish_name === action.payload.food.dish_name && item.restaurant_name === action.payload.restaurant_name)
                if (foodItem) {
                    foodItem.quantity = foodItem.quantity + 1;
                } else {
                    state.cart.push(action.payload);
                }
            })
        
    }
})

export const {decrease} = cartSlice.actions

export default cartSlice.reducer