import { List } from "@mui/material"
import LinkedList from "../Algorithms/LinkedLists/linkedlist"
//import styles from "..Algorithms/LinkedLists/style.css"
// import ./styles
//import '<LinkedLists/style.css'
import '../Algorithms/LinkedLists/style.css'

const linkedList = new LinkedList();

const LinkedListPage = () =>{

    const renderLinkedList = async(linkedList) => {
        const boxElement = document.querySelector('.box');
        boxElement.querySelectorAll('.box_item').forEach((item) => item.remove());
        boxElement.querySelectorAll('.cbox_item').forEach((item) => item.remove());
        let current = linkedList.head;
        if (linkedList.head === null) {
            return;
        }
        const blah = document.createElement('DIV');
        blah.classList.add('box_item');
        blah.classList.add('icon', 'icon-arrow-right');
        blah.textContent = "head==>";
        boxElement.append(blah);
        for (let i = 0; i < linkedList.size() && current !== null; i++) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const itemElement = document.createElement('DIV');
          itemElement.classList.add('box_item');
          itemElement.classList.add('icon', 'icon-arrow-right');
          itemElement.textContent = (current.element+"==>");
          boxElement.append(itemElement);
          current = current.next;
        }
        const no = document.createElement('DIV');
        no.classList.add('box_item');
        no.classList.add('icon', 'icon-arrow-right');
        no.textContent = "null";
        boxElement.append(no);
      };

      const rendersearchnopause = async(linkedList, num) => {
        const boxElement = document.querySelector('.box');
        boxElement.querySelectorAll('.box_item').forEach((item) => item.remove());
        boxElement.querySelectorAll('.cbox_item').forEach((item) => item.remove());
        let current = linkedList.head;
        if (linkedList.head === null) {
            return;
        }
        const blah = document.createElement('DIV');
        blah.classList.add('box_item');
        blah.classList.add('icon', 'icon-arrow-right');
        blah.textContent = "head==>";
        boxElement.append(blah);
        for (let i = 0; i < linkedList.size() && current !== null; i++) {
        if(i==num){
            const itemElement = document.createElement('DIV');
            itemElement.classList.add('cbox_item');
            itemElement.classList.add('icon', 'icon-arrow-right');
            itemElement.textContent = (current.element+"==>");
            boxElement.append(itemElement);
            //await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        else{
            const itemElement = document.createElement('DIV');
            itemElement.classList.add('box_item');
            itemElement.classList.add('icon', 'icon-arrow-right');
            itemElement.textContent = (current.element+"==>");
            boxElement.append(itemElement);
            //await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        current = current.next;
        }
        const no = document.createElement('DIV');
        no.classList.add('box_item');
        no.classList.add('icon', 'icon-arrow-right');
        no.textContent = "null";
        boxElement.append(no);
      };

      const rendernopause = async(linkedList) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const boxElement = document.querySelector('.box');
        boxElement.querySelectorAll('.box_item').forEach((item) => item.remove());
        boxElement.querySelectorAll('.cbox_item').forEach((item) => item.remove());
        let current = linkedList.head;
        if (linkedList.head === null) {
            return;
        }
        const blah = document.createElement('DIV');
        blah.classList.add('box_item');
        blah.classList.add('icon', 'icon-arrow-right');
        blah.textContent = "head==>";
        boxElement.append(blah);
        for (let i = 0; i < linkedList.size() && current !== null; i++) {
          //await new Promise((resolve) => setTimeout(resolve, 1000));
          const itemElement = document.createElement('DIV');
          itemElement.classList.add('box_item');
          itemElement.classList.add('icon', 'icon-arrow-right');
          itemElement.textContent = (current.element+"==>");
          boxElement.append(itemElement);
          current = current.next;
        }
        const no = document.createElement('DIV');
        no.classList.add('box_item');
        no.classList.add('icon', 'icon-arrow-right');
        no.textContent = "null";
        boxElement.append(no);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      };

    const handlePush = async() =>{
        const element = prompt('Enter element to add to linkedlist');
      linkedList.push(element);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      renderLinkedList(linkedList);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    const handleDelete = async() =>{
        const elementy = prompt('Enter element to remove from linkedlist');
        let current = linkedList.head;
        for(let i = 0; i<linkedList.size();i++){
            await rendersearchnopause(linkedList, i);
            if(current.element === elementy){
                break;
            }
            await rendernopause(linkedList);
            current = current.next;
            }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      const index = linkedList.remove(elementy);
      if (index) {
        alert('Element removed');
        renderLinkedList(linkedList);
      } else {
        alert('Element not found');
      }
    }

    const handleAddAt = async() =>{//still needs work
        const element = prompt('Enter element to add to linkedlist');
      const index = prompt('Enter the index the element is to be added at');
      for(let i = 0; i<linkedList.size();i++){
        await rendersearchnopause(linkedList, i);
        if(i==index){
            alert(`Now, the new node will be inserted`);
            break;
        }
        await rendernopause(linkedList);
        }
      linkedList.insertAt(element, Number(index));
      renderLinkedList(linkedList);
    }

    const handleElementAt = async() =>{
        const index = prompt('Enter the index the element is to be retrieved from');
      const node = linkedList.getElementAt(Number(index));
      if (node) {
        for(let i = 0; i<linkedList.size();i++){
        await rendersearchnopause(linkedList, i);
        if(i==index){
            break;
        }
        await rendernopause(linkedList);
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert(`Element retrieved = ${node.element}`);
      } else {
        alert('Element not found');
      }
      //await new Promise((resolve) => setTimeout(resolve, 1000));
      //renderLinkedList(linkedList);
      rendernopause(linkedList);
    }

    const handleRemoveAt = async() =>{
        const index = prompt('Enter the index the element is to be removed from');
        for(let i = 0; i<linkedList.size();i++){
            await rendersearchnopause(linkedList, i);
            if(i==index){
                break;
            }
            await rendernopause(linkedList);
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));    
      const removedEl = linkedList.removeAt(Number(index));
      if (removedEl) {
        alert('Element removed');
        renderLinkedList(linkedList);
      } else {
        alert('Element not found');
      }
    }

    const handleIndexOf = async() =>{
        const element = prompt('Enter element you want to find index of');
      const index = linkedList.indexOf(element);
      for(let i = 0; i<linkedList.size();i++){
        await rendersearchnopause(linkedList, i);
        if(i==index){
            break;
        }
        await rendernopause(linkedList);
        }
        await rendernopause(linkedList);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      if (index >= 0) {
        alert(`Index of element '${element}' is ${index}`);
      } else {
        alert('Element not found');
      }
    }

    const handleSize = async() =>{
        for(let i = 0; i<linkedList.size();i++){
            await rendersearchnopause(linkedList, i);
            await rendernopause(linkedList);
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
        alert(`The size of the linked list is ${linkedList.size()}`);
    }

    const handleClear = () =>{
        linkedList.clear();
      alert('Linked list cleared');
      renderLinkedList(linkedList);
    }

    const handleEmpty = () =>{
        alert(`Linked list is${linkedList.isEmpty() ? '' : ' not'} empty`);
    }

    return(
        <div className="container">
        <section>
          <div className="app-container">
            <h1>Linked List</h1>
            <div className="box_container">
              <div className="box"></div>
              
            </div>
            <div className="buttons-container">
              <div className="btn-group">
                <div id="pushBtn" className="btn-primary" onClick={handlePush}>Push</div>
                </div>
                <div className="btn-group">
                <div id="insertAtBtn" className="btn-warning" onClick={handleAddAt}>Insert At</div>
                </div>
                <div className="btn-group">
                <div id="removeElementBtn" className="btn-primary" onClick={handleDelete}>
                  Remove Element
                </div>
              </div>
              <div className="btn-group">
                <div id="removeElementAtBtn" className="btn-warning" onClick={handleRemoveAt}>
                  Remove Element At
                </div>
                </div>
                <div className="btn-group">
                <div id="getElementAtBtn" className="btn-primary" onClick={handleElementAt}>
                  Get Element At
                </div>
                </div>
                <div className="btn-group">
                <div id="indexOfBtn" className="btn-warning" onClick={handleIndexOf}>Index Of</div>
              </div>
              {/* <div className="btn-group">
                <div id="sortBtn" className="btn-primary" onClick={hand}>
                  Sort Linked List
                </div>
              </div> */}
              <div className="btn-group">
                <div id="sizeBtn" className="btn-primary" onClick={handleSize}>Size</div>
                </div>
                <div className="btn-group">
                <div id="isEmptyBtn" className="btn-warning" onClick={handleEmpty}>Is Empty</div>
                </div>
                <div className="btn-group">
                <div id="clearBtn" className="btn-primary" onClick={handleClear}>Clear</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
}

export default LinkedListPage