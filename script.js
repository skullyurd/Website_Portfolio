const projects = [
  {
    title: "Log Monitoring Dashboard",
    description: "Web app that parses logs, shows trends, and sends alerts.",
    tags: ["JavaScript", "Node", "Observability"],
    image: "assets/project-1.png",
    links: {
      repo: "https://github.com/your-handle/project-one",
      demo: "https://your-handle.github.io/project-one/"
    }
  },
  {
    title: "AWS Terraform Lab",
    description: "IaC templates to deploy VPC, EC2, and CI pipelines.",
    tags: ["Terraform", "AWS", "DevOps"],
    image: "assets/project-2.png",
    links: {
      repo: "https://github.com/your-handle/project-two",
      demo: ""
    }
  }
];

// --- Nav toggle (mobile)
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("navMenu");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") navMenu.classList.remove("open");
  });
}

// --- Year
document.getElementById("year").textContent = new Date().getFullYear();

// --- Render projects
const grid = document.getElementById("projectsGrid");
const search = document.getElementById("projectSearch");
const filter = document.getElementById("tagFilter");

function uniqTags(items) {
  const s = new Set();
  items.forEach(p => p.tags.forEach(t => s.add(t)));
  return Array.from(s).sort((a,b) => a.localeCompare(b));
}

function projectCard(p) {
  const demoLink = p.links.demo
    ? `<a href="${p.links.demo}" target="_blank" rel="noopener">Live</a>`
    : "";

  return `
    <article class="card project-card">
      <div class="project-thumb">
        <img src="${p.image}" alt="${p.title} screenshot" loading="lazy"/>
      </div>
      <div>
        <h3>${p.title}</h3>
        <p class="muted">${p.description}</p>
      </div>
      <div class="tags">
        ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
      <div class="project-links">
        <a href="${p.links.repo}" target="_blank" rel="noopener">Repo</a>
        ${demoLink}
      </div>
    </article>
  `;
}

function applyFilters() {
  const q = (search?.value || "").trim().toLowerCase();
  const tag = filter?.value || "all";

  const filtered = projects.filter(p => {
    const matchesText =
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.join(" ").toLowerCase().includes(q);

    const matchesTag = tag === "all" ? true : p.tags.includes(tag);
    return matchesText && matchesTag;
  });

  if (!grid) return;
  grid.innerHTML = filtered.length
    ? filtered.map(projectCard).join("")
    : `<div class="card"><p>No projects found. Try another search/tag.</p></div>`;
}

function initTagFilter() {
  if (!filter) return;
  const tags = uniqTags(projects);
  tags.forEach(t => {
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
`Name: ${name}
Email: ${email}

${message}`
  );

  // Replace with your email:
  const to = "you@example.com";

  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
});

// --- Gallery modal
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".thumb").forEach(btn => {
  btn.addEventListener("click", () => {
    const full = btn.getAttribute("data-full");
    if (!full || !modal || !modalImg) return;
    modalImg.src = full;
    modalImg.alt = btn.querySelector("img")?.alt || "Gallery image";
    modal.showModal();
  });
});

modalClose?.addEventListener("click", () => modal?.close());
modal?.addEventListener("click", (e) => {
  const rect = modal.getBoundingClientRect();
  const inDialog = (
    rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
    rect.left <= e.clientX && e.clientX <= rect.left + rect.width
  );
  if (!inDialog) modal.close();
});
