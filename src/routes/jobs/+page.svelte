<script>
  import LinkButton from "$lib/components/LinkButton.svelte";
  import ArrowRightIcon from "$lib/icons/arrow-right.svg?raw";

  const ASSET_PATH = "/images/jobs";

  let activeQuote = 0;

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

  const traits = [
    {
      title: "Competitors",
      paragraphs: [
        "People who have done well at math competitions (USAMO, IMO, PUTNAM), competition programming (ACM, USACO, codejam, topcoder), science fairs (ISEF, STS), or capture the flag (DEFCON, secuinside, GITS).",
        "Competitions don't just select for ability, they also select for quickness. We are in a very competitive space.",
      ],
    },
    {
      title: "Contributors",
      paragraphs: [
        "People who have contributed value to open source projects.",
        "Show us your GitHub. Got stars? Code is never measured in quantity, but rather quality.",
        "We value those who can do more with less code; software engineering doesn't have an external selection pressure for low part count and cost like EE and ME, but you pay massive costs down the line in debugging and upkeep.",
      ],
    },
    {
      title: "Architects",
      paragraphs: [
        "People who can design good APIs and source layouts on the first try. This is crucial to working in teams and scaling.",
        "Before you do work, you should be able to explain to a contractor what you want done. ME has a great divide between design and machining that software lacks; we want to try to fix that.",
      ],
    },
  ];

  const benefits = [
    {
      icon: `${ASSET_PATH}/icon-jobs-benefit-health.svg`,
      text: "Health, dental, and vision insurance",
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
      title: "Senior Software Engineer",
      team: "openpilot & infrastructure",
      location: "On-site in San Diego, CA",
      description:
        "As part of the openpilot team, your responsibilities include developing new features, building simulation and testing infrastructure, and improving the tools our community uses to develop openpilot.",
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
      description:
        'As part of the openpilot team, you will be responsible for developing new features and maintaining our web applications (and their back-end), such as <a href="/connect">comma connect</a>.',
      qualifications: [
        "Fluent in JavaScript, HTML, CSS, Python, and MySQL",
        "Ability to independently write, test, and ship software to thousands of users",
        "Built and shipped applications using React",
        "Preferred: experience with Kubernetes or another container orchestrator (nomad, openshift, ECS)",
      ],
    },
    {
      title: "Car Interface Engineer",
      team: "openpilot",
      location: "On-site in San Diego, CA",
      description:
        "As a car interface engineer, you'll own the 250+ cars supported by openpilot. You'll build tools, tests, and infrastructure to expand and improve the quality of the fleet alongside our community. You'll also be responsible for evolving our safety model as openpilot becomes more capable.",
      qualifications: [
        "Fluent in Python and at least one system programming language (C, C++, Rust)",
        "Ability to independently write, test, and ship software to thousands of users",
        "Preferred: experience with ISO26262 and other automotive safety standards",
        "Having pull requests upstreamed to openpilot is a plus",
      ],
    },
    {
      title: "Production Engineer",
      team: "openpilot",
      location: "On-site in San Diego, CA",
      description:
        "As a production engineer, you'll help us build and ship a new class of consumer electronics. You'll own the testing infrastructure and be responsible for the reliability and quality of the hardware we ship.",
      qualifications: [
        "Experience with embedded systems",
        "Fluent in Python and at least one system programming language (C, C++, Rust)",
        "Know things about hardware, CI, and testing",
        "Having pull requests upstreamed to openpilot is a plus",
      ],
    },
    {
      title: "Senior Electronics Engineer",
      team: "openpilot",
      location: "On-site in San Diego, CA",
      description:
        "Do you know every component in a cell phone? We are hiring an electrical engineer who wants to reduce BOM cost of the comma 3X.",
      qualifications: [
        "Know things about hardware, RF and PCB design",
        "Ability to independently design, test and ship hardware",
        "Fluent in Python, Linux, Git and familiarity with C/C++",
        "High speed electronics design and designing for manufacturability experience preferred",
        "Preferred: experience with reverse engineering and sourcing parts",
      ],
    },
    {
      title: "Head of Production",
      team: "operations",
      location: "On-site in San Diego, CA",
      description:
        'As the Head of Production, you\'ll be responsible for building all the <a href="/shop/comma-four">comma 3Xs</a>, from managing the supply chain and getting all the parts to the office all the way to shipping the devices out.',
      qualifications: [
        "Know every part in a cellphone (aka a comma 3X)",
        "Know things about supply chain, reverse logistics, electronics, and testing",
        "Familiarity working in Linux, and ability to at least modify Python scripts",
        "Preferred: Chinese language skills",
      ],
    },
    {
      title: "Interface Designer",
      team: "operations",
      location: "On-site in San Diego, CA",
      description:
        "Do you like making software that is easy to use and that looks great? The main focus of this position is the openpilot interface, but work extends to all design at comma (website/product/visual design). Knowledge of the self driving car space is not required, but enthusiasm is appreciated. Ideally, you can concept, design, and deliver independently.",
      qualifications: [
        "Have designed interfaces",
        "Experience with iOS and Android design",
        "Ability to deliver a quality experience",
        "Strong design sense (UX/UI) and detail oriented",
      ],
    },
    {
      title: "Customer Service Engineer",
      team: "operations",
      location: "On-site in San Diego, CA",
      description:
        "Answer customer emails; resolve shop questions and requests; process orders, returns, and exchanges; create and improve existing support infrastructure.",
      qualifications: [
        "Excellent written communication skills",
        "Extensive knowledge of comma products and services",
        "Ideally, customer support experience",
      ],
    },
    {
      title: "Infrastructure Engineer",
      team: "operations",
      location: "On-site in San Diego, CA",
      description:
        "As an infrastructure engineer, you'll work on our tooling, regression tests, and simulator.",
      qualifications: [
        "Excellent Python and Linux skills, at least a familiarity with C/C++",
        "Having pull requests upstreamed to openpilot is a plus",
        "Know things about operating systems, CI, and testing",
      ],
    },
    {
      title: "Pick and Place Assembly Operator",
      team: "production",
      location: "On-site in San Diego, CA",
      description:
        "You will be responsible for operating the pick and place machinery to accurately position surface mount components onto printed circuit boards (PCB's).",
      qualifications: [
        "Previous experience operating pick and place machines in a manufacturing environment",
        "Knowledge of surface mount technology and component identification",
        "Ability to read and interpret production specifications and work instructions",
        "Strong problem-solving skills and ability to troubleshoot machinery",
      ],
    },
    {
      title: "Technician",
      team: "operations",
      location: "On-site in San Diego, CA",
      description:
        "You'll maintain the internal comma fleet of cars and the comma compute cluster. You'll also assemble and standup new clusters of tiny boxes.",
      qualifications: [
        "Good debugging skills",
        "Know how computers work",
        "Experience working in a datacenter is a plus",
      ],
    },
    {
      title: "Internships",
      location: "Paid and on-site in San Diego, CA",
      description:
        'Internships are for people we would like to hire but can\'t because school. We\'re looking for engineers working in electrical engineering, maps, ML, controls, car hacking, production, and operations. The best way to get an internship with us is to submit good PRs to projects on our GitHub. We also talk to people with under 25% error on our <a href="https://github.com/commaai/calib_challenge" target="_blank" rel="noreferrer">Calibration Challenge</a>. Want to know more about what internships with us are like? Check out <a href="https://vivekaithal.co/posts/summer-at-comma-ai/" target="_blank" rel="noreferrer">this blog post by a recent intern (now employee)</a>.',
      qualifications: [],
    },
  ];

  function showPreviousQuote() {
    activeQuote = (activeQuote - 1 + quotes.length) % quotes.length;
  }

  function showNextQuote() {
    activeQuote = (activeQuote + 1) % quotes.length;
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
      <a
        class="video-card"
        href="https://youtube.com/watch?v=dBWhN9ANrn4"
        target="_blank"
        rel="noreferrer"
      >
        <img
          class="play-icon"
          src={`${ASSET_PATH}/icon-play-square-large-white.svg`}
          alt=""
          aria-hidden="true"
        />
        <span class="video-copy">
          <span>Watch now</span>
          <strong>See how we work</strong>
        </span>
      </a>
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

  <section class="jobs-section" aria-labelledby="looking-for">
    <div class="container">
      <h2 id="looking-for" class="section-title">We Are Looking For</h2>
      <div class="traits-grid">
        {#each traits as trait}
          <article class="trait-card">
            <h3>{trait.title}</h3>
            {#each trait.paragraphs as paragraph}
              <p>{paragraph}</p>
            {/each}
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section class="challenge-section dark" aria-labelledby="challenge-title">
    <div class="container challenge-grid">
      <div>
        <p class="eyebrow">Programming challenge</p>
        <h2 id="challenge-title">Are you a good fit?</h2>
        <p class="challenge-copy">
          Great, email your resume and GitHub to us:
          <a href="mailto:work@comma.ai">work@comma.ai</a>.
          If you include a good solution to our
          <a href="https://github.com/commaai/calib_challenge" target="_blank" rel="noreferrer">programming challenge</a>
          in your e-mail, we'll take you much more seriously.
        </p>
        <p class="challenge-copy">
          After a programming challenge, we'll do a phone screen, and if that goes well, we will
          bring you out for a microinternship, where you'll meet the team and work on a real problem
          in our real codebase for a few days.
        </p>
        <LinkButton
          href="https://github.com/commaai/calib_challenge"
          target="_blank"
          style="secondary"
        >
          Try the calibration challenge
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

      <div>
        {#each jobs as job}
          <article class="job-item">
            <div class="job-header">
              <div class="job-header-title">
                <h3>{job.title}</h3>
                <div class="job-subtitle">
                  {#if job.team}
                    <span class="job-team">{job.team}</span>
                  {/if}
                  <span class="job-location">{job.location}</span>
                </div>
              </div>
              <a class="apply-button" href="mailto:work@comma.ai">Email Us</a>
            </div>

            <div class="job-description">{@html job.description}</div>

            {#if job.qualifications.length > 0}
              <div class="job-qualifications">Qualifications</div>
              <ul>
                {#each job.qualifications as qualification}
                  <li>{qualification}</li>
                {/each}
              </ul>
            {/if}
          </article>
        {/each}
      </div>
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
  .trait-card p,
  .job-description,
  .job-item li {
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

  .video-card {
    align-items: center;
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
      url("/images/jobs/theteam-optimized.jpeg");
    background-position: 0 0, 50% 50%;
    background-size: auto, cover;
    color: #fff;
    display: flex;
    aspect-ratio: 16 / 9;
    min-height: 24rem;
    max-height: 42rem;
    height: auto;
    justify-content: center;
    overflow: hidden;
    text-decoration: none;
    transition: opacity 0.2s;
    width: 100%;
  }

  .video-card:hover,
  .video-card:focus-visible {
    opacity: 0.92;
  }

  .play-icon {
    height: 64px;
    width: 64px;
  }

  .video-copy {
    border-left: 1px solid #fff;
    color: #fff;
    display: flex;
    flex-direction: column;
    margin-left: 1.25rem;
    padding-left: 1.25rem;
  }

  .video-copy span {
    color: #fff;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.2;
    text-transform: uppercase;
  }

  .video-copy strong {
    color: #fff;
    font-size: 2rem;
    font-weight: 400;
    line-height: 1.2;
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

  .trait-card p + p {
    margin-top: 1rem;
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

  .challenge-copy a,
  .job-description :global(a) {
    border-bottom: 2px solid var(--color-accent);
    text-decoration: none;
    transition: background-color 0.2s;
  }

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
    line-height: 1.2;
    margin: 1rem 0 0;
  }

  .job-item {
    border-bottom: 1px solid #000;
    margin-bottom: 3rem;
    padding-bottom: 3rem;
  }

  .job-item:last-child {
    margin-bottom: 0;
  }

  .job-header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }

  .job-header-title {
    flex: 1;
    margin-right: 1rem;
  }

  .job-header h3 {
    color: #000;
    font-size: 2rem;
    font-weight: 400;
    line-height: 1.2;
    margin: 0;
  }

  .job-subtitle {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 0.75rem;
  }

  .job-team,
  .job-location,
  .job-qualifications {
    color: #000;
    font-family: "JetBrains Mono", monospace;
    font-size: 1rem;
    line-height: 1.2;
  }

  .job-team {
    border: 1px solid #000;
    display: inline-block;
    opacity: 0.65;
    padding: 0.25rem 0.5rem;
  }

  .job-location {
    opacity: 0.65;
    text-transform: uppercase;
  }

  .apply-button {
    background: #000;
    color: #fff;
    flex: none;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.2;
    padding: 0.75rem 1rem;
    text-decoration: none;
    text-transform: uppercase;
    transition: opacity 0.2s;
  }

  .apply-button:hover,
  .apply-button:focus-visible {
    opacity: 0.8;
  }

  .job-description {
    margin-bottom: 1.5rem;
  }

  .job-qualifications {
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  }

  .job-item ul {
    color: #000;
    margin: 0;
    padding-left: 1.5rem;
  }

  .job-item li {
    margin-bottom: 0.45rem;
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

    .video-card {
      aspect-ratio: 4 / 3;
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

    .job-subtitle {
      align-items: flex-start;
      flex-direction: column;
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
    .trait-card p,
    .job-description,
    .job-item li {
      font-size: 1rem;
      max-width: 100%;
      overflow-wrap: normal;
    }

    .play-icon {
      height: 48px;
      width: 48px;
    }

    .video-copy {
      margin-left: 1rem;
      padding-left: 1rem;
    }

    .video-copy span {
      font-size: 0.875rem;
    }

    .video-copy strong {
      font-size: 1rem;
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

    .job-item {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
    }

    .job-header {
      align-items: stretch;
      flex-direction: column;
    }

    .job-header-title {
      margin-bottom: 1rem;
      margin-right: 0;
    }

    .job-header h3 {
      font-size: 1.5rem;
    }

    .job-team,
    .job-location,
    .job-qualifications {
      font-size: 0.875rem;
    }

    .apply-button {
      text-align: center;
    }
  }
</style>
