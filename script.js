function toggleIngredients(button) {
  const ingredients = button.nextElementSibling;

  if (!ingredients) return;

  // Animate toggle using max-height
  ingredients.classList.toggle("hidden");
  if (!ingredients.classList.contains("hidden")) {
    ingredients.style.maxHeight = ingredients.scrollHeight + "px";
    button.textContent = "Hide Ingredients";
  } else {
    ingredients.style.maxHeight = "0";
    button.textContent = "Show Ingredients";
  }
}

function startCooking(button) {
  const recipeCard = button.closest(".recipe-card");
  const stepsContainer = recipeCard.querySelector(".steps-container");
  const steps = stepsContainer.querySelectorAll(".step");

  if (!steps.length) return;

  let index = parseInt(button.dataset.stepIndex || "0");

  // First click → show steps & highlight first
  if (stepsContainer.classList.contains("hidden")) {
    stepsContainer.classList.remove("hidden");
    stepsContainer.style.maxHeight = stepsContainer.scrollHeight + "px";
    steps.forEach((step) => step.classList.remove("highlight"));
    steps[0].classList.add("highlight");
    button.dataset.stepIndex = 1;
    button.textContent = "Next Step";
    return;
  }

  // Move to next step
  if (index < steps.length) {
    steps.forEach((step) => step.classList.remove("highlight"));
    steps[index].classList.add("highlight");
    button.dataset.stepIndex = index + 1;

    if (index === steps.length - 1) {
      button.textContent = "Finish Recipe";
    }
  } else {
    // All steps completed
    steps.forEach((step) => step.classList.remove("highlight"));
    steps[steps.length - 1].classList.add("highlight");
    button.textContent = "Recipe Complete!";
    button.disabled = true;
    button.style.backgroundColor = "#aaa";
    button.style.cursor = "not-allowed";
  }
}

function submitForm(event) {
  event.preventDefault();

  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  fetch("http://localhost:5000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("✅ Message sent successfully!");
      document.querySelector(".contact-form").reset();
    })
    .catch(() => alert("❌ Failed to send message. Please try again."));
}
// Contact form submission
document
  .getElementById("contactForm")
  ?.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    const responseMsg = document.getElementById("responseMsg");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      responseMsg.style.color = res.ok ? "green" : "red";
      responseMsg.textContent = data.message || data.error;
      this.reset();
    } catch (err) {
      responseMsg.style.color = "red";
      responseMsg.textContent = "Something went wrong!";
    }
  });
// In script.js
document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        document.getElementById("successMessage").classList.remove("hidden");
        form.reset();
        setTimeout(() => {
          document.getElementById("successMessage").classList.add("hidden");
        }, 3000);
      } else {
        alert("❌ Failed to send message: " + data.error);
      }
    } catch (err) {
      alert("❌ Error submitting form.");
      console.error(err);
    }
  });
async function fetchMessages() {
  const res = await fetch("https://<your-backend-url>/api/messages"); // use localhost:5000 if local
  const data = await res.json();
  const container = document.getElementById("messages-container");
  container.innerHTML = ""; // clear previous

  data.forEach((msg) => {
    const msgDiv = document.createElement("div");
    msgDiv.className = "admin-message";
    msgDiv.innerHTML = `
        <h3>${msg.name}</h3>
        <p><strong>Email:</strong> ${msg.email}</p>
        <p><strong>Message:</strong> ${msg.message}</p>
      `;
    container.appendChild(msgDiv);
  });
}
const res = await fetch("http://localhost:5000/api/messages", {
  headers: {
    Authorization: "Bearer admin123",
  },
});
function filterRecipes() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const recipeCards = document.querySelectorAll(".recipe-card");

  recipeCards.forEach((card) => {
    const title = card.querySelector(".title").textContent.toLowerCase();
    card.style.display = title.includes(input) ? "block" : "none";
  });
}
