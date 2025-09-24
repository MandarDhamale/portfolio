// certifications.js
document.addEventListener("DOMContentLoaded", function () {
  const certificationsData = [
    {
      title: "DeepLearning.AI",
      issuer: "Stanford University",
      date: "Nov 2022",
      credentialId: "6SGEGS5GATX",
      logo: "assets/stanford-logo.png",
      credentialUrl:
        "https://www.coursera.org/account/accomplishments/certificate/63GEGSFGAT5X",
    },
    {
      title: "Applied Social Network Analysis in Python",
      issuer: "University of Michigan",
      date: "Aug 2022",
      credentialId: "J7ZTLUR45N4A",
      logo: "assets/umich-logo.png",
      credentialUrl:
        "https://www.coursera.org/account/accomplishments/certificate/J7ZTLUR45NHA",
    },
    {
      title: "Certified Scrum Product Owner (CSPO)",
      issuer: "Scrum Alliance",
      date: "Aug 2023",
      credentialId: "001953387",
      logo: "assets/scrum-logo.png",
      credentialUrl:
        "https://www.linkedin.com/in/vinitjuneja/details/certifications/",
    },
    {
      title: "Six Sigma White Belt Certification",
      issuer: "The Council for Six Sigma Certification (CSSC)",
      date: "Oct 2022",
      credentialId: "uAO516xHD",
      logo: "assets/six-sigma-logo.png",
      credentialUrl:
        "https://www.linkedin.com/in/vinitjuneja/details/certifications/",
    },
    {
      title: "Front-End Web Development with React",
      issuer: "The Hong Kong University of Science and Technology",
      date: "Mar 2022",
      credentialId: "BLLNGNUKT45",
      logo: "assets/hkust-logo.png",
      credentialUrl:
        "https://www.coursera.org/account/accomplishments/certificate/8JLN6NJUKT4S",
    },
    {
      title: "Artificial Intelligence Foundations",
      issuer: "nasscom FutureSkills",
      date: "Aug 2021",
      credentialId: "FSP/2021/8/8073243",
      logo: "assets/nasscom-logo.png",
      credentialUrl:
        "https://fsp-assessment-certificates.s3-ap-southeast-1.amazonaws.com/VinitJuneja-65685194.pdf",
    },
    {
      title: "Statistics",
      issuer: "University of Amsterdam",
      date: "Mar 2020",
      credentialId: "DP3ABPRHNCX",
      logo: "assets/uva-logo.png",
      credentialUrl:
        "https://www.coursera.org/account/accomplishments/certificate/DP3ABFP6HNCX",
    },
  ];

  const track = document.querySelector(".certifications-track");
  const dots = document.querySelectorAll(".nav-dot");
  let currentIndex = 0;
  let startX = 0;
  let startY = 0;
  let isDragging = false;
  let autoRotateInterval;
  let isAutoRotating = true;
  let dragThreshold = 50;
  let lastTapTime = 0;
  let touchTimeout;

  if (!track) {
    console.error("Certifications track element not found!");
    return;
  }

  function updateCardStyles() {
    const cards = track.querySelectorAll(".certification-card");
    cards.forEach((card) => {
      card.style.display = "none";
      card.offsetHeight;
      card.style.display = "";
    });
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "data-theme") {
        updateCardStyles();
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  function createCards() {
    certificationsData.forEach((cert, index) => {
      const card = document.createElement("div");
      card.className = "certification-card";
      card.setAttribute("data-index", index);
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "article");
      card.setAttribute(
        "aria-label",
        `${cert.title} certification from ${cert.issuer}`
      );

      const credentialButton = cert.credentialUrl
        ? `<a href="${cert.credentialUrl}" 
                    class="view-credential" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="View credential for ${cert.title}">
                    View Credential
                </a>`
        : `<button class="view-credential" disabled>Credential Pending</button>`;

      card.innerHTML = `
                <div class="cert-logo">
                    <img src="${cert.logo}" alt="${cert.issuer} logo" loading="lazy" />
                </div>
                <h3>${cert.title}</h3>
                <p class="cert-issuer">${cert.issuer}</p>
                <p class="cert-date">${cert.date}</p>
                ${credentialButton}
            `;

      // Handle card interactions
      card.addEventListener("click", (e) => {
        if (!e.target.classList.contains("view-credential")) {
          e.preventDefault();
          if (!isDragging) {
            const now = Date.now();
            if (now - lastTapTime < 300) {
              // Double tap/click detected
              const url = cert.credentialUrl;
              if (url) {
                window.open(url, "_blank", "noopener");
              }
            } else {
              currentIndex = index;
              updateCarousel(currentIndex);
            }
            lastTapTime = now;
          }
        }
      });

      track.appendChild(card);
    });
    updateCarousel(0);
    startAutoRotate();
  }

  function getPosition(index, currentIndex) {
    const total = certificationsData.length;
    const diff = (index - currentIndex + total) % total;

    if (diff === 0) return "center";
    if (diff === 1 || diff === -(total - 1)) return "right";
    if (diff === -1 || diff === total - 1) return "left";
    if (diff > 1 && diff <= Math.floor(total / 2)) return "far-right";
    return "far-left";
  }

  function updateCarousel(index, animate = true) {
    if (!animate) {
      track.style.transition = "none";
    }

    currentIndex =
      (index + certificationsData.length) % certificationsData.length;

    const cards = track.querySelectorAll(".certification-card");
    cards.forEach((card) => {
      const cardIndex = parseInt(card.dataset.index);
      const position = getPosition(cardIndex, currentIndex);
      card.setAttribute("data-position", position);
      card.setAttribute("aria-hidden", position !== "center");
      card.setAttribute("tabindex", position === "center" ? "0" : "-1");
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
      dot.setAttribute("aria-current", i === currentIndex ? "true" : "false");
    });

    if (!animate) {
      requestAnimationFrame(() => {
        track.style.transition = "";
      });
    }
  }

  function startAutoRotate() {
    if (isAutoRotating) {
      stopAutoRotate();
      autoRotateInterval = setInterval(() => {
        if (!isDragging) {
          currentIndex = (currentIndex + 1) % certificationsData.length;
          updateCarousel(currentIndex);
        }
      }, 3000);
    }
  }

  function stopAutoRotate() {
    clearInterval(autoRotateInterval);
  }

  function handleDragStart(e) {
    const chatWindow = document.querySelector(".chat-window");
    if (chatWindow && chatWindow.classList.contains("open")) {
      chatWindow.classList.remove("open");
      // Also remove 'expanded' if set
      if (chatWindow.classList.contains("expanded")) {
        chatWindow.classList.remove("expanded");
      }
    }
    if (
      e.target.classList.contains("view-credential") ||
      e.target.closest(".view-credential")
    ) {
      return;
    }

    isDragging = true;
    isAutoRotating = false;
    stopAutoRotate();

    startX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
    startY = e.type.includes("mouse") ? e.pageY : e.touches[0].pageY;

    track.style.transition = "none";

    // Clear any existing touch timeout
    if (touchTimeout) {
      clearTimeout(touchTimeout);
    }
  }

  function handleDragMove(e) {
    if (!isDragging) return;

    const currentX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
    const currentY = e.type.includes("mouse") ? e.pageY : e.touches[0].pageY;

    const diffX = currentX - startX;
    const diffY = currentY - startY;

    // If vertical scroll is detected, end the drag
    if (Math.abs(diffY) > Math.abs(diffX)) {
      handleDragEnd();
      return;
    }

    e.preventDefault();

    if (Math.abs(diffX) > dragThreshold) {
      isDragging = false;
      handleDragEnd(diffX);
    }
  }

  function handleDragEnd(diff = 0) {
    track.style.transition = "transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)";

    if (Math.abs(diff) > dragThreshold) {
      currentIndex += diff > 0 ? -1 : 1;
      if (currentIndex < 0) currentIndex = certificationsData.length - 1;
      if (currentIndex >= certificationsData.length) currentIndex = 0;
    }

    updateCarousel(currentIndex);
    isDragging = false;

    // Restart auto-rotation after a brief delay
    setTimeout(() => {
      isAutoRotating = true;
      startAutoRotate();
    }, 1000);
  }

  function handleKeydown(e) {
    switch (e.key) {
      case "ArrowLeft":
        currentIndex =
          (currentIndex - 1 + certificationsData.length) %
          certificationsData.length;
        updateCarousel(currentIndex);
        break;
      case "ArrowRight":
        currentIndex = (currentIndex + 1) % certificationsData.length;
        updateCarousel(currentIndex);
        break;
      case "Home":
        currentIndex = 0;
        updateCarousel(currentIndex);
        break;
      case "End":
        currentIndex = certificationsData.length - 1;
        updateCarousel(currentIndex);
        break;
    }
  }

  // Event Listeners
  track.addEventListener("mousedown", handleDragStart);
  track.addEventListener("touchstart", handleDragStart, { passive: true });

  window.addEventListener("mousemove", handleDragMove);
  window.addEventListener("touchmove", handleDragMove, { passive: false });

  window.addEventListener("mouseup", () => handleDragEnd());
  window.addEventListener("touchend", () => handleDragEnd());

  // Handle dot navigation
  dots.forEach((dot, index) => {
    dot.setAttribute("aria-label", `Go to certification ${index + 1}`);
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel(currentIndex);
      isAutoRotating = false;
      stopAutoRotate();

      // Restart auto-rotation after interaction
      setTimeout(() => {
        isAutoRotating = true;
        startAutoRotate();
      }, 5000);
    });
  });

  // Keyboard navigation
  track.addEventListener("keydown", handleKeydown);

  // Handle visibility change
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoRotate();
    } else {
      isAutoRotating = true;
      startAutoRotate();
    }
  });

  // Handle window blur/focus
  window.addEventListener("blur", stopAutoRotate);
  window.addEventListener("focus", () => {
    isAutoRotating = true;
    startAutoRotate();
  });

  // Handle window resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCarousel(currentIndex, false);
    }, 100);
  });

  // Initialize
  createCards();

  // Prevent context menu on right click for better interaction
  track.addEventListener("contextmenu", (e) => e.preventDefault());
});
