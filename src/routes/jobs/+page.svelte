<script>
  import { onMount } from "svelte";
  import Faq from "$lib/components/Faq.svelte";
  import LinkButton from "$lib/components/LinkButton.svelte";
  import { faq } from "$lib/constants/faq.svelte";
  import ArrowRightIcon from "$lib/icons/arrow-right.svg?raw";
  import IconChevron from "$lib/icons/icon-chevron.svg?raw";
  import CheckmarkIcon from "$lib/icons/ui/checkmark.svg?raw";
  import LinkIcon from "$lib/icons/ui/link.svg?raw";

  const ASSET_PATH = "/images/jobs";
  const JOBS_VIDEO_EMBED_URL = "https://www.youtube.com/embed/PFjssb7r_uU";
  const DEFAULT_HOW_TO_APPLY = `
    Do a <a href="https://comma.ai/bounties">bounty</a> or <a href="https://comma.ai/leaderboard">challenge</a>,
    then email <a href="mailto:work@comma.ai">work@comma.ai</a> with what you built.
  `;

  let activeQuote = 0;
  let expandedJobIndexes = new Set();

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

  const processSteps = [
    {
      label: "01",
      title: "Challenge",
      body:
        'Choose a challenge from the <a href="https://comma.ai/leaderboard">leaderboard</a> or a <a href="https://comma.ai/bounties">bounty</a>, solve it, then reach out to <a href="mailto:work@comma.ai">work@comma.ai</a>.',
    },
    {
      label: "02",
      title: "Phone screen",
      body:
        "Typically, we do two calls: a quick intro and screen, then an in-depth technical interview with an engineer.",
    },
    {
      label: "03",
      title: "Paid micro-internship",
      body:
        "We'll fly you out to meet the team and work on a real problem for a few days and hopefully ship it to real users. If all goes well, we will make a full-time offer.",
    },
  ];

  const benefits = [
    {
      icon: `${ASSET_PATH}/icon-jobs-benefit-health.svg`,
      text: "Health, dental, and vision insurance",
    },
    {
      icon: `${ASSET_PATH}/icon-jobs-benefit-visa.svg`,
      text: "Visa sponsorship",
    },
    {
      icon: `${ASSET_PATH}/icon-jobs-benefit-car.svg`,
      text: "24/7 access to comma's fleet of cars for openpilot testing",
    },
    {
      icon: `${ASSET_PATH}/icon-jobs-benefit-vacation.svg`,
      text: "Flexible time off",
    },
    {
      icon: `${ASSET_PATH}/icon-jobs-benefit-fitness.svg`,
      text: "On-site gym and yoga studio",
    },
    {
      icon: `${ASSET_PATH}/icon-jobs-benefit-chef.svg`,
      text: "Chef prepared lunch and dinner (and snacks!)",
    },
    {
      icon: `${ASSET_PATH}/icon-jobs-benefit-future.svg`,
      text: "Solving self driving cars",
    },
  ];

  const jobs = [
    {
      title: "Software Engineer",
      team: "openpilot",
      location: "On-site in San Diego, CA",
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
      team: "openpilot",
      location: "On-site in San Diego, CA",
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
      team: "openpilot",
      location: "On-site in San Diego, CA",
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
      team: "autonomy",
      location: "On-site in San Diego, CA",
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
      team: "autonomy",
      location: "On-site in San Diego, CA",
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
      team: "product",
      location: "On-site in San Diego, CA",
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
      team: "openpilot",
      location: "On-site in San Diego, CA",
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
      team: "hardware",
      location: "On-site in San Diego, CA",
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
      team: "operations",
      location: "On-site in San Diego, CA",
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
      location: "Paid and on-site in San Diego, CA",
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

  let copiedJobIndex = null;
  let copyResetTimeout;
  let emailTooltipIndex = null;
  let emailTooltipText = "";
  let emailTooltipTimeout;

  onMount(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const index = jobSlugs.indexOf(hash);
    if (index !== -1) {
      expandedJobIndexes = new Set([index]);
    }

    return () => {
      clearTimeout(copyResetTimeout);
      clearTimeout(emailTooltipTimeout);
    };
  });

  async function showApplyEmail(index) {
    emailTooltipText = "work@comma.ai";
    try {
      await navigator.clipboard.writeText("work@comma.ai");
      emailTooltipText = "Copied work@comma.ai";
    } catch {
      // clipboard unavailable; still show the address
    }

    emailTooltipIndex = index;
    clearTimeout(emailTooltipTimeout);
    emailTooltipTimeout = setTimeout(() => (emailTooltipIndex = null), 2500);
  }

  async function copyJobLink(index) {
    const url = `${window.location.origin}/jobs#${jobSlugs[index]}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      return;
    }

    copiedJobIndex = index;
    clearTimeout(copyResetTimeout);
    copyResetTimeout = setTimeout(() => (copiedJobIndex = null), 2000);
  }

  function showPreviousQuote() {
    activeQuote = (activeQuote - 1 + quotes.length) % quotes.length;
  }

  function showNextQuote() {
    activeQuote = (activeQuote + 1) % quotes.length;
  }

  function toggleJob(index) {
    const nextExpandedJobIndexes = new Set(expandedJobIndexes);

    if (nextExpandedJobIndexes.has(index)) {
      nextExpandedJobIndexes.delete(index);
    } else {
      nextExpandedJobIndexes.add(index);
    }

    expandedJobIndexes = nextExpandedJobIndexes;
  }
</script>

<svelte:head>
  <title>Jobs - comma</title>
  <meta
    name="description"
    content="At comma.ai, we are solving self-driving cars while delivering shippable intermediaries."
  />
</svelte:head>

<div class="jobs-page light">
  <section class="jobs-hero" aria-labelledby="jobs-title">
    <div class="container">
      <h1 id="jobs-title">Come build the future</h1>
    </div>
  </section>

  <section class="jobs-intro" aria-label="Jobs introduction">
    <div class="container split-grid">
      <h2 class="section-title">
        We're solving self driving cars while delivering shippable intermediaries.
      </h2>
      <div>
        <p class="large-text">
          If Tesla is the iOS of self driving, we are the Android. How do you solve self driving cars?
          You don't do it by solving the problem one part at a time. There are no parts. There is just
          a machine learning model that contains the human policy of driving.
        </p>
        <LinkButton href="#open-positions" style="primary">View Openings</LinkButton>
      </div>
    </div>
  </section>

  <section class="jobs-video" aria-label="See how comma works">
    <div class="container">
      <div class="video-shell">
        <iframe
          class="video-frame"
          src={JOBS_VIDEO_EMBED_URL}
          title="Touring comma HQ + launching the new jobs page comma.ai/jobs"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </section>

  <section class="jobs-section" aria-labelledby="who-we-are">
    <div class="container">
      <div class="split-grid">
        <h2 id="who-we-are" class="section-title">Who we are</h2>
        <p class="large-text">
          We have 90+ million miles of driving data sitting on hard drives ready to be trained on.
          Write the training code, fix the bugs, and watch it drive. Think AlphaGo, but for self
          driving cars. And the minute we do solve it, we already have thousands of users to deploy to.
          The second largest fleet outside Tesla, and likely to be the largest soon.
        </p>
      </div>

      <div class="section-spacer"></div>

      <p class="eyebrow">On-site only, no remote</p>
      <h2 class="section-title">We're in San Diego</h2>
      <p class="body-copy">comma HQ is located in sunny San Diego, California.</p>

      <div class="photo-grid">
        <img
          src={`${ASSET_PATH}/Frame-175.jpg`}
          srcset={`${ASSET_PATH}/Frame-175-p-500.jpg 500w, ${ASSET_PATH}/Frame-175.jpg 640w`}
          sizes="(max-width: 768px) 85vw, 640px"
          loading="lazy"
          alt="comma HQ workspace"
        />
        <img
          src={`${ASSET_PATH}/Frame-176.png`}
          srcset={`${ASSET_PATH}/Frame-176-p-500.png 500w, ${ASSET_PATH}/Frame-176.png 640w`}
          sizes="(max-width: 768px) 85vw, 640px"
          loading="lazy"
          alt="comma HQ in San Diego"
        />
      </div>
    </div>
  </section>

  <section class="quote-section" aria-label="Employee quotes">
    <div class="container quote-container">
      <figure class="quote">
        <blockquote>"{quotes[activeQuote].text}"</blockquote>
        <figcaption>- {quotes[activeQuote].author}, {quotes[activeQuote].team}</figcaption>
      </figure>

      <div class="quote-controls" aria-label="Quote controls">
        <button type="button" class="quote-arrow previous" aria-label="Previous quote" on:click={showPreviousQuote}>
          {@html ArrowRightIcon}
        </button>
        <div class="quote-dots">
          {#each quotes as quote, index}
            <button
              type="button"
              class:active={activeQuote === index}
              aria-label={`Show quote from ${quote.author}`}
              aria-pressed={activeQuote === index}
              on:click={() => (activeQuote = index)}
            ></button>
          {/each}
        </div>
        <button type="button" class="quote-arrow" aria-label="Next quote" on:click={showNextQuote}>
          {@html ArrowRightIcon}
        </button>
      </div>
    </div>
  </section>

  <section class="jobs-section" aria-labelledby="hiring-process">
    <div class="container">
      <h2 id="hiring-process" class="section-title">Our Process</h2>
      <div class="traits-grid">
        {#each processSteps as step}
          <article class="trait-card">
            <h3>{step.label}. {step.title}</h3>
            <p>{@html step.body}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="challenge-section dark" aria-labelledby="challenge-title">
    <div class="container challenge-grid">
      <div>
        <p class="eyebrow">Start here</p>
        <h2 id="challenge-title">Ready to apply?</h2>
        <p class="challenge-copy">
          Email your resume, GitHub, and challenge or bounty solution to
          <a href="mailto:work@comma.ai">work@comma.ai</a>.
        </p>
        <p class="challenge-copy">
          The compression challenge is a good place to start, but any strong leaderboard
          challenge or bounty submission works.
        </p>
        <LinkButton
          href="https://github.com/commaai/comma_video_compression_challenge"
          target="_blank"
          style="secondary"
        >
          Try the compression challenge
        </LinkButton>
      </div>

      <img
        class="challenge-image"
        src={`${ASSET_PATH}/img-jobs-challenge.jpeg`}
        srcset={`${ASSET_PATH}/img-jobs-challenge-p-500.jpeg 500w, ${ASSET_PATH}/img-jobs-challenge-p-800.jpeg 800w, ${ASSET_PATH}/img-jobs-challenge-p-1080.jpeg 1080w, ${ASSET_PATH}/img-jobs-challenge.jpeg 1224w`}
        sizes="(max-width: 1024px) 85vw, 55vw"
        loading="lazy"
        alt="comma programming challenge visualization"
      />
    </div>
  </section>

  <section class="benefits-section" aria-labelledby="benefits-title">
    <div class="container split-grid">
      <h2 id="benefits-title" class="section-title">Explore Our Benefits</h2>
      <div class="benefits-list">
        {#each benefits as benefit}
          <div class="benefit-item">
            <img src={benefit.icon} loading="lazy" alt="" aria-hidden="true" />
            <span>{benefit.text}</span>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="jobs-section" aria-labelledby="open-positions">
    <div class="container openings-grid">
      <div class="openings-intro">
        <h2 id="open-positions" class="section-title">Open Positions</h2>
        <p>All positions are on-site in San Diego, CA</p>
      </div>

      <div class="jobs-list">
        {#each jobs as job, index}
          <article class="job-item" id={jobSlugs[index]} class:expanded={expandedJobIndexes.has(index)}>
            <div class="job-header">
              <button
                type="button"
                class="job-toggle"
                aria-expanded={expandedJobIndexes.has(index)}
                aria-controls={`job-panel-${index}`}
                on:click={() => toggleJob(index)}
              >
                <span class="job-header-title">
                  <span class="job-title-line">
                    <span class="job-title">{job.title}</span>
                    {#if job.team}
                      <span class="job-team">{job.team}</span>
                    {/if}
                  </span>
                  <span class="job-location">{job.location}</span>
                </span>
                <span class="job-toggle-icon" aria-hidden="true">
                  {@html IconChevron}
                </span>
              </button>
              <div class="job-actions">
                <button
                  type="button"
                  class="share-button"
                  title="Copy link to this job"
                  aria-label={copiedJobIndex === index ? "Link copied" : `Copy link to ${job.title}`}
                  on:click={() => copyJobLink(index)}
                >
                  {@html copiedJobIndex === index ? CheckmarkIcon : LinkIcon}
                </button>
                <div class="apply-wrap">
                  {#if emailTooltipIndex === index}
                    <span class="email-tooltip" role="status">{emailTooltipText}</span>
                  {/if}
                  <button type="button" class="apply-button" on:click={() => showApplyEmail(index)}>
                    Email Us
                  </button>
                </div>
              </div>
            </div>

            {#if expandedJobIndexes.has(index)}
              <div class="job-panel" id={`job-panel-${index}`}>
                <div class="job-description">{@html job.description}</div>

                {#if job.qualifications.length > 0}
                  <div class="job-qualifications">Qualifications</div>
                  <ul>
                    {#each job.qualifications as qualification}
                      <li>{qualification}</li>
                    {/each}
                  </ul>
                {/if}

                <div class="job-how-to-apply">
                  <div class="job-qualifications">How to apply</div>
                  <p>{@html job.howToApply ?? DEFAULT_HOW_TO_APPLY}</p>
                </div>
              </div>
            {/if}
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="jobs-section" id="faq" aria-label="Jobs FAQ">
    <div class="container">
      <Faq topic={faq.jobs} title="Jobs FAQ" />
    </div>
  </section>
</div>

<style>
  .jobs-page {
    --jobs-container: min(1180px, calc(100vw - 3rem));
    --jobs-section-y: clamp(4rem, 7vw, 6rem);

    background: #fff;
    color: #000;
    letter-spacing: 0;
    overflow-x: hidden;
    width: 100%;
  }

  .jobs-page,
  .jobs-page :global(*) {
    box-sizing: border-box;
  }

  .container {
    max-width: var(--jobs-container);
    width: 100%;
    margin: 0 auto;
  }

  .jobs-hero {
    border-bottom: 1px solid #000;
    min-height: 0;
    padding: clamp(3.5rem, 8vw, 7rem) 0 clamp(2rem, 4vw, 3.5rem);
    display: flex;
    align-items: flex-start;
  }

  .jobs-hero h1 {
    color: #000;
    font-size: clamp(3rem, 6vw, 5.5rem);
    font-weight: 600;
    line-height: 0.95;
    margin: 0;
    max-width: 14ch;
  }

  .jobs-intro,
  .jobs-section,
  .benefits-section,
  .challenge-section,
  .quote-section {
    padding: var(--jobs-section-y) 0;
  }

  .jobs-intro {
    padding-top: clamp(3rem, 6vw, 5rem);
    padding-bottom: clamp(3rem, 6vw, 5rem);
  }

  .split-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
    gap: clamp(2.5rem, 5vw, 5rem);
    align-items: start;
  }

  .split-grid > *,
  .challenge-grid > *,
  .openings-grid > * {
    min-width: 0;
  }

  .section-title {
    color: #000;
    font-family: Inter, sans-serif;
    font-size: clamp(1.6rem, 2.4vw, 2.5rem);
    font-weight: 700;
    line-height: 1.1;
    margin: 0;
    overflow-wrap: anywhere;
    text-transform: uppercase;
    word-break: break-word;
  }

  .large-text,
  .body-copy,
  .challenge-copy,
  .trait-card p {
    color: #000;
    font-size: clamp(1.0625rem, 1.35vw, 1.25rem);
    font-weight: 400;
    line-height: 1.45;
  }

  .large-text {
    margin: 0;
  }

  .jobs-intro .large-text {
    margin-bottom: 2rem;
  }

  .body-copy {
    margin: 1rem 0 2rem;
  }

  .eyebrow {
    color: rgba(0, 0, 0, 0.55);
    font-family: "JetBrains Mono", monospace;
    font-size: 1rem;
    line-height: 1.2;
    margin: 0 0 0.5rem;
    text-transform: uppercase;
  }

  .jobs-video {
    padding: 0 0 var(--jobs-section-y);
  }

  .video-shell {
    aspect-ratio: 16 / 9;
    min-height: 24rem;
    max-height: 42rem;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .video-frame {
    border: 0;
    display: block;
    height: 100%;
    width: 100%;
  }

  .section-spacer {
    height: clamp(3rem, 5vw, 5rem);
  }

  .photo-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(1.5rem, 4vw, 4rem);
  }

  .photo-grid img,
  .challenge-image {
    border: 1px solid #000;
    display: block;
    width: 100%;
  }

  .photo-grid img {
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  .quote-section {
    border-bottom: 1px solid #000;
    border-top: 1px solid #000;
  }

  .quote-container {
    display: grid;
    grid-template-rows: auto auto;
    align-items: center;
    gap: 3rem;
  }

  .quote {
    margin: 0 auto;
    max-width: 70rem;
    text-align: center;
  }

  .quote blockquote {
    border: 0;
    color: #000;
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    font-style: normal;
    line-height: 1.25;
    margin: 0;
    padding: 0;
  }

  .quote figcaption {
    color: #000;
    font-size: 1.25rem;
    line-height: 1.2;
    margin-top: 2rem;
  }

  .quote-controls {
    display: grid;
    grid-template-columns: 48px 1fr 48px;
    align-items: center;
    gap: 1rem;
  }

  .quote-arrow {
    align-items: center;
    background: #000;
    border: 0;
    color: #fff;
    cursor: pointer;
    display: flex;
    height: 48px;
    justify-content: center;
    padding: 0;
    transition: opacity 0.2s;
    width: 48px;
  }

  .quote-arrow:hover,
  .quote-arrow:focus-visible {
    opacity: 0.75;
  }

  .quote-arrow.previous :global(svg) {
    transform: rotate(180deg);
  }

  .quote-arrow :global(svg) {
    height: 24px;
    width: 24px;
  }

  .quote-dots {
    display: flex;
    justify-content: center;
    gap: 4px;
  }

  .quote-dots button {
    background: #e4e4e4;
    border: 0;
    cursor: pointer;
    height: 4px;
    padding: 0;
    transition: background-color 0.2s;
    width: 24px;
  }

  .quote-dots button.active {
    background: #000;
  }

  .traits-grid {
    border: 1px solid #000;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: clamp(2rem, 4vw, 3rem);
  }

  .trait-card {
    padding: 2rem;
  }

  .trait-card + .trait-card {
    border-left: 1px solid #000;
  }

  .trait-card h3 {
    color: #000;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.2;
    margin: 0 0 1rem;
  }

  .trait-card p {
    margin: 0;
  }

  .challenge-section {
    background: #000;
    color: #fff;
  }

  .challenge-section .eyebrow {
    color: rgba(255, 255, 255, 0.65);
  }

  .challenge-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
    gap: clamp(2.5rem, 5vw, 5rem);
    align-items: start;
  }

  .challenge-section h2 {
    color: #fff;
    font-size: clamp(2rem, 3vw, 2.75rem);
    font-weight: 600;
    line-height: 1.2;
    margin: 0 0 1rem;
  }

  .challenge-copy {
    color: #fff;
    margin: 0 0 1.25rem;
  }

  .trait-card :global(a),
  .challenge-copy a,
  .job-description :global(a) {
    border-bottom: 2px solid var(--color-accent);
    text-decoration: none;
    transition: background-color 0.2s;
  }

  .trait-card :global(a:hover),
  .trait-card :global(a:focus-visible),
  .challenge-copy a:hover,
  .challenge-copy a:focus-visible,
  .job-description :global(a:hover),
  .job-description :global(a:focus-visible) {
    background: rgba(81, 255, 0, 0.25);
  }

  .challenge-image {
    aspect-ratio: 4 / 3;
    align-self: start;
    object-fit: cover;
  }

  .benefits-section {
    background: #f5f5f5;
  }

  .benefits-list {
    display: flex;
    flex-direction: column;
  }

  .benefit-item {
    align-items: center;
    border-bottom: 1px solid #000;
    display: flex;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
  }

  .benefit-item img {
    flex: none;
    height: 48px;
    width: 48px;
  }

  .benefit-item span {
    color: #000;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.2;
    margin-left: 1rem;
  }

  .openings-grid {
    display: grid;
    grid-template-columns: minmax(0, 0.5fr) minmax(0, 1fr);
    gap: clamp(2rem, 4vw, 4rem);
    align-items: start;
  }

  .openings-intro {
    position: sticky;
    top: 6rem;
  }

  .openings-intro p {
    color: #000;
    font-size: 1.5rem;
    line-height: 1.3;
    margin: 1.5rem 0 0;
  }

  .openings-intro .section-title {
    font-size: 2rem;
    line-height: 1.2;
  }

  .jobs-list {
    border-top: 1px solid #000;
  }

  .job-item {
    border-bottom: 1px solid #000;
    margin-bottom: 0;
    padding: 1.5rem 0;
    scroll-margin-top: 6rem;
  }

  .job-item:last-child {
    margin-bottom: 0;
  }

  .job-header {
    align-items: center;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    margin-bottom: 0;
  }

  .job-toggle {
    align-items: center;
    background: transparent;
    border: 0;
    color: #000;
    cursor: pointer;
    display: flex;
    flex: 1;
    font-family: inherit;
    justify-content: space-between;
    min-width: 0;
    padding: 0;
    text-align: left;
  }

  .job-toggle:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 4px;
  }

  .job-header-title {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    margin-right: 1rem;
  }

  .job-title-line {
    align-items: center;
    column-gap: 0.75rem;
    display: flex;
    flex-wrap: wrap;
    min-width: 0;
    row-gap: 0.5rem;
    width: 100%;
  }

  .job-title {
    color: #000;
    display: block;
    flex: 0 1 auto;
    font-size: 1.875rem;
    font-weight: 600;
    line-height: 1.2;
    margin: 0;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .job-toggle-icon {
    align-items: center;
    color: #000;
    display: flex;
    flex: none;
    height: 2rem;
    justify-content: center;
    transition: transform 0.2s;
    width: 2rem;
  }

  .job-toggle-icon :global(svg) {
    height: 12px;
    width: 18px;
  }

  .job-item.expanded .job-toggle-icon {
    transform: rotate(180deg);
  }

  .job-team,
  .job-location {
    color: #000;
    font-family: "JetBrains Mono", monospace;
    font-size: 1rem;
    line-height: 1.2;
  }

  .job-team {
    border: 1px solid #000;
    display: inline-block;
    flex: none;
    opacity: 0.65;
    padding: 0.25rem 0.5rem;
  }

  .job-location {
    margin-top: 0.75rem;
    opacity: 0.65;
    text-transform: uppercase;
  }

  .job-actions {
    align-items: stretch;
    display: flex;
    flex: none;
    gap: 0.5rem;
  }

  .share-button {
    align-items: center;
    background: transparent;
    border: 1px solid #000;
    color: #000;
    cursor: pointer;
    display: flex;
    flex: none;
    justify-content: center;
    padding: 0;
    transition: opacity 0.2s;
    width: 2.55rem;
  }

  .share-button:hover,
  .share-button:focus-visible {
    opacity: 0.6;
  }

  .share-button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .share-button :global(svg) {
    height: 20px;
    width: 20px;
  }

  .apply-wrap {
    display: flex;
    flex: none;
    position: relative;
  }

  .email-tooltip {
    background: #000;
    bottom: calc(100% + 0.625rem);
    color: #fff;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.875rem;
    line-height: 1.2;
    padding: 0.5rem 0.75rem;
    position: absolute;
    right: 0;
    white-space: nowrap;
    z-index: 2;
  }

  .email-tooltip::after {
    border: 6px solid transparent;
    border-top-color: #000;
    content: "";
    position: absolute;
    right: 1.5rem;
    top: 100%;
  }

  .apply-button {
    background: #000;
    border: 0;
    color: #fff;
    cursor: pointer;
    flex: none;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.8px;
    line-height: 1.2;
    padding: 0.75rem 1rem;
    text-decoration: none;
    text-transform: uppercase;
    transition: opacity 0.2s;
    white-space: nowrap;
  }

  .apply-button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .apply-button:hover,
  .apply-button:focus-visible {
    opacity: 0.8;
  }

  .job-panel {
    margin-top: 1.25rem;
  }

  .job-description {
    color: #000;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.45;
    margin-bottom: 1.5rem;
  }

  .job-qualifications {
    color: #000;
    font-family: "JetBrains Mono", monospace;
    font-size: 1.0625rem;
    line-height: 1.25;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  }

  .job-item ul {
    color: #000;
    margin: 0 0 10px;
    padding-left: 2.5rem;
  }

  .job-item li {
    color: #000;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.45;
    margin-bottom: 0;
  }

  .job-how-to-apply {
    margin-top: 1.5rem;
  }

  .job-how-to-apply .job-qualifications {
    margin-bottom: 0.75rem;
  }

  .job-how-to-apply p {
    color: #000;
    font-size: 1.125rem;
    line-height: 1.45;
    margin: 0;
  }

  .job-how-to-apply :global(a) {
    color: #000;
    text-decoration: underline;
    text-underline-offset: 0.15em;
  }

  @media screen and (max-width: 1024px) {
    .jobs-hero h1 {
      font-size: 3rem;
    }

    .split-grid,
    .photo-grid,
    .challenge-grid,
    .openings-grid {
      grid-template-columns: 1fr;
    }

    .split-grid,
    .challenge-grid,
    .openings-grid {
      gap: 2rem;
    }

    .video-shell {
      min-height: 0;
      max-height: none;
    }

    .photo-grid {
      gap: 2rem;
    }

    .job-header {
      align-items: flex-start;
      flex-wrap: wrap;
    }

    .job-toggle {
      align-items: flex-start;
    }

    .openings-intro {
      position: static;
    }
  }

  @media screen and (max-width: 768px) {
    .jobs-page {
      --jobs-container: calc(100vw - 2rem);
      --jobs-section-y: 3.5rem;
    }

    .jobs-hero {
      min-height: auto;
      padding-top: 3rem;
      padding-bottom: 2rem;
    }

    .jobs-hero h1 {
      font-size: 2.4rem;
      max-width: none;
    }

    .jobs-intro {
      padding-top: 2.5rem;
      padding-bottom: 3rem;
    }

    .section-title {
      font-size: 1.45rem;
      font-weight: 700;
      line-height: 1.12;
      max-width: 100%;
    }

    .large-text,
    .body-copy,
    .challenge-copy,
    .trait-card p {
      font-size: 1rem;
      max-width: 100%;
      overflow-wrap: normal;
    }

    .section-spacer {
      height: 3rem;
    }

    .quote blockquote {
      font-size: 1.35rem;
    }

    .quote figcaption {
      font-size: 1rem;
      margin-top: 1.5rem;
    }

    .quote-controls {
      grid-template-columns: 44px 1fr 44px;
    }

    .quote-arrow {
      height: 44px;
      width: 44px;
    }

    .traits-grid {
      grid-template-columns: 1fr;
    }

    .trait-card {
      padding: 2rem 1.25rem;
    }

    .trait-card + .trait-card {
      border-left: 0;
      border-top: 1px solid #000;
    }

    .challenge-section h2 {
      font-size: 1.875rem;
    }

    .benefit-item span {
      font-size: 1rem;
      margin-left: 0.5rem;
    }

    .benefit-item img {
      height: 40px;
      width: 40px;
    }

    .openings-intro p {
      font-size: 1.25rem;
    }

    .openings-intro .section-title {
      font-size: 1.5rem;
    }

    .job-item {
      padding: 1.25rem 0;
    }

    .job-header {
      align-items: stretch;
      flex-direction: column;
    }

    .job-toggle {
      width: 100%;
    }

    .job-header-title {
      margin-bottom: 0;
      margin-right: 0;
    }

    .job-title {
      font-size: 1.5rem;
    }

    .job-title-line {
      column-gap: 0.5rem;
    }

    .job-location {
      display: none;
      margin-top: 0.5rem;
    }

    .job-actions {
      display: none;
    }

    .job-item.expanded .job-location {
      display: block;
    }

    .job-item.expanded .job-actions {
      display: flex;
    }

    .job-panel {
      margin-top: 1rem;
    }

    .job-team,
    .job-location {
      font-size: 0.875rem;
    }

    .apply-wrap {
      flex: 1;
    }

    .apply-button {
      flex: 1;
      text-align: center;
    }
  }
</style>
