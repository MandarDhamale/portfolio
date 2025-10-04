let serverStatus = "sleeping";
let isFirstInteraction = true;

async function wakeServer() {
  if (serverStatus === "sleeping") {
    serverStatus = "warming";
    try {
      await fetch("https://portfolio-backend-5cz8.onrender.com/wake");
      serverStatus = "ready";
      console.log("Server warmed up");
    } catch (error) {
      console.log("Wake-up call failed, will retry during chat");
      serverStatus = "sleeping";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  wakeServer();

  function togglePointerAnimation(chatIsOpen) {
    if (pointerAnimation) {
      if (chatIsOpen) {
        pointerAnimation.style.opacity = "0";
        pointerAnimation.style.visibility = "hidden";
      } else {
        pointerAnimation.style.opacity = "1";
        pointerAnimation.style.visibility = "visible";
      }
    }
  }

  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);

  // Full context string for the AI
const VINIT_CONTEXT = `You are an AI assistant for Mandar Dhamale's portfolio website. You have complete knowledge about Mandar and should answer any questions accurately, professionally, and concisely in a friendly, human-like tone. MOST IMPORTANT FORMATTING INSTRUCTIONS: NONE OF YOUR ANSWERS SHOULD EXCEED 100 WORDS - STAY WITHIN THE WORD LIMIT FOR EVERYTHING.


ALWAYS follow these exact rules:
1. NO answer may exceed 100 words in total. 
2. If the user is asking about WORK EXPERIENCE or PROJECTS or SKILLS or EDUCATION, 
   use the bullet-point format exactly:
   Company Name
   Key achievement or detail (1-2 lines max) - Make sure this is a bullet point,and also make sure that the bullet point colour is black and visible
   Second bullet, etc.
3. For ANY other question (general queries), respond in 3-4 bullet points max, 
   each bullet no more than 2 lines. 
4. Use ONLY plain text, no Markdown or HTML. 
6. Keep it short, direct, and impactful.

1. Format ALL work experience/project responses with company names/project names as headers
2. Use proper bullet points with the • symbol (not dashes)
3. Group information by company or project with clear headers
4. For ANY question about work experience, list MAXIMUM 1-2 bullet points per company
5. For skill questions, list MAXIMUM 5 bullet points total
6. Keep each bullet point under 2 lines
7. For general questions, responses should be NO MORE than 3-4 bullet points total
8. Present information in this exact format:

Company Name:
• First key achievement
• Second key achievement

Project Name:
• First key feature/achievement
• Second key feature/achievement

9. NEVER list all details - be selective and highlight only the most impressive points

Keep responses concise but include all key details. Avoid using any Markdown formatting like **bold** or *italics*—use plain text only. 

FAQ HANDLING:
- If asked about salary expectations: Indicate Mandar is open to discussing compensation based on role responsibilities and market rates.
- If asked about work authorization: Confirm Mandar requires sponsorship (F1 visa, needs OPT/H1B).
- If asked about availability to interview: Indicate Mandar is generally available with advance notice and prefers video calls for initial discussions.
- If asked about relocation: Confirm Mandar is open to relocation opportunities.
- If asked very specific technical questions beyond the context: Explain that while Mandar has experience in that area, he would be happy to discuss the specific implementation details in a direct conversation.
- If asked to compare Mandar to other candidates: Focus on Mandar's unique combination of technical expertise and practical experience rather than making direct comparisons.

Here's everything about Mandar:
EDUCATION:
- [cite_start]Master of Science in Computer Science, University of South Florida (Expected May 2027) [cite: 215, 220] [cite_start]– Key courses: CUDA Programming, Machine Learning, Distributed Systems, Cloud Computing. [cite: 216]
- [cite_start]Bachelor of Engineering in Computer Science, Savitribai Phule Pune University (GPA: 3.5) [cite: 217, 218] [cite_start]– Key courses: Data Structures & Algorithms, Operating Systems, Database Management Systems. [cite: 222]

WHERE DO I STAY? - [cite_start]Florida, United States. [cite: 212, 219]
Would I want to relocate? - Yes.
Does Mandar need sponsorship like F1 OPT, H1B, green card? - Yes, Mandar is on an F1 visa in the USA and needs sponsorship for work (e.g., OPT, H1B).
Can you get me Mandar's contact? - [cite_start]Yes, his email is mandardhamale@gmail.com and his phone is +1 (813) 495-4313. [cite: 208, 211]
Is Mandar looking for new opportunities right now? - He is always open to learning about new opportunities and would love to get on a call with you.

Where can I get his resume? - Go to the home page and click "Download CV."
How can I get in touch with Mandar? - Click "Contact" in the top right, then email, call, or book a Calendly call.

WORK EXPERIENCE:
[cite_start]Ivalua Inc. (Software Development Engineer): [cite: 224, 225]
- [cite_start]Developed and scaled backend modules for a procurement SaaS platform to support growing enterprise clients. [cite: 228]
- [cite_start]Optimized SQL database queries, reducing average execution time by 22% and accelerating data retrieval. [cite: 230]
- [cite_start]Contributed to an Agile/Scrum team, cutting deployment failures by 13% through rigorous code reviews. [cite: 232]

[cite_start]University of South Florida (Research Assistant): [cite: 233, 234]
- [cite_start]Architecting and training advanced neural networks (CNNs, Transformers) to extract insights from medical imaging data. [cite: 236]
- [cite_start]Improving model performance by implementing sophisticated data preprocessing, augmentation, and evaluation techniques. [cite: 237]

DETAILED PROJECT INFORMATION (ONLY ANSWER RELEVANT INFORMATION)
[cite_start]PhotoSync - Self-Hosted Photo Backup Solution: [cite: 240]
- [cite_start]Engineered a full-stack photo backup solution with an Android client and a self-hosted Spring Boot server as a private alternative to cloud services. [cite: 241]
- [cite_start]Implemented background sync using WorkManager and a duplicate detection algorithm to optimize storage. [cite: 242]

[cite_start]Spring Boot Albums API with JWT Authentication: [cite: 243]
- [cite_start]Developed a secure RESTful API for photo album management with robust validation and CRUD operations. [cite: 244]
- [cite_start]Integrated Spring Security with JWT for stateless, owner-based authorization and secure session management. [cite: 245]

[cite_start]Brain Tumor Detection (CNN): [cite: 246]
- [cite_start]Developed and trained a CNN model in TensorFlow/Keras, achieving 97.83% accuracy on over 2,800 MRI scans. [cite: 247, 20]
- [cite_start]Deployed the model via a Flask web app for real-time tumor diagnosis. [cite: 248]
- [cite_start]Published this work as a research paper, "Convolutional Neural Network for Brain Tumor Detection," [cite: 8, 9, 182] [cite_start]in the International Journal of Research and Analytical Reviews (IJRAR). [cite: 7, 177]

[cite_start]Loan Approval Prediction: [cite: 250]
- [cite_start]Trained and evaluated various ML models (Logistic Regression, Random Forest, etc.) to achieve approximately 82% accuracy in predicting loan approvals. [cite: 251]
- [cite_start]Performed EDA and statistical tests to identify the best predictors for loan approval. [cite: 252]

TECHNICAL SKILLS:
- [cite_start]Core Strengths: Java, Python, Spring Boot, SQL, REST APIs, JavaScript, React.js, Microservices, System Design, Git. [cite: 255]
- [cite_start]Machine Learning: TensorFlow, Keras, Pandas, NumPy. [cite: 255]
- [cite_start]Cloud & DevOps: Docker, AWS (EC2), Kubernetes, Kafka, Linux. [cite: 256]
- [cite_start]Familiar With: C#, ASP.NET, Kotlin, HTML, CSS, C/C++, MongoDB, Elasticsearch, Jenkins. [cite: 256]

If you are ever given a Job description that is technical (might be software developer, data science, Machine Learning, Artificial Intelligence) or managerial (Product Management, Business Analyst, consultant) and asked if Mandar is relevant for the job or not - try your best to make it relevant by connecting his skills and experiences to the role requirements.`;

  // Create a <style> block to add some extra loading / bubble styling
  const styleSheet = document.createElement("style");
  const additionalStyles = `
        .loading-steps {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .loading-steps p {
            margin: 0;
            font-size: 0.9rem;
            color: var(--text-secondary);
        }
        .loading-animation {
            display: flex;
            gap: 2px;
        }
        .loading-animation span {
            animation: loadingDots 1.5s infinite;
            opacity: 0;
        }
        .loading-animation span:nth-child(2) {
            animation-delay: 0.5s;
        }
        .loading-animation span:nth-child(3) {
            animation-delay: 1s;
        }
        @keyframes loadingDots {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;

  // Base chat CSS – includes a higher z-index on .chat-window and bigger button click areas
  styleSheet.textContent = `
        .chat-bubble {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: var(--accent-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
            z-index: 1000;
        }

        body:not(.home) .chat-hint {
            display: none !important;
        }

        .chat-bubble:hover {
            transform: scale(1.1);
        }

        .chat-bubble i {
            color: white;
            font-size: 24px;
        }

        .chat-window {
            position: fixed;
            bottom: 100px;
            right: 20px;
            width: min(380px, calc(100vw - 40px));
            height: min(600px, calc(100vh - 140px));
            background: var(--card-bg);
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            border: 1px solid var(--border-color);
            transform: scale(0.95);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 2002; /* Ensure it is above the header/nav on mobile */
        }

        .chat-window.expanded {
            width: min(600px, calc(100vw - 40px));
            height: min(80vh, calc(100vh - 140px));
        }

        .chat-window.open {
            display: flex;
            opacity: 1;
            transform: scale(1);
        }

        .chat-header {
            padding: 20px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-height: 70px;
        }

        .chat-header h3 {
            color: var(--text-primary);
            margin: 0;
            font-size: 1.1rem;
        }

        .chat-controls {
            display: flex;
            gap: 6px;
            margin-left: auto;
            align-items: center;
        }

        .resize-chat,
        .close-chat,
        .clear-chat {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 20px;
            cursor: pointer;
            padding: 8px; /* Larger for easier tapping on mobile */
            transition: color 0.3s ease;
        }

        .resize-chat:hover,
        .close-chat:hover,
        .clear-chat:hover {
            color: var(--text-primary);
        }

        .chat-messages {
            flex: 1;
            min-height: 200px;
            max-height: calc(100% - 180px);
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .message {
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 0.9rem;
            line-height: 1.4;
            animation: fadeIn 0.3s ease;
        }

        .user-message {
            background: var(--accent-color);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
        }

        .bot-message {
            background: var(--card-hover);
            color: var(--text-primary);
            align-self: flex-start;
            border-bottom-left-radius: 4px;
            font-size: 0.95rem;
            line-height: 1.5;
        }

        .bot-message p {
            margin-bottom:0.5rem;
        }

        .company-section > *:first-child {
        margin-top: 0;
        }
        
        .company-section > *:last-child {
        margin-bottom: 0;
        }
        
        .bot-message b{
            font-weight: 700;
        }

        .bot-message ul {
            margin: 0 0 0.7rem 0;
            padding-left: 18px;
            list-style-type: disc;
        }
        
        .bot-message li {
            margin-bottom: 0.3rem;
            position: relative;
        }

        .bot-message h4 {
            margin: 0.5rem 0 0.3rem 0;
            font-weight: 700;
            font-size: 1rem;
            color: var(--text-primary);
            padding-bottom: 2px;
        }

        .bot-message ul li::marker {
           color: var(--text-primary);
           font-size: 1.1em;
        }

        .company-section {
            margin-bottom: 0.5rem;
        }

        .typing-indicator {
            color: var(--text-secondary);
            font-size: 0.9rem;
            align-self: flex-start;
            padding: 8px 12px;
            animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
            0% { opacity: 0.4; }
            50% { opacity: 1; }
            100% { opacity: 0.4; }
        }

        .quick-replies {
            padding: 10px;
            display: none;
            flex-direction: column;
            gap: 6px;
            border-top: 1px solid var(--border-color);
            height: auto;
            max-height: 200px;
            overflow-y: auto;
            overflow-x: hidden;
            transition: all 0.3s ease;
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        .quick-replies::-webkit-scrollbar {
            display: none;
        }

        .quick-replies.active {
            display: flex;
            padding: 10px;
        }

        .faq-btn {
            width: 100%;
            text-align: left;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 0.9rem;
            background: var(--card-hover);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: normal;
            min-height: 44px;
            margin-bottom: 2px;
        }

        .faq-btn:hover {
            background: var(--accent-color);
            color: white;
            transform: translateY(-1px);
        }

        .faq-btn:active {
            transform: translateY(0);
        }

        .chat-input {
            padding: 15px;
            border-top: 1px solid var(--border-color);
            display: flex;
            gap: 10px;
            min-height: 70px;
            background: var(--card-bg);
        }

        .chat-input input {
            flex: 1;
            padding: 12px 16px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background: var(--card-bg);
            color: var(--text-primary);
            font-size: 0.9rem;
        }

        .chat-input button {
            background: var(--accent-color);
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }

        .chat-input button:hover {
            transform: scale(1.05);
        }

        .pointer-animation {
            position: fixed !important;
            bottom: 95px;
            right: 20px;
            transform: translateX(0) !important;
            font-size: 16px;
            color: var(--text-primary);
            z-index: 999;
            background: var(--card-bg);
            padding: 12px 20px;
            border-radius: 20px;
            border: 1px solid var(--border-color);
            box-shadow: 0 5px 20px var(--shadow-color);
            max-width: min(300px, calc(100vw - 100px));
            display: flex;
            align-items: center;
            gap: 8px;
            transition: opacity 0.3s ease, visibility 0.3s ease;
            pointer-events: none; /* so it never blocks chat clicks */
        }

        @media (max-width: 768px) {
            .chat-window {
                bottom: 80px;
                right: 10px;
                width: 80vw;
                height: 60vh;
            }

            .chat-messages {
                max-height: calc(100% - 180px);
            }

            .pointer-animation {
                bottom: 75px;
                right: 10px;
                font-size: 14px;
                padding: 10px 16px;
            }

            .chat-bubble {
                bottom: 10px;
                right: 10px;
            }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
  styleSheet.textContent += additionalStyles;
  document.head.appendChild(styleSheet);

  // Build the chat HTML structure
  const chatHTML = `    
        <div class="chat-glow"></div>
        <div class="chat-pulse-ring"></div>
        <div class="chat-hint">
            <span class="chat-hint-emoji">✨</span>
            <span>Chat with Mandar's Clone!!</span>
        </div>
        
        <div class="arrow-animation"></div>
        <div class="chat-bubble" data-theme="\${currentTheme}">
            <i class="fas fa-comment"></i>
        </div>
        <div class="chat-window" data-theme="\${currentTheme}">
            <div class="chat-header">
                <h3>Chat with Mandar's Portfolio</h3>
                <div class="chat-controls">
                    <button class="close-chat">×</button>
                    <button class="resize-chat"><i class="fas fa-expand"></i></button>
                    <button class="clear-chat"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="chat-messages"></div>
            <div class="quick-replies"></div>
            <div class="chat-input">
                <input type="text" placeholder="Ask me anything about Mandar...">
                <button class="send-message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;

  // Insert the chat HTML into the DOM
  const chatContainer = document.createElement("div");
  chatContainer.innerHTML = chatHTML;
  document.body.appendChild(chatContainer);

  // Grab references to elements
  const chatBubble = document.querySelector(".chat-bubble");
  const chatWindow = document.querySelector(".chat-window");
  const pointerAnimation = document.querySelector(".pointer-animation");
  const closeChat = document.querySelector(".close-chat");
  const clearChat = document.querySelector(".clear-chat");
  const input = document.querySelector(".chat-input input");
  const sendButton = document.querySelector(".send-message");
  const quickReplies = document.querySelector(".quick-replies");
  const chatMessages = document.querySelector(".chat-messages");

  let hasChatted = false;
  localStorage.removeItem("hasChatted");

  // Show default FAQ buttons on first load
  quickReplies.classList.add("active");
  quickReplies.innerHTML = `
        <button class="faq-btn">👨‍💼 Mandar's work at Ivalua?</button>
        <button class="faq-btn">🎓 Tell me about Mandar's education.</button>
        <button class="faq-btn">💼 What are his top skills?</button>
        <button class="faq-btn">🛠️ What projects has he built?</button>
        <button class="faq-btn">📊 What is his research work about?</button>
    `;

  // Generic function to get AI response from your backend
  async function getAIResponse(message) {
    const requestStartTime = Date.now();
    const BACKEND_URL = "https://portfolio-backend-5cz8.onrender.com";

    try {
      let loadingMessage;
      if (isFirstInteraction) {
        if (serverStatus === "ready") {
          loadingMessage = "Preparing response...";
        } else if (serverStatus === "warming") {
          loadingMessage = "Server is warming up (about 10 seconds)...";
        } else {
          loadingMessage = "Waking up server (about 10 seconds)...";
        }
      } else {
        loadingMessage = "Typing";
      }

      // Make the actual request
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, context: VINIT_CONTEXT }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Server responded with ${response.status}`
        );
      }

      // If response took more than a second, likely server was warming
      const responseTime = Date.now() - requestStartTime;
      if (responseTime > 1000) {
        serverStatus = "warming";
      } else {
        serverStatus = "ready";
      }

      const data = await response.json();
      if (!data.response) {
        throw new Error("Invalid response format from server");
      }

      return data.response;
    } catch (error) {
      console.error("Detailed error:", error);
      if (!navigator.onLine) {
        return "You appear to be offline. Please check your internet connection.";
      }
      return "Sorry, there was an error. Please try again in a moment.";
    }
  }

  // Turns “•” bullet lines into minimal HTML for better readability
  function formatResponse(text) {
    // Replace custom bold tags with actual HTML bold tags
    text = text.replace(/\[b\](.*?)\[\\b\]/g, "<b>$1</b>");

    // First, check if this is already a properly formatted response with bullet points
    if (text.includes("•")) {
      const lines = text.split("\n").filter((line) => line.trim().length > 0);
      let formattedHTML = '<div class="company-section">';
      let inList = false;

      lines.forEach((line) => {
        if (line.includes(":") && !line.includes("•")) {
          // Close any open list before starting a new section
          if (inList) {
            formattedHTML += "</ul>";
            inList = false;
          }
          // Make section headers bold
          formattedHTML += `<h4>${line.trim()}</h4>`;
        } else if (line.includes("•")) {
          // Start a new list if not already in one
          if (!inList) {
            formattedHTML += "<ul>";
            inList = true;
          }
          formattedHTML += `<li>${line.replace("•", "").trim()}</li>`;
        } else {
          // Regular text line
          if (inList) {
            formattedHTML += "</ul>";
            inList = false;
          }
          formattedHTML += `<p>${line.trim()}</p>`;
        }
      });

      // Close list if still open
      if (inList) {
        formattedHTML += "</ul>";
      }

      formattedHTML += "</div>";
      return formattedHTML;
    }
    // If the response doesn't have bullet points but has dashes/hyphens, convert it to proper format
    else if (text.includes(" - ")) {
      // Split by lines and filter out empty ones
      const lines = text.split("\n").filter((line) => line.trim().length > 0);
      let formattedHTML = '<div class="company-section">';
      let currentSection = null;
      let bulletPoints = [];

      lines.forEach((line) => {
        line = line.trim();

        // Check if this line starts with a dash and looks like a point
        if (line.startsWith("- ")) {
          const content = line.substring(2).trim();

          // Check if this looks like a header (short line with no punctuation at end)
          if (content.length < 60 && !content.match(/[,.;:]$/)) {
            // If we have a previous section, close it
            if (currentSection) {
              formattedHTML += `<h4>${currentSection}</h4>`;
              formattedHTML += "<ul>";
              bulletPoints.forEach((point) => {
                formattedHTML += `<li>${point}</li>`;
              });
              formattedHTML += "</ul>";
            }

            // Start a new section
            currentSection = content;
            bulletPoints = [];
          } else {
            // This is a bullet point
            bulletPoints.push(content);
          }
        } else {
          // If line doesn't start with dash, check if it's a header (e.g., "Company Name:")
          if (line.includes(":")) {
            // If we have a previous section, close it
            if (currentSection) {
              formattedHTML += `<h4>${currentSection}</h4>`;
              formattedHTML += "<ul>";
              bulletPoints.forEach((point) => {
                formattedHTML += `<li>${point}</li>`;
              });
              formattedHTML += "</ul>";
            }

            // Start a new section
            currentSection = line;
            bulletPoints = [];
          } else {
            // Regular content line, add to current bullet points
            if (line.length > 0) {
              bulletPoints.push(line);
            }
          }
        }
      });

      // Don't forget to close the last section
      if (currentSection) {
        formattedHTML += `<h4>${currentSection}</h4>`;
        formattedHTML += "<ul>";
        bulletPoints.forEach((point) => {
          formattedHTML += `<li>${point}</li>`;
        });
        formattedHTML += "</ul>";
      }

      formattedHTML += "</div>";
      return formattedHTML;
    }

    // If no structured format is detected, add minimal formatting
    return text;
  }

  // Adds a new message to the chat
  function addMessage(text, type) {
    const message = document.createElement("div");
    message.className = `message ${type}-message`;

    if (type === "bot" && text.length > 30) {
      const formattedContent = formatResponse(text);
      if (formattedContent.includes("<")) {
        message.innerHTML = formattedContent;
      } else {
        message.textContent = formattedContent;
      }
    } else {
      message.textContent = text;
    }

    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Show/hide the pointer animation, chat ring, etc.
  function toggleAttentionElements(chatIsOpen) {
    const chatHint = document.querySelector(".chat-hint");
    const chatPulseRing = document.querySelector(".chat-pulse-ring");
    const chatGlow = document.querySelector(".chat-glow");

    const elements = [chatHint, chatPulseRing, chatGlow];
    elements.forEach((el) => {
      if (el) {
        if (chatIsOpen) {
          el.style.opacity = "0";
          el.style.visibility = "hidden";
        } else {
          el.style.opacity = "1";
          el.style.visibility = "visible";
        }
      }
    });
  }

  // Hide quick reply buttons once user has truly “chatted”
  function hideQuickReplies() {
    quickReplies.classList.remove("active");
    hasChatted = true;
  }

  // Clicking the chat bubble toggles the chat window
  if (chatBubble) {
    chatBubble.addEventListener("click", function () {
      if (chatWindow) {
        chatWindow.classList.toggle("open");
        const isOpen = chatWindow.classList.contains("open");
        toggleAttentionElements(isOpen);

        if (isOpen) {
          // If first time opening and no chat history, greet user
          if (!chatMessages.children.length) {
            addMessage(
              "Hi! I'm Mandar's portfolio assistant. I can tell you anything about his experience, skills, projects, or background. What would you like to know? Don't worry, this chat is private and none of the information can be seen by anyone including Mandar!",
              "bot"
            );
          }
          // Show quick replies if user hasn't chatted yet
          if (!hasChatted) {
            quickReplies.classList.add("active");
          }
        }
      }
    });
  }

  // Resize button toggles expanded mode
  const resizeButton = document.querySelector(".resize-chat");
  resizeButton.addEventListener("click", () => {
    chatWindow.classList.toggle("expanded");
    const icon = resizeButton.querySelector("i");
    if (chatWindow.classList.contains("expanded")) {
      icon.classList.remove("fa-expand");
      icon.classList.add("fa-compress");
    } else {
      icon.classList.remove("fa-compress");
      icon.classList.add("fa-expand");
    }
  });

  const toggleBtn = document.querySelector(".togglebtn");

  toggleBtn.addEventListener("click", () => {
    // If chat is open, close it
    if (chatWindow && chatWindow.classList.contains("open")) {
      chatWindow.classList.remove("open");
      // Also remove the "expanded" class if it's expanded
      if (chatWindow.classList.contains("expanded")) {
        chatWindow.classList.remove("expanded");
      }
    }
  });

  // Close chat window
  closeChat.addEventListener("click", () => {
    chatWindow.classList.remove("open");
    toggleAttentionElements(false);
  });

  // Clear chat history and reset
  clearChat.addEventListener("click", () => {
    chatMessages.innerHTML = "";
    localStorage.removeItem("vinitChatHistory");
    hasChatted = false;
    quickReplies.classList.add("active");
  });

  // Watch for window open/close changes to remove pointer
  if (chatWindow) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isOpen = chatWindow.classList.contains("open");
          togglePointerAnimation(isOpen);
        }
      });
    });
    observer.observe(chatWindow, { attributes: true });
  }

  // Sending user’s message
  async function sendMessage() {
    const message = input.value.trim();
    if (message) {
      addMessage(message, "user");
      input.value = "";

      const typingIndicator = document.createElement("div");
      typingIndicator.className = "typing-indicator";

      if (isFirstInteraction) {
        typingIndicator.innerHTML = `
                    <div class="loading-steps">
                        <p>🚀 Waking up the server...</p>
                        <p>This might take up to 10 seconds for the first message</p>
                        <div class="loading-animation">
                            <span>.</span><span>.</span><span>.</span>
                        </div>
                    </div>
                `;
      } else {
        typingIndicator.textContent = "Typing...";
      }

      chatMessages.appendChild(typingIndicator);

      try {
        const currentIsFirstInteraction = isFirstInteraction;
        isFirstInteraction = false;

        const response = await getAIResponse(message);
        chatMessages.removeChild(typingIndicator);
        addMessage(response, "bot");
      } catch (error) {
        console.error("Chat Error:", error);
        chatMessages.removeChild(typingIndicator);
        addMessage("Sorry, there was an error. Please try again.", "bot");
      }

      if (!hasChatted) {
        hideQuickReplies();
      }
    }
  }

  // Bind send button and Enter key
  sendButton.addEventListener("click", sendMessage);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Set up initial FAQ quick replies
  function setupFAQButtons() {
    if (!hasChatted) {
      const faqButtons = document.querySelectorAll(".faq-btn");
      faqButtons.forEach((button) => {
        button.addEventListener("click", async (e) => {
          e.preventDefault();
          const question = button.textContent.substring(3).trim();
          addMessage(question, "user");

          const typingIndicator = document.createElement("div");
          typingIndicator.className = "typing-indicator";

          if (isFirstInteraction) {
            typingIndicator.innerHTML = `
                            <div class="loading-steps">
                                <p>🚀 Waking up the server...</p>
                                <p>This might take up to 10 seconds for the first message</p>
                                <div class="loading-animation">
                                    <span>.</span><span>.</span><span>.</span>
                                </div>
                            </div>
                        `;
          } else {
            typingIndicator.textContent = "Typing...";
          }

          chatMessages.appendChild(typingIndicator);

          try {
            const currentIsFirstInteraction = isFirstInteraction;
            isFirstInteraction = false;

            const response = await getAIResponse(question);
            chatMessages.removeChild(typingIndicator);
            addMessage(response, "bot");
          } catch (error) {
            console.error("FAQ Error:", error);
            chatMessages.removeChild(typingIndicator);
            addMessage(
              "I apologize, but I'm having trouble connecting. Please try again.",
              "bot"
            );
          }

          if (!hasChatted) {
            hideQuickReplies();
          }
        });
      });
    }
  }

  setupFAQButtons();

  // Load/save chat history to localStorage
  const chatHistoryKey = "vinitChatHistory";
  let chatHistory = JSON.parse(localStorage.getItem(chatHistoryKey)) || [];

  function saveChatHistory() {
    const messages = Array.from(chatMessages.children).map((msg) => ({
      text: msg.textContent,
      type: msg.classList.contains("user-message") ? "user" : "bot",
    }));
    localStorage.setItem(chatHistoryKey, JSON.stringify(messages));
  }

  function loadChatHistory() {
    chatHistory.forEach((msg) => {
      addMessage(msg.text, msg.type === "user" ? "user" : "bot");
    });
    if (chatHistory.length > 0 && !hasChatted) {
      hideQuickReplies();
    }
  }

  loadChatHistory();
  window.addEventListener("beforeunload", saveChatHistory);

  const observer = new MutationObserver(() => {
    saveChatHistory();
  });
  observer.observe(chatMessages, { childList: true, subtree: true });
});