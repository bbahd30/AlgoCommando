import React, { Component } from "react";
import "../css/treeRenderer.css";
import treeImg from "../Algorithms/Tree/tree.gif";
import dfsGif from "../Algorithms/Tree/DFS.gif";
import bfsGif from "../Algorithms/Tree/BFS.gif";

class TreeRenderer extends Component {
    
    onDfsBtnClick(e) {
        e.preventDefault();
        var tree = document.getElementById("tree");
        tree.setAttribute('src', dfsGif);
    }

    onBfsBtnClick(e) {
        e.preventDefault();
        var tree = document.getElementById("tree");
        tree.setAttribute('src', bfsGif);
    }

    onResetBtnClick(e) {
        e.preventDefault();
        var tree = document.getElementById("tree");
        tree.setAttribute('src', treeImg);
    }

    render() {
        return (
            <div className="full-back-renderer">
                <div className="treeWrapper">
                    <div className="menu">
                        <div className="menuHead">TREE MENU</div>
                        <div className="border"></div>
                        <button className="dfsButton" onClick={this.onDfsBtnClick}>Depth First Search</button>
                        <button className="bfsButton" onClick={this.onBfsBtnClick}>Breadth First Search</button>
                        <button className="resetButton" onClick={this.onResetBtnClick}>Reset</button>
                    </div>
                    <img id="tree" src={treeImg}/>
                </div>
            </div>
        );
    }
}

export default TreeRenderer;