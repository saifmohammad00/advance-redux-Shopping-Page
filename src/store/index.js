import { configureStore, createSlice } from "@reduxjs/toolkit";
const initialCartState={cart:false};
const cartSlice=createSlice({
    name:"cart",
    initialState:initialCartState,
    reducers:{
        toggle(state){
           state.cart=!state.cart;
        },
    }
})
const store=configureStore({
    reducer:{cart:cartSlice.reducer}
})
export const cartActions=cartSlice.actions;
export default store;