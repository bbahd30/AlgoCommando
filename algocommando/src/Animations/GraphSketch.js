import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

let start = false;
const canvasHeight = window.innerHeight / 2;
const canvasWidth = window.innerWidth - 200;
const vertexRatio = (0.6 * canvasWidth) / 50 + canvasHeight / 25;

let vertices = {};
let vID = 1;
let displayValues = true;
let found = false;
let displayText = false;
function getRandomCoordinates() {
  const x = Math.floor(Math.random() * (canvasWidth - 300 + 1)) + 300;
  const y = Math.random() * canvasHeight;
  return { x, y };
}

class Vertex {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.vID = vID++;
    this.length = this.vID.toString().length;

    this.xRatio = x / canvasWidth;
    this.yRatio = y / canvasHeight;
    this.color = "blue";
    this.defaultColor = "blue";
    this.edgeColor = "pink";
    this.defaultEdgeColor = "pink";
    this.edgeCostMap = {};
  }

  showVertex = (p5) => {
    p5.strokeWeight(1);
    p5.stroke(this.color);
    p5.fill(this.color);
    p5.ellipse(
      this.xRatio * canvasWidth,
      this.yRatio * canvasHeight,
      vertexRatio,
      vertexRatio
    );
    p5.strokeWeight(2);
    p5.fill("white");
    p5.stroke("white");
    let textWidth = p5.textWidth(this.vID);
    let xOffset = textWidth / 2;
    if (this.length > 1)
      xOffset -= ((canvasWidth * 1) / 1500) * (this.length - 1);
    p5.textSize((canvasHeight + canvasWidth) / 70 - 1);
    p5.text(
      this.vID,
      this.xRatio * canvasWidth - xOffset,
      this.yRatio * canvasHeight + vertexRatio / 5 - 2 * (this.length - 1)
    );
  };

  showEdge = (p5) => {
    for (let vMap in this.edgeCostMap) {
      const connectedV = vertices[vMap];
      p5.strokeWeight(1.5);
      p5.stroke(this.edgeColor);
      const [x1, y1] = [this.xRatio * canvasWidth, this.yRatio * canvasHeight];
      const [x2, y2] = [
        connectedV.xRatio * canvasWidth,
        connectedV.yRatio * canvasHeight,
      ];
      p5.line(x1, y1, x2, y2);

      if (displayValues) {
        p5.strokeWeight(1);
        p5.fill("black");
        p5.stroke("black");
        p5.textSize((p5.width + p5.height) / 75);
        const distance = this.edgeCostMap[vMap];
        p5.text(distance, x1 + (x2 - x1) / 2, y1 + (y2 - y1) / 2);
      }
    }
  };
}

function minimumForDijkstra(verticesSet) {
  const vIDs = Object.keys(verticesSet);
  let [minimumDistance, resultID] = [verticesSet[vIDs[0]].distance, vIDs[0]];
  for (let x = 0; x < vIDs.length; x++) {
    const vID = vIDs[x];
    if (minimumDistance > verticesSet[vID].distance)
      [minimumDistance, resultID] = [verticesSet[vID].distance, vID];
  }
  return resultID;
}

const Dijkstra = async (startID, destinyID) => {
  found = true;

  const verticesSet = { ...vertices };
  for (let vID in vertices) {
    vertices[vID].distance = Number.MAX_VALUE;
    vertices[vID].previousVID = -1;
  }
  vertices[startID].distance = 0;

  while (Object.keys(verticesSet).length != 0) {
    const minVertexID = minimumForDijkstra(verticesSet);
    const minVertex = verticesSet[minVertexID];
    minVertex.color = "purple";
    await new Promise((resolve) => setTimeout(resolve, 1000));
    minVertex.edgeColor = "orange";
    await new Promise((resolve) => setTimeout(resolve, 1000));
    delete verticesSet[minVertexID];

    for (let neighbourID in minVertex.edgeCostMap) {
      const neighbourVertex = vertices[neighbourID];
      const distance = minVertex.distance + minVertex.edgeCostMap[neighbourID];
      neighbourVertex.color = "purple";
      await new Promise((resolve) => setTimeout(resolve, 1000));
      minVertex.edgeColor = minVertex.defaultEdgeColor;

      if (distance < neighbourVertex.distance) {
        neighbourVertex.distance = distance;
        neighbourVertex.previousVID = minVertex.vID;
        neighbourVertex.color = "red";
        await new Promise((resolve) => setTimeout(resolve, 1000));
        vertices[neighbourID].edgeColor =
          vertices[neighbourID].defaultEdgeColor;
      }
    }
  }

  if (vertices[destinyID].previousVID != -1) {
    const pathCost = vertices[destinyID].distance;
    const path = [];
    while (destinyID != startID) {
      path.push(destinyID);
      destinyID = vertices[destinyID].previousVID;
    }
    path.push(destinyID);
    displayText = true;
    for (let x = path.length - 1; x > 0; x--) {
      const vertex = vertices[path[x]];
      vertex.color = "green";
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    vertices[path[0]].color = "green";
  }
};

function sketch(p5) {
  p5.setup = () => {
    p5.createCanvas(canvasWidth, canvasHeight);
    vertices[1] = new Vertex(getRandomCoordinates());
    vertices[2] = new Vertex(getRandomCoordinates());
    vertices[3] = new Vertex(getRandomCoordinates());
    vertices[4] = new Vertex(getRandomCoordinates());
    vertices[5] = new Vertex(getRandomCoordinates());

    vertices[1].edgeCostMap[2] = 10;
    vertices[1].edgeCostMap[3] = 100;
    vertices[2].edgeCostMap[4] = 5;
    vertices[3].edgeCostMap[2] = 3;
    vertices[4].edgeCostMap[5] = 7;
  };
  p5.draw = () => {
    p5.background("#F9F9F9");
    for (let vId in vertices) {
      vertices[vId].showVertex(p5);
      vertices[vId].showEdge(p5);
    }
    if (start) if (!found) Dijkstra(1, 5, p5);
    if (displayText) {
      p5.strokeWeight(1);
      p5.stroke("blue");
      p5.fill("blue");
      p5.text("Found the shortest path.", 80, 80);
    }
  };
}

export default function GraphSketch() {
  const sortingState = useSelector((state) => state.sorting);
  return (
    <>
      <Box>Finding minimum path using Dijkstra Algorithm from node 1 to 5.</Box>
      <ReactP5Wrapper sketch={(p5) => sketch(p5, sortingState)} />
      <br></br>
      <center>
        <Button
          style={{ fontSize: "1.3rem" }}
          variant="contained"
          onClick={() => {
            start = true;
          }}
        >
          Start
        </Button>
      </center>
    </>
  );
}
