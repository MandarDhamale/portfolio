document.addEventListener("DOMContentLoaded", function () {
  const terminalContent = document.querySelector(".terminal-content");
  let isTyping = false;

 

 const commandSequence = [
    {
      command: "Welcome! Thanks for taking the time to check out my website.",
      output: "", // No output for welcome message
      type: "intro",
    },
    {
      command: "about_me",
      output: `• My name is Mandar Dhamale.
• I am a Master's student in Computer Science at the University of South Florida and a Research Assistant focusing on neural networks for medical imaging.
• I previously worked as a Software Development Engineer, where I built and scaled backend modules for a major SaaS platform.`,
    },
    {
      command: "current_strengths",
      output: `• Core Strengths: Java, Python, Spring Boot, SQL, REST APIs, System Design, Git.
• Machine Learning: TensorFlow, Keras, Pandas, scikit-learn.
• Cloud & DevOps: Docker, AWS, Kubernetes, Kafka.
• A passion for building robust, data-driven applications and solving complex problems with machine learning.

Always looking to connect with fellow tech enthusiasts!`,
    },
  ];
  
  async function typeText(text, className = "terminal-output", speed = 10) {
    if (isTyping) return;
    isTyping = true;

    const line = document.createElement("div");
    line.className = className;
    terminalContent.appendChild(line);

    for (let char of text) {
      line.textContent += char;
      await new Promise((resolve) => setTimeout(resolve, speed));
    }

    isTyping = false;
  }

  async function executeCommand(command, output, type = "command") {
    if (type === "intro") {
      await typeText(command, "terminal-intro", 10);
    } else {
      await typeText("mandar@portfolio:~$ " + command, "terminal-command", 10);
      await new Promise((resolve) => setTimeout(resolve, 100));
      await typeText(output, "terminal-output", 10);
    }
    await new Promise((resolve) => setTimeout(resolve, 1800));
  }

  async function startTerminal() {
    const terminal = document.querySelector(".terminal-container");
    terminal.classList.add("fade-in");

    for (const cmd of commandSequence) {
      await executeCommand(cmd.command, cmd.output, cmd.type);
    }
  }

  // Start terminal when section becomes visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const terminal = entry.target.querySelector(".terminal-container");
          if (terminal) {
            startTerminal();
            observer.unobserve(entry.target);
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  const aboutSection = document.querySelector(".about-section");
  if (aboutSection) {
    observer.observe(aboutSection);
  }
});
