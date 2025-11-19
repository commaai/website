import { XMLParser } from 'fast-xml-parser';

// TODO: use release RSS feed, https://github.com/commaai/blog/issues/86
const OPENPILOT_RELEASE_PATTERN = "\\bopenpilot\\s+\\d+\\.\\d+(?:\\.\\d+)?\\b";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  let releaseNotes = await fetch("https://blog.comma.ai/feed")
    .then((response) => response.text())
    .then((str) => new XMLParser().parse(str))
    .then((data) => {
      const releaseNotes = data.rss.channel.item
        .filter((entry) => entry.title.match(OPENPILOT_RELEASE_PATTERN))
        .map(({ title, excerpt, guid, pubDate, "cb:cover": cover }) => {
          const date = new Date(pubDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return { title, excerpt, cover, link: guid, date };
        });

      return releaseNotes;
    });

  return {
    releaseNotes,
  };
}
