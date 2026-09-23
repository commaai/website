# support articles

`index.md` at the support root supplies the page title, description, heading,
subtitle, and the cards shown on `/support`. Define those cards with an options
container; each option has a linked title, subtitle, and image:

```md
::: options
- [before you buy](/support/before-you-buy) — compatibility, hardware, and features
  image: /images/support/shopping_bag.svg
:::
```

The same container can omit `image` for text-only option cards, as on the
troubleshooting page. Each top-level folder is a support section. Its `index.md`
supplies `title`, `image`, and `order` frontmatter, plus the overview body. The
title is used when the section appears in article lists and navigation. Add its
homepage card separately to the options container in the root `index.md`.

Article files use `title` and `order` frontmatter, with optional `description`.
Their filenames supply URL paths at `/support/<section>/<filename>`. Articles
are listed automatically in `order` order. Set `listed: false` to keep a
reference article available by direct link without showing it on its section or
group landing page.

The `troubleshooting` folder has `hardware` and `software` subfolders. Their
`index.md` files use `title`, `description`, and `order` frontmatter. Their
articles appear at `/support/<section>/<group>/<filename>`.

Place `<!-- articles -->` in an overview to show some Markdown after its
automatically generated article list. Search indexes the Markdown bodies and
frontmatter of sections, groups, and articles. Empty draft files are ignored.

To render a Markdown link as a full-width article card with a right arrow, use
`[link label](/support/section/article "card")`.

For an external card that opens in a new tab and shows an up-right arrow, use
`[link label](https://example.com "external-card")`.

To render the black, illustrated header used by the old FAQ sections, use a
header container. The title may contain inline Markdown. The image path is
required and the alt text is optional:

```md
::: header Hardware Troubleshooting
image: /images/support/other.svg
alt: Hardware Troubleshooting banner
:::
```

To render Markdown content as an FAQ-style dropdown, wrap it in a dropdown
container. The title follows the opening tag, and the body supports normal
Markdown:

```md
::: dropdown question or issue title
Answer with [links](/support) and other Markdown.
:::
```
