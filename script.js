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