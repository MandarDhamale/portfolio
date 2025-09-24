document.addEventListener('DOMContentLoaded', function() {
    // AOS Animation Initialization
    AOS.init({
        duration: 800,
        once: true
    });

    // Tab Filtering for Projects
    const tabButtons = document.querySelectorAll('.tab-button');
    const projectCards = document.querySelectorAll('.project-card');

      

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const chatWindow = document.querySelector('.chat-window');
            if (chatWindow && chatWindow.classList.contains('open')) {
              chatWindow.classList.remove('open');
              // Also remove 'expanded' if set
              if (chatWindow.classList.contains('expanded')) {
                chatWindow.classList.remove('expanded');
              }
            }

            // Filter projects based on tab
            const category = this.getAttribute('data-tab');
            projectCards.forEach(card => {
                if (category === 'all') {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.toggle('hidden', !card.getAttribute('data-category').includes(category));
                    card.style.display = category === 'all' || card.getAttribute('data-category').includes(category) ? 'block' : 'none';
                }
            });
        });
    });

    // Ensure all projects are visible on page load
    projectCards.forEach(card => {
        card.classList.remove('hidden');
        card.style.display = 'block';
    });

    // Project Modal Functionality
    const projectModal = document.getElementById('project-modal');
    const modalContent = document.querySelector('.modal-content');
    const closeModal = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-button');
    const prevProject = document.querySelector('.prev-project');
    const nextProject = document.querySelector('.next-project');
    const contactButton = document.querySelector('.contact-button');

    const projects = [
        {
            id: 'silicon-harlem',
            image: 'assets/silicon-harlem.jpg',
            title: 'Silicon Harlem - Business Consulting',
            description: 'As part of Columbia\'s Operations Consulting course (IEOR 4111), I collaborated with Silicon Harlem to develop a comprehensive broadband funding strategy, focusing on grants like BEAD, AHCP, and ACP to enhance digital inclusivity in Harlem. This project involved extensive grant research, partnership strategies, and community impact assessments to ensure sustainable broadband access.',
            category: 'business'
        },
        {
            id: 'discount-brokerages',
            image: 'assets/discount-brokerages.jpg',
            title: 'New Players on the Block: Can India’s Discount Brokerages Sustain Market Share?',
            description: 'Analyzed the competitive dynamics of India’s discount brokerages (e.g., Zerodha, Groww, Upstox) using game theory, assessing their market share sustainability against traditional brokers like ICICI and HDFC Securities. This business strategy project explored innovation, cost structures, and customer value propositions.',
            category: 'business'
        },
        {
            id: 'resy-analysis',
            image: 'assets/resy-analysis.jpg',
            title: 'DineFlow - A Product Analysis',
            description: 'Conducted a product analysis of Resy’s dining reservation platform, focusing on AI-driven personalization, dynamic pricing, and real-time updates, proposing improvements for tech-savvy diners and restaurant managers. This business project reimagined the platform as "DineFlow" for enhanced user experience.',
            category: 'business'
        },
        {
            id: 'zenlock',
            image: 'assets/zenlock.jpg',
            title: 'Lion Tank - ZenLock (Social Media & Attention Economy)',
            description: 'Developed a pitch for ZenLock, a smart shield to reduce screen time, targeting tech-savvy users and schools with RFID/Bluetooth technology, addressing the attention economy’s impact on digital habits. This business project outlined hardware sales, incentives, and school partnerships for monetization.',
            category: 'business'
        },
        {
            id: 'yuan-ze',
            image: 'assets/yuan-ze.jpg',
            title: 'Yuan-Ze University - Research Project',
            description: 'Guided by Prof. Tien-Lung Sun and TA Fernan Patrick Flores, I developed a vision-based system for elderly day care pattern analysis by combining SlowFast and ByteTrack models, using Pandas, OpenCV, and NumPy for data-driven insights. This project aimed to support caregivers with long-term analytics for better decision-making and welfare of the elderly community.',
            category: 'technical'
        },
        {
            id: 'microsoft-teams',
            image: 'assets/microsoft-teams.jpg',
            title: 'Microsoft Engage\'21 - Microsoft Teams Clone',
            description: 'During a 2-month internship in 2021, I built and deployed a Microsoft Teams clone using React, Node.js, Express, Socket.io, and WebRTC, leveraging Microsoft Azure for CI/CD deployment. This technical project showcased my web development and deployment skills, creating a functional communication platform.',
            category: 'technical'
        },
        {
            id: 'presidential-polling',
            image: 'assets/polling-visualization.jpg',
            title: 'Presidential Election Polling - Data Visualization',
            description: 'I created an interactive Power BI dashboard for 2024 U.S. presidential polling data, analyzing voter preferences, favorability ratings, and regional trends using favorability_polls and president_polls datasets. This project utilized Power BI’s dynamic visualizations to provide insights for campaign strategies and public engagement.',
            category: 'technical'
        },
        {
            id: 'resume-parser',
            image: 'assets/resume-parser.jpg',
            title: 'ResumeParser-Classifier System',
            description: 'Built a multi-label classification model using Deep Learning and NLP to classify resumes into IT job categories, integrating a Resume Parser with NER, DNN, CNN, LSTM, and BERT, using Python libraries like TensorFlow and SpaCy. This technical project enhanced job matching efficiency for IT roles.',
            category: 'technical'
        },
        {
            id: 'healthcare-ml',
            image: 'assets/healthcare-ml.jpg',
            title: 'Role of Machine Learning Approaches in Optimization of AI-Based Industry 4.0 Healthcare Management Systems',
            description: 'Researched ML approaches to enhance AI-based healthcare systems, focusing on accuracy in medicine prescription and disease detection, integrating compression and optimization for improved performance. This technical project explored AI, robotics, and automation in healthcare.',
            category: 'technical'
        },
        {
            id: 'iot-optimization',
            image: 'assets/iot-optimization.jpg',
            title: 'Optimization-Based Data Science for an IoT Service Applicable in Smart Cities',
            description: 'Developed an optimized dataset using PSO techniques for IoT services in smart cities, improving prediction performance and decision-making efficiency with simulations for reduced time and enhanced accuracy. This technical project addressed urban IoT challenges.',
            category: 'technical'
        },
        {
            id: 'sentiment-analysis',
            image: 'assets/sentiment-analysis.jpg',
            title: 'Role of Hybrid Optimization in Improving Performance of Sentiment Classification System',
            description: 'Enhanced sentiment analysis on Twitter data using a hybrid model with compression, noise removal, and CNN, improving accuracy and performance for understanding public opinion on social media. This technical project leveraged advanced ML techniques for real-world applications.',
            category: 'technical'
        }
    ];

    let currentProjectIndex = 0;

    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            currentProjectIndex = projects.findIndex(p => p.id === projectId);
            updateModal();
            projectModal.style.display = 'flex';
        });
    });

    closeModal.addEventListener('click', function() {
        projectModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {

          
        if (event.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });

    prevProject.addEventListener('click', function() {
        currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
        updateModal();
    });

    nextProject.addEventListener('click', function() {
        currentProjectIndex = (currentProjectIndex + 1) % projects.length;
        updateModal();
    });

    contactButton.addEventListener('click', function() {
        document.getElementById('nav-contact').click(); // Trigger contact popup
    });

    function updateModal() {
        const project = projects[currentProjectIndex];
        modalContent.querySelector('.modal-image').src = project.image;
        modalContent.querySelector('.modal-image').alt = `${project.title} Detail`;
        modalContent.querySelector('.modal-title').textContent = project.title;
        modalContent.querySelector('.modal-description').textContent = project.description;
    }

    // Load More Functionality (Initially hidden, can be expanded if more projects are added)
    const loadMoreButton = document.querySelector('.load-more');
    let loadedProjects = 12; // Initial number of projects loaded (showing all for now)

    loadMoreButton.addEventListener('click', function() {
        // Simulate adding more projects (you can expand this logic)
        loadedProjects += 4;
        if (loadedProjects >= projects.length) {
            loadMoreButton.style.display = 'none';
        }
        // Here, you would dynamically add more project cards; for now, we’ll keep all visible
        projectCards.forEach(card => card.style.display = 'block');
    });

    // Initial display of projects (all visible)
    projectCards.forEach(card => card.style.display = 'block');
});