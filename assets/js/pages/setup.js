import '../main.js';
import { initHarnessSelector } from '../lib/harness-selector.js';
import { getProduct } from '../lib/shopify.js';
import { initFaq } from '../lib/faq.js';

/* /setup — src/routes/setup/+page.svelte behaviors:
   - vehicle picker (HarnessSelector with showGenericHarnesses=false,
     hideSupportNoteCard=true, restoreSelection=true) whose rows fill once the
     car-harness product fetch resolves (src/lib/utils/harnesses.js semantics)
   - onChange reveals the client-only .setup-notes panel (video / notes /
     checkmark fallback)
   - FAQ hash deep links (faq.devices accordions) */

// src/lib/utils/harnesses.js line 8
const CAR_HARNESS_PRODUCT_GID = 'gid://shopify/Product/4447447908415';

// src/lib/icons/ui/checkmark.svg (?raw import)
const CHECKMARK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24" fill="#51b124">
<path d="M0 0h24v24H0z" fill="none"></path>
<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
</svg>
`;

// +page.svelte lines 42-50, verbatim (console.warn + null on non-YouTube hosts)
function getVideoEmbedSrc(videoLink) {
  const url = new URL(videoLink);
  if (url.hostname !== 'youtu.be' && url.hostname !== 'www.youtube.com') {
    console.warn('Video not supported', videoLink);
    return null;
  }
  const videoId = url.searchParams.get('v') || url.pathname.slice(1);
  return `https://www.youtube.com/embed/${videoId}?rel=0&controls=1&autoplay=0&mute=0`;
}

const dropdown = document.querySelector('.vehicle-notes .dropdown');
let setupNotesEl = null;

// {#if selectedVehicle} block (+page.svelte lines 136-171), client-rendered
// exactly like the compiled Svelte fragments (no scope classes — the page CSS
// reaches it via `.vehicle-notes.svelte-6r52kx .setup-notes ...`).
function renderSetupNotes(vehicle) {
  if (setupNotesEl) {
    setupNotesEl.remove();
    setupNotesEl = null;
  }
  if (!vehicle) return;

  const grid = document.createElement('div');
  grid.className = 'grid svelte-7tyzqm';
  grid.classList.toggle('medium', true);
  for (const [prop, value] of [
    ['--columns', 2],
    ['--align-items', 'flex-start'],
    ['--column-gap', '3rem'],
    ['--row-gap', '1.5rem'],
    ['--wrapped-columns', 1],
    ['--template-columns', '1.25fr 0.75fr'],
    ['--lg-column-gap', '3rem'],
    ['--lg-template-columns', '1.25fr 0.75fr'],
  ]) {
    grid.style.setProperty(prop, value);
  }

  if (vehicle.setupVideo) {
    const block = document.createElement('div');
    const heading = document.createElement('p');
    heading.className = 'note-heading';
    heading.textContent = 'Setup Video:';
    const media = document.createElement('div');
    media.className = 'media-container';
    const iframe = document.createElement('iframe');
    const src = getVideoEmbedSrc(vehicle.setupVideo);
    if (src != null) iframe.setAttribute('src', src); // attr() removes when null
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'autoplay; encrypted-media');
    iframe.setAttribute('title', `${vehicle.car} setup guide`);
    media.appendChild(iframe);
    block.append(heading, ' ', media);
    grid.appendChild(block);
  }
  grid.appendChild(document.createTextNode(' '));
  if (vehicle.setupNotes.length > 0) {
    const block = document.createElement('div');
    const heading = document.createElement('p');
    heading.className = 'note-heading';
    heading.textContent = 'Setup Notes:';
    const list = document.createElement('ul');
    for (const note of vehicle.setupNotes) {
      const li = document.createElement('li');
      li.innerHTML = note;
      list.appendChild(li);
    }
    block.append(heading, ' ', list);
    grid.appendChild(block);
  }
  grid.appendChild(document.createTextNode(' '));
  if (vehicle.setupNotes.length === 0 && !vehicle.setupVideo) {
    const row = document.createElement('div');
    row.setAttribute('style', 'display: flex; align-items: center');
    const icon = document.createElement('div');
    icon.setAttribute('style', 'display: flex;');
    icon.innerHTML = CHECKMARK_ICON;
    const spacer = document.createElement('div');
    spacer.setAttribute('style', 'margin-right: 0.5rem');
    const text = document.createElement('p');
    text.textContent = 'Follow the guide below. There are no specific setup notes for your vehicle.';
    row.append(icon, ' ', spacer, ' ', text);
    grid.appendChild(row);
  }

  setupNotesEl = document.createElement('div');
  setupNotesEl.className = 'setup-notes';
  setupNotesEl.appendChild(grid);
  dropdown.after(setupNotesEl);
}

const harnessSelector = initHarnessSelector({
  root: dropdown,
  onChange: renderSetupNotes, // handleHarnessSelection
  hideSupportNoteCard: true,
  restoreSelection: true,
});

// src/lib/utils/harnesses.js initializeHarnesses(): one Storefront fetch fills
// the stores, which mounts the dropdown rows and triggers the initial restore
// (?harness= param, else localStorage.selectedCar). A failed fetch leaves the
// dropdown empty — same unhandled rejection as the original.
(async () => {
  const harnessResponse = await getProduct(CAR_HARNESS_PRODUCT_GID);
  const harnesses = harnessResponse.body?.data?.product?.variants?.nodes || [];
  const stockInfo = {};
  for (const harness of harnesses) {
    stockInfo[harness.id] = {
      currentlyNotInStock: harness.currentlyNotInStock,
      availableForSale: harness.availableForSale,
    };
  }
  harnessSelector.setStock(stockInfo);
  harnessSelector.setInitialSelection();
})();

initFaq();
