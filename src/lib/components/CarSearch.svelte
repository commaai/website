<script>
  import { browser } from "$app/environment";
  import { vehicleHarnesses } from '$lib/utils/harnesses';
  import { clickOutside } from '$lib/utils/clickOutside';
  import { selectedCar } from '../../store';
  import SearchIcon from "$lib/icons/ui/search.png";
  import CloseIcon from "$lib/icons/ui/close.svg?raw";

  // Search functionality
  let searchValue = "";
  let showDropdown = false;
  // Sync searchValue when store changes and dropdown is closed
  $: if (!showDropdown) searchValue = $selectedCar || "";
  let searchInputRef;
  let dropdownRef;
  let highlightedIndex = -1;

  // Get unique car names from vehicle harnesses only (excludes generic/developer harnesses)
  $: uniqueCars = $vehicleHarnesses
    ? [...new Set($vehicleHarnesses.map(harness => harness.car).filter(Boolean))].sort()
    : [];

  // Filter cars based on search input
  $: filteredCars = searchValue
    ? uniqueCars.filter(car => car.toLowerCase().includes(searchValue.toLowerCase()))
    : uniqueCars;

  // Reset highlighted index when filtered results change
  $: if (filteredCars.length > 0) {
    if (highlightedIndex >= filteredCars.length) {
      highlightedIndex = filteredCars.length - 1;
    }
  } else {
    highlightedIndex = -1;
  }

  // Save selected car
  function saveSelectedCar(car) {
    selectedCar.set(car);
    searchValue = car;
    showDropdown = false;
  }

  // Clear selection
  function clearSelection() {
    if (searchValue) {
      // If there's text, clear it
      searchValue = '';
      selectedCar.set('');
      searchInputRef?.focus();
    } else if (showDropdown) {
      // If no text but dropdown is open, close it
      showDropdown = false;
      highlightedIndex = -1;
      // Restore selected car if it exists
      if ($selectedCar) {
        searchValue = $selectedCar;
      }
    }
  }

  // Handle search input
  function handleSearchInput(e) {
    searchValue = e.target.value;
    showDropdown = true;
    highlightedIndex = -1;
  }

  // Handle search input focus
  function handleSearchFocus() {
    // Clear search to show all cars when focusing
    if (!searchValue || searchValue === $selectedCar) {
      searchValue = "";
    }
    showDropdown = true;
    highlightedIndex = 0;
  }

  // Handle click outside
  function handleClickOutside() {
    showDropdown = false;
    highlightedIndex = -1;
    // Restore selected car if user didn't make a selection
    if ($selectedCar && searchValue !== $selectedCar) {
      searchValue = $selectedCar;
    }
  }

  // Scroll highlighted item into view
  function scrollIntoView(index) {
    if (dropdownRef && index >= 0 && index < filteredCars.length) {
      const items = dropdownRef.querySelectorAll('.search-dropdown-item');
      if (items[index]) {
        items[index].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }

  // Handle keyboard navigation
  function handleSearchKeyDown(e) {
    if (e.key === 'Escape') {
      showDropdown = false;
      highlightedIndex = -1;
      searchInputRef?.blur();
      return;
    }

    if (!showDropdown || filteredCars.length === 0) {
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightedIndex = highlightedIndex < filteredCars.length - 1 ? highlightedIndex + 1 : 0;
      scrollIntoView(highlightedIndex);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightedIndex = highlightedIndex > 0 ? highlightedIndex - 1 : filteredCars.length - 1;
      scrollIntoView(highlightedIndex);
      return;
    }

    if (e.key === 'Enter' && highlightedIndex >= 0 && highlightedIndex < filteredCars.length) {
      e.preventDefault();
      saveSelectedCar(filteredCars[highlightedIndex]);
      return;
    }
  }

  // Handle dropdown item keyboard
  function handleDropdownItemKeyDown(e, car) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      saveSelectedCar(car);
    }
  }
</script>

<div class="car-search" use:clickOutside on:clickOutside={handleClickOutside}>
  <input
    type="text"
    placeholder="find your car"
    class="search-input"
    class:has-clear={$selectedCar}
    class:search-mode={showDropdown || searchValue.length > 0}
    bind:value={searchValue}
    bind:this={searchInputRef}
    on:input={handleSearchInput}
    on:focus={handleSearchFocus}
    on:keydown={handleSearchKeyDown}
  />
  <img src={SearchIcon} alt="search" class="search-icon" />
  {#if showDropdown || $selectedCar}
    <button
      class="search-clear"
      on:click={clearSelection}
      aria-label="Clear selection"
    >
      {@html CloseIcon}
    </button>
  {/if}
  {#if showDropdown}
    <div class="search-dropdown" bind:this={dropdownRef}>
      {#if filteredCars.length > 0}
        {#each filteredCars as car, index}
          <div
            class="search-dropdown-item"
            class:highlighted={highlightedIndex === index}
            role="option"
            aria-selected={$selectedCar === car || highlightedIndex === index}
            tabindex="-1"
            on:click={() => saveSelectedCar(car)}
            on:keydown={(e) => handleDropdownItemKeyDown(e, car)}
            on:mouseenter={() => highlightedIndex = index}
          >
            {car}
          </div>
        {/each}
      {:else if searchValue}
        <div class="search-dropdown-item search-dropdown-no-results">
          Car not found
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .car-search {
    display: flex;
    align-items: center;
    position: relative;
    min-width: 300px;
    flex: 1;
    width: 100%;

    @media only screen and (max-width: 1080px) {
      min-width: 0;
    }

    & .search-input {
      background: transparent;
      border: none;
      color: #ffffff;
      font-family: Inter, sans-serif;
      font-size: 1.125rem;
      padding: 1.0rem 4.5rem 1.0rem 1.75rem;
      outline: none;
      text-align: right;
      transition: color 0.2s;
      min-width: 300px;
      text-overflow: ellipsis;
      width: 100%;
      flex: 1;

      @media only screen and (max-width: 1080px) {
        min-width: 0;
      }

      &.has-clear,
      &.search-mode {
        padding-right: 6.5rem;
      }

      &::placeholder {
        color: #ffffff;
        opacity: 1;
        transition: color 0.2s;
      }

      &::-webkit-input-placeholder {
        color: #ffffff;
        opacity: 1;
        transition: color 0.2s;
      }

      &::-moz-placeholder {
        color: #ffffff;
        opacity: 1;
        transition: color 0.2s;
      }

      &:-ms-input-placeholder {
        color: #ffffff;
        opacity: 1;
        transition: color 0.2s;
      }

      &.search-mode::placeholder {
        color: rgba(255, 255, 255, 0.65);
      }

      &.search-mode::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.65);
      }

      &.search-mode::-moz-placeholder {
        color: rgba(255, 255, 255, 0.65);
      }

      &.search-mode:-ms-input-placeholder {
        color: rgba(255, 255, 255, 0.65);
      }
    }

    & .search-icon {
      position: absolute;
      right: 1.75rem;
      top: 50%;
      transform: translateY(-50%);
      height: 1.25rem;
      width: auto;
      pointer-events: none;
    }

    & .search-clear {
      position: absolute;
      right: 3.5rem;
      top: 50%;
      transform: translateY(-50%);
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      opacity: 0.65;
      transition: opacity 0.2s, color 0.2s;

      & svg {
        width: 2rem;
        height: 2rem;
      }

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          opacity: 1;
          color: var(--color-accent);
        }
      }

      &:active {
        opacity: 1;
        color: var(--color-accent);
      }
    }

    & .search-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 0.5rem;
      background-color: #000;
      backdrop-filter: blur(10px);
      border-radius: 0.5rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      min-width: 100%;
      width: max-content;
      max-width: 500px;
      max-height: 400px;
      overflow-y: auto;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);

      /* Webkit scrollbar (Chrome, Safari, Edge) */
      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
        transition: background 0.2s;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
      }

      /* Firefox scrollbar */
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.3) transparent;


      @media only screen and (max-width: 1080px) {
        width: 100%;
        min-width: 0;
      }
    }

    & .search-dropdown-item {
      color: #ffffff;
      font-family: Inter, sans-serif;
      font-size: 1.125rem;
      padding: 1rem 1.75rem;
      cursor: pointer;
      transition: color 0.2s;

      &[aria-selected="true"] {
        color: var(--color-accent);
      }

      &.highlighted {
        color: var(--color-accent);
      }

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--color-accent);
        }
      }

      &:active {
        color: var(--color-accent);
      }

      &:first-child {
        border-radius: 0.5rem 0.5rem 0 0;
      }

      &:last-child {
        border-radius: 0 0 0.5rem 0.5rem;
      }

      &.search-dropdown-no-results {
        color: rgba(255, 255, 255, 0.5);
        cursor: default;
        pointer-events: none;
      }
    }

    /*@media only screen and (max-width: 1280px) {*/
    /*  & {*/
    /*    display: none;*/
    /*  }*/
    /*}*/
  }
</style>

