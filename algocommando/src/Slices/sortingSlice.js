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
            state.array = action.payload['array']
        },
        addElement: (state, action) =>
        {
            state.array.splice(action.payload.index, 0, action.payload.element);
        },
        deleteElement: (state, action) =>
        {
            state.array.splice(action.payload.index, 1);
        },
        updateElement: (state, action) => 
        {
            state.array[action.payload['index']] = action.payload['element']
        },
        changeSortingMethod: (state, action) =>
        {
            state.sortType = action.payload
        },
    }
})

export default sortingSlice.reducer
export const { startAnimation, setSpeed, changeArray, changeSortingMethod, addElement, deleteElement, updateElement } = sortingSlice.actions