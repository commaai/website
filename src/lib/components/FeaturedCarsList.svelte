<script>
  import vehicles from '$lib/vehicles.json';

  // Get featured brands with at least one vehicle
  const featuredBrands = ['Toyota', 'Honda', 'Hyundai', 'Kia', 'Lexus', 'Subaru'];

  const featuredCars = featuredBrands
    .filter(brand => vehicles[brand] && vehicles[brand].length > 0)
    .map(brand => ({
      brand,
      count: vehicles[brand].length
    }));
</script>

<div class="featured-cars">
  {#each featuredCars as car}
    <div class="car-item">
      <span class="brand">{car.brand}</span>
      <span class="count muted">{car.count} models</span>
    </div>
  {/each}
</div>

<style>
  .featured-cars {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .car-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .brand {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .count {
    font-family: JetBrains Mono, monospace;
    font-size: 1rem;
  }
</style>
