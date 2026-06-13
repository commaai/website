// Shared FAQ hash-sync, porting Faq.svelte's `checked={id === activehash}` reactivity.
// - On load: check the input whose id matches location.hash (native scroll already happened).
// - On hashchange: uncheck only the input previously opened BY hash (manually-opened stay open),
//   then check the new target.
// - Every click on a FAQ input rewrites the hash via replaceState — on open AND close clicks —
//   without firing hashchange (matches Svelte's router-bypassing goto/replaceState).
// Scoped to `.questions .tab > input` so non-FAQ accordions (e.g. /support top section) are untouched.
export function initFaq(root = document) {
  let hashOpened = null;

  const openFromHash = () => {
    const id = location.hash.slice(1);
    if (hashOpened && hashOpened.id !== id) {
      hashOpened.checked = false;
      hashOpened = null;
    }
    if (!id) return;
    const inp = root.querySelector(`.questions .tab > input[id="${CSS.escape(id)}"]`);
    if (inp) {
      inp.checked = true;
      hashOpened = inp;
    }
  };

  openFromHash();
  window.addEventListener('hashchange', openFromHash);

  root.querySelectorAll('.questions .tab > input').forEach((inp) =>
    inp.addEventListener('click', () => history.replaceState(null, null, '#' + inp.id))
  );
}
