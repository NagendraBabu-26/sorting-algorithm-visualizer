let array = [];
const arraySize = 30;

function generateArray() {
array = [];
const container = document.getElementById("array");
container.innerHTML = "";

for (let i = 0; i < arraySize; i++) {
    let value = Math.floor(Math.random() * 200) + 20;
    array.push(value);

    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value + "px";

    container.appendChild(bar);
}


}

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
let bars = document.getElementsByClassName("bar");


for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {

        bars[j].style.background = "red";
        bars[j + 1].style.background = "red";

        await sleep(40);

        if (array[j] > array[j + 1]) {

            let temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;

            bars[j].style.height = array[j] + "px";
            bars[j + 1].style.height = array[j + 1] + "px";
        }

        bars[j].style.background = "#2ecc71";
        bars[j + 1].style.background = "#2ecc71";
    }
}


}

async function mergeSort() {
await mergeSortHelper(0, array.length - 1);
}

async function mergeSortHelper(l, r) {
if (l >= r) return;


let mid = Math.floor((l + r) / 2);

await mergeSortHelper(l, mid);
await mergeSortHelper(mid + 1, r);

await merge(l, mid, r);


}

async function merge(l, m, r) {
let bars = document.getElementsByClassName("bar");


let left = array.slice(l, m + 1);
let right = array.slice(m + 1, r + 1);

let i = 0, j = 0, k = l;

while (i < left.length && j < right.length) {

    bars[k].style.background = "orange";
    await sleep(40);

    if (left[i] <= right[j]) {
        array[k] = left[i];
        i++;
    } else {
        array[k] = right[j];
        j++;
    }

    bars[k].style.height = array[k] + "px";
    bars[k].style.background = "#2ecc71";

    k++;
}

while (i < left.length) {
    bars[k].style.background = "orange";
    await sleep(40);

    array[k] = left[i];
    bars[k].style.height = array[k] + "px";

    bars[k].style.background = "#2ecc71";

    i++;
    k++;
}

while (j < right.length) {
    bars[k].style.background = "orange";
    await sleep(40);

    array[k] = right[j];
    bars[k].style.height = array[k] + "px";

    bars[k].style.background = "#2ecc71";

    j++;
    k++;
}


}

async function quickSort() {
await quickSortHelper(0, array.length - 1);
}

async function quickSortHelper(low, high) {
if (low < high) {


    let pi = await partition(low, high);

    await quickSortHelper(low, pi - 1);
    await quickSortHelper(pi + 1, high);
}


}

async function partition(low, high) {


let bars = document.getElementsByClassName("bar");

let pivot = array[high];
bars[high].style.background = "purple";

let i = low - 1;

for (let j = low; j < high; j++) {

    bars[j].style.background = "red";
    await sleep(40);

    if (array[j] < pivot) {

        i++;

        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;

        bars[i].style.height = array[i] + "px";
        bars[j].style.height = array[j] + "px";
    }

    bars[j].style.background = "#2ecc71";
}

let temp = array[i + 1];
array[i + 1] = array[high];
array[high] = temp;

bars[i + 1].style.height = array[i + 1] + "px";
bars[high].style.height = array[high] + "px";

bars[high].style.background = "#2ecc71";

return i + 1;


}

generateArray();

