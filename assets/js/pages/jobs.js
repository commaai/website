import '../main.js';
import { initFaq } from '../lib/faq.js';

// Port of src/routes/jobs/+page.svelte client behaviors:
//   - hash → expand matching job listing (checked once at load, like onMount)
//   - job toggle (expanded class + aria-expanded + conditional .job-panel DOM)
//   - share/copy-link button (checkmark swap for 2000 ms, single shared index)
//   - Email Us tooltip (clipboard copy, 2500 ms auto-hide, single shared index)
//   - quote carousel (instant swap, no transitions)
//   - FAQ accordion hash sync (shared lib/faq.js)

// --- icons ($lib/icons/ui/link.svg?raw, $lib/icons/ui/checkmark.svg?raw) ----
const LINK_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7Z" fill="currentColor"></path>
</svg>
`;
const CHECKMARK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24" fill="#51b124">
<path d="M0 0h24v24H0z" fill="none"></path>
<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
</svg>
`;

// --- data (verbatim from src/routes/jobs/+page.svelte) -----------------------
const DEFAULT_HOW_TO_APPLY = `
    Do a <a href="https://comma.ai/bounties">bounty</a> or <a href="https://comma.ai/leaderboard">challenge</a>,
    then email <a href="mailto:work@comma.ai">work@comma.ai</a> with what you built.
  `;

const quotes = [
  {
    text: "We have the best chance at solving self-driving cars because our approach involves actually shipping a product and proving it out as we go.",
    author: "Greg",
    team: "Infrastructure",
  },
  {
    text: "At comma we are given the opportunity to try stuff. It's very easy, the barrier to do experiments and the time from the experiment to shipping the product is really short. That's what I love about comma.",
    author: "Yassine",
    team: "Research",
  },
  {
    text: "I like comma specifically because we're building something that has never been built before. It's the new frontier, space exploration.",
    author: "Nick",
    team: "Hardware",
  },
];

const jobs = [
  {
    title: "Software Engineer",
    description: `
        As part of the openpilot team, your responsibilities include developing new features,
        building simulation and testing infrastructure, and improving the tools our community
        uses to develop openpilot.
      `,
    qualifications: [
      "Ability to independently write, test, and ship software to thousands of users",
      "Write fast and efficient code that runs on hardware with limited compute resources",
      "Fluent in Python and at least one system programming language (C, C++, Rust)",
      "Experience with Linux internals (e.g. you wrote a kernel driver or did other kernel hacking)",
      "Experience with embedded systems",
      "Preferred: experience with reverse engineering",
    ],
  },
  {
    title: "Full Stack Developer",
    description: `
        As part of the openpilot team, you will be responsible for developing new features and
        maintaining our web applications (and their back-end), such as
        <a href="/connect">comma connect</a>.
      `,
    qualifications: [
      "Built and shipped applications",
      "Fluent in JavaScript, HTML, CSS, Python, and MySQL",
      "Ability to independently write, test, and ship software to thousands of users",
    ],
  },
  {
    title: "Car Interface Engineer",
    description: `
        As a car interface engineer, you'll own the 250+ cars supported by openpilot.
        You'll build tools, tests, and infrastructure to expand and improve the quality of the fleet
        alongside our community. You'll also be responsible for evolving our safety model as
        openpilot becomes more capable.
      `,
    qualifications: [
      "Fluent in Python and at least one system programming language (C, C++, Rust)",
      "Ability to independently write, test, and ship software to thousands of users",
      "Preferred: experience with ISO26262 and other automotive safety standards",
      "Having pull requests upstreamed to openpilot is a plus",
    ],
  },
  {
    title: "Controls Engineer",
    description: `
        You'll work on steering, gas, and brake controls for the 300 different cars openpilot supports.
      `,
    qualifications: [
      "Fluent in Python and comfortable working with large datasets",
      "Strong understanding of controls, robotics, or autonomous systems",
      "Ability to independently write, test, and ship software to thousands of users",
    ],
    howToApply:
      'Do the <a href="https://github.com/commaai/controls_challenge">controls challenge</a>, then email <a href="mailto:work@comma.ai">work@comma.ai</a>.',
  },
  {
    title: "Autonomy Engineer",
    description: `
        You'll work on infrastructure to train autonomous agents.
      `,
    qualifications: [
      "Fluent in Python and comfortable working with large datasets",
      "Experience with ML infrastructure, training pipelines, or autonomous agents",
      "Ability to independently write, test, and ship software to thousands of users",
    ],
    howToApply:
      'Do the <a href="https://github.com/commaai/controls_challenge">controls challenge</a>, then email <a href="mailto:work@comma.ai">work@comma.ai</a>.',
  },
  {
    title: "Electronics Engineer",
    description: `
        Do you know every component in a cell phone?
        We're hiring an electrical engineer who wants to join the team building the next generation of comma products.
      `,
    qualifications: [
      "Know things about hardware, RF, and PCB design",
      "Ability to independently design, test and ship hardware",
      "Fluent in Python, Linux, Git and familiarity with C/C++",
      "High speed electronics design and designing for manufacturability experience preferred",
      "Reverse engineering experience is a plus",
    ],
  },
  {
    title: "Infrastructure Engineer",
    description: `
        As an infrastructure engineer, you'll work on our tooling, regression tests, and simulator.
      `,
    qualifications: [
      "Excellent Python and Linux skills, at least a familiarity with C/C++",
      "Having pull requests upstreamed to openpilot is a plus",
      "Know things about operating systems, CI, and testing",
    ],
  },
  {
    title: "CNC Machinist (Head of Prototyping)",
    description: `
        We're building <a href="https://sendcutsend.com/">SendCutSend</a> at home. The shop has
        a Haas VF2, lathe, 3D printers, and a budget for any other tools we'll need to bring
        prototyping fully in-house.
        You'll own parts from CAD to finished prototype: CAM, setup, fixturing, machining, inspection, and iteration with the hardware team.
        You'll build prototypes for all future comma products, from comma four to the <a href="https://x.com/__tinygrad__/status/2040944508402360592">exabox</a>.
      `,
    qualifications: [
      "Experience with CAM, CNC setup, and machining",
      "Excellent attention to detail",
      "Resourceful enough to take ambiguous designs from sketch to working prototype",
      "Haas experience is a plus",
      "Mechanical engineering and CAD skills are a plus",
    ],
    howToApply:
      'Email <a href="mailto:work@comma.ai">work@comma.ai</a> with examples of cool projects you\'ve built.',
  },
  {
    title: "Office Manager",
    description: `
        Looking for someone practical, organized, and calm who can keep comma's daily operations
        running smoothly. You'll own the day-to-day details that make the office work, from
        facilities and fleet logistics to purchasing support, employee logistics, events, records,
        vendors, and one-off operational projects.
      `,
    qualifications: [
      "Experience in operations, business, facilities, or office management",
      "Excellent organizational skills and attention to detail",
      "Comfortable with basic finance concepts like expenses, invoices, and budgets",
      "Strong analytical and problem-solving abilities",
      "Ability to self-motivate, prioritize, and work independently in a small, fast-moving team",
      "Preferred: experience with Shopify or similar operational tooling",
    ],
    howToApply:
      'Do the <a href="https://github.com/commaai/operations_challenge">operations challenge</a>, then email <a href="mailto:work@comma.ai">work@comma.ai</a>.',
  },
  {
    title: "Internships / Co-op",
    description: `
        Internships are for people we would like to hire but can't because school. We're looking for
        engineers who want to work in electrical engineering, hardware, ML, controls, car hacking, manufacturing,
        and operations. The best way to get an internship with us is to submit good PRs to projects
        on our <a href="https://github.com/commaai">GitHub</a> or get a top spot on the
        <a href="/leaderboard">leaderboard</a>. Want to know more about what internships with us
        are like? Check out
        <a href="https://vivekaithal.co/posts/summer-at-comma-ai/" target="_blank" rel="noreferrer">this blog post by a former intern (turned employee)</a>.
      `,
    qualifications: [],
    howToApply: `
        The best way to get an internship with us is to submit good PRs to projects
        on our <a href="https://github.com/commaai">GitHub</a> or get a top spot on the
        <a href="/leaderboard">leaderboard</a>.
      `,
  },
];

const jobSlugs = jobs.map((job) =>
  job.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
);

// --- open positions: toggle / hash expand ------------------------------------
const articles = Array.from(document.querySelectorAll('.jobs-list .job-item'));
const expandedJobIndexes = new Set([0]);

// Same markup Svelte renders for a job panel (SSR'd for index 0 in the build).
function panelHTML(index) {
  const job = jobs[index];
  const quals = job.qualifications.length > 0
    ? `<div class="job-qualifications svelte-11te7oe">Qualifications</div> <ul class="svelte-11te7oe">${job.qualifications.map((q) => `<li class="svelte-11te7oe">${q}</li>`).join('')} </ul> `
    : ' ';
  return `<div class="job-panel svelte-11te7oe" id="job-panel-${index}"><div class="job-description svelte-11te7oe">${job.description}</div> ${quals}<div class="job-how-to-apply svelte-11te7oe"><div class="job-qualifications svelte-11te7oe">How to apply</div> <p class="svelte-11te7oe">${job.howToApply ?? DEFAULT_HOW_TO_APPLY}</p></div> </div>`;
}

function renderJobs() {
  articles.forEach((article, index) => {
    const isExpanded = expandedJobIndexes.has(index);
    article.classList.toggle('expanded', isExpanded);
    article.querySelector('.job-toggle').setAttribute('aria-expanded', String(isExpanded));
    const panel = article.querySelector('.job-panel');
    if (isExpanded && !panel) {
      const tpl = document.createElement('template');
      tpl.innerHTML = panelHTML(index);
      article.querySelector('.job-header').insertAdjacentElement('afterend', tpl.content.firstElementChild);
    } else if (!isExpanded && panel) {
      panel.remove();
    }
  });
}

function toggleJob(index) {
  if (expandedJobIndexes.has(index)) {
    expandedJobIndexes.delete(index);
  } else {
    expandedJobIndexes.add(index);
  }
  renderJobs();
}

// onMount: expand the job listing matching the URL hash (native anchor scroll
// already happened — the article ids exist in the static HTML).
{
  const hash = decodeURIComponent(window.location.hash.slice(1));
  const index = jobSlugs.indexOf(hash);
  if (index !== -1) {
    expandedJobIndexes.add(index);
  }
  renderJobs();
}

// --- share/copy-link buttons --------------------------------------------------
const shareButtons = articles.map((article) => article.querySelector('.share-button'));
let copiedJobIndex = null;
let copyResetTimeout;

function applyShareState(index) {
  if (index === null) return;
  const copied = copiedJobIndex === index;
  const btn = shareButtons[index];
  btn.setAttribute('aria-label', copied ? 'Link copied' : `Copy link to ${jobs[index].title}`);
  btn.innerHTML = copied ? CHECKMARK_ICON : LINK_ICON;
}

async function copyJobLink(index) {
  const url = `${window.location.origin}/jobs#${jobSlugs[index]}`;
  try {
    await navigator.clipboard.writeText(url);
  } catch {
    return;
  }

  const prev = copiedJobIndex;
  copiedJobIndex = index;
  if (prev !== null && prev !== index) applyShareState(prev);
  applyShareState(index);
  clearTimeout(copyResetTimeout);
  copyResetTimeout = setTimeout(() => {
    const last = copiedJobIndex;
    copiedJobIndex = null;
    applyShareState(last);
  }, 2000);
}

// --- Email Us tooltip ----------------------------------------------------------
const applyWraps = articles.map((article) => article.querySelector('.apply-wrap'));
let emailTooltipIndex = null;
let emailTooltipText = '';
let emailTooltipTimeout;
let tooltipEl = null;

function renderTooltip() {
  if (emailTooltipIndex === null) {
    if (tooltipEl) {
      tooltipEl.remove();
      tooltipEl = null;
    }
    return;
  }
  if (!tooltipEl) {
    tooltipEl = document.createElement('span');
    tooltipEl.className = 'email-tooltip svelte-11te7oe';
    tooltipEl.setAttribute('role', 'status');
  }
  tooltipEl.textContent = emailTooltipText;
  const wrap = applyWraps[emailTooltipIndex];
  if (tooltipEl.parentNode !== wrap) {
    wrap.insertBefore(tooltipEl, wrap.firstChild);
  }
}

async function showApplyEmail(index) {
  emailTooltipText = 'work@comma.ai';
  renderTooltip();
  try {
    await navigator.clipboard.writeText('work@comma.ai');
    emailTooltipText = 'Copied work@comma.ai';
  } catch {
    // clipboard unavailable; still show the address
  }

  emailTooltipIndex = index;
  renderTooltip();
  clearTimeout(emailTooltipTimeout);
  emailTooltipTimeout = setTimeout(() => {
    emailTooltipIndex = null;
    renderTooltip();
  }, 2500);
}

articles.forEach((article, index) => {
  article.querySelector('.job-toggle').addEventListener('click', () => toggleJob(index));
  article.querySelector('.share-button').addEventListener('click', () => copyJobLink(index));
  article.querySelector('.apply-button').addEventListener('click', () => showApplyEmail(index));
});

// --- quote carousel -------------------------------------------------------------
const quoteText = document.querySelector('.quote-section blockquote');
const quoteCaption = document.querySelector('.quote-section figcaption');
const quoteDots = Array.from(document.querySelectorAll('.quote-dots button'));
const quoteArrows = Array.from(document.querySelectorAll('.quote-controls .quote-arrow'));
let activeQuote = 0;

function renderQuote() {
  const quote = quotes[activeQuote];
  quoteText.textContent = `"${quote.text}"`;
  quoteCaption.textContent = `- ${quote.author}, ${quote.team}`;
  quoteDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeQuote);
    dot.setAttribute('aria-pressed', String(index === activeQuote));
  });
}

quoteArrows[0].addEventListener('click', () => {
  activeQuote = (activeQuote - 1 + quotes.length) % quotes.length;
  renderQuote();
});
quoteArrows[1].addEventListener('click', () => {
  activeQuote = (activeQuote + 1) % quotes.length;
  renderQuote();
});
quoteDots.forEach((dot, index) =>
  dot.addEventListener('click', () => {
    activeQuote = index;
    renderQuote();
  })
);

// --- FAQ hash sync ----------------------------------------------------------------
initFaq();
