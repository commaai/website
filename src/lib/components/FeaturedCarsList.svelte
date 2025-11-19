<script>
  import HyundaiIcon from "$lib/icons/brands/hyundai.svg";
  import LexusIcon from "$lib/icons/brands/lexus.svg";
  import KiaIcon from "$lib/icons/brands/kia.svg";
  import ToyotaIcon from "$lib/icons/brands/toyota.svg";

  import SonataVideoThumbnail from "$lib/images/featured-videos/video-thumbnail-sonata.jpg";
  import PalisadeVideoThumbnail from "$lib/images/featured-videos/video-thumbnail-palisade.jpg";
  import NiroVideoThumbnail from "$lib/images/featured-videos/video-thumbnail-niro-electric.jpg";
  import ESVideoThumbnail from "$lib/images/featured-videos/video-thumbnail-ES.jpg";
  import CorollaVideoThumbnail from "$lib/images/featured-videos/video-thumbnail-corolla.jpg";
  import Rav4VideoThumbnail from "$lib/images/featured-videos/video-thumbnail-rav4.jpg";

  const featuredCars = [
    {
      make: "Hyundai",
      model: "Sonata",
      year: "2020-23",
      brandIcon: HyundaiIcon,
      thumbnailUrl: SonataVideoThumbnail,
      videoUrl: "https://youtu.be/ix63r9kE3Fw?t=4",
    },
    {
      make: "Hyundai",
      model: "Palisade",
      year: "2020-22",
      brandIcon: HyundaiIcon,
      thumbnailUrl: PalisadeVideoThumbnail,
      videoUrl: "https://youtu.be/TAnDqjF4fDY?t=456",
    },
    {
      make: "Kia",
      model: "Niro EV",
      year: "2019-23",
      brandIcon: KiaIcon,
      thumbnailUrl: NiroVideoThumbnail,
      videoUrl: "https://youtu.be/lT7zcG6ZpGo?t=37",
    },
    {
      make: "Lexus",
      model: "ES",
      year: "2019-22",
      brandIcon: LexusIcon,
      thumbnailUrl: ESVideoThumbnail,
      videoUrl: "https://youtu.be/aiJ7-U6CCfc",
    },
    {
      make: "Toyota",
      model: "Corolla",
      year: "2020-22",
      brandIcon: ToyotaIcon,
      thumbnailUrl: CorollaVideoThumbnail,
      videoUrl: "https://youtu.be/_66pXk0CBYA",
    },
    {
      make: "Toyota",
      model: "Rav4",
      year: "2019-22",
      brandIcon: ToyotaIcon,
      thumbnailUrl: Rav4VideoThumbnail,
      videoUrl: "https://youtu.be/wJxjDd42gGA?t=36",
    },
  ];
</script>

<div class="table">
  {#each featuredCars as car}
    <div class="compatibility-item">
      <img
        src={car.brandIcon}
        loading="lazy"
        alt="{car.make} logo"
        class="car-brand-logo"
      />
      <div class="car">
        <div class="car-identifier">{car.make} {car.model}</div>
        <div class="car-year">{car.year}</div>
      </div>
      <a href={car.videoUrl} target="_blank" class="car-video-thumbnail">
        <img
          src={car.thumbnailUrl}
          alt="{car.make} {car.model} driving session"
        />
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="20" height="20" fill="white"></rect>
          <path d="M7 14.5V5.5L14 10L7 14.5Z" fill="black"></path>
        </svg>
      </a>
    </div>
    <hr />
  {/each}
</div>

<style>
  .table {
    mask: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 1) 0,
        rgba(0, 0, 0, 1) 80%,
        rgba(0, 0, 0, 0) 97%
      )
      100% 50% / 100% 100% repeat-x;
  }

  .compatibility-item {
    align-items: center;
    display: flex;
    font-size: 1.125rem;

    & .car-brand-logo {
      width: 3rem;
      display: inline-block;
      vertical-align: middle;
    }

    & .car {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      flex: 1;
      margin: 0 0.875rem;
    }

    & .car-identifier {
      width: 12rem;
      line-height: 1.2;
    }

    @media screen and (max-width: 768px) {
      & .car-identifier {
        width: 100%;
      }
    }

    & .car-year {
      color: rgba(0, 0, 0, 0.5);
      line-height: 1.2;
      flex: 1;
    }

    & .car-video-thumbnail {
      opacity: 1;
      width: 5rem;
      height: 3rem;
      margin-right: 0.5rem;
      display: inline-block;
      position: relative;

      & svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: 3.875rem;
  }
</style>
