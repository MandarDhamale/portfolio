document.addEventListener('DOMContentLoaded', function() {
    // Work experience data
    const workData = {
        'fintech': {
            title: 'Financial Market Analyst',
            company: 'Futures First, The Hertshten Group',
            duration: 'Jan 2023 – Jun 2023',
            icon: 'fa-chart-line',
            bgClass: 'fintech-bg',
            achievements: [
                'Optimized portfolio performance by 19% (vs benchmark of 12%) through execution of diverse strategies (spreads, condors, butterflies) and identified emerging trends, opportunities, risks and drivers within the US Futures Market',
                'Achieved 70% directional accuracy (vs benchmark of 62%) in deploying automated trading strategies using ML models (XG Boost, Time-series) for the commodities team, reduced latency by 20ms for market fluctuations',
                'Implemented effective risk models, reducing potential financial losses by 12% during volatile conditions (Fed Policy events) for the derivatives markets, utilizing stress testing and copula models'
            ]
        },
        'samsung': {
            title: 'Machine Learning Engineer',
            company: 'Samsung Research and Development',
            duration: 'Nov 2021 – Aug 2022',
            icon: 'fa-microchip',
            bgClass: 'samsung-bg',
            achievements: [
                'Designed a k-Means model using MFCC/Spectral Centroid features for voice/noise segmentation in 0.125s audio frames, achieving 87% accuracy in noisy environments (22% above prior benchmarks)',
                'Optimized Voice Activity Detection (VAD) by fine tuning feature extraction, attaining 76% accuracy in speech with music and 94% in speech with pause, reducing false positives by 18%',
                'Deployed TensorRT-optimized VAD model, reducing latency by 40ms (15% faster response), resulting in alignment with product vision and strategy, while focusing on system integration functionalities'
            ]
        },
        'undp': {
            title: 'Data Scientist',
            company: 'United Nations Development Programme',
            duration: 'Aug 2023 – Jun 2024',
            icon: 'fa-globe',
            bgClass: 'undp-bg',
            achievements: [
                'Led a team of student developers to develop a predictive analytics framework using XGBoost, and Gradient Boosting models achieving up to 73.9% accuracy (surpassing a 62% random baseline) to forecast political violence events across 13 countries',
                'Mapped conflict hotspots in Bangladesh via GeoPandas and Tableau, identifying a 6x surge in electoral violence (10 to 65 monthly incidents) in key hotspots prompting targeted UNDP intervention strategies',
                'Carried out root cause analysis using statistical modeling to quantify election disputes (31%) and inter-party tensions (21%) as primary violence drivers thereby shaping UNDP\'s conflict prevention recommendations'
            ]
        },
        'amazon': {
            title: 'Software Developer',
            company: 'Amazon',
            duration: 'Jul 2024 – Present',
            icon: 'fa-cloud',
            bgClass: 'amazon-bg',
            achievements: [
                'Optimized GroceryAdService latency by reducing response times threshold for Whole Foods stores through implementation of DynamoDB TTL (Time to Live) refresh strategy',
                'Enabled real-time product availability checks across thousands of products using AWS Lambda, reducing availability check processing time through intelligent caching mechanisms',
                'Achieved significant annual cost savings in AWS infrastructure by proposing surgical fixes to refresh test data timestamps instead of rebuilding entire pre-compute infrastructure, with solution adopted as team standard'
            ]
        },
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
                observer.unobserve(entry.target); // Just unobserve, don't reset animations
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe the timeline container
    const timelineContainer = document.querySelector('.timeline-container');
    if (timelineContainer) {
        observer.observe(timelineContainer);
    }

    // DOM Elements
    const workCards = document.querySelectorAll('.work-card');
    const modal = document.querySelector('.work-modal');
    const modalOverlay = document.querySelector('.work-modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const achievementsList = document.querySelector('.achievements');
    const modalLogo = document.querySelector('.modal-logo');
    const modalTitle = document.querySelector('.modal-company-info h2');
    const modalCompany = document.querySelector('.modal-company-info h3');
    const modalDuration = document.querySelector('.modal-duration');

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
        achievementsList.innerHTML = '';
        data.achievements.forEach(achievement => {
            const li = document.createElement('li');
            li.textContent = achievement;
            achievementsList.appendChild(li);
        });

        // Show modal with animation
        modalOverlay.style.display = 'block';
        modal.style.display = 'block';
        setTimeout(() => {
            modalOverlay.style.opacity = '1';
            modal.classList.add('active');
        }, 10);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    // Hide modal function
    function hideModal() {
        modal.classList.remove('active');
        modalOverlay.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    // Event Listeners
    workCards.forEach(card => {
        card.addEventListener('click', () => {
            const chatWindow = document.querySelector('.chat-window');
            if (chatWindow && chatWindow.classList.contains('open')) {
              chatWindow.classList.remove('open');
              // Also remove 'expanded' if set
              if (chatWindow.classList.contains('expanded')) {
                chatWindow.classList.remove('expanded');
              }
            }
            const company = card.dataset.company;
            showModal(company);
        });
    });

    modalClose.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', hideModal);

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            hideModal();
        }
    });
});