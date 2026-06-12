/**
 * HarnessSelector.svelte behaviors (scope svelte-1dmkgpz; rows svelte-1c3kfyc)
 * over the server-rendered dropdown emitted by
 * layouts/partials/product/harness-selector.html.
 *
 * The partial prerenders the closed state plus ALL dropdown rows, and embeds
 * the per-row harness objects (1:1 with src/lib/utils/harnesses.js) in a
 * <script type="application/json" data-harness-config> tag inside the
 * .dropdown element: { label, placeholder, noHarnessOption, items: [...] }.
 * Row N of .dropdown-content pairs with metadata entry N (the optional
 * NO_HARNESS row first, then `items` in order).
 *
 *   const hs = initHarnessSelector({
 *     root,                 // the .dropdown element
 *     onChange,             // (selection|null) -> void; Product pages pass
 *                           //   handleVariantSelection, comma-four its own
 *     hideSupportNoteCard,  // default false
 *     restoreSelection,     // default false (true only on /setup)
 *   });
 *   hs.setStock(map)            // variantId -> {currentlyNotInStock, availableForSale}
 *                               //   merged into the harness items (call after
 *                               //   the runtime product fetch)
 *   hs.setInitialSelection()    // ?harness= / NO_HARNESS / selectedCar restore —
 *                               //   call AFTER setStock (matches the original
 *                               //   "$harnesses filled" timing)
 *   hs.setSelection(item)       // imperative API (CommaFour ?trade-in=1)
 *   hs.items                    // the metadata array (live; stock merged in)
 *
 * Quirks kept on purpose:
 *   - filter input is used as a REGEX via String.match(); a syntax error
 *     (typing "(") leaves the list stale, exactly like the original
 *   - decodeURIComponent(null) === "null" on the ?harness= read
 *   - ?harness= values are double-encoded via URLSearchParams.set(encodeURIComponent(car))
 *   - selecting writes localStorage.selectedCar, clearing removes it
 *   - Escape closes via the leaky clickOutside action
 */
import { clickOutside } from './click-outside.js';
import { get, selectedCar } from './cart.js';

// src/lib/constants/vehicles.js — NOTE the U+2011 non-breaking hyphen
export const NO_HARNESS_OPTION = { car: 'I already have a car harness (‑$50)' };

// src/lib/icons/ui/close.svg (?raw import — shipped inside the JS bundle)
const CLOSE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<line x1="18" y1="6" x2="6" y2="18"></line>
<line x1="6" y1="6" x2="18" y2="18"></line>
</svg>
`;

// src/lib/icons/features/car.svg
const CAR_ICON = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M25.2267 6.67998C24.96 5.89331 24.2133 5.33331 23.3333 5.33331H8.66667C7.78667 5.33331 7.05333 5.89331 6.77333 6.67998L4 14.6666V25.3333C4 26.0666 4.6 26.6666 5.33333 26.6666H6.66667C7.4 26.6666 8 26.0666 8 25.3333V24H24V25.3333C24 26.0666 24.6 26.6666 25.3333 26.6666H26.6667C27.4 26.6666 28 26.0666 28 25.3333V14.6666L25.2267 6.67998ZM8.66667 20C7.56 20 6.66667 19.1066 6.66667 18C6.66667 16.8933 7.56 16 8.66667 16C9.77333 16 10.6667 16.8933 10.6667 18C10.6667 19.1066 9.77333 20 8.66667 20ZM23.3333 20C22.2267 20 21.3333 19.1066 21.3333 18C21.3333 16.8933 22.2267 16 23.3333 16C24.44 16 25.3333 16.8933 25.3333 18C25.3333 19.1066 24.44 20 23.3333 20ZM6.66667 13.3333L8.66667 7.33331H23.3333L25.3333 13.3333H6.66667Z" fill="currentColor" />
</svg>
`;

// Normalize diacritics for matching (e.g., "Škoda" -> "Skoda")
function normalizeDiacritics(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function buildDropdownItem(value, selected) {
  const el = document.createElement('div');
  el.className = 'dropdown-item svelte-1c3kfyc';
  el.setAttribute('role', 'option');
  el.setAttribute('aria-selected', String(!!selected));
  el.tabIndex = 0;

  const info = document.createElement('div');
  info.className = 'item-info svelte-1c3kfyc';
  const title = document.createElement('div');
  title.className = 'title svelte-1c3kfyc';
  title.textContent = value && value.car;
  info.append(title, ' ');
  if (value && value.title) {
    const subtitle = document.createElement('div');
    subtitle.className = 'subtitle svelte-1c3kfyc';
    subtitle.textContent = `Harness: ${value.title}`;
    info.appendChild(subtitle);
  }

  const accessory = document.createElement('div');
  accessory.className = 'accessory-label svelte-1c3kfyc';

  el.append(info, ' ', accessory, ' ');
  return el;
}

export function initHarnessSelector({
  root,
  onChange = () => {},
  hideSupportNoteCard = false,
  restoreSelection = false,
} = {}) {
  if (!root) return null;

  const config = JSON.parse(root.querySelector('script[data-harness-config]').textContent);
  const items = config.items;
  const head = root.firstElementChild;
  const chevron = head.querySelector('.chevron');
  const placeholderEl = head.querySelector('.selection-placeholder');
  const content = root.querySelector('.dropdown-content');

  // pair prerendered rows with metadata, in DOM order. Pages whose dropdown
  // shipped empty in the old build (/setup — prerenderRows false) get their
  // row elements built here but only mounted once the stock fetch resolves,
  // matching the original "$harnesses filled" timing.
  const rowEls = Array.from(content.querySelectorAll('.dropdown-item'));
  const prerendered = rowEls.length > 0;
  let mounted = prerendered;
  const entries = [];
  if (config.noHarnessOption) {
    entries.push({ item: NO_HARNESS_OPTION, el: prerendered ? rowEls[0] : buildDropdownItem(NO_HARNESS_OPTION, false) });
  }
  items.forEach((item, i) => {
    entries.push({
      item,
      el: prerendered ? rowEls[i + (config.noHarnessOption ? 1 : 0)] : buildDropdownItem(item, false),
    });
  });
  // filtering only ever runs over $harnesses (NO_HARNESS row is excluded)
  const itemEntries = config.noHarnessOption ? entries.slice(1) : entries;

  /* state */
  let selection; // undefined until first change (initial state never fires onChange)
  let menuOpen = false;
  let inputValue = '';

  /* open-state nodes */
  const clearBtn = document.createElement('button');
  clearBtn.className = 'clear svelte-1dmkgpz';
  clearBtn.innerHTML = CLOSE_ICON;
  clearBtn.addEventListener('click', handleClear);

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = config.placeholder;
  input.autocomplete = 'off';
  input.className = 'search-input svelte-1dmkgpz';
  input.setAttribute('style', 'padding: 14px 3rem');
  input.addEventListener('input', () => {
    inputValue = input.value;
    renderRows();
  });
  input.addEventListener('click', () => { menuOpen = true; });
  input.addEventListener('focus', () => { menuOpen = true; });

  let noMatchEl = null;
  let supportCard = null;

  function renderHead() {
    while (head.firstChild !== chevron) head.removeChild(head.firstChild);
    if (menuOpen) {
      input.value = inputValue;
      head.insertBefore(clearBtn, chevron);
      head.insertBefore(input, chevron);
    } else if (selection) {
      const selectedEl = buildDropdownItem(selection, true);
      selectedEl.addEventListener('click', handleSelectClick);
      selectedEl.addEventListener('keydown', handleSelectKeyDown);
      head.insertBefore(clearBtn, chevron);
      head.insertBefore(selectedEl, chevron);
    } else {
      head.insertBefore(placeholderEl, chevron);
    }
    content.classList.toggle('show', menuOpen);
  }

  function renderRows() {
    if (inputValue !== '') {
      let filtered;
      try {
        const needle = normalizeDiacritics(inputValue.toLowerCase());
        // before the rows are mounted the original filtered an empty
        // $harnesses array -> "No matching vehicles"
        filtered = (mounted ? itemEntries : []).filter(entry =>
          normalizeDiacritics(entry.item.car.toLowerCase()).match(needle)
        );
      } catch (e) {
        // String.match() treats the input as a regex; a syntax error made the
        // original's reactive filter throw, leaving the list stale — replicate
        return;
      }
      content.textContent = '';
      if (filtered.length > 0) {
        filtered.forEach(entry => content.appendChild(entry.el));
      } else {
        if (!noMatchEl) noMatchEl = buildDropdownItem({ car: 'No matching vehicles' }, false);
        content.appendChild(noMatchEl);
      }
    } else {
      content.textContent = '';
      if (mounted) entries.forEach(entry => content.appendChild(entry.el));
    }
  }

  // first $harnesses fill on client-rendered dropdowns (no prerendered rows)
  function mountRows() {
    if (mounted) return;
    mounted = true;
    renderRows();
  }

  function renderSupportCard() {
    if (supportCard) {
      supportCard.remove();
      supportCard = null;
    }
    if (selection && selection.package && !hideSupportNoteCard) {
      const html = selection.package === 'All'
        ? 'openpilot will work with <strong>all packages and trims</strong> of this car.'
        : `openpilot requires <strong>${selection.car}</strong> to come equipped with <strong>${selection.package}</strong>.`;
      supportCard = document.createElement('div');
      supportCard.className = 'card svelte-1328bir';
      supportCard.innerHTML = `<div class="icon-slot"> ${CAR_ICON} </div> <hgroup><span>Support</span> <div>${html}</div></hgroup> `;
      root.after(supportCard);
    }
  }

  function updateQueryParams(selectedHarness) {
    const searchParams = new URLSearchParams();
    if (selectedHarness) {
      searchParams.set('harness', encodeURIComponent(selectedHarness.car));
    }
    // goto(`?${...}`, { keepfocus: true, replaceState: true, noScroll: true })
    history.replaceState(history.state, '', `?${searchParams.toString()}`);
  }

  // the `$: if (selection !== undefined)` reactive block
  function applySelection(newSelection) {
    selection = newSelection;
    onChange(selection);
    updateQueryParams(selection);
    if (selection && selection.car) {
      selectedCar.set(selection.car);
    } else {
      selectedCar.set('');
    }
    renderHead();
    renderSupportCard();
  }

  function handleSelectClick() {
    menuOpen = true;
    renderHead();
    input.focus();
  }

  function handleSelectKeyDown(e) {
    if (e.key === 'Enter') handleSelectClick();
  }

  function handleOptionClick(item) {
    menuOpen = false;
    applySelection(item);
  }

  function handleClear() {
    // clear search input or close menu
    if (!inputValue) {
      menuOpen = false;
    } else {
      inputValue = '';
      renderRows();
    }
    // clear harness selection
    applySelection(null);
    if (menuOpen) input.focus();
  }

  /* wire prerendered nodes */
  placeholderEl.addEventListener('click', handleSelectClick);
  placeholderEl.addEventListener('keydown', handleSelectKeyDown);
  entries.forEach(entry => {
    entry.el.addEventListener('click', () => handleOptionClick(entry.item));
    entry.el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleOptionClick(entry.item);
    });
  });
  clickOutside(root);
  root.addEventListener('clickOutside', () => {
    menuOpen = false;
    renderHead();
  });

  function setStock(stockInfo) {
    items.forEach(item => {
      const stock = stockInfo[item.id];
      if (stock) Object.assign(item, stock);
    });
    mountRows();
  }

  function setInitialSelection() {
    mountRows();
    // param absent -> decodeURIComponent(null) -> the string "null" (kept)
    const carName = decodeURIComponent(new URLSearchParams(location.search).get('harness'));

    if (carName === NO_HARNESS_OPTION.car) {
      applySelection(NO_HARNESS_OPTION);
      return;
    }

    let foundHarness = items.find(harness => harness.car === carName);
    if (!foundHarness && restoreSelection && get(selectedCar)) {
      foundHarness = items.find(harness => harness.car === get(selectedCar));
    }
    if (foundHarness) {
      applySelection(foundHarness);
    }
  }

  return {
    items,
    setStock,
    setInitialSelection,
    setSelection: applySelection,
  };
}
