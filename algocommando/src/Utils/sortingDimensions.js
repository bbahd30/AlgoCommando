export default function findDimensions(index, number, rectWidth, heightFactor)
{
    const canvasHeight = window.innerHeight / 2
    const canvasWidth = window.innerWidth - 200
    const rectDepth = canvasWidth / 50

    const height = heightFactor * number
    const x = index * rectWidth + rectWidth / 2 - canvasWidth / 2
    const y = canvasHeight / 2 - height / 2
    const z = -rectDepth / 2

    return [height, x, y, z]
}