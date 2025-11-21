<script>
  import HyundaiIcon from "$lib/icons/brands/hyundai.svg";
  import LexusIcon from "$lib/icons/brands/lexus.svg";
  import KiaIcon from "$lib/icons/brands/kia.svg";
  import ToyotaIcon from "$lib/icons/brands/toyota.svg";

  const featuredCars = [
    {
      make: "Hyundai",
      model: "Sonata",
      year: "2020-23",
      brandIcon: HyundaiIcon,
    },
    {
      make: "Hyundai",
      model: "Palisade",
      year: "2020-22",
      brandIcon: HyundaiIcon,
    },
    {
      make: "Kia",
      model: "Niro EV",
      year: "2019-23",
      brandIcon: KiaIcon,
    },
    {
      make: "Lexus",
      model: "ES",
      year: "2019-22",
      brandIcon: LexusIcon,
    },
    {
      make: "Toyota",
      model: "Corolla",
      year: "2020-22",
      brandIcon: ToyotaIcon,
    },
    {
      make: "Toyota",
      model: "Rav4",
      year: "2019-22",
      brandIcon: ToyotaIcon,
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
  }

  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: 3.875rem;
  }
</style>
