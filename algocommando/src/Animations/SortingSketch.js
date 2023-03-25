import React from "react"
import { ReactP5Wrapper } from "react-p5-wrapper"
import { useDispatch, useSelector } from "react-redux"
import findDimensions from "../Utils/sortingDimensions"
import { Button } from '@mui/material'
import { startAnimation } from "../Slices/sortingSlice"
import { bubbleSort, traversedIndex, firstIndex, secondIndex, firstCorrected, secondCorrected, sorted, swapped } from "../Algorithms/Sorting/bubbleSort"

const canvasHeight = window.innerHeight / 2
const canvasWidth = window.innerWidth - 200
const rectDepth = canvasWidth / 50
let heightFactor

function sketch(p5, sortingState)
{
    const array = sortingState.array
    const type = sortingState.sortType
    const animation = sortingState.animation
    const rectWidth = canvasWidth / array.length
    const defaultColor = p5.color("#17a2b8")
    const traversedColor = p5.color("orange")
    const swappedColor = p5.color("red")
    const yellow = p5.color("blue")
    const sortedColor = p5.color("#4CAF50")
    let currentArray = [...array]

    p5.setup = () =>
    {
        p5.createCanvas(canvasWidth, canvasHeight, p5.WEBGL)
        p5.rectMode(p5.CENTER)
        heightFactor = (canvasHeight - 40) / Math.max(...array)
    }

    let swapAnimation = 0
    let swapSpeed = 1

    // note:sorting canvas with double swap 
    p5.draw = () =>
    {
        p5.background("#F9F9F9")
        let firstBox, secondBox
        let crossed
        for (let i = 0; i < currentArray.length; i++)
        {
            crossed = false
            let color = defaultColor
            if (i <= traversedIndex) color = traversedColor
            if (i === firstCorrected || i === secondCorrected) color = yellow
            else if (i >= sorted && sorted != -1) color = sortedColor

            const [height, x, y, z] = findDimensions(
                i,
                currentArray[i],
                rectWidth,
                heightFactor
            )

            if (i === firstIndex)
                firstBox = { height, x, y, z }
            else if (i === secondIndex)
                secondBox = { height, x, y, z }
            else
            {
                p5.push()
                p5.translate(x, y, z)
                p5.fill(color)
                p5.box(rectWidth, height, rectDepth)
                p5.pop()
            }
        }

        if (firstBox && secondBox)
        {
            if (swapAnimation >= rectWidth)
            {
                firstBox = null
                secondBox = null
                swapAnimation = 0
                crossed = true
            }
            else
                swapAnimation += swapSpeed

            if (!crossed)
            {
                p5.push()
                p5.translate(firstBox.x + swapAnimation, firstBox.y, firstBox.z)
                p5.fill(swappedColor)
                p5.box(rectWidth, firstBox.height, rectDepth)
                p5.pop()

                p5.push()
                p5.translate(secondBox.x - swapAnimation, secondBox.y, secondBox.z)
                p5.fill(swappedColor)
                p5.box(rectWidth, secondBox.height, rectDepth)
                p5.pop()
            }
        }
    }


    // note:sorting canvas without animation
    // p5.draw = () =>
    // {
    //     p5.background("#F9F9F9")
    //     for (let i = 0 i < currentArray.length i++)
    //     {
    //         let color = defaultColor
    //         if (i <= traversedIndex)
    //             color = traversedColor
    //         if (i === firstCorrected || i === secondCorrected)
    //             color = yellow
    //         else if (i === firstIndex || i === secondIndex)
    //             color = swappedColor
    //         if (i >= sorted && sorted != -1)
    //             color = sortedColor
    //         const [height, x, y, z] = findDimensions(i, currentArray[i], rectWidth, heightFactor)

    //         p5.push()
    //         p5.translate(x, y, z)
    //         p5.fill(color)
    //         p5.box(rectWidth, height, rectDepth)
    //         p5.pop()
    //     }
    // }

    if (animation)
        bubbleSort(currentArray, (newArray) => currentArray = [...newArray])
}

export default function SortingSketch()
{
    const sortingState = useSelector((state) => state.sorting)
    return (
        <>
            <ReactP5Wrapper sketch={(p5) => sketch(p5, sortingState)} />
        </>
    )
}