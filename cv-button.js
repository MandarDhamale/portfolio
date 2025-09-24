// cv-button.js - Adds CV download button to all pages
document.addEventListener("DOMContentLoaded", function () {
  // Only add the button if it doesn't already exist
  if (!document.querySelector(".cv-floating-button")) {
    // Create the button element
    const cvButton = document.createElement("a");
    cvButton.className = "cv-floating-button";
    cvButton.href = "assets/Vinit_PM_Tech.pdf";
    cvButton.setAttribute("download", "");
    cvButton.setAttribute("aria-label", "Download CV");

    // Create the icon
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-file-pdf";
    cvButton.appendChild(icon);

    // Create the text label
    const textLabel = document.createElement("span");
    textLabel.className = "button-text";
    textLabel.textContent = "Download CV";
    cvButton.appendChild(textLabel);

    // Add to the document
    document.body.appendChild(cvButton);
  }
});
