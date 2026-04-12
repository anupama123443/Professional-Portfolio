const typingWords = ["Developer", "Designer", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const typingTarget = document.getElementById("typing");
  if (!typingTarget) return;

  const currentWord = typingWords[wordIndex];
  typingTarget.textContent = currentWord.substring(0, charIndex);

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeWriter, 120);
    return;
  }

  if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeWriter, 80);
    return;
  }

  isDeleting = !isDeleting;
  if (!isDeleting) {
    wordIndex = (wordIndex + 1) % typingWords.length;
  }
  setTimeout(typeWriter, isDeleting ? 800 : 1200);
}

typeWriter();

const bodyElement = document.body;
const themeToggleButton = document.getElementById("darkModeToggle");
const savedTheme = localStorage.getItem("portfolioTheme");
if (savedTheme === "dark") {
  bodyElement.classList.add("dark");
}

themeToggleButton?.addEventListener("click", () => {
  bodyElement.classList.toggle("dark");
  localStorage.setItem("portfolioTheme", bodyElement.classList.contains("dark") ? "dark" : "light");
});

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const statusMessage = document.getElementById("status");

  if (window.emailjs?.init) {
    emailjs.init("YOUR_EMAILJS_USER_ID");
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!window.emailjs?.sendForm) {
      statusMessage.textContent = "Email service not loaded yet. Refresh page.";
      return;
    }

    statusMessage.textContent = "Sending message...";
    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", contactForm)
      .then(() => {
        statusMessage.textContent = "Message sent successfully!";
        contactForm.reset();
      })
      .catch(() => {
        statusMessage.textContent = "Unable to send message right now. Please try again.";
      });
  });
}
