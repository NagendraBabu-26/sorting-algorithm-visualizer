let array = [];
let arraySize = 10;
let stepByStep = false;
let stepResolve;
let comparisons = 0;
let swaps = 0;

function generateArray() {
  resetMetrics();
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

function updateSize(val) {
  arraySize = parseInt(val);
  generateArray();
}

let speed = 300; // default speed

function updateSpeed(val) {
  // invert: higher slider value = faster speed
  speed = 1050 - parseInt(val); 
}

function step() {
  return new Promise(resolve => {
    if (stepByStep) {
      stepResolve = resolve;
    } else {
      setTimeout(resolve, speed);
    }
  });
}



function nextStep() {
  if (stepResolve) {
    stepResolve();
    stepResolve = null;
  }
}

function stepMode() {
  stepByStep = !stepByStep;
  const btn = document.getElementById("stepButton");
  btn.innerText = stepByStep ? "Disable Step Mode" : "Enable Step Mode";

  if (!stepByStep && stepResolve) {
    stepResolve();
    stepResolve = null;
  }
}

function resetMetrics() {
  comparisons = 0;
  swaps = 0;
  updateMetrics();
}

function updateMetrics() {
  document.getElementById("metrics").innerText =
    `Comparisons: ${comparisons}, Swaps: ${swaps}`;
}

function markSorted() {
  let bars = document.getElementsByClassName("bar");
  for (let bar of bars) {
    bar.classList.add("sorted");
  }
}

/* ---------------- Bubble Sort ---------------- */
async function bubbleSort() {
  resetMetrics();
  let bars = document.getElementsByClassName("bar");

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].classList.add("comparing");
      bars[j + 1].classList.add("comparing");

      comparisons++;
      updateMetrics();
      await step();

      if (array[j] > array[j + 1]) {
        swaps++;
        updateMetrics();

        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        bars[j].style.height = array[j] + "px";
        bars[j + 1].style.height = array[j + 1] + "px";

        bars[j].classList.add("swapping");
        bars[j + 1].classList.add("swapping");
        await step();
        bars[j].classList.remove("swapping");
        bars[j + 1].classList.remove("swapping");
      }

      bars[j].classList.remove("comparing");
      bars[j + 1].classList.remove("comparing");
    }
  }
  markSorted();
}

/* ---------------- Merge Sort ---------------- */
async function mergeSort() {
  resetMetrics();
  await mergeSortHelper(0, array.length - 1);
  markSorted();
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
    bars[k].classList.add("comparing");
    comparisons++;
    updateMetrics();
    await step();

    if (left[i] <= right[j]) {
      array[k] = left[i];
      i++;
    } else {
      array[k] = right[j];
      j++;
    }

    bars[k].style.height = array[k] + "px";
    bars[k].classList.remove("comparing");
    k++;
  }

  while (i < left.length) {
    array[k] = left[i];
    bars[k].style.height = array[k] + "px";
    i++; k++;
  }

  while (j < right.length) {
    array[k] = right[j];
    bars[k].style.height = array[k] + "px";
    j++; k++;
  }
}

/* ---------------- Quick Sort ---------------- */
async function quickSort() {
  resetMetrics();
  await quickSortHelper(0, array.length - 1);
  markSorted();
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
  bars[high].classList.add("pivot");

  let i = low - 1;

  for (let j = low; j < high; j++) {
    bars[j].classList.add("comparing");
    comparisons++;
    updateMetrics();
    await step();

    if (array[j] < pivot) {
      i++;
      swaps++;
      updateMetrics();

      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;

      bars[i].style.height = array[i] + "px";
      bars[j].style.height = array[j] + "px";

      bars[i].classList.add("swapping");
      bars[j].classList.add("swapping");
      await step();
      bars[i].classList.remove("swapping");
      bars[j].classList.remove("swapping");
    }

    bars[j].classList.remove("comparing");
  }

  let temp = array[i + 1];
  array[i + 1] = array[high];
  array[high] = temp;

  bars[i + 1].style.height = array[i + 1] + "px";
  bars[high].style.height = array[high] + "px";

  swaps++;
  updateMetrics();

  bars[high].classList.remove("pivot");
  return i + 1;
}

/* ---------------- Selection Sort ---------------- */
async function selectionSort() {
  resetMetrics();
  let bars = document.getElementsByClassName("bar");

  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      bars[j].classList.add("comparing");
      comparisons++;
      updateMetrics();
      await step();
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
      bars[j].classList.remove("comparing");
    }

    if (minIndex !== i) {
      swaps++;
      updateMetrics();
      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;

      bars[i].style.height = array[i] + "px";
      bars[minIndex].style.height = array[minIndex] + "px";

      bars[i].classList.add("swapping");
      bars[minIndex].classList.add("swapping");
      await step();
      bars[i].classList.remove("swapping");
      bars[minIndex].classList.remove("swapping");
    }
  }
  markSorted();
}

/* ---------------- Insertion Sort ---------------- */
async function insertionSort() {
  resetMetrics();
  let bars = document.getElementsByClassName("bar");

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      comparisons++;
      updateMetrics();

      array[j + 1] = array[j];
      bars[j + 1].style.height = array[j + 1] + "px";

      swaps++;
      updateMetrics();
      await step();
      j--;
    }
    array[j + 1] = key;
    bars[j + 1].style.height = key + "px";
  }
  markSorted();
}

/* ---------------- Heap Sort ---------------- */
async function heapSort() {
  resetMetrics();
  let bars = document.getElementsByClassName("bar");

  // Build max heap
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    await heapify(array.length, i, bars);
  }

  // Extract elements one by one
  for (let i = array.length - 1; i > 0; i--) {
    swaps++;
    updateMetrics();

    // Swap root with end
    let temp = array[0];
    array[0] = array[i];
    array[i] = temp;

    bars[0].style.height = array[0] + "px";
    bars[i].style.height = array[i] + "px";

    bars[0].classList.add("swapping");
    bars[i].classList.add("swapping");
    await step();
    bars[0].classList.remove("swapping");
    bars[i].classList.remove("swapping");

    // Heapify reduced heap
    await heapify(i, 0, bars);
  }

  markSorted();
}

async function heapify(n, i, bars) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n) {
    bars[left].classList.add("comparing");
    comparisons++;
    updateMetrics();
    await step();
    bars[left].classList.remove("comparing");

    if (array[left] > array[largest]) {
      largest = left;
    }
  }

  if (right < n) {
    bars[right].classList.add("comparing");
    comparisons++;
    updateMetrics();
    await step();
    bars[right].classList.remove("comparing");

    if (array[right] > array[largest]) {
      largest = right;
    }
  }

  if (largest !== i) {
    swaps++;
    updateMetrics();

    let temp = array[i];
    array[i] = array[largest];
    array[largest] = temp;

    bars[i].style.height = array[i] + "px";
    bars[largest].style.height = array[largest] + "px";

    bars[i].classList.add("swapping");
    bars[largest].classList.add("swapping");
    await step();
    bars[i].classList.remove("swapping");
    bars[largest].classList.remove("swapping");

    await heapify(n, largest, bars);
  }
}
generateArray();