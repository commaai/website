<script>
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  import { tick } from 'svelte';
  import { clickOutside } from '$lib/utils/clickOutside';
  import { allHarnesses, vehicleHarnesses, genericHarnesses } from '$lib/utils/harnesses';
  import { selectedCar } from '../../../store';
  import { NO_HARNESS_OPTION, NO_HARNESS_LEGACY_NAMES } from '$lib/constants/vehicles.js';

  import NoteCard from '$lib/components/NoteCard.svelte';
  import DropdownItem from './HarnessDropdownItem.svelte';

  import ArrowRight from '$lib/icons/arrow-right.svg?raw';
  import ChevronIcon from '$lib/icons/icon-chevron.svg?raw';
  import SearchIcon from '$lib/icons/ui/search.svg?raw';
  import CloseIcon from '$lib/icons/ui/close.svg?raw';
  import CarIcon from '$lib/icons/features/car.svg?raw';

  export let onChange;

  export let label = "Select vehicle";
  export let sublabel = null;
  export let prominent = false; // outlined in accent green, for when picking a car is the next step
  export let placeholder = "Search for a vehicle or harness";
  export let showNoHarnessOption = false; // shows "I already have a harness" option
  export let showVehicleHarnesses = true; // If true, includes the harnesses by each vehicle model
  export let showGenericHarnesses = true; // If true, includes the generic/developer harnesses
  export let hideSupportNoteCard = false;
  export let restoreSelection = false;

  let selection = undefined

  export function setSelection(newSelection) {
    selection = newSelection;
  }

  // Bring the selector into view with its search open, e.g. when a disabled buy button is tapped
  export async function open() {
    document.getElementById('harness-selector')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    menuOpen = true;
    await tick();
    inputRef?.focus({ preventScroll: true });
  }

  // Load harnesses based on the options
  $: harnesses = showVehicleHarnesses && showGenericHarnesses ? allHarnesses : showVehicleHarnesses ? vehicleHarnesses : genericHarnesses;
  $: if (browser && $harnesses.length > 0) setInitialSelection();
  $: if (selection !== undefined) {
    // Don't update w/ initial state
    onChange(selection);
    updateQueryParams(selection);

    // Remember the selection in local storage
    if (selection?.car) {
      selectedCar.set(selection.car);
    } else {
      selectedCar.set('');
    }
  }

  function updateQueryParams(selectedHarness) {
    const searchParams = new URLSearchParams($page.url.searchParams);
    if (selectedHarness) {
      searchParams.set("harness", encodeURIComponent(selectedHarness.car));
    } else {
      searchParams.delete("harness");
    }

    // https://github.com/sveltejs/kit/discussions/3245#discussioncomment-1931570
    if (browser) {
      goto(`?${searchParams.toString()}`, { keepfocus: true, replaceState: true, noScroll: true });
    }
  }

  const setInitialSelection = () => {
    let carName = decodeURIComponent($page.url.searchParams.get('harness'));

    if (carName === NO_HARNESS_OPTION.car || NO_HARNESS_LEGACY_NAMES.includes(carName)) {
      selection = NO_HARNESS_OPTION;
      return;
    }

    // Parent may set selection, don't override if no harness param
    let foundHarness = $harnesses.find(harness => harness.car === carName);
    if (!foundHarness && restoreSelection && $selectedCar) {
      foundHarness = $harnesses.find(harness => harness.car === $selectedCar);
    }
    if (foundHarness) {
      selection = foundHarness;
    }
  }

  // Strip diacritics and punctuation ("Škoda" -> "skoda", "CR-V" -> "crv")
  function normalize(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9\s]/g, '');
  }

  // Common misspellings and shorthands
  const SEARCH_ALIASES = Object.entries({
    ev: 'electri',  // electric and electrified
    bev: 'electri',
    vw: 'volkswagen',
    chevy: 'chevrolet',
    subie: 'subaru',
    obd2: 'obdii',

    hundai: 'hyundai',
    hyndai: 'hyundai',
    hyundia: 'hyundai',
    huyndai: 'hyundai',
    volkswagon: 'volkswagen',
    wolksvagen: 'volkswagen',
    volkwagen: 'volkswagen',
    totota: 'toyota',
    toyata: 'toyota',
    telsa: 'tesla',
    chevorlet: 'chevrolet',
    leksus: 'lexus',
    auddi: 'audi',
    jeeep: 'jeep',
  });

  /* Filtered Dropdown */
  let inputValue = "";
  let inputRef;

  // Edits to turn a into b, where swapping two neighboring letters counts as one ("seinna" -> "sienna")
  function editDistance(a, b) {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
        }
      }
    }
    return d[a.length][b.length];
  }

  // Closest any word (or its start, for half-typed words) comes to the term
  function closestDistance(term, words) {
    return Math.min(...words.map(word => Math.min(editDistance(term, word), editDistance(term, word.slice(0, term.length)))));
  }

  function searchText(item) {
    const make_model = normalize([item.make, item.model].filter(Boolean).join(' '));
    // "Ioniq 5" also matches "ioniq5", and "Model Y" matches "modely"
    const car = `${make_model} ${make_model.replace(/([a-z]) (?=[0-9])/g, '$1')} ${make_model.replace(/ /g, '')} ${item.yearList ?? ''}`;
    return { car, words: car.split(' ').filter(Boolean), aliases: SEARCH_ALIASES.filter(([, word]) => car.includes(word)) };
  }

  // Lower is a better match: 0 exact word, 1 starts the first word, 2 starts a later word or an alias, 3 inside a word,
  // 4 a model followed by a number ("rx350"), 5-6 a typo, null no match. 4 and up are only guesses ("volt" is not a "bolt").
  function termScore(term, { car, words, aliases }) {
    const padded = ` ${car} `;
    if (padded.includes(` ${term} `)) return 0;
    if (car.startsWith(term)) return 1;
    if (padded.includes(` ${term}`) || aliases.some(([alias]) => alias.startsWith(term))) return 2;
    if (car.includes(term)) return 3;
    const letters = term.match(/^([a-z]+)[0-9]+$/)?.[1];
    if (letters?.length >= 2 && words.includes(letters)) return 4;
    // typos, but never in years or other numbers
    if (term.length >= 4 && !/[0-9]/.test(term)) {
      const distance = closestDistance(term, words);
      if (distance <= (term.length >= 7 ? 2 : 1)) return 4 + distance;
    }
    return null;
  }

  const EXACT_SCORE = 3;
  const isYear = term => /^(19|20)[0-9]{2}$/.test(term);

  // A word that doesn't match (a trim like "se" or "xle", a year that isn't supported) costs a car instead of hiding it.
  // People type the model before the trim, so missing an earlier word costs more ("civic sport" is a Civic, not a Bronco Sport),
  // and a missed year costs least ("2018 cx-9" is a CX-9, not a 2018 Acura).
  function searchScore(item, terms) {
    const text = searchText(item);
    const termScores = terms.map(term => termScore(term, text));
    return {
      matched: termScores.some(score => score !== null),
      exact: termScores.every(score => score !== null && score <= EXACT_SCORE),
      missed: termScores.reduce((total, score, i) => total + (score !== null ? 0 : isYear(terms[i]) ? 0.5 : terms.length - i), 0),
      score: termScores.reduce((total, score) => total + (score ?? 0), 0),
      text,
    };
  }

  const MAX_CLOSEST = 5;

  $: searchTerms = normalize(inputValue).split(/\s+/).filter(Boolean);
  $: scores = new Map($harnesses.map(item => [item, searchScore(item, searchTerms)]));
  // Cars matching every word exactly if there are any. Otherwise the closest tier, the ones missing the least,
  // and failing that a few that look like the search. Generic harnesses have no make and rank after every car.
  $: exactItems = $harnesses.filter(item => scores.get(item).exact);
  $: fewestMissed = Math.min(...$harnesses.filter(item => scores.get(item).matched).map(item => scores.get(item).missed));
  $: closeItems = $harnesses.filter(item => scores.get(item).matched && scores.get(item).missed === fewestMissed);
  $: exactMatch = exactItems.length > 0;
  $: filteredItems = (exactMatch ? exactItems : closeItems.length > 0 ? closeItems : lookalikeItems($harnesses, searchTerms))
    .sort((a, b) => !a.make - !b.make || scores.get(a).score - scores.get(b).score);

  // The cars that look most like the search, however far off it is. Ties go to words starting with the same letter ("tyta" is a Toyota, not an Octavia).
  function lookalikeItems(items, terms) {
    const termDistance = (term, words) => Math.min(...words.map(word => closestDistance(term, [word]) + (word[0] === term[0] ? 0 : 0.5)));
    const distance = item => terms.reduce((total, term) => total + termDistance(term, scores.get(item).text.words), 0);
    return items.filter(item => item.make)
      .map(item => [item, distance(item)])
      .sort((a, b) => a[1] - b[1])
      .slice(0, MAX_CLOSEST)
      .map(([item]) => item);
  }

  const handleClear = () => {
    // clear search input or close menu
    if (!inputValue) {
      menuOpen = false;
    } else {
      inputValue = "";
      inputRef?.focus();
    }

    // clear harness selection
    selection = null;
  }

  const handleClearText = () => {
    inputValue = "";
    inputRef?.focus();
  }

  /* Dropdown Options */
  let menuOpen = false;
  let filteredItems = [];

  const handleSelectClick = async () => {
    menuOpen = true;
    await tick();
    inputRef?.focus();
  }

  const handleSelectKeyDown = (e) => { if (e.key === 'Enter') { handleSelectClick(); } }

  const handleOptionClick = (item) => {
    selection = item;
    menuOpen = false;
  }

  const handleOptionKeyDown = (e, item) => { if (e.key === 'Enter') { handleOptionClick(item); } }
</script>

<div class="dropdown" id="harness-selector" use:clickOutside on:clickOutside={() => menuOpen = false}>
  <div>
    {#if menuOpen}
      <span class="search-icon">{@html SearchIcon}</span>
      <input
        type="text"
        placeholder={placeholder}
        autocomplete="off"
        class="search-input"
        bind:value={inputValue}
        bind:this={inputRef}
        on:click={() => menuOpen = true}
        on:focus={() => menuOpen = true}
      />
    {:else if selection}
      <button class="clear" on:click={handleClear}>{@html CloseIcon}</button>
      <DropdownItem
        value={selection}
        on:click={handleSelectClick}
        on:keydown={handleSelectKeyDown}
        selected={true}
      >
        <slot name="accessoryLabel"/>
      </DropdownItem>
    {:else}
      <div class="selection-placeholder" class:prominent on:click={handleSelectClick} on:keydown={handleSelectKeyDown} role="button" tabindex="0">
        <div class="label type-strong" class:type-body={!prominent} class:type-large={prominent}>
          {label}
          {#if sublabel}<span class="sublabel type-small type-regular">{sublabel}</span>{/if}
        </div>
        <div class="accessory">
          <slot name="accessoryLabel"/>
        </div>
      </div>
    {/if}
    {#if menuOpen && inputValue}
      <button class="end-icon" aria-label="Clear search" on:click={handleClearText}>{@html CloseIcon}</button>
    {:else if menuOpen}
      <button class="end-icon chevron open" aria-label="Close" on:click={() => menuOpen = false}>{@html ChevronIcon}</button>
    {:else}
      <span class="end-icon chevron">{@html ChevronIcon}</span>
    {/if}
  </div>
  <div class="dropdown-content" id="harness-options" class:show={menuOpen}>
    {#if searchTerms.length > 0}
      {#if !exactMatch && filteredItems.length > 0}
        <div class="closest-note type-small">No exact match for <strong>{inputValue}</strong>. Closest:</div>
      {/if}
      {#each filteredItems as item}
        <DropdownItem value={item} on:click={() => handleOptionClick(item)} on:keydown={(e) => handleOptionKeyDown(e, item)} />
      {/each}
      {#if !exactMatch}
        <DropdownItem value={{ car: filteredItems.length > 0 ? "Don't see your car?" : 'No matching vehicles' }} href="/vehicles?car={encodeURIComponent(inputValue)}#email-updates">
          <svelte:fragment slot="subtitle">
            Get an email when <strong>{inputValue}</strong> is supported
          </svelte:fragment>
          <span class="no-match-arrow">{@html ArrowRight}</span>
        </DropdownItem>
      {/if}
    {:else}
      {#if showNoHarnessOption}
      <DropdownItem value={NO_HARNESS_OPTION} on:click={() => handleOptionClick(NO_HARNESS_OPTION)} on:keydown={(e) => handleOptionKeyDown(e, NO_HARNESS_OPTION)} />
      {/if}
      {#each $harnesses as item}
        <DropdownItem value={item} on:click={() => handleOptionClick(item)} on:keydown={(e) => handleOptionKeyDown(e, item)} />
      {/each}
    {/if}
  </div>
</div>

{#if selection && selection.package && !hideSupportNoteCard}
  <NoteCard title="Support" icon={CarIcon}>
    {@html selection.package === 'All' ?
      'openpilot will work with <strong>all packages and trims</strong> of this car.' :
      `openpilot requires <strong>${selection.car}</strong> to come equipped with <strong>${selection.package}</strong>.`
    }
  </NoteCard>
{/if}


<style>
.dropdown {
  position: relative;
  display: inline-block;
  margin: 1.25rem auto 0;
  width: 100%;
}

.closest-note {
  padding: 0.75rem 1.5rem;
  color: rgba(0, 0, 0, 0.6);
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.no-match-arrow {
  display: block;
  margin-right: -26px;
}

.no-match-arrow :global(svg) {
  display: block;
  width: 20px;
  height: 20px;
}

/* thickened to match the chevron */
.no-match-arrow :global(path) {
  stroke: currentColor;
  stroke-width: 1px;
}

.dropdown-content {
  display: none;
  position: absolute;
  border: 1px solid #ddd;
  z-index: 1;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
}

.show {
  display:block;
}

.search-input {
  box-sizing: border-box;
  width: 100%;
  min-height: 84px;
  border: 1px solid #a0a0a0;
  padding: 14px 3rem;
  outline: none;

  &::placeholder {
    color: #656565;
  }
}

.selection-placeholder {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #222222;
  background-color: #fff;
  border: 1px solid #a0a0a0;
  padding: 1rem 3rem 1rem 1.5rem;
  box-sizing: border-box;
  min-height: 84px;
  transition: border-color 0.2s;

  &:hover {
    border-color: #464646;
  }

  & .label {
    color: #515151;
    text-wrap: balance;
  }

  &.prominent {
    border: 3px solid var(--color-accent);
    padding: calc(1rem - 2px) calc(3rem - 2px) calc(1rem - 2px) calc(1.5rem - 2px);

    &:hover {
      border-color: var(--color-accent-hover);
    }

    & .label {
      color: black;
    }
  }

  & .sublabel {
    display: block;
    margin-top: 0.25rem;
    color: rgba(0, 0, 0, 0.6);
  }

  & .accessory {
    text-wrap: nowrap;
  }
}

.end-icon {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  color: inherit;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

span.end-icon {
  pointer-events: none;
}

.chevron > :global(svg) {
  width: 18px;
  height: 12px;
}

.open > :global(svg) {
  transform: rotate(180deg);
}

.search-icon {
  position: absolute;
  left: 13px;
  height: 100%;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.clear {
  position: absolute;
  left: 13px;
  height: 100%;
  padding: 0;
  cursor: pointer;
  background-color: transparent;
  border: none;
}
</style>
