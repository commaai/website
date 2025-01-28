<script>
  import SetupGuide from "$lib/components/SetupGuide.svelte";

  import Comma3XImage from "$lib/images/device.png";
  import CommaBodyImage from "$lib/images/comma-body.png";
</script>

<section class="light" id="installation">
  <div class="container">
    <h1>Setup Guides</h1>
    <SetupGuide
      productName="comma 3X"
      title="Setup Guide"
      stepCount={5}
      estimatedMinutes={15}
      link="/setup/comma-3x"
      image={Comma3XImage}
    />
    <hr />
    <SetupGuide
      productName="comma body"
      title="Assembly Instructions"
      stepCount={8}
      estimatedMinutes={40}
      link="/setup/comma-body"
      image={CommaBodyImage}
    />
  </div>
</section>

<style>
  h1 {
    margin-bottom: 3rem;
  }

  hr {
    margin: 4rem 0;
  }
</style>
