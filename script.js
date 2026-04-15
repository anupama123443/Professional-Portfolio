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

  emailjs.init("qajuieq6R1D_McwDv");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  statusMessage.textContent = "Sending message...";

  emailjs.send("service_1nfjo3u", "template_utqbqdj", {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  })
  .then(() => {
    statusMessage.textContent = "Message sent successfully ✅";
    contactForm.reset();
  })
  .catch((error) => {
    console.error(error);
    statusMessage.textContent = "Error sending message ❌";
  });
});

}
