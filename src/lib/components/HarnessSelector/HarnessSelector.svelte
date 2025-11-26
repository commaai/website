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
  import DropdownItem from './HarnessDropdownItem.svelte';

  import ChevronIcon from '$lib/icons/icon-chevron.svg?raw';
  import CloseIcon from '$lib/icons/ui/close.svg?raw';
  import CarIcon from '$lib/icons/features/car.svg?raw';

  export let onChange;

  export let label = "Select vehicle";
  export let placeholder = "Search for a vehicle or harness";
  export let showNoHarnessOption = false; // shows "I already have a harness" option
  export let showVehicleHarnesses = true; // If true, includes the harnesses by each vehicle model
  export let showGenericHarnesses = true; // If true, includes the generic/developer harnesses
  export let hideSupportNoteCard = false;

  let selection = undefined

  export function setSelection(newSelection) {
    selection = newSelection;
  }

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

    if (carName === NO_HARNESS_OPTION.car) {
      selection = NO_HARNESS_OPTION;
      return;
    }

    // Parent may set selection, don't override if no harness param
    let foundHarness = $harnesses.find(harness => harness.car === carName);
    if (foundHarness) {
      selection = foundHarness;
    }
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
      <button class="clear" on:click={handleClear}>{@html CloseIcon}</button>
      <input
        type="text"
        placeholder={placeholder}
        autocomplete="off"
        class="search-input"
        bind:value={inputValue}
        bind:this={inputRef}
        on:click={() => menuOpen = true}
        on:focus={() => menuOpen = true}
        style={menuOpen ? 'padding: 14px 3rem' : ''}
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
      <div class="selection-placeholder" on:click={handleSelectClick} on:keydown={handleSelectKeyDown} role="button" tabindex="0">
        <div class="label">{label}</div>
        <div class="accessory">
          <slot name="accessoryLabel"/>
        </div>
      </div>
    {/if}
    <span class="chevron">{@html ChevronIcon}</span>
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
  padding: 14px;
  outline: none;
  font-size: 1rem;

  &::placeholder {
    font-size: 1rem;
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
    font-size: 1rem;
    font-weight: 600;
    color: #515151;
    text-wrap: balance;
  }

  & .accessory {
    font-size: 1.25rem;
    font-weight: 600;
    text-wrap: nowrap;
  }
}

.chevron {
  position: absolute;
  top: 50%;
  right: 13px;
  transform: translate(-50%, -50%);
  pointer-events: none;

  & > svg {
    width: 18px;
    height: 12px;
  }
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
