<script>
  import HomeVariant from "../_HomeVariant.svelte";
  import Drive from "../_Drive.svelte";

  import SteerIcon from "$lib/icons/features/steer.svg?raw";
  import RoadIcon from "$lib/icons/features/road.svg?raw";
  import MoonIcon from "$lib/icons/features/moon.svg?raw";
  import CruiseIcon from "$lib/icons/features/adaptive-cruise.svg?raw";

  const features = [
    {
      icon: SteerIcon,
      label: "hands off the wheel",
      note: "for the whole drive, not 15 seconds at a time",
    },
    {
      icon: RoadIcon,
      label: "highways and back roads",
      note: "it doesn't need fresh paint to keep going",
    },
    {
      icon: CruiseIcon,
      label: "stop and go traffic",
      note: "it stops, waits, and pulls away with everyone else",
    },
    {
      icon: MoonIcon,
      label: "you get out less wrecked",
      note: "all the small constant corrections are gone",
    },
  ];
</script>

<svelte:head>
  <title>comma.ai — variant 02</title>
</svelte:head>

<HomeVariant
  {features}
  meetSub="openpilot does the steering and the pedals so you can just watch the road. a ten hour drive stops feeling like ten hours."
>
  <Drive slot="after-hero" />
</HomeVariant>
