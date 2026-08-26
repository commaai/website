// Real posts from X and real reviews from our Shop storefront.
// Nothing here is written by us — copy is verbatim, only trimmed of trailing links.
// Customers only: no comma employees.
//
// Tweets: https://x.com/search?q=%40comma_ai
// Reviews: https://shop.app/products/7964554231871/comma-four

export const tweets = [
  {
    id: "2087672474762969207",
    author: "Matt_E_Baumann",
    name: "Matthew Baumann",
    timestamp: "Aug 12, 2026",
    body: "So for under $2k, you can get HW4 level of self driving for SO many vehicles!\n\nPretty incredible! Way to go @comma_ai 🙌",
  },
  {
    id: "2030704177496633425",
    author: "ANSR42",
    name: "Mike LaBarbera",
    timestamp: "Mar 8, 2026",
    body: "@comma_ai 4 device on a Tesla Model Y in experimental mode tackling city streets. Every time I use this device, I become more and more convinced that vision-based self-driving vehicles are the future. I love that I can avoid a subscription and own my open-source AI software.",
  },
  {
    id: "1962586420989833333",
    author: "thisiswrenn",
    name: "David Wrenn",
    timestamp: "Sep 1, 2025",
    body: "6 hour road trip yesterday made chill with @comma_ai autonomously driving!",
  },
  {
    id: "1879581165142823256",
    author: "dstaley",
    name: "Dylan Staley",
    timestamp: "Jan 15, 2025",
    body: "Here's the @comma_ai 3X driving my 2025 Toyota RAV4 Hybrid! Outside of nudging the wheel for lane changes and using the cruise controls to adjust speed, it was completely hands-free. It's amazing that this is just plug-and-play.",
  },
  {
    id: "1723011519942648318",
    author: "__tython3__", // renamed from @tython_3 since the post
    name: "Tython3",
    timestamp: "Nov 10, 2023",
    body: "I am speechless. I just drove 1500 miles from Minnesota to Florida with my comma 3. It felt like I had entered a cheat code into the simulation. I drove alongside thousands of other cars that probably had no idea this option was available to them. Well done, @comma_ai",
  },
  {
    id: "1641908734845755392",
    author: "wesley_sheh",
    name: "Wesley Sheh",
    timestamp: "Mar 31, 2023",
    body: "The most impactful thing to come out of AI for me is not ChatGPT.\n\nIt's another little-known product that I've been using for a year and a half now. (They do no marketing whatsoever)\n\nIt's @comma_ai and if it supports your car, buy it. It is well worth it.",
  },
  {
    id: "1593874509320183808",
    author: "yishan",
    name: "Yishan",
    timestamp: "Nov 18, 2022",
    body: "I have a comma three and it is great.\n\nIf you can't (or won't) own a Tesla but you own one of the comma-compatible cars, I HIGHLY recommend it.\n\nSelf-driving functionality on a budget.",
  },
  {
    id: "1504630655581233155",
    author: "JFrecees",
    name: "Jack Frecees",
    timestamp: "Mar 17, 2022",
    body: "@comma_ai I can honestly say the C3 is the single best purchase I've ever made. I can't imagine driving without it now",
  },
];

// Extra tweets used only by the numbers-first variant on /tweetsv2 — each one states
// a figure outright. Kept separate so the wall above is unaffected.
export const statTweets = [
  {
    id: "1985439564823921038",
    author: "mattvaru",
    name: "Matt Varughese",
    timestamp: "Nov 3, 2025",
    body: "My best technology purchase of the year has easily been the Comma 3X (@comma_ai.)\n\n* $999\n* Adds basic self-driving to your vehicle\n* Installed in an hour\n* No subscriptions\n\nI'm **shocked** at how good it's been. It feels like magic to be able to install a form of self-driving that doesn't exist in my truck otherwise.\n\nMe and a buddy installed it on my truck before I went to Yellowstone + Wyoming recently. Of the ~5,000 miles I did, I probably only had to drive myself about 20%?\n\nI have absolutely no affiliation to the company, but I think you should support it if you're ever looking to add basic auto-pilot to your car. 325+ cars are supported!",
  },
  {
    id: "2086638136214298970",
    author: "gerrylum2",
    name: "Gerry Valentine",
    timestamp: "Aug 9, 2026",
    body: "Everyone says @comma_ai is \"basically hands-free.\" So I logged a full typical commute in my 2022 Rivian R1T and created a script to count every second.\n\nI measured it. 99.2%. The wheel is basically furniture at this point. No subscriptions.",
  },
  {
    id: "1987361136874820059",
    author: "tessadotsh",
    name: "tessa",
    timestamp: "Nov 8, 2025",
    body: "vouch for @comma_ai, makes a 12 hour road trip feel like 6. been driving with it for over 24k miles, most of which engaged. easily one of the best purchases i've ever made.",
  },
];

// Verified-buyer reviews left on our Shop storefront.
export const reviewsUrl = "https://shop.app/products/7964554231871/comma-four";

// HEADS UP: this aggregate is hand-maintained and will drift.
//
// These are native Shop reviews — Shopify collects them itself. There's no review app,
// no product_review metaobject, and the Shop sales channel isn't installed, so as of
// Aug 2026 there is no API or admin surface to read them from. The Storefront API can't
// serve them either (Product has no rating fields; reviews.rating is Admin-API-only).
//
// So check shop.app and update these two numbers when you touch this file. If the Shop
// channel gets installed and reviews.rating / reviews.rating_count start populating,
// replace this with a generated file instead.
export const reviewSummary = {
  rating: 5.0,
  count: 81,
};

export const reviews = [
  {
    author: "Nicholas",
    timestamp: "Aug 13, 2026",
    body: "I drive a 2019 Rav4 Hybrid and this device has made my daily commute much more enjoyable. I have been eyeing a comma device for a little over 2 years, and I wish I made the jump sooner. The device is very user friendly. Not a huge learning curve. overall very pleased! If youre on the fence about getting one like I was, do it! Worth every penny!",
  },
  {
    author: "bre",
    timestamp: "Aug 12, 2026",
    body: "Crazy good. After using on just one road trip, I was blown away. Great upgrade.",
  },
  {
    author: "Ted",
    timestamp: "Aug 7, 2026",
    body: "Works very well, highly recommend over BlueCruise & SuperCruise.",
  },
  {
    author: "Gil",
    timestamp: "Aug 6, 2026",
    body: "This is my second Comma device. Before purchasing the Comma 4, I owned the Comma 3, and it completely changed my driving experience. I drive a lot for work and wasn't easy on my Comma 3. It spent countless hours in a hot car, yet it still gave me five years of reliable performance. That durability really impressed me. The more I used it, the more I appreciated it. I used it on nearly every drive, especially on the freeway, and when it finally reached the end of its life, I knew I wanted another one. So far, I'm really enjoying the Comma 4. It's intuitive, easy to use, and I especially like the smaller form factor. Overall, Comma has earned my trust by building a durable, reliable product that has made driving more enjoyable.",
  },
  {
    author: "Ronald",
    timestamp: "Jul 27, 2026",
    body: "Make car drive like Tesla Autopilot in 10 minutes, product arrive quick, easy to install, no subscription required.",
  },
  {
    author: "John",
    timestamp: "Jul 1, 2026",
    body: "Honestly shocked through and through by this product. Absolutely love it in my Toyota Rav4. Immediately feels like a huge upgrade to lane tracking for the car. Doesn't work for stop and go traffic but does amazing on highways and such!",
  },
];
