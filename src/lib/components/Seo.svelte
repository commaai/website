<!--
  The one place a page's <head> SEO and share tags come from. Every route renders exactly one:

    <Seo title="…" description="…" />

  Props (route defaults; entries in src/lib/seo/pages.js override them per path):
    title        full <title> text, used as-is (also og:title, twitter:title)
    description  meta description (also og:description, twitter:description)
    image        share image path in static/ or full URL (default DEFAULT_IMAGE in src/lib/seo/site.js)
    imageAlt     share image alt text
    type         og:type: "website" | "product" | "article"
    noindex      true on pages search engines should drop (no canonical / og:url either)
    jsonLd       structured data: an object or array of objects, each rendered as
                 <script type="application/ld+json">

  Extra head content (preloads, hand-written JSON-LD) goes in the default slot.
-->
<script>
  import { page } from '$app/stores';
  import { seoFor } from '$lib/seo/pages.js';
  import {
    DEFAULT_IMAGE,
    LOCALE,
    SITE_NAME,
    TWITTER_HANDLE,
    absoluteUrl,
    canonicalUrl,
  } from '$lib/seo/site.js';

  export let title;
  export let description = undefined;
  export let image = undefined;
  export let imageAlt = undefined;
  export let type = 'website';
  export let noindex = false;
  export let jsonLd = null;

  $: override = seoFor($page.url.pathname);

  $: pageTitle = override.title ?? title;
  $: pageDescription = override.description ?? description;
  $: pageNoindex = override.noindex ?? (noindex || !!$page.error);

  // the map's image beats the route's, which beats the site default; alt text follows its image
  $: imageSource = override.image ? override : image ? { image, imageAlt } : DEFAULT_IMAGE;
  $: shareImage = absoluteUrl(imageSource.image);
  $: shareImageAlt = override.imageAlt ?? imageSource.imageAlt ?? pageTitle;
  $: shareImageWidth = imageSource.imageWidth ?? 1200;
  $: shareImageHeight = imageSource.imageHeight ?? 630;

  $: url = canonicalUrl($page.url.pathname);

  // "<" escaped so a string in the data can't close the script tag
  const ldJson = data => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</` + 'script>';
  $: structuredData = [jsonLd].flat().filter(Boolean);
</script>

<svelte:head>
  <title>{pageTitle}</title>
  {#if pageDescription}
    <meta name="description" content={pageDescription} />
  {/if}
  {#if pageNoindex}
    <meta name="robots" content="noindex" />
  {:else}
    <link rel="canonical" href={url} />
  {/if}

  <meta property="og:type" content={type} />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:locale" content={LOCALE} />
  <meta property="og:title" content={pageTitle} />
  {#if pageDescription}
    <meta property="og:description" content={pageDescription} />
  {/if}
  {#if !pageNoindex}
    <meta property="og:url" content={url} />
  {/if}
  <meta property="og:image" content={shareImage} />
  <meta property="og:image:width" content={String(shareImageWidth)} />
  <meta property="og:image:height" content={String(shareImageHeight)} />
  <meta property="og:image:alt" content={shareImageAlt} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={TWITTER_HANDLE} />
  <meta name="twitter:title" content={pageTitle} />
  {#if pageDescription}
    <meta name="twitter:description" content={pageDescription} />
  {/if}
  <meta name="twitter:image" content={shareImage} />
  <meta name="twitter:image:alt" content={shareImageAlt} />

  {#each structuredData as data}
    {@html ldJson(data)}
  {/each}

  <slot />
</svelte:head>
