// Real posts from X, shown on the home page.

export const tweets = [
  {
    id: "2082241066322079915",
    author: "LivingInKaos",
    name: "LivingInKaos",
    timestamp: "Jul 28, 2026",
    body: "I'm about to pass 15k miles on my Comma 4.  Can't remember where I was on the 3x before moving up, but I know it was a bit more than that.  I engage as soon as I can, every, damn, time.....",
  },
  {
    id: "1987361136874820059",
    author: "tessadotsh",
    name: "tessa",
    timestamp: "Nov 8, 2025",
    body: "vouch for @comma_ai, makes a 12 hour road trip feel like 6. been driving with it for over 24k miles, most of which engaged. easily one of the best purchases i've ever made.",
  },
];

// A reply and the post it answers, shown as one card. Leading @handles are left off.
export const threadTweet = {
  id: "2061886502184026311",
  author: "SnazzyLabs",
  name: "Quinn Nelson",
  timestamp: "Jun 2, 2026",
  body: "Time to get a Comma 4. It's way better at everything.",
  answers: {
    author: "Mikekantorski",
    name: "Mike Kantorski",
    body: "Today my Rivian chose violence and decided the road I use highway assist on everyday is no longer available.",
  },
};

// Videos we host ourselves in static/videos/tweets. duration is the full clip on X,
// not the ten second cut we loop.
export const videoTweets = [
  {
    clip: "rain",
    id: "2056852397578658244",
    author: "gerrylum2",
    name: "Gerry Valentine",
    timestamp: "May 19, 2026",
    poster: "gerrylum2-rain",
    duration: "1:04",
    body: "Rainy days hit different when @comma_ai Openpilot is doing the work. Just vibing, watching the rain, sipping coffee while it handles the road like a champ.",
  },
  {
    clip: "miles",
    id: "2082165228184522857",
    author: "ANSR42",
    name: "Mike LaBarbera",
    timestamp: "Jul 28, 2026",
    poster: "ANSR42-miles",
    duration: "0:37",
    body: "Total comma four engagement has passed 9,000 miles now. Hands-free through beautiful rural Wisconsin backroads. My @comma_ai device engagement has come close to 93% since I installed it back in February.",
  },
  {
    clip: "timelapse",
    id: "2056853588056645782",
    author: "AlexBowden52",
    name: "Alex",
    timestamp: "May 19, 2026",
    poster: "AlexBowden52-timelapse",
    duration: "0:30",
    body: "I heard openpilot timelapses are cool @comma_ai",
  },
];
