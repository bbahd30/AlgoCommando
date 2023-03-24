import React from "react"
import { ReactP5Wrapper } from "react-p5-wrapper"
import { useDispatch, useSelector } from "react-redux"
import findDimensions from "../Utils/sortingDimensions"
import { Button } from '@mui/material'
import { startAnimation } from "../Slices/sortingSlice"

const canvasHeight = window.innerHeight / 2
const canvasWidth = window.innerWidth - 200
const rectDepth = canvasWidth / 50
let heightFactor


// function sketch(p5, array, animation)
// {
//     const rectWidth = canvasWidth / array.length;
//     let currentArray = [...array]; // create a copy of the original array

//     p5.setup = () =>
//     {
//         p5.createCanvas(canvasWidth, canvasHeight, p5.WEBGL);
//         p5.rectMode(p5.CENTER);
//         heightFactor = (canvasHeight - 40) / Math.max(...array);
//     };

//     p5.draw = () =>
//     {
//         p5.background("#F9F9F9");

//         const lightBlue = p5.color("#2196F3");
//         for (let i = 0; i < currentArray.length; i++)
//         {
//             const [height, x, y, z] = findDimensions(
//                 i,
//                 currentArray[i],
//                 rectWidth,
//                 heightFactor
//             );

//             p5.push();
//             p5.translate(x, y, z);
//             p5.fill(lightBlue);
//             p5.box(rectWidth, height, rectDepth);
//             p5.pop();
//         }
//     };

//     const bubbleSort = (array, callback) =>
//     {
//         const n = array.length;
//         let swapped;
//         for (let i = 0; i < n - 1; i++)
//         {
//             swapped = false;
//             for (let j = 0; j < n - i - 1; j++)
//             {
//                 if (array[j] > array[j + 1])
//                 {
//                     [array[j], array[j + 1]] = [array[j + 1], array[j]]; // swap elements
//                     const intervalId = setInterval(() =>
//                     {
//                         swapped = true;
//                     }, 1000);
//                 }

//             }
//             if (!swapped)
//                 break;
//             callback([...array]); // call the callback with the updated array
//         }
//     };

//     if (animation)
//     {
//         let i = 0;
//         const intervalId = setInterval(() =>
//         {
//             bubbleSort(currentArray, (newArray) =>
//             {
//                 currentArray = [...newArray]; // update the current array
//             });
//             i++;

// if (i === currentArray.length - 1)
// {
//     clearInterval(intervalId);
// }
//         }, 1000); // set the interval time to 1000 milliseconds
//     }
// }

// function sketch(p5, array, animation)
// {
//     const rectWidth = canvasWidth / array.length;
//     let currentArray = [...array]; // create a copy of the original array
//     let traversalColor = p5.color("#00FF00"); // green color for traversal
//     let swapColor = p5.color("#FF0000"); // red color for swapping
//     let i = 0; // traversal index
//     let j = 0; // swapping index

//     p5.setup = () =>
//     {
//         p5.createCanvas(canvasWidth, canvasHeight, p5.WEBGL);
//         p5.rectMode(p5.CENTER);
//         heightFactor = (canvasHeight - 40) / Math.max(...array);
//     };

//     p5.draw = () =>
//     {
//         p5.background("#F9F9F9");

//         const lightBlue = p5.color("#2196F3");
//         for (let k = 0; k < currentArray.length; k++)
//         {
//             const [height, x, y, z] = findDimensions(
//                 k,
//                 currentArray[k],
//                 rectWidth,
//                 heightFactor
//             );

//             // Change the color of the traversal cuboid
//             if (k <= i)
//             {
//                 p5.push();
//                 p5.translate(x, y, z);
//                 p5.fill(traversalColor);
//                 p5.box(rectWidth, height, rectDepth);
//                 p5.pop();
//             }
//             // Change the color of the swapping cuboids
//             else if (k == j || k == j + 1)
//             {
//                 p5.push();
//                 p5.translate(x, y, z);
//                 p5.fill(swapColor);
//                 p5.box(rectWidth, height, rectDepth);
//                 p5.pop();
//             }
//             // Draw the remaining cuboids
//             else
//             {
//                 p5.push();
//                 p5.translate(x, y, z);
//                 p5.fill(lightBlue);
//                 p5.box(rectWidth, height, rectDepth);
//                 p5.pop();
//             }
//         }
//     };

//     const bubbleSort = (array, callback) =>
//     {
//         const n = array.length;
//         let swapped;
//         for (i = 0; i < n - 1; i++)
//         {
//             swapped = false;
//             for (j = 0; j < n - i - 1; j++)
//             {
//                 // Swap elements
//                 if (array[j] > array[j + 1])
//                 {
//                     [array[j], array[j + 1]] = [array[j + 1], array[j]];

//                     // Delay the swapping for 1 second
//                     setTimeout(() =>
//                     {
//                         callback([...array]); // call the callback with the updated array
//                     }, (j + 1) * 100000);
//                     swapped = true;
//                 }
//             }
//             if (!swapped) break;
//         }
//     };

//     if (animation)
//     {
//         bubbleSort(currentArray, (newArray) =>
//         {
//             currentArray = [...newArray]; // update the current array
//         });
//     }
// }

function sketch(p5, array, animation)
{
    const rectWidth = canvasWidth / array.length;
    // const defaultColor = p5.color("#2196F3");
    // const traversedColor = p5.color("#4CAF50");
    // const swappedColor = p5.color("#F44336");

    const defaultColor = p5.color("#2196F3");
    const traversedColor = p5.color("orange");
    const swappedColor = p5.color("red");
    const yellow = p5.color("yellow");
    const sortedColor = p5.color("green");

    let swapped;

    let currentArray = [...array]; // create a copy of the original array

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
    };

    const bubbleSort = async (array, callback) =>
    {
        console.log("called")
        const n = array.length;
        for (let i = 0; i < n - 1; i++)
        {
            swapped = false
            for (let j = 0; j < n - i - 1; j++)
            {
                traversedIndex = j
                await new Promise((resolve) => setTimeout(resolve, 1000));
                if (array[j] > array[j + 1])
                {
                    firstIndex = j
                    secondIndex = j + 1
                    console.log(firstIndex, secondIndex, swapped)
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    [array[j], array[j + 1]] = [array[j + 1], array[j]]; // swap elements
                    swapped = true;
                    firstIndex = secondIndex = -1
                    firstCorrected = j
                    secondCorrected = traversedIndex = j + 1
                    callback([...array])
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    firstCorrected = -1
                    secondCorrected = -1
                }
                else
                    await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            sorted = n - i - 1
            if (!swapped)
            {
                traversedIndex = firstIndex = secondIndex = firstCorrected = secondCorrected = -1
                sorted = 0
                break
            }
        }
    }

    let traversedIndex = -1;
    let firstIndex = -1;
    let secondIndex = -1;
    let firstCorrected = -1
    let secondCorrected = -1
    let sorted = -1
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