import { configureStore } from "@reduxjs/toolkit"

import sortingReducer from "../Slices/sortingSlice"


const store = configureStore({
    reducer: {
        sorting: sortingReducer,
    }
})

export default store