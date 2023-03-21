import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import {ReactP5Wrapper} from "react-p5-wrapper"
import { Paper, Box } from '@mui/material'

import SortingSketch from '../Animations/SortingSketch'

const SortingPage = () =>
{
    const sortingState = useSelector((state) => state.sorting)
    const animation = sortingState.animation
    const sortType = sortingState.sortType
    const array = sortingState.array
    const speed = sortingState.speed

    return (
        <>
            <Paper>
                <Box>
                    Bubble Sort
                </Box>
                <Box>
                    <ReactP5Wrapper sketch={SortingSketch} />
                </Box>
            </Paper>
        </>
        
    )
}

export default SortingPage