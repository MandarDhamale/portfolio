document.addEventListener("DOMContentLoaded", function () {
  // Contact Popup Elements
  const contactButton = document.querySelector("#nav-contact");
  const contactPopup = document.querySelector("#contact-popup");
  const popupOverlay = document.querySelector("#popup-overlay");
  const closePopup = document.querySelector(".close-popup");
  const downloadCVButton = document.querySelector('.btn[href*="Download"]');
  const heroContactButton = document.querySelector("#contact-btn");
  const cvButton = document.querySelector(".cv-download-button");
  function addEyeIconToFooter() {
    // Find the footer Download CV button
    const footerCVButton = document.querySelector(
      ".cv-floating-button, .download-cv"
    );

    // Also look for any other footer CV buttons that might have different classes
    const allFooterButtons = document.querySelectorAll("[download]");
    let targetButton = footerCVButton;

    // If the main selector didn't find it, look through all download buttons
    if (!targetButton) {
      allFooterButtons.forEach((btn) => {
        // Check if this is in the footer area (usually has a lower position on the page)
        const rect = btn.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.7) {
          // If button is in the bottom 30% of viewport
          targetButton = btn;
        }
      });
    }

    // If we found a footer button and it doesn't already have an eye icon
    if (
      targetButton &&
      !targetButton.querySelector(".footer-eye-btn") &&
      !targetButton.nextElementSibling?.classList.contains("footer-eye-btn")
    ) {
      // Create the eye icon container
      const eyeBtn = document.createElement("div");
      eyeBtn.className = "footer-eye-btn";
      eyeBtn.style.position = "absolute";
      eyeBtn.style.top = "50%";
      eyeBtn.style.right = "-30px";
      eyeBtn.style.transform = "translateY(-50%)";
      eyeBtn.style.width = "24px";
      eyeBtn.style.height = "24px";
      eyeBtn.style.borderRadius = "50%";
      eyeBtn.style.backgroundColor = "white";
      eyeBtn.style.display = "flex";
      eyeBtn.style.alignItems = "center";
      eyeBtn.style.justifyContent = "center";
      eyeBtn.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
      eyeBtn.style.cursor = "pointer";
      eyeBtn.style.zIndex = "99";
      eyeBtn.innerHTML =
        '<i class="fa-regular fa-eye" style="font-size: 14px; color: #333;"></i>';

      // Add click event to eye button
      eyeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        openResumePreview();
      });

      // Set the parent to relative positioning if it's not already
      if (getComputedStyle(targetButton).position === "static") {
        targetButton.style.position = "relative";
      }

      // Add the eye button next to the footer button
      targetButton.parentElement.insertBefore(eyeBtn, targetButton.nextSibling);
    }
  }

  addEyeIconToFooter();
  setTimeout(addEyeIconToFooter, 500);

  window.addEventListener("load", function () {
    addEyeIconToFooter();
  });

  // Mobile Menu Elements - Define this early to avoid reference error
  const toggleBtn = document.querySelector(".togglebtn");
  const navLinks = document.querySelector(".navlinks");

  // Resume Preview Elements
  const resumeModalOverlay = document.getElementById("resume-modal-overlay");
  const closeResumeModal = document.querySelector(".close-resume-modal");
  const loadingMessage = document.querySelector(".loading-message");
  const resumePath = "assets/Vinit_PM_Tech.pdf";

  // Define functions first - before they are used
  // Contact Popup Functions
  function openContactPopup() {
    if (contactPopup && popupOverlay) {
      contactPopup.classList.add("active");
      popupOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeContactPopup() {
    if (contactPopup && popupOverlay) {
      contactPopup.classList.remove("active");
      popupOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // Function to detect iOS
  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  // Function to open resume preview with improved iOS support
  function openResumePreview() {
    const resumeModalOverlay = document.getElementById("resume-modal-overlay");
    const pdfViewerContainer = document.getElementById("pdf-viewer-container");
    const resumePath = "assets/Vinit_PM_Tech.pdf";

    // Clear previous viewer content if the container exists
    if (pdfViewerContainer) {
      pdfViewerContainer.innerHTML = "";

      // For all devices including iOS, use Google Docs viewer which works more reliably
      const object = document.createElement("object");
      object.data = resumePath;
      object.type = "application/pdf";
      object.width = "100%";
      object.height = "100%";

      // Also add a direct iframe as fallback
      const iframe = document.createElement("iframe");
      iframe.src = resumePath;
      iframe.title = "Resume Preview";
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.style.border = "none";

      object.appendChild(iframe);
      pdfViewerContainer.appendChild(object);
    }

    // Show modal
    if (resumeModalOverlay) {
      resumeModalOverlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  }

  // Function to close resume preview
  function closeResumePreview() {
    if (resumeModalOverlay) {
      resumeModalOverlay.style.display = "none";
      document.body.style.overflow = "";
    }
  }

  // Add eye icon to button
  function addEyeIconToButtons() {
    // Find the Download CV button in hero section
    const downloadButton = document.querySelector(".btn-group .btn[download]");

    if (downloadButton && !document.querySelector(".eye-preview-btn")) {
      // Create eye button
      const eyeBtn = document.createElement("div");
      eyeBtn.className = "eye-preview-btn";
      eyeBtn.innerHTML = '<i class="fa-regular fa-eye"></i>';
      eyeBtn.setAttribute("title", "Preview Resume");

      // Add click event to eye button
      eyeBtn.addEventListener("click", openResumePreview);

      // Set the button's parent to relative positioning
      downloadButton.parentElement.style.position = "relative";

      // Add the eye button to the button group
      downloadButton.parentElement.appendChild(eyeBtn);
    }
  }

  // Resume Modal Event Listeners
  if (closeResumeModal) {
    closeResumeModal.addEventListener("click", closeResumePreview);
  }

  if (resumeModalOverlay) {
    resumeModalOverlay.addEventListener("click", function (e) {
      if (e.target === resumeModalOverlay) {
        closeResumePreview();
      }
    });
  }

  // Reload button click
  const reloadButton = document.querySelector(".reload-preview");
  if (reloadButton) {
    reloadButton.addEventListener("click", openResumePreview);
  }

  // CV Button Tooltip
  if (cvButton) {
    // Handle tooltip display
    cvButton.addEventListener("mouseenter", function () {
      this.classList.add("show-tooltip");
    });

    cvButton.addEventListener("mouseleave", function () {
      this.classList.remove("show-tooltip");
    });

    // Add touch support for mobile devices
    cvButton.addEventListener("touchstart", function (e) {
      // Prevent default to avoid triggering download immediately on touch devices
      e.preventDefault();
      this.classList.toggle("show-tooltip");

      // Set a timeout to actually follow the link if they hold
      setTimeout(() => {
        if (this.classList.contains("show-tooltip")) {
          window.location.href = this.getAttribute("href");
        }
      }, 1500); // 1.5 second delay
    });

    // Hide CV button tooltip when other UI elements are active
    if (contactPopup) {
      contactPopup.addEventListener("click", function () {
        cvButton.classList.remove("show-tooltip");
      });
    }
  }
  // Photo Modal
  const profileImg = document.querySelector(".profile-img");
  const photoModalOverlay = document.querySelector(".photo-modal-overlay");
  const closePhotoModal = document.querySelector(".close-photo-modal");

  if (profileImg && photoModalOverlay && closePhotoModal) {
    profileImg.addEventListener("click", () => {
      photoModalOverlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    });

    closePhotoModal.addEventListener("click", () => {
      photoModalOverlay.style.display = "none";
      document.body.style.overflow = "";
    });

    photoModalOverlay.addEventListener("click", (e) => {
      if (e.target === photoModalOverlay) {
        photoModalOverlay.style.display = "none";
        document.body.style.overflow = "";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && photoModalOverlay.style.display === "flex") {
        photoModalOverlay.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }

  // Contact Popup Event Listeners - with enhanced reliability
  if (contactButton) {
    contactButton.addEventListener("click", function (e) {
      e.preventDefault();
      openContactPopup();
    });
  } else {
    // If contactButton wasn't found initially, try adding it after a delay
    setTimeout(() => {
      const retryContactButton = document.querySelector("#nav-contact");
      if (retryContactButton) {
        retryContactButton.addEventListener("click", function (e) {
          e.preventDefault();
          openContactPopup();
        });
      }
    }, 100);
  }

  if (heroContactButton) {
    heroContactButton.addEventListener("click", function (e) {
      e.preventDefault();
      openContactPopup();
    });
  } else {
    // If heroContactButton wasn't found initially, try adding it after a delay
    setTimeout(() => {
      const retryHeroButton = document.querySelector("#contact-btn");
      if (retryHeroButton) {
        retryHeroButton.addEventListener("click", function (e) {
          e.preventDefault();
          openContactPopup();
        });
      }
    }, 100);
  }

  if (closePopup) {
    closePopup.addEventListener("click", closeContactPopup);
  } else {
    // If closePopup wasn't found initially, try adding it after a delay
    setTimeout(() => {
      const retryCloseButton = document.querySelector(".close-popup");
      if (retryCloseButton) {
        retryCloseButton.addEventListener("click", closeContactPopup);
      }
    }, 100);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      // If contact popup is open, close it when toggle menu is clicked
      if (contactPopup && contactPopup.classList.contains("active")) {
        closeContactPopup();
      }
    });
  }

  if (popupOverlay) {
    popupOverlay.addEventListener("click", closeContactPopup);
  }

  // Add global event delegation for contact buttons
  document.addEventListener("click", function (e) {
    // For contact buttons
    if (e.target.id === "nav-contact" || e.target.id === "contact-btn") {
      e.preventDefault();
      openContactPopup();
    }

    // For close popup button
    if (e.target.classList.contains("close-popup")) {
      closeContactPopup();
    }

    // For eye icons that might be added dynamically
    if (
      e.target.classList.contains("eye-preview-btn") ||
      (e.target.parentNode &&
        e.target.parentNode.classList.contains("eye-preview-btn"))
    ) {
      openResumePreview();
    }
  });

  // ESC key for all modals
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeContactPopup();
      closeResumePreview();
    }
  });

  // Mobile Menu Toggle
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Close menu when clicking a link or outside
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });

    // Close menu when clicking outside (on overlay or body)
    document.addEventListener("click", (e) => {
      if (
        !navLinks.contains(e.target) &&
        !toggleBtn.contains(e.target) &&
        navLinks.classList.contains("active")
      ) {
        navLinks.classList.remove("active");
      }
    });
  }

  // Section Loading - with fixed template literals
  function loadSection(section) {
    fetch(`${section}.html`)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("main-content").innerHTML = html;
      });
    history.pushState({}, "", `/${section}`);
  }

  // Mobile Device Check
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  // Phone link behavior
  const phoneCard = document.querySelector('.contact-card[href^="tel:"]');
  if (phoneCard) {
    phoneCard.addEventListener("click", function (e) {
      if (!isMobileDevice()) {
        e.preventDefault();
      }
    });
  }

  // Typing effect
  const typingElement = document.querySelector(".input");
  if (typingElement && typeof Typed !== "undefined") {
    new Typed(".input", {
      strings: [
  "Building Smart Software",
  "Crafting Scalable Systems",
  "Solving Real-World Problems",
  "Turning Ideas into Code"
],
      typeSpeed: 100,
      backSpeed: 80,
      loop: true,
    });
  }

  // Theme Switcher
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme") || "dark";

  document.documentElement.setAttribute("data-theme", savedTheme);
  if (themeToggle) {
    themeToggle.checked = savedTheme === "light";
    themeToggle.addEventListener("change", (e) => {
      const newTheme = e.target.checked ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  // Initialize AOS if it exists
  if (typeof AOS !== "undefined") {
    AOS.init();
  }

  // Finally add the eye icon to the button
  addEyeIconToButtons();
});
