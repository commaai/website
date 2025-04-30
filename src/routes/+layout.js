import { XMLParser } from 'fast-xml-parser';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  let blogPosts = await fetch("https://blog.comma.ai/feed")
    .then((response) => response.text())
    .then((str) => new XMLParser().parse(str))
    .then((data) => {
      const blogPosts = data.rss.channel.item
        .map(({ title, guid, pubDate, "cb:readTime": readTime }) => {
          const date = new Date(pubDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return { title, link: guid, date, readTime };
        });

      return blogPosts;
    });

  return {
    blogPosts: blogPosts.slice(0, 3),
  };
}
