const toggle = document.getElementById('dark-mode-toggle');

document.addEventListener("DOMContentLoaded", () => {
  const savedMode = localStorage.getItem("theme") || "light";
  document.body.classList.toggle("dark", savedMode === "dark");
  toggle.checked = savedMode === "dark";
});

toggle.addEventListener("change", () => {
  const isDark = toggle.checked;
  document.body.classList.toggle("dark", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
