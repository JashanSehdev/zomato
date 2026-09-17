import { Food, food_placeholder, Restaurant, restaurants_placeholder } from "@/types/restaurant.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetch_all_restaurants, fetch_restaurant,  } from "./restaurant-list/restaurant.action";


type InitialState = {
    restaurant : Restaurant;
    restaurants : Restaurant[];
    food : Food;
}

const initialState : InitialState= {
    restaurant : restaurants_placeholder,
    restaurants : [], 
    food : food_placeholder
}

const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase (fetch_all_restaurants.fulfilled, (state, action : PayloadAction<Restaurant[]>) => {
                state.restaurants = action.payload
            })
            .addCase(fetch_restaurant.fulfilled, (state, action : PayloadAction<Restaurant>) => {
                state.restaurant = action.payload
            })
    }
})

export default restaurantSlice.reducer