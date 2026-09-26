<script>
  import HomeVariant from "../_HomeVariant.svelte";
  import More from "../_More.svelte";

  import SteerIcon from "$lib/icons/features/steer.svg?raw";
  import RoadIcon from "$lib/icons/features/road.svg?raw";
  import RecordingsIcon from "$lib/icons/features/recordings.svg?raw";
  import ConnectivityIcon from "$lib/icons/features/connectivity.svg?raw";

  const features = [
    {
      icon: SteerIcon,
      label: "hands off the wheel",
      note: "a camera watches your eyes instead",
    },
    {
      icon: RoadIcon,
      label: "back roads too",
      note: "not just the highway, and not just in daylight",
    },
    {
      icon: RecordingsIcon,
      label: "every drive recorded",
      note: "three cameras, saved and clippable",
    },
    {
      icon: ConnectivityIcon,
      label: "watch it live from your phone",
      note: "and see where the car is parked",
    },
  ];
</script>

<svelte:head>
  <title>comma.ai — variant 04</title>
</svelte:head>

<HomeVariant
  {features}
  meetSub="openpilot replaces your car's lane keeping and cruise control. then it keeps going: three cameras rolling, live from your phone, better every couple of months."
>
  <More slot="after-hero" />
</HomeVariant>
