import { configureStore } from "@reduxjs/toolkit"
import ShopsReducer from "./ShopSlice"

const store = configureStore({
    reducer: {
        shops: ShopsReducer,
    }
})

export default store;