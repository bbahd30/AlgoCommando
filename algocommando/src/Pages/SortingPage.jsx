import { useDispatch } from 'react-redux'
import React, { Fragment, useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {ReactP5Wrapper} from "react-p5-wrapper"
import { Paper, Box, Typography, Grid } from '@mui/material'
import { Button } from '@mui/material'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {Navigation} from "../components/navigation"

import { addElement, deleteElement,updateElement } from '../Slices/sortingSlice'
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckIcon from '@mui/icons-material/Check';
import SortingSketch from '../Animations/SortingSketch'
import { startAnimation } from '../Slices/sortingSlice'

import '../css/ArraySort.css';

const SortingPage = () =>
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
        <Navigation/>
            <Paper sx={{ boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2), 0px 0px 10px rgba(0, 0, 0, 0.14)', backdropFilter: 'blur(18px)', '-webkit-backdrop-filter': 'blur(5px)', minHeight: '100vh',   overflowY: 'hidden', background: '#608dfd'
            }} elevation={8} >
                <Box style={{
                alignItems: "center",
                // height: "calc(100vh - 64px)",
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.33)',
                padding: '3.5rem',
                margin: '3rem'
                }}>
                    <Typography variant='h4'className="heading-array-sort">
                        BUBBLE SORT
                    </Typography>
                    <SortingSketch />
                    <Box style={{marginTop: '1rem'}}>
                        <Grid container justifyContent="center" alignItems="center">
                            {array.map((element, index) => (
                            <>
                                <Grid item key={index} onClick={() => handleEditClick(index)}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "5rem", height: "5rem", borderRadius: "10px", backgroundColor: "rgb(18 155 91)", color: "white", fontWeight: "bold", fontSize: "2rem", cursor: "pointer", position: "relative", marginLeft: '3rem'
                                    }}>
                                    {editingIndex === index ? (
                                        <>
                                            <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", border: "none", outline: "none", backgroundColor: "transparent", color: "#fff", fontWeight: "bold", fontSize: "20px", textAlign: "center" }}
                                            />
                                            <CheckIcon fontSize='small' onClick={(e) => { e.stopPropagation(); handleUpdateClick(index) }} style={{ top: 0, right: 0, transform:'translate(135%, -130%)' }} />
                                            <RemoveCircleIcon fontSize='small' style={{ position: "absolute", bottom: 0, right: 0, }} onClick={(e) => { e.stopPropagation(); handleDeleteClick(index) }} />
                                        </>
                                        )
                                            :
                                            (<div >
                                                    <Fragment>{element}</Fragment>
                                                </div>
                                            )}
                                        </div>
                        
                                </Grid>
                               {addIndex === index + 1 && (
                                <Grid item key={`add-${index}`}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "5rem", height: "5rem", borderRadius: "10px", backgroundColor: "rgb(18 155 91)", color: "white", fontWeight: "bold", fontSize: "2rem", cursor: "pointer", position: "relative", marginLeft: "3rem", marginTop: "1rem"
                                    }}>
                                    <input value={newElement} onChange={(e) => setNewElement(e.target.value)} type="number" style={{   position: "absolute",   top: "50%",   left: "50%",   transform: "translate(-50%, -50%)",   border: "none",   outline: "none",   backgroundColor: "transparent",   color: "#fff",   fontWeight: "bold",   fontSize: "20px",   textAlign: "center" }}
                                    />
                                    <CheckIcon fontSize="small" onClick={() => handleAddClick(index + 1)} style={{ top: 0, right: 0, transform: "translate(135%, -130%)" }}/>
                                    <CancelIcon fontSize="small" style={{ position: "absolute", bottom: 0, right: 0 }} onClick={() => setAddIndex(null)}
                                    />
                                    </div>
                                </Grid>
                                )}    
                                <div style={{textAlign: 'center', }}>
                                    <AddCircleIcon fontSize='small'  onClick={() => setAddIndex(index+1)} />
                                </div>
                            </>
                        ))}
                        </Grid>
                        <br/>
                        <center>
                        <Button className="button-array" onClick={() => dispatch(startAnimation())}>Visualize</Button>
                        </center>
                    </Box>
                </Box>
            </Paper>
        </> )}

export default SortingPage