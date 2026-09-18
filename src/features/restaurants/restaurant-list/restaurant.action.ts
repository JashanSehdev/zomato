import { Restaurant } from "@/types/restaurant.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import restaurantsData from '@/restaurants.json'
import { json_data } from "../../../../data";

export const fetch_all_restaurants  = createAsyncThunk(
    'restaurant/fetchAllData',
    async () => {
        return json_data;
    }
 )

 export const fetch_restaurant = createAsyncThunk(
    'restaurant/fetchRestaurant',
    async(data : Restaurant) => {
        return data
    }
 )