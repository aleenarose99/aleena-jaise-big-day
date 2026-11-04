(() => {
  const c = window.WEDDING_CONFIG || {};
  const $ = id => document.getElementById(id);
  const set = (id, value) => {
    if ($(id) && value !== undefined) {
      $(id).textContent = value;
    }
  };

  const fullNames = "Aleena & Jaise";

  // Couple details
  set("groomName", c.groom);
  set("brideName", c.bride);
  set("navGroom", c.groom);
  set("navBride", c.bride);
  set("footerGroom", c.groom);
  set("footerBride", c.bride);
  set("signatureNames", fullNames);
  set("coupleTagline", c.tagline);
  set("inviteMessage", c.invitationMessage);
  set("eventTime", c.eventTime);
  set("venueName", c.venueName);
  set("venueAddress", c.venueAddress);
  set("eventState", c.region);
  set("ceremonyTitle", c.ceremonyTitle);
  set("ceremonyTime", c.ceremonyTime);
  set("ceremonyLocation", c.ceremonyLocation);

  // Personalized invitation
 // Personalized invitation
// =================================
// PERSONALIZED HERO INVITATION
// =================================

const params = new URLSearchParams(window.location.search);
const inviteeName = params.get("to");

  set("heroBrideName", c.bride);

  set("heroGroomName", c.groom);

const guestDisplayName = $("guestDisplayName");

if (guestDisplayName) {
    guestDisplayName.textContent = inviteeName || "Aleena & Jaise";
}

set(
    "rsvpDear",
    inviteeName ? `Dear ${inviteeName},` : "Dear family and friends,"
);

  // Event date
  const date = new Date(
    c.eventDate || "2026-11-28T11:00:00+05:30"
  );

  const validDate = !Number.isNaN(date.getTime());

  if (validDate) {
    set(
      "weekday",
      date.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase()
    );

    set(
      "monthYear",
      date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
      }).toUpperCase()
    );

    set("dayNumber", String(date.getDate()).padStart(2, "0"));
    set("eventYear", date.getFullYear());

    const dateLine =
      `${date.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase()} | ` +
      `${date.getDate()} ` +
      `${date.toLocaleDateString("en-US", { month: "long" }).toUpperCase()} ` +
      `${date.getFullYear()}`;

    set("ceremonyDate", dateLine);
  }

  // Background images
  const images = c.images || {};

  [
    ["heroImage", "hero"],
    ["inviteImage", "invitation"],
    ["eventImage", "event"],
    ["celebrationImage", "celebration"],
    ["countdownImage", "countdown"],
    ["rsvpImage", "rsvp"]
  ].forEach(([id, key]) => {
    if (images[key] && $(id)) {
      $(id).style.backgroundImage = `url("${images[key]}")`;
    }
  });

  // Google Maps links
  ["directionsLink", "ceremonyMap"].forEach(id => {
    if ($(id)) {
      $(id).href = c.mapUrl || "#";
    }
  });

  // Schedule button
  $("scheduleBtn").addEventListener("click", () => {
    $("schedule").scrollIntoView({ behavior: "smooth" });
  });

  // Scroll reveal animations
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 }
    );

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("visible"));
  }

  // Countdown
  function updateCountdown() {
    if (!validDate) return;

    const diff = Math.max(0, date.getTime() - Date.now());

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000) % 24;
    const minutes = Math.floor(diff / 60000) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    set("days", String(days).padStart(2, "0"));
    set("hours", String(hours).padStart(2, "0"));
    set("minutes", String(minutes).padStart(2, "0"));
    set("seconds", String(seconds).padStart(2, "0"));
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // WhatsApp RSVP
  $("rsvpForm").addEventListener("submit", e => {
    e.preventDefault();

    const name = $("guestName").value.trim();
    const attendance = document.querySelector(
      'input[name="attendance"]:checked'
    );

    if (!name || !attendance) {
      $("formNote").textContent =
        "Please enter your name and select an attendance option.";
      return;
    }

    const guests = $("guestCount").value;
    const number = (c.whatsappNumber || "").replace(/\D/g, "");

    if (!number || number.length < 10) {
      $("formNote").textContent =
        "Please add a valid WhatsApp number in config.js.";
      return;
    }

    const message = `Engagement RSVP - ${fullNames}
Name: ${name}
Attendance: ${attendance.value}
Number of guests: ${guests}`;

    const whatsappURL =
      `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener");

    $("formNote").textContent =
      "Your WhatsApp message is ready. Please send it to confirm your RSVP.";
  });

})();

