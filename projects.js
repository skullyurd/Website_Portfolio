// projects.js
window.PROJECTS = [
  {
    slug: "log-monitoring-dashboard",
    title: "Log Monitoring Dashboard",
    short: "Parses logs, visualizes trends, and triggers alerts.",
    long: `
      <p><strong>What it is:</strong> A dashboard that ingests log files, extracts structured fields, and shows trends.</p>
      <p><strong>Highlights:</strong></p>
      <ul>
        <li>Search + filters</li>
        <li>Rule-based alerts</li>
        <li>Export reports</li>
      </ul>
    `,
    tags: ["JavaScript", "Node", "Observability"],
    date: "2025-11",
    cover: "assets/project-1.png",

    links: {
      repo: "https://github.com/your-handle/project-one",
      demo: "https://your-handle.github.io/project-one/",
      docs: ""
    },

    media: {
      // Put youtube/vimeo embed URLs here (not watch URLs)
      videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
      images: ["assets/project-1.png"]
    },

    bullets: [
      "Built log parser pipeline with validation",
      "Implemented tag-based filtering and saved searches",
      "Deployed via GitHub Pages demo + CI"
    ]
  },

  {
    slug: "aws-terraform-lab",
    title: "AWS Terraform Lab",
    short: "IaC templates for VPC, EC2, and CI pipelines.",
    long: `
      <p><strong>What it is:</strong> Reusable Terraform modules for common AWS infrastructure patterns.</p>
      <p><strong>Highlights:</strong></p>
      <ul>
        <li>VPC + subnets + NAT</li>
        <li>EC2 autoscaling baseline</li>
        <li>CI workflow examples</li>
      </ul>
    `,
    tags: ["Terraform", "AWS", "DevOps"],
    date: "2025-08",
    cover: "assets/project-2.png",
    links: {
      repo: "https://github.com/your-handle/project-two",
      demo: "",
      docs: ""
    },
    media: {
      videos: [],
      images: ["assets/project-2.png"]
    },
    bullets: [
      "Modular IaC with clear variables/outputs",
      "Example environments for dev/stage",
      "Cost-conscious defaults"
    ]
  }
];