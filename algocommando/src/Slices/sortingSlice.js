import { createSlice } from '@reduxjs/toolkit'

const sortingSlice = createSlice({
    name: 'sorting',
    initialState: {
        sortType: 'bubble',
        array: [3, 2, 4, 9, 1, 28, 3, 2],
        speed: 2,
        animation: false,
    },
    reducers: {
        startAnimation: (state) =>
        {
            state.animation = true
        },
        setSpeed: (state, action) =>
        {
            state.speed = action.payload
        },
        changeArray: (state, action) => 
        {
            state.array = action.payload
            state.arraySize = action.payload.size
        },
        changeSortingMethod: (state, action) =>
        {
            state.sortType = action.payload
        },
    }
})

export default sortingSlice.reducer
export const { startAnimation, setSpeed, changeArray, changeSortingMethod } = sortingSlice.actions