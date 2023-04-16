import React, { useState, useEffect } from 'react';
import '../css/ArraySearch.css'

export default function ArraySearchVisualizer() {
    const [array, setArray] = useState([]);
    const [arrayStatus,setArrayStatus]= useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchIndex, setSearchIndex] = useState(-1);
    const [isLinearSearch,setIsLinearSearch]=useState(false);
    const [isBinarySearch,setIsBinarySearch]=useState(false);
    const [isArraySorted,setIsArraySorted]=useState(true);
    const [searchUnsuccessful,setSearchUnsuccessful]=useState(false);
    const [searchSuccessful,setSearchSuccessful]=useState(false);
    const [iterations,setIterations]=useState(-1);
    let values=null;
    let traversedIndices=[];
    useEffect(()=>{
        if(isLinearSearch){
            LinearSearch()
        }
        if(isBinarySearch){
            BinarySearch()
        }
    },[isLinearSearch,isBinarySearch]);

    
    const handleArrayChange = (event) => {
       
        values = event.target.value.split(',').map((value) => Number(value));
        // console.log(values);
        setArrayStatus(null);
        const temp=new Array(values.length).fill(0);
        setArrayStatus(temp);
        setArray(values);
        setSearchIndex(-1);

        let t=0;
        if(values.length>0){
            t=values[0];
        }
        for(let i=1;i<values.length;i++){

            if(values[i]<t){
                setIsArraySorted(false);
                return;
            }
            t=values[i];

        }
        setIsArraySorted(true);
    };

    const handleSearchValueChange = (event) => {
        setSearchValue(Number(event.target.value));
        setSearchIndex(-1);
    };
    const temp=()=>{
        console.log(arrayStatus);
    }
    const LinearSearch = async() => {
        console.log(traversedIndices);
        console.log(arrayStatus);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let i=0;
        while (i < array.length) {
            const tempArray=[...arrayStatus];
            tempArray[i]=1;
            for(let j=0;j<traversedIndices.length;j++){
                // console.log("i= ",i," j=",j," traversed indice=",traversedIndices[j]);
                tempArray[traversedIndices[j]]=2;
            }
            setArrayStatus(tempArray);
            
            

            if (array[i] === searchValue) {
                setSearchIndex(i);
                setSearchSuccessful(true);
                // setSearchUnsuccessful(false);
                setIterations(traversedIndices.length+1);
                setIsLinearSearch(false);
                return;
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
            
            traversedIndices.push(i);
            i++;
            
        }
        if(i===array.length){
            
            setSearchUnsuccessful(true);
            // setSearchSuccessful(false);
            setIsLinearSearch(false);

        }
        
        
    };
    const handleLinearSearch=()=>{
        setSearchIndex(-1);
        setIterations(-1);
        setSearchSuccessful(false);
        setSearchUnsuccessful(false);
        traversedIndices.splice(0,traversedIndices.length);
        const tempArray=[...arrayStatus];
            for(let j=arrayStatus.length-1;j>=0;j--){
                tempArray[j]=0;
            }
        setArrayStatus(tempArray);
        // LinearSearch();
        setIsLinearSearch(true);
        // console.log(traversedIndices);

    }


    const BinarySearch = async() => {
        console.log(traversedIndices);
        console.log(arrayStatus);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let lower=0,upper=array.length-1;
        while (lower<=upper) {
            const mid=(lower+upper)%2===0?(lower+upper)/2:(upper+lower-1)/2;
            const tempArray=[...arrayStatus];
            tempArray[mid]=1;
            for(let j=0;j<traversedIndices.length;j++){
                // console.log("i= ",i," j=",j," traversed indice=",traversedIndices[j]);
                tempArray[traversedIndices[j]]=2;
            }
            setArrayStatus(tempArray);
            
            

            if (array[mid] === searchValue) {
                setSearchIndex(mid);
                setSearchSuccessful(true);
                // setSearchUnsuccessful(false);
                setIterations(traversedIndices.length+1);
                setIsBinarySearch(false);
                return;
            }
            else if(array[mid]>searchValue){
                upper=mid-1;
            }
            else{
                lower=mid+1;
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
            
            traversedIndices.push(mid);
            
            
        }
        
            
            setSearchUnsuccessful(true);
            // setSearchSuccessful(false);
            setIsBinarySearch(false);

        
        
        
    };
    const handleBinarySearch=()=>{
        setSearchIndex(-1);
        setIterations(-1);
        setSearchSuccessful(false);
        setSearchUnsuccessful(false);
        traversedIndices.splice(0,traversedIndices.length);
        const tempArray=[...arrayStatus];
            for(let j=arrayStatus.length-1;j>=0;j--){
                tempArray[j]=0;
            }
        setArrayStatus(tempArray);
        // LinearSearch();
        setIsBinarySearch(true);
        // console.log(traversedIndices);

    }
  // ...
  return (
    <div className="container-array">
      <label className="label" htmlFor="array">Array:</label>
      <input className="input" id="array" type="text" onChange={handleArrayChange} />

      <br />

      <label className="label" htmlFor="searchValue">Search Value:</label>
      <input
        className="input"
        id="searchValue"
        type="number"
        value={searchValue}
        onChange={handleSearchValueChange}
      />

      <br />
      <div className="buttons-array">
        <div>
            <button className="button-array" onClick={handleLinearSearch} disabled={isLinearSearch}>Linear Search</button>
        </div>
        <div>
            <button className="button-array" onClick={handleBinarySearch} disabled={(!isArraySorted)||isBinarySearch }>Binary Search</button>
            {!isArraySorted && <p>Array is not sorted</p>}
        </div>
      </div>
      {searchSuccessful ? <p className="search-successful-array">Array search successful. Iterations={iterations}</p> : <p/>}
      {searchUnsuccessful ? <p className="search-unsuccessful-array">Array search unsuccessful. Iterations={array.length}</p>:<p/>}
      

      <br />

      <div className="array">
        {array.map((value, index) => (
          <span
            key={index}
            className={searchIndex === index ? 'highlight-array' :(arrayStatus[index]===1?'searching-array':(arrayStatus[index]===2?'searched-array':' ')) }
          >
            {value}{' '}
          </span>
        ))}
      </div>
    </div>
  );
}

