<script>
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  import { tick } from 'svelte';
  import { clickOutside } from '$lib/utils/clickOutside';
  import { allHarnesses, vehicleHarnesses, genericHarnesses } from '$lib/utils/harnesses';
  import { selectedCar } from '../../../store';
  import { NO_HARNESS_OPTION } from '$lib/constants/vehicles.js';

  import NoteCard from '$lib/components/NoteCard.svelte';
  import CarNote from '$lib/components/CarNote.svelte';
  import DropdownItem from './HarnessDropdownItem.svelte';

  import LinkArrow from "$lib/icons/link_arrow.svg?raw";
  import CloseIcon from '$lib/icons/ui/close-new.svg?raw';
  import CarIcon from '$lib/icons/features/car.svg?raw';
  import CheckIcon from "$lib/icons/ui/check.svg";

  export let onChange;

  export let label = "select vehicle";
  export let placeholder = "search for a vehicle or harness";
  export let showNoHarnessOption = false; // shows "I already have a harness" option
  export let showVehicleHarnesses = true; // If true, includes the harnesses by each vehicle model
  export let showGenericHarnesses = true; // If true, includes the generic/developer harnesses
  export let hideSupportNoteCard = false;

  let selection = undefined

  // Load harnesses based on the options
  $: harnesses = showVehicleHarnesses && showGenericHarnesses ? allHarnesses : showVehicleHarnesses ? vehicleHarnesses : genericHarnesses;
  $: if (browser && $harnesses.length > 0) setInitialSelection();
  $: if (selection !== undefined) {
    // Don't update w/ initial state
    onChange(selection);
    updateQueryParams(selection);

    // remember with cookie
    if (selection?.car) {
      selectedCar.set(selection.car);
    } else {
      selectedCar.set('');
    }
  }

  function updateQueryParams(selectedHarness) {
    const searchParams = new URLSearchParams();
    if (selectedHarness) {
      searchParams.set("harness", encodeURIComponent(selectedHarness.car));
    }

    // https://github.com/sveltejs/kit/discussions/3245#discussioncomment-1931570
    if (browser) {
      goto(`?${searchParams.toString()}`, { keepfocus: true, replaceState: true, noScroll: true });
    }
  }

  const setInitialSelection = () => {
    let carName = decodeURIComponent($page.url.searchParams.get('harness'));
    selection = $harnesses.find(harness => harness.car === carName) ?? null;
  }

  // Normalize diacritics for matching (e.g., "Škoda" -> "Skoda")
  function normalizeDiacritics(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  /* Filtered Dropdown */
  let inputValue = "";
  let inputRef;

  $: filteredItems = $harnesses.filter(item =>
    normalizeDiacritics(item.car.toLowerCase()).match(normalizeDiacritics(inputValue.toLowerCase()))
  );

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

<div class="dropdown" use:clickOutside on:clickOutside={() => menuOpen = false}>
  <div>
    {#if menuOpen}
      <input
        type="text"
        placeholder={placeholder}
        autocomplete="off"
        class="search-input"
        bind:value={inputValue}
        bind:this={inputRef}
        on:click={() => menuOpen = true}
        on:focus={() => menuOpen = true}
        style={menuOpen ? 'padding: 14px 4rem 14px 24px' : ''}
      />
    {:else if selection}
      <DropdownItem
        value={selection}
        on:click={handleSelectClick}
        on:keydown={handleSelectKeyDown}
        selected={true}
      >
        <slot name="accessoryLabel"/>
      </DropdownItem>
    {:else}
      <div class="selection-placeholder" on:click={handleSelectClick} on:keydown={handleSelectKeyDown} role="button" tabindex="0">
        <div class="label">{label}</div>
        <div class="accessory">
          <slot name="accessoryLabel"/>
        </div>
      </div>
    {/if}
    {#if menuOpen}
      <button class="chevron clear" on:click={handleClear}>{@html CloseIcon}</button>
    {:else if selection}
      <button class="chevron clear" on:click={handleClear}>{@html CloseIcon}</button>
    {:else}
      <span class="chevron">{@html LinkArrow}</span>
    {/if}
  </div>
  <div class="dropdown-content" class:show={menuOpen}>
    {#if inputValue !== ''}
      {#if filteredItems.length > 0}
        {#each filteredItems as item}
          <DropdownItem value={item} on:click={() => handleOptionClick(item)} on:keydown={(e) => handleOptionKeyDown(e, item)} />
        {/each}
      {:else}
        <DropdownItem value={{ car: 'No matching vehicles' }} />
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
  <div class="car-note-container">
    <CarNote image={CheckIcon} title="support">
      {@html selection.package === 'All' ?
        'openpilot will work with <strong>all packages and trims</strong> of this car.' :
        `openpilot requires <strong>${selection.car}</strong> to come equipped with <strong>${selection.package}</strong>.`
      }
    </CarNote>
  </div>
{/if}


<style>
.dropdown {
  position: relative;
  display: inline-block;
  margin: 1.25rem auto 0;
  width: 100%;
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

.car-note-container {
  background-color: #D9D9D9;
  margin-top: -1rem;
  padding: 1rem;
}

.show {
  display:block;
}

.search-input {
  box-sizing: border-box;
  width: 100%;
  min-height: 84px;
  border: none;
  padding: 14px;
  outline: none;
  font-size: 24px;
  background-color: rgb(217, 217, 217);

  &::placeholder {
    font-size: 24px;
    color: #656565;
  }
}

.selection-placeholder {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #222222;
  background-color: rgb(217, 217, 217);
  padding: 1rem 3rem 1rem 1.5rem;
  box-sizing: border-box;
  min-height: 84px;
  transition: border-color 0.2s;

  &:hover {
    border-color: #464646;
  }

  & .label {
    font-size: 24px;
    font-weight: 400;
    color: black;
    text-wrap: balance;
    text-decoration: underline;
  }

  & .accessory {
    font-size: 1.25rem;
    font-weight: 600;
    text-wrap: nowrap;
  }
}

.chevron {
  position: absolute;
  top: 48%;
  right: 13px;
  transform: translate(-50%, -50%) rotate(180deg);
  pointer-events: none;

  & > svg {
    width: 24px;
    height: 24px;
  }

  &.clear {
    pointer-events: auto;
    cursor: pointer;
    left: auto;
    right: 13px;
    transform: translate(-50%, -50%);
  }
}

.clear {
  display: flex;
  align-items: center;
  position: absolute;
  left: 1.15rem;
  height: 100%;
  padding: 0;
  cursor: pointer;
  background-color: transparent;
  border: none;
}
</style>
