import { initializeHarnesses, getHarnesses } from '$lib/utils/harnesses.js';
import { NO_HARNESS_OPTION } from '$lib/constants/vehicles.js';
import { getSelectedCar, setSelectedCar } from '$scripts/cart.js';

function normalizeDiacritics(str) {
  return str.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function dropdownItemHTML(item, { selected = false } = {}) {
  const safeCar = (item?.car ?? '').replace(/"/g, '&quot;');
  const safeTitle = item?.title ? `<div class="dropdown-item-subtitle">Harness: ${item.title}</div>` : '';
  return `
    <div class="dropdown-item" role="option" aria-selected="${selected}" tabindex="0">
      <div class="item-info">
        <div class="dropdown-item-title">${safeCar}</div>
        ${safeTitle}
      </div>
      <div class="accessory-label"></div>
    </div>
  `;
}

function selectionPlaceholderHTML(label) {
  return `
    <div class="selection-placeholder" role="button" tabindex="0">
      <div class="label">${label}</div>
      <div class="accessory"></div>
    </div>
  `;
}

function searchInputHTML(placeholder) {
  return `
    <button class="harness-clear" aria-label="clear">&times;</button>
    <input
      type="text"
      placeholder="${placeholder}"
      autocomplete="off"
      class="search-input"
      style="padding: 14px 3rem"
    />
  `;
}

function selectedItemHTML(selection) {
  return `
    <button class="harness-clear" aria-label="clear">&times;</button>
    ${dropdownItemHTML(selection, { selected: true })}
  `;
}

function getQueryHarness() {
  const params = new URLSearchParams(window.location.search);
  const value = params.get('harness');
  return value ? decodeURIComponent(value) : null;
}

function setQueryHarness(car) {
  const params = new URLSearchParams(window.location.search);
  if (car) params.set('harness', encodeURIComponent(car));
  else params.delete('harness');
  const search = params.toString();
  const url = window.location.pathname + (search ? `?${search}` : '') + window.location.hash;
  window.history.replaceState(null, '', url);
}

function setupSelector(root) {
  if (root.dataset.harnessInited) return;
  root.dataset.harnessInited = '1';

  const label = root.dataset.label || 'Select vehicle';
  const placeholder = root.dataset.placeholder || 'Search for a vehicle or harness';
  const showNoHarnessOption = root.dataset.showNoHarnessOption === '1';
  const showVehicleHarnesses = root.dataset.showVehicleHarnesses !== '0';
  const showGenericHarnesses = root.dataset.showGenericHarnesses !== '0';
  const restoreSelection = root.dataset.restoreSelection === '1';

  const valueArea = root.querySelector('.dropdown-value');
  const dropdownContent = root.querySelector('.dropdown-content');
  const noteCardSlot = root.querySelector('.harness-note-slot');
  const supportNoteSlot = root.querySelector('.harness-support-note');

  const accessoryTemplate = root.dataset.accessoryTemplate || '';

  let menuOpen = false;
  let inputValue = '';
  let selection;
  let harnessList = [];

  function getHarnessList() {
    return getHarnesses({ vehicle: showVehicleHarnesses, generic: showGenericHarnesses });
  }

  function renderAccessory(target, item) {
    if (!target) return;
    if (!accessoryTemplate || !item) {
      target.innerHTML = '';
      return;
    }
    const html = accessoryTemplate.replaceAll('{{car}}', item.car ?? '');
    target.innerHTML = html;
  }

  function emitChange() {
    root.dispatchEvent(new CustomEvent('harness:change', { detail: selection }));
  }

  function updateSupportNote() {
    if (!supportNoteSlot) return;
    if (selection?.package) {
      const text = selection.package === 'All'
        ? 'openpilot will work with <strong>all packages and trims</strong> of this car.'
        : `openpilot requires <strong>${selection.car}</strong> to come equipped with <strong>${selection.package}</strong>.`;
      supportNoteSlot.style.display = '';
      const body = supportNoteSlot.querySelector('.note-body');
      if (body) body.innerHTML = text;
    } else {
      supportNoteSlot.style.display = 'none';
    }
  }

  function applySelection(newSelection, { skipQueryUpdate = false } = {}) {
    selection = newSelection;
    if (selection?.car) setSelectedCar(selection.car);
    else setSelectedCar('');
    if (!skipQueryUpdate) setQueryHarness(selection?.car || null);
    render();
    updateSupportNote();
    emitChange();
  }

  function render() {
    if (!valueArea || !dropdownContent) return;

    if (menuOpen) {
      valueArea.innerHTML = searchInputHTML(placeholder);
      const inputEl = valueArea.querySelector('input.search-input');
      const clearBtn = valueArea.querySelector('.harness-clear');
      if (inputEl) {
        inputEl.value = inputValue;
        inputEl.addEventListener('input', () => {
          inputValue = inputEl.value;
          renderOptions();
        });
        inputEl.addEventListener('click', () => {
          menuOpen = true;
          renderOptions();
        });
        setTimeout(() => inputEl.focus(), 0);
      }
      if (clearBtn) clearBtn.addEventListener('click', handleClear);
    } else if (selection) {
      valueArea.innerHTML = selectedItemHTML(selection);
      const clearBtn = valueArea.querySelector('.harness-clear');
      if (clearBtn) clearBtn.addEventListener('click', handleClear);
      const item = valueArea.querySelector('.dropdown-item');
      if (item) {
        item.addEventListener('click', openMenu);
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') openMenu();
        });
        renderAccessory(item.querySelector('.accessory-label'), selection);
      }
    } else {
      valueArea.innerHTML = selectionPlaceholderHTML(label);
      const ph = valueArea.querySelector('.selection-placeholder');
      if (ph) {
        ph.addEventListener('click', openMenu);
        ph.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') openMenu();
        });
      }
    }

    renderOptions();
  }

  function renderOptions() {
    if (!dropdownContent) return;

    if (!menuOpen) {
      dropdownContent.classList.remove('show');
      dropdownContent.innerHTML = '';
      return;
    }
    dropdownContent.classList.add('show');

    let items;
    if (inputValue !== '') {
      const filtered = harnessList.filter((item) =>
        normalizeDiacritics((item.car || '').toLowerCase()).match(normalizeDiacritics(inputValue.toLowerCase()))
      );
      if (filtered.length === 0) {
        dropdownContent.innerHTML = dropdownItemHTML({ car: 'No matching vehicles' });
        return;
      }
      items = filtered;
    } else {
      items = [];
      if (showNoHarnessOption) items.push(NO_HARNESS_OPTION);
      items = items.concat(harnessList);
    }

    dropdownContent.innerHTML = items.map((item) => dropdownItemHTML(item)).join('');

    const els = Array.from(dropdownContent.querySelectorAll('.dropdown-item'));
    els.forEach((el, idx) => {
      const item = items[idx];
      renderAccessory(el.querySelector('.accessory-label'), item);
      el.addEventListener('click', () => handleOptionClick(item));
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleOptionClick(item);
      });
    });
  }

  function openMenu() {
    menuOpen = true;
    render();
  }

  function handleClear() {
    if (!inputValue) {
      menuOpen = false;
    } else {
      inputValue = '';
    }
    applySelection(null);
  }

  function handleOptionClick(item) {
    menuOpen = false;
    inputValue = '';
    applySelection(item);
  }

  function handleDocumentClickOrKey(event) {
    if (event.type === 'keydown' && event.key !== 'Escape') return;
    if (event.type === 'click' && root.contains(event.target)) return;
    if (menuOpen) {
      menuOpen = false;
      render();
    }
  }

  function setInitialSelection() {
    const carName = getQueryHarness();

    if (carName === NO_HARNESS_OPTION.car) {
      applySelection(NO_HARNESS_OPTION, { skipQueryUpdate: true });
      return;
    }
    let found = harnessList.find((h) => h.car === carName);
    if (!found && restoreSelection) {
      const stored = getSelectedCar();
      if (stored) found = harnessList.find((h) => h.car === stored);
    }
    if (found) applySelection(found, { skipQueryUpdate: true });
  }

  // Public-ish API exposed on the element
  root._harness = {
    setSelection(newSelection) { applySelection(newSelection); },
    getSelection() { return selection; },
  };

  // Init: load harness data, then render
  initializeHarnesses().then(() => {
    harnessList = getHarnessList();
    setInitialSelection();
    render();
  });

  document.addEventListener('click', handleDocumentClickOrKey, true);
  document.addEventListener('keydown', handleDocumentClickOrKey, true);
}

function init() {
  document.querySelectorAll('.harness-selector').forEach(setupSelector);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
