// script.js
// Homepage behavior: nav toggle, year, projects grid (from projects.js), search + tag filter,
// contact form mailto, and gallery modal.

const projects = window.PROJECTS || [];

// --- Nav toggle (mobile)
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("navMenu");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.addEventListener("click", (e) => {
    if (e.target && e.target.tagName === "A") navMenu.classList.remove("open");
  });
}

// --- Year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- Projects: render + search + filter
const grid = document.getElementById("projectsGrid");
const search = document.getElementById("projectSearch");
const filter = document.getElementById("tagFilter");

function uniqTags(items) {
  const s = new Set();
  items.forEach((p) => (p.tags || []).forEach((t) => s.add(t)));
  return Array.from(s).sort((a, b) => a.localeCompare(b));
}

function projectCard(p) {
  const href = `project.html?slug=${encodeURIComponent(p.slug)}`;

  const cover = p.cover || p.image || "";
  const demoLink = p.links?.demo
    ? `<a href="${p.links.demo}" target="_blank" rel="noopener">Live</a>`
    : "";

  const repoLink = p.links?.repo
    ? `<a href="${p.links.repo}" target="_blank" rel="noopener">Repo</a>`
    : "";

  const tags = (p.tags || []).map((t) => `<span class="tag">${t}</span>`).join("");

  return `
    <article class="card project-card">
      <a href="${href}" style="text-decoration:none;">
        <div class="project-thumb">
          ${cover ? `<img src="${cover}" alt="${p.title} screenshot" loading="lazy"/>` : ""}
        </div>
        <div style="margin-top:10px;">
          <h3>${p.title}</h3>
          <p class="muted">${p.short || ""}</p>
        </div>
      </a>

      <div class="tags">
        ${tags}
      </div>

      <div class="project-links">
        ${repoLink}
        ${demoLink}
        <a href="${href}">Details</a>
      </div>
    </article>
  `;
}

function applyFilters() {
  if (!grid) return;

  const q = (search?.value || "").trim().toLowerCase();
  const tag = filter?.value || "all";

  const filtered = projects.filter((p) => {
    const textBlob = [
      p.title || "",
      p.short || "",
      p.description || "",
      (p.tags || []).join(" "),
    ]
      .join(" ")
      .toLowerCase();

    const matchesText = !q || textBlob.includes(q);
    const matchesTag = tag === "all" ? true : (p.tags || []).includes(tag);

    return matchesText && matchesTag;
  });

  grid.innerHTML = filtered.length
    ? filtered.map(projectCard).join("")
    : `<div class="card"><p>No projects found. Try another search/tag.</p></div>`;
}

function initTagFilter() {
  if (!filter) return;

  // Reset (keep first option "All tags" if present)
  const keepFirst = filter.querySelector("option[value='all']");
  filter.innerHTML = "";
  if (keepFirst) filter.appendChild(keepFirst);
  else {
    const opt = document.createElement("option");
    opt.value = "all";
    opt.textContent = "All tags";
    filter.appendChild(opt);
  }

  uniqTags(projects).forEach((t) => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    filter.appendChild(opt);
  });
}

initTagFilter();
applyFilters();

search?.addEventListener("input", applyFilters);
filter?.addEventListener("change", applyFilters);

// --- Contact form: opens mail client (no backend)
const form = document.getElementById("contactForm");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);

  const name = String(data.get("name") || "");
  const email = String(data.get("email") || "");
  const message = String(data.get("message") || "");

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );

  // Replace with your email:
  const to = "baris.buba1999@gmail.com";
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
});

// --- Gallery modal (works if the homepage has .thumb buttons + #imgModal)
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const modalClose = document.getElementById("modalClose");

if (modal && modalImg) {
  document.querySelectorAll(".thumb").forEach((btn) => {
    btn.addEventListener("click", () => {
      const full = btn.getAttribute("data-full");
      if (!full) return;

      modalImg.src = full;
      modalImg.alt = btn.querySelector("img")?.alt || "Gallery image";
      modal.showModal();
    });
  });

  modalClose?.addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => {
    const rect = modal.getBoundingClientRect();
    const inDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;
    if (!inDialog) modal.close();
  });
}