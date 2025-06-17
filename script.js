//js for bg blur

function myFunction() {
    var links = document.getElementById("links");
    var menuToggle = document.getElementById("menuToggle");
    var container = document.getElementById("container"); // Select the container to blur
  
    if (links.classList.contains("show")) {
      links.classList.remove("show");
      menuToggle.textContent = "Menu";
      container.classList.remove("blur-background"); // Remove blur
    } else {
      links.classList.add("show");
      menuToggle.textContent = "Close";
      container.classList.add("blur-background"); // Add blur
    }
  }

  //audio button
 document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("backgroundVideo");
  const enableAudioButton = document.getElementById("enableAudioButton");

  // Ensure the video starts muted
  video.muted = true;

  // Unmute the video and play it when the button is clicked
  enableAudioButton.addEventListener("click", function () {
    video.muted = false;
    video.play().catch((error) => {
      console.error("Error playing video:", error);
    });
    enableAudioButton.style.display = "none"; // Hide the button after enabling audio
  });

  // Check if there's a saved playback time in sessionStorage
  const savedTime = sessionStorage.getItem("videoTime");
  if (savedTime) {
    video.currentTime = parseFloat(savedTime); // Resume video from saved time
  }

  // Save the current playback time to sessionStorage before the page unloads
  window.addEventListener("beforeunload", function () {
    sessionStorage.setItem("videoTime", video.currentTime);
  });
});

// Select DOM elements
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const carousel = document.querySelector(".carousel");
const list = document.querySelector(".list");
const items = Array.from(document.querySelectorAll(".item"));
const runningTimeBar = document.querySelector(".carousel .timeRunning");

// Timing configurations
const TIME_RUNNING = 1500; // Animation duration for the transition


// Initialize timeout variables
let transitionTimeout;
let autoNextTimeout;

// Create and append the progress bar
const arrowsDiv = document.querySelector(".arrows");
const progressBarContainer = document.createElement("div");
progressBarContainer.className = "progress-bar-container";

const progressBar = document.createElement("div");
progressBar.className = "progress-bar";

progressBarContainer.appendChild(progressBar);
arrowsDiv.appendChild(progressBarContainer);

// Event listeners for navigation buttons
nextBtn.addEventListener("click", () => handleSliderNavigation("next"));
prevBtn.addEventListener("click", () => handleSliderNavigation("prev"));

// Add attribute to each item
items.forEach((item, index) => {
  item.querySelector(".title").setAttribute("data-item", index + 1);
});

// Automatically navigate to the next slide
autoNextTimeout = setTimeout(() => {
  nextBtn.click();
}, TIME_AUTO_NEXT);

// Start the initial running time animation and progress bar
resetAnimation();
afterSlideChange();

// Resets the running time animation
function resetAnimation() {
  runningTimeBar.style.animation = "none"; // Remove current animation
  runningTimeBar.offsetHeight; // Trigger reflow to restart animation
  runningTimeBar.style.animation = `runningTime ${
    TIME_AUTO_NEXT / 1000
  }s linear forwards`; // Restart animation
}

// Handles slider navigation (next/prev)
function handleSliderNavigation(direction) {
  const sliderItems = list.querySelectorAll(".item"); // Get all current items in the list

  if (direction === "next") {
    list.appendChild(sliderItems[0]); // Move the first item to the end of the list
    carousel.classList.add("next"); // Add the "next" class for transition
  } else if (direction === "prev") {
    list.prepend(sliderItems[sliderItems.length - 1]); // Move the last item to the start of the list
    carousel.classList.add("prev"); // Add the "prev" class for transition
  }

  afterSlideChange(); // Log the active slide index
}

// Logs the current active slide's original index
function afterSlideChange() {
  const slideNumberElement = document.querySelector(".slide-number");
  if (slideNumberElement) slideNumberElement.remove();

  const sliderItems = Array.from(list.querySelectorAll(".item")); // Get the current visible order of items
  const activeItem = parseInt(
    sliderItems[1].querySelector(".title").getAttribute("data-item")
  ); // The first visible item is the active one

  const activeIndex =
    activeItem < 10 ? `0${activeItem}` : activeItem.toString();

  const div = document.createElement("div");
  div.classList.add("slide-number");
  div.textContent = `${activeIndex}/${sliderItems.length}`;

  arrowsDiv.appendChild(div);

  console.log(`Current active slide original index: ${activeIndex}`);

  updateProgressBar();
  resetCarouselState();
}

// Updates the progress bar based on the active slide index
function updateProgressBar() {
  const totalSlides = items.length;

  const sliderItems = Array.from(list.querySelectorAll(".item")); // Get the current visible order of items
  const activeItem = parseInt(sliderItems[0].querySelector(".title").getAttribute("data-item")) + 1; // The first visible item is the active one

  const progressPercentage = (activeItem / totalSlides) * 100; // Calculate progress percentage
  progressBar.style.width = `${progressPercentage}%`; // Update the progress bar's width
}

// Resets the carousel state after navigation
function resetCarouselState() {
  // Clear existing timeouts for transitions and auto-slide
  clearTimeout(transitionTimeout);
  clearTimeout(autoNextTimeout);

  // Remove the transition class after the animation duration
  transitionTimeout = setTimeout(() => {
    carousel.classList.remove("next");
    carousel.classList.remove("prev");
  }, TIME_RUNNING);

  // Restart the auto-slide timer
  autoNextTimeout = setTimeout(() => {
    nextBtn.click();
  }, TIME_AUTO_NEXT);

  // Reset the running time bar animation
  resetAnimation();
}

// TEST FOR PREVIEW
const refItems = document.querySelectorAll('.ref-list li');
    const previewBox = document.getElementById('refPreviewBox');

    refItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const previewText = item.getAttribute('data-preview');
        previewBox.innerText = previewText;
        previewBox.style.display = 'block';
      });

      item.addEventListener('mouseleave', () => {
        previewBox.style.display = 'none';
      });
    });