// Mobile menu toggle
const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

links.addEventListener("click", (e) => {
  if (e.target.closest("a") && links.classList.contains("open")) {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

// Contact form: validate in the browser, then submit to contact.php without leaving the page.
const form = document.getElementById("contact-form");
if (form) {
  const status = form.querySelector(".form-status");
  const button = form.querySelector("button[type=submit]");
  const show = (msg, ok) => { status.textContent = msg; status.className = "form-status " + (ok ? "ok" : "err"); };

  // Handle the no-JavaScript redirect back from contact.php
  const sent = new URLSearchParams(location.search).get("sent");
  if (sent === "1") show("Thanks, your message has been sent. We'll be in touch soon.", true);
  if (sent === "0") show("Sorry, your message could not be sent. Please email info@asottmartech.com.", false);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
    const bad = [...form.querySelectorAll("input, textarea")].filter((el) => !el.checkValidity());
    if (bad.length) {
      bad.forEach((el) => el.classList.add("invalid"));
      bad[0].focus();
      show("Please complete the required fields and tick the consent box.", false);
      return;
    }
    button.disabled = true;
    button.textContent = "Sending…";
    try {
      const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      const data = await res.json();
      show(data.message, data.ok);
      if (data.ok) form.reset();
    } catch {
      show("Sorry, your message could not be sent. Please email info@asottmartech.com.", false);
    } finally {
      button.disabled = false;
      button.textContent = "Send message";
    }
  });
}
