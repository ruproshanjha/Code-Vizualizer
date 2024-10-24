// Get the necessary elements from the DOM
const dropdown = document.getElementById("algorithm");
const generateButton = document.getElementById("generate-array");
const startButton = document.getElementById("start");
const visualizationArea = document.getElementById("visualization-area");
const visualizationModal = document.getElementById("visualization-modal");
const closeModalButton = document.getElementById("close-modal");
let array = [];

// Function to generate random array based on the user's input
generateButton.addEventListener("click", () => {
  const arraySize = document.getElementById("array-size").value;
  array = [];
  visualizationArea.innerHTML = ""; // Clear previous visualizations
  generateButton.classList.add("success"); // Change button color to green

  // Generate random elements
  for (let i = 0; i < arraySize; i++) {
    const randomValue = Math.floor(Math.random() * 100) + 1;
    array.push(randomValue);

    // Create visual circle elements for each array item
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = randomValue;
    circle.setAttribute("id", `circle-${i}`);
    visualizationArea.appendChild(circle);
  }
});

// Function to delay between animations (to simulate steps)
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// Function to swap the elements visually
async function swapElements(index1, index2) {
  const circle1 = document.getElementById(`circle-${index1}`);
  const circle2 = document.getElementById(`circle-${index2}`);

  // Highlight the moving elements by applying a class
  circle1.classList.add("moving");
  circle2.classList.add("moving");

  // Pause briefly to visualize the movement
  await delay(750);

  // Swap the text (representing the swap of array elements)
  let temp = circle1.textContent;
  circle1.textContent = circle2.textContent;
  circle2.textContent = temp;

  // Get the computed styles for the circles
  const width = circle1.offsetWidth; // Assuming all circles have the same width

  // Set positions based on the index and width of the circles
  const left1 = index1 * (width + 10); // Adjust for spacing
  const left2 = index2 * (width + 10); // Adjust for spacing

  // Animate positions using CSS transform
  circle1.style.transform = `translateX(${left2 - left1}px)`;
  circle2.style.transform = `translateX(${left1 - left2}px)`;

  // Remove the highlight class
  await delay(750);
  circle1.classList.remove("moving");
  circle2.classList.remove("moving");

  // Reset positions after swapping
  circle1.style.transform = "translateX(0)";
  circle2.style.transform = "translateX(0)";
}

// Function to visualize the selected sorting algorithm
async function visualizeSorting() {
  const algorithm = dropdown.value;

  if (algorithm === "bubble") {
    // Bubble Sort Visualization
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          await swapElements(j, j + 1);
          // Swap elements in the array
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
  } else if (algorithm === "selection") {
    // Selection Sort Visualization
    for (let i = 0; i < array.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
      await swapElements(i, minIndex);
      // Swap elements in the array
      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
    }
  }
}

// Event listener for starting the visualization
startButton.addEventListener("click", async () => {
  visualizationModal.style.display = "block"; // Show modal
  await visualizeSorting();
  closeModalButton.style.display = "block"; // Show close button after process
});

// Close modal event and refresh page
closeModalButton.addEventListener("click", () => {
  visualizationModal.style.display = "none"; // Hide modal
  closeModalButton.style.display = "none"; // Hide close button
  window.location.reload(); // Refresh the page
});
