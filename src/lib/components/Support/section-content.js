function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

export function renderSections(body, renderBody) {
  const sections = [];
  let current;
  const introduction = [];
  const firstHeading = /^#{2,3} .+$/m.exec(body);
  const sectionHeading = firstHeading?.[0].startsWith('### ') ? /^### (.+)$/ : /^## (.+)$/;

  for (const line of body.split(/\r?\n/)) {
    const heading = sectionHeading.exec(line);
    if (heading) {
      const title = heading[1].trim();
      const id = title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
      current = { title, id, lines: [] };
      sections.push(current);
    } else if (current) {
      current.lines.push(line);
    } else {
      introduction.push(line);
    }
  }

  const introductionSource = introduction.join('\n').trim();
  const introductionHtml = introductionSource ? renderBody(introductionSource) : '';

  return {
    navItems: sections.map(({ id, title }) => ({ id, label: title })),
    articleContent: introductionHtml + sections.map(({ id, title, lines }) => {
      const html = renderBody(lines.join('\n').trim());
      return `<section id="${escapeHtml(id)}" aria-labelledby="${escapeHtml(id)}-title"><h2 id="${escapeHtml(id)}-title">${escapeHtml(title)}</h2><div class="section-body">${html}</div></section>`;
    }).join('')
  };
}
