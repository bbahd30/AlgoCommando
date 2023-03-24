import React from "react"
import { ReactP5Wrapper } from "react-p5-wrapper"
import { useDispatch, useSelector } from "react-redux"
import findDimensions from "../Utils/sortingDimensions"
import { Button } from '@mui/material'
import { startAnimation } from "../Slices/sortingSlice"
import { bubbleSort, traversedIndex, firstIndex, secondIndex, firstCorrected, secondCorrected, sorted, swapped } from "../Algorithms/Sorting/bubbleSort";

const canvasHeight = window.innerHeight / 2
const canvasWidth = window.innerWidth - 200
const rectDepth = canvasWidth / 50
let heightFactor

function sketch(p5, array, animation, sortingState, dispatch)
{
    const rectWidth = canvasWidth / array.length

    const defaultColor = p5.color("#2196F3")
    const traversedColor = p5.color("orange")
    const swappedColor = p5.color("red")
    const yellow = p5.color("blue")
    const sortedColor = p5.color("#4CAF50")
    let currentArray = [...array]

    p5.setup = () =>
    {
        p5.createCanvas(canvasWidth, canvasHeight, p5.WEBGL);
        p5.rectMode(p5.CENTER);
        heightFactor = (canvasHeight - 40) / Math.max(...array);
    };

    p5.draw = () =>
    {
        p5.background("#F9F9F9");
        for (let i = 0; i < currentArray.length; i++)
        {
            let color = defaultColor;
            if (i <= traversedIndex)
                color = traversedColor
            if (i === firstCorrected || i === secondCorrected)
                color = yellow
            else if (i === firstIndex || i === secondIndex)
                color = swappedColor
            if (i >= sorted && sorted != -1)
                color = sortedColor
            const [height, x, y, z] = findDimensions(i, currentArray[i], rectWidth, heightFactor);
            p5.push();
            p5.translate(x, y, z);
            p5.fill(color);
            p5.box(rectWidth, height, rectDepth);
            p5.pop();
        }
    }

    if (animation)
        bubbleSort(currentArray, (newArray) => currentArray = [...newArray])
}


export default function SortingSketch()
{
    const dispatch = useDispatch()
    const sortingState = useSelector((state) => state.sorting)
    const array = sortingState.array
    const animation = sortingState.animation
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // height: "calc(100vh - 64px)",
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.33',
                padding: '3.5rem',
                margin: 'auto 3rem'
            }}
        >
            <ReactP5Wrapper sketch={(p5) => sketch(p5, array, animation)} />
            <Button onClick={() => dispatch(startAnimation())}>Click</Button>
        </div>
    )
}