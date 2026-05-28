const sections = {
  list: document.getElementById("section-list"),
  edit: document.getElementById("section-edit"),
  stats: document.getElementById("section-stats"),
};

const buttons = {
  list: document.getElementById("nav-list"),
  edit: document.getElementById("nav-edit"),
  stats: document.getElementById("nav-stats"),
};

function showSection(sectionName) {
  // Hide all sections
  Object.values(sections).forEach((section) => {
    section.classList.add("hidden");
    section.classList.remove("flex");
  });

  // Reset buttons
  Object.values(buttons).forEach((button) => {
    button.classList.remove(
      "active",
      "bg-[#E8DDD4]",
      "text-[#5D4037]"
    );

    button.classList.add("text-[#A1887F]");
  });

  // Show selected section
  sections[sectionName].classList.remove("hidden");
  sections[sectionName].classList.add("flex");

  // Active button
  buttons[sectionName].classList.add(
    "active",
    "bg-[#E8DDD4]",
    "text-[#5D4037]"
  );

  buttons[sectionName].classList.remove("text-[#A1887F]");
}

// Events
buttons.list.addEventListener("click", () => showSection("list"));
buttons.edit.addEventListener("click", () => showSection("edit"));
buttons.stats.addEventListener("click", () => showSection("stats"));