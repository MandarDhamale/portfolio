document.addEventListener("DOMContentLoaded", function () {
  // Work experience data
  const workData = {
    fintech: {
      title: "Financial Market Analyst",
      company: "Futures First, The Hertshten Group",
      duration: "Jan 2023 – Jun 2023",
      icon: "fa-chart-line",
      bgClass: "fintech-bg",
      achievements: [
        "Optimized portfolio performance by 19% (vs benchmark of 12%) through execution of diverse strategies (spreads, condors, butterflies) and identified emerging trends, opportunities, risks and drivers within the US Futures Market",
        "Achieved 70% directional accuracy (vs benchmark of 62%) in deploying automated trading strategies using ML models (XG Boost, Time-series) for the commodities team, reduced latency by 20ms for market fluctuations",
        "Implemented effective risk models, reducing potential financial losses by 12% during volatile conditions (Fed Policy events) for the derivatives markets, utilizing stress testing and copula models",
      ],
    },
    samsung: {
      title: "Software Development Engineer",
      company: "Ivalua Inc.",
      duration: "October 2022 – August 2025",
      icon: "fa-terminal",
      bgClass: "samsung-bg",
      achievements: [
        "Engineered and scaled core backend microservices using Java Spring Boot, supporting 23% user growth and 100,000+ daily transactions",
        "Designed RESTful API integrations for automated supplier onboarding, reducing processing time from 2 days to under 4 hours, saving 20+ manual hours per week",
        "Optimized complex SQL queries and database schemas, reducing execution time by 16% and improving analytics dashboard performance",
        "Improved supplier dashboard performance with front-end caching and optimized API payloads, decreasing page load time by 1.2s",
        "Shipped high-quality code for 5+ major annual releases and mentored 2 intern engineers",
      ],
    },
    undp: {
      title: "Research Assistant",
      company: "University of South Florida",
      duration: "September 2025 – Present",
      icon: "fa-book",
      bgClass: "undp-bg",
      achievements: [
        "Architected multi-modal machine and deep learning systems using MRI scans and EHR data for complex diagnostic and prognostic tasks",
        "Improved model accuracy and generalization by 15% over baseline by applying advanced data augmentation and systematic hyperparameter tuning",
        "Collaborated on research by surveying and reproducing 10+ academic papers to establish performance benchmarks and validate experimental findings",
      ],
    },
    // ADDED THIS NEW ENTRY
    pes_mcoe: {
      title: "Web Developer",
      company: "P.E.S Modern College of Engineering",
      duration: "March 2019 – May 2019",
      icon: "fa-code", // A more fitting icon
      bgClass: "pes-mcoe-bg", // A unique background class
      achievements: [
        "Developed and launched a new departmental website using HTML, CSS, and JavaScript, improving information accessibility for students.",
        "Collaborated with faculty to create an online portal for course material distribution, reducing paper usage by 40%.",
        "Implemented a responsive design, ensuring the website was fully functional and user-friendly across desktop and mobile devices.",
      ],
    },
    amazon: {
      title: "Research Assistant",
      company: "University of South Florida",
      duration: "September 2025 – Present",
      icon: "fa-book",
      bgClass: "amazon-bg",
      achievements: [
        "Optimized GroceryAdService latency by reducing response times threshold for Whole Foods stores through implementation of DynamoDB TTL (Time to Live) refresh strategy",
        "Enabled real-time product availability checks across thousands of products using AWS Lambda, reducing availability check processing time through intelligent caching mechanisms",
        "Achieved significant annual cost savings in AWS infrastructure by proposing surgical fixes to refresh test data timestamps instead of rebuilding entire pre-compute infrastructure, with solution adopted as team standard",
      ],
    },
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.visibility = "visible";
          observer.unobserve(entry.target); // Just unobserve, don't reset animations
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  // Observe the timeline container
  const timelineContainer = document.querySelector(".timeline-container");
  if (timelineContainer) {
    observer.observe(timelineContainer);
  }

  // DOM Elements
  const workCards = document.querySelectorAll(".work-card");
  const modal = document.querySelector(".work-modal");
  const modalOverlay = document.querySelector(".work-modal-overlay");
  const modalClose = document.querySelector(".modal-close");
  const achievementsList = document.querySelector(".achievements");
  const modalLogo = document.querySelector(".modal-logo");
  const modalTitle = document.querySelector(".modal-company-info h2");
  const modalCompany = document.querySelector(".modal-company-info h3");
  const modalDuration = document.querySelector(".modal-duration");

  // Show modal function
  function showModal(company) {
    const data = workData[company];

    // Update modal content
    modalLogo.innerHTML = `<i class="fas ${data.icon}"></i>`;
    modalLogo.className = `modal-logo ${data.bgClass}`;
    modalTitle.textContent = data.title;
    modalCompany.textContent = data.company;
    modalDuration.textContent = data.duration;

    // Clear and populate achievements
    achievementsList.innerHTML = "";
    data.achievements.forEach((achievement) => {
      const li = document.createElement("li");
      li.textContent = achievement;
      achievementsList.appendChild(li);
    });

    // Show modal with animation
    modalOverlay.style.display = "block";
    modal.style.display = "block";
    setTimeout(() => {
      modalOverlay.style.opacity = "1";
      modal.classList.add("active");
    }, 10);

    // Prevent body scroll
    document.body.style.overflow = "hidden";
  }

  // Hide modal function
  function hideModal() {
    modal.classList.remove("active");
    modalOverlay.style.opacity = "0";

    setTimeout(() => {
      modal.style.display = "none";
      modalOverlay.style.display = "none";
      document.body.style.overflow = "";
    }, 300);
  }

  // Event Listeners
  workCards.forEach((card) => {
    card.addEventListener("click", () => {
      const chatWindow = document.querySelector(".chat-window");
      if (chatWindow && chatWindow.classList.contains("open")) {
        chatWindow.classList.remove("open");
        // Also remove 'expanded' if set
        if (chatWindow.classList.contains("expanded")) {
          chatWindow.classList.remove("expanded");
        }
      }
      const company = card.dataset.company;
      showModal(company);
    });
  });

  modalClose.addEventListener("click", hideModal);
  modalOverlay.addEventListener("click", hideModal);

  // Close modal on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      hideModal();
    }
  });
});