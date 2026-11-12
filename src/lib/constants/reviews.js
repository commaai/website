// Verified-buyer reviews left on our Shop storefront
// Copy is verbatim, nothing here is written by us
export const reviewsUrl = "https://shop.app/products/7964554231871/comma-four";

// HEADS UP: this aggregate is hand-maintained and will drift
//
// These are native Shop reviews, Shopify collects them itself. There's no review app,
// no product_review metaobject, and the Shop sales channel isn't installed, so as of
// Aug 2026 there is no API or admin surface to read them from. The Storefront API can't
// serve them either (Product has no rating fields; reviews.rating is Admin-API-only)
//
// So check shop.app and update these two numbers when you touch this file. If the Shop
// channel gets installed and reviews.rating / reviews.rating_count start populating,
// replace this with a generated file instead
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
