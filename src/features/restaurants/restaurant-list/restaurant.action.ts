import { Restaurant } from "@/types/restaurant.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import restaurantsData from '@/restaurants.json'

export const fetch_all_restaurants  = createAsyncThunk(
    'restaurant/fetchAllData',
    async () => {
        return restaurantsData;
    }
 )

 export const fetch_restaurant = createAsyncThunk(
    'restaurant/fetchRestaurant',
    async(data : Restaurant) => {
        return data
    }
 )