// project.js
document.getElementById("year").textContent = new Date().getFullYear();

function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

const slug = getParam("slug");
const root = document.getElementById("projectRoot");

const projects = window.PROJECTS || [];
const project = projects.find(p => p.slug === slug);

if (!project) {
  root.innerHTML = `
    <h1>Project not found</h1>
    <p class="muted">No project matches: <code>${slug || "(missing slug)"}</code></p>
    <a class="btn primary" href="./index.html#projects">Go back</a>
  `;
} else {
  document.title = `${project.title} — YourName`;

  const links = project.links || {};
  const linkButtons = [
    links.repo ? `<a class="btn primary" href="${links.repo}" target="_blank" rel="noopener">Repo</a>` : "",
    links.demo ? `<a class="btn" href="${links.demo}" target="_blank" rel="noopener">Live demo</a>` : "",
    links.docs ? `<a class="btn" href="${links.docs}" target="_blank" rel="noopener">Docs</a>` : ""
  ].filter(Boolean).join("");

  const tags = (project.tags || []).map(t => `<span class="tag">${t}</span>`).join("");
  const bullets = (project.bullets || []).map(b => `<li>${b}</li>`).join("");

  const images = (project.media?.images || []).map(src => `
    <a class="thumb" href="${src}" target="_blank" rel="noopener">
      <img src="${src}" alt="${project.title} image" loading="lazy">
    </a>
  `).join("");

  const videos = (project.media?.videos || []).map(embed => `
    <div class="video-wrap" style="margin-top:10px;">
      <iframe
        src="${embed}"
        title="${project.title} video"
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>
    </div>
  `).join("");

  root.innerHTML = `
    <div style="display:flex; gap:14px; flex-wrap:wrap; align-items:flex-start; justify-content:space-between;">
      <div style="min-width:260px; flex:1;">
        <p class="muted tiny">${project.date || ""}</p>
        <h1 style="margin:0 0 10px;">${project.title}</h1>
        <p class="muted" style="margin:0 0 14px;">${project.short || ""}</p>
        <div class="tags" style="margin-bottom:14px;">${tags}</div>
        <div class="hero-cta">${linkButtons}</div>
      </div>

      ${project.cover ? `
        <div style="width:min(420px, 100%);">
          <div class="project-thumb">
            <img src="${project.cover}" alt="${project.title} cover" loading="lazy" style="height:auto; aspect-ratio:16/10;">
          </div>
        </div>
      ` : ""}
    </div>

    <div class="spacer"></div>

    <h3>Overview</h3>
    <div class="muted" style="line-height:1.65;">${project.long || ""}</div>

    ${bullets ? `
      <div class="spacer"></div>
      <h3>Key points</h3>
      <ul class="list">${bullets}</ul>
    ` : ""}

    ${(images || videos) ? `
      <div class="spacer"></div>
      <h3>Media</h3>
      ${images ? `<div class="gallery" style="grid-template-columns: repeat(2, 1fr);">${images}</div>` : ""}
      ${videos}
    ` : ""}
  `;
}