export let traversedIndex = -1
export let firstIndex = -1
export let secondIndex = -1
export let firstCorrected = -1
export let secondCorrected = -1
export let sorted = -1
export let swapped = false

export async function bubbleSort(array, callback)
{
    const n = array.length
    for (let i = 0; i < n - 1; i++)
    {
        swapped = false
        for (let j = 0; j < n - i - 1; j++)
        {
            traversedIndex = j
            await new Promise((resolve) => setTimeout(resolve, 1000))
            if (array[j] > array[j + 1])
            {
                firstIndex = j
                secondIndex = j + 1
                console.log(firstIndex, secondIndex, swapped)
                await new Promise((resolve) => setTimeout(resolve, 1000));
                [array[j], array[j + 1]] = [array[j + 1], array[j]] // swap elements
                swapped = true
                firstIndex = secondIndex = -1
                firstCorrected = j
                secondCorrected = traversedIndex = j + 1
                callback([...array])
                await new Promise((resolve) => setTimeout(resolve, 1000))
                firstCorrected = -1
                secondCorrected = -1
            } else
            {
                await new Promise((resolve) => setTimeout(resolve, 1000))
            }
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
