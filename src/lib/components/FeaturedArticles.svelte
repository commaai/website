<script>
  import Grid from "$lib/components/Grid.svelte";

  import LinusTechTipsLogo from "$lib/images/featured-articles/linus-tech-tips.svg";
  import SnazzyLabsLogo from "$lib/images/featured-articles/snazzy-labs.png";
  import TheVergeLogo from "$lib/images/featured-articles/the-verge.svg";
  import CarAndDriverLogo from "$lib/images/featured-articles/car-and-driver.png";
  import ConsumerReportsLogo from "$lib/images/featured-articles/consumer-reports.png";
  import RoadShowLogo from "$lib/images/featured-articles/road-show.png";
</script>

<div class="featured-articles">
  <span>Featured in</span>
  <Grid columns={6} columnGap="0.5rem" size="large">
    <a href="https://youtu.be/xdmxM-v4KQg">
      <img src={LinusTechTipsLogo} alt="Logo of Linus Tech Tips" class="greyscale"/>
    </a>
    <a href="https://www.youtube.com/watch?v=GY8ruVimG8M">
      <img src={SnazzyLabsLogo} alt="Logo of Snazzy Labs" class="greyscale"/>
    </a>
    <a href="https://www.theverge.com/23548094/george-hotz-comma-3-driver-assist-hands-free-demo">
      <img src={TheVergeLogo} alt="Logo of The Verge"/>
    </a>
    <a href="https://www.caranddriver.com/features/a30341053/self-driving-technology-comparison/">
      <img src={CarAndDriverLogo} alt="Logo of Car and Driver"/>
    </a>
    <a href="https://data.consumerreports.org/wp-content/uploads/2020/11/consumer-reports-active-driving-assistance-systems-november-16-2020.pdf">
      <img src={ConsumerReportsLogo} alt="Logo of Consumer Reports"/>
    </a>
    <a href="https://www.cnet.com/roadshow/news/comma-ai-assisted-driving-george-hotz-ces-2020/">
      <img src={RoadShowLogo} alt="Logo of Road Show"/>
    </a>
  </Grid>
</div>

<style>
  .featured-articles {
    margin: 10rem 0;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    .featured-articles {
      margin: 6rem 0;
    }
  }

  span {
    opacity: 0.5;
    text-align: center;
    font-size: 1.25rem;
    margin-bottom: 2rem;
    display: block;
  }

  a {
    display: flex;
    background-color: #fff;
    color: black !important;
    border: 1px solid #000;
    justify-content: center;
    align-items: center;
    padding: 1.25rem;
    text-decoration: none;
    max-width: 100%;
    height: 40px;
    transition: background-color 0.2s;

    & img {
      height: 45px;
      display: inline-block;
      vertical-align: middle;
      object-fit: contain;
    }

    & img.greyscale {
      filter: grayscale(100%) brightness(20%);
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--color-card-background-hover);
      }
    }

    &:active {
      background-color: var(--color-card-background-hover);
    }
  }
</style>
