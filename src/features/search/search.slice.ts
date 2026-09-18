
import { createSlice, PayloadAction } from "@reduxjs/toolkit";




type InitialState = {
    search: string,
    menuSearch : string
}

const initialState : InitialState= {
    search : "",
    menuSearch : ""
}

const searchSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers : {
        setSearch(state, action: PayloadAction<string>){
            state.search = action.payload.trim();
        },
        setMenuSearch(state, action : PayloadAction<string>){
            state.menuSearch = action.payload.trim();
        }
    },

})

export const {setSearch , setMenuSearch} = searchSlice.actions

export default searchSlice.reducer