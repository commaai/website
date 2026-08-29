import LinusTechTipsLogo from "$lib/images/featured-articles/linus-tech-tips.svg";
import SnazzyLabsLogo from "$lib/images/featured-articles/snazzy-labs.png";
import TheVergeLogo from "$lib/images/featured-articles/the-verge.svg";
import CarAndDriverLogo from "$lib/images/featured-articles/car-and-driver.png";
import ConsumerReportsLogo from "$lib/images/featured-articles/consumer-reports.png";

const LinusTechTipsThumb = "https://i.ytimg.com/vi/xdmxM-v4KQg/maxresdefault.jpg";
const SnazzyLabsThumb = "https://i.ytimg.com/vi/GY8ruVimG8M/maxresdefault.jpg";

export const videos = [
  {
    outlet: "Linus Tech Tips",
    logo: LinusTechTipsLogo,
    thumbnail: LinusTechTipsThumb,
    title: "I upgraded my car with open-source autopilot and it's amazing",
    quote: "“I would have believed that that was a human.”",
    quoteSource: "17:14",
    duration: "19:57",
    url: "https://youtu.be/xdmxM-v4KQg?t=1013",
  },
  {
    outlet: "Snazzy Labs",
    logo: SnazzyLabsLogo,
    thumbnail: SnazzyLabsThumb,
    title: "This open-source device makes any car self-driving",
    quote: "“Would such a thing be any good? Well, buddy, there is. And yes, it's actually fantastic.”",
    quoteSource: "24:35",
    duration: "35:58",
    url: "https://www.youtube.com/watch?v=GY8ruVimG8M&t=1464s",
  },
];

export const articles = [
  {
    outlet: "The Verge",
    logo: TheVergeLogo,
    title: "George Hotz wants to 'make driving chill' with next-gen comma 3 hands-free driver assist",
    quote: "“Better than anything you can get from a legacy manufacturer.”",
    year: "2023",
    url: "https://www.theverge.com/23548094/george-hotz-comma-3-driver-assist-hands-free-demo",
  },
  {
    outlet: "Car and Driver",
    logo: CarAndDriverLogo,
    title: "Aftermarket self-driving tech vs. Tesla Autopilot, Cadillac Super Cruise",
    quote: "“We were shocked at the sophisticated control of the system.”",
    year: "2020",
    url: "https://www.caranddriver.com/features/a30341053/self-driving-technology-comparison/",
  },
  {
    outlet: "Consumer Reports",
    logo: ConsumerReportsLogo,
    title: "Active driving assistance systems: test results and design recommendations",
    quote: "Ranked #1 of 18 driver assistance systems tested in 2020.",
    year: "2020",
    url: "https://data.consumerreports.org/wp-content/uploads/2020/11/consumer-reports-active-driving-assistance-systems-november-16-2020.pdf",
  },
];
