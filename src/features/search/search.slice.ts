import { CartItems} from "@/types/restaurant.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addCartItem } from "./cart-list/cart.action";



type InitialState = {
    search: string
}

const initialState : InitialState= {
    search : ""
}

const searchSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers : {
        setSearch(state, action: PayloadAction<string>){
            state.search = action.payload.trim();
        }
    },

})

export const {setSearch} = searchSlice.actions

export default searchSlice.reducer