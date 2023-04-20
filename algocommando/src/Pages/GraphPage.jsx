import { useDispatch } from 'react-redux'
import React, { Fragment, useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {ReactP5Wrapper} from "react-p5-wrapper"
import { Paper, Box, Typography, Grid } from '@mui/material'
import { Button } from '@mui/material'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { addElement, deleteElement,updateElement } from '../Slices/sortingSlice'
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckIcon from '@mui/icons-material/Check';
import GraphSketch from '../Animations/GraphSketch'
import { startAnimation } from '../Slices/sortingSlice'

const GraphPage = () =>
{
    const dispatch = useDispatch()
    const sortingState = useSelector((state) => state.sorting)
    const animation = sortingState.animation
    const sortType = sortingState.sortType
    const array = sortingState.array
    const speed = sortingState.speed

    const [addIndex, setAddIndex] = useState(-1);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [inputValue, setInputValue] = useState("");
    const [newElement, setNewElement] = useState(null);

    useEffect(() =>
    {
        console.log(sortingState.array)
    }, [sortingState])
    
    const handleUpdateClick = (editingIndex) => {
        dispatch(updateElement({ index: editingIndex, element: inputValue }));
        setEditingIndex(-1);
        setInputValue("");
    }

    const handleDeleteClick = (index) =>
    {
        if (array.length > 4)
        {
            setEditingIndex(-1)
            setInputValue("")
            dispatch(deleteElement({
                index: index
            }));
        }
        else
            alert("Need to have atleast 4")
    }

    const handleAddClick = (newIndex) => {
        dispatch(addElement({
                index: newIndex,
                element: newElement
        }));
          setAddIndex(null)
          setNewElement(null);
    }

    const handleEditClick = (index) => {
        setEditingIndex(index);
        setInputValue(array[index]);
    }
    
    return (
        <>
            <Paper sx={{ boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2), 0px 0px 10px rgba(0, 0, 0, 0.14)', backdropFilter: 'blur(18px)', '-webkit-backdrop-filter': 'blur(5px)', height: '100vh',  overflowY: 'hidden', background: 'linear-gradient(to bottom, #aaacee, #bfb8ff, #85c5ff, #4acefd, #39d2e0)'
            }} elevation={8} >
                <Box style={{
                alignItems: "center",
                // height: "calc(100vh - 64px)",
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.33',
                padding: '3.5rem',
                margin: '3rem'
                }}>
                    <Typography variant='h4'>
                        Shortest Path
                    </Typography>
                    <GraphSketch />
                </Box>
            </Paper>
        </> )}

export default GraphPage