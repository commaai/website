<script>
  import HomeVariant from "../_HomeVariant.svelte";
  import Questions from "../_Questions.svelte";

  import SteerIcon from "$lib/icons/features/steer.svg?raw";
  import RoadIcon from "$lib/icons/features/road.svg?raw";
  import CruiseIcon from "$lib/icons/features/adaptive-cruise.svg?raw";
  import UpdatesIcon from "$lib/icons/features/ota-updates.svg?raw";

  const features = [
    {
      icon: SteerIcon,
      label: "hands off the wheel",
      note: "a camera watches your eyes instead",
    },
    {
      icon: RoadIcon,
      label: "highways and back roads",
      note: "worn lines, no lines, rain, dark",
    },
    {
      icon: CruiseIcon,
      label: "stop and go traffic",
      note: "it stops and pulls away with everyone else",
    },
    {
      icon: UpdatesIcon,
      label: "free updates forever",
      note: "a new version every couple of months",
    },
  ];
</script>

<svelte:head>
  <title>comma.ai — variant 05</title>
</svelte:head>

<HomeVariant
  {features}
  buyNote="$999 once. no subscription, ever."
  meetSub="openpilot replaces your car's lane keeping and cruise control. plugs in behind the mirror in 15 minutes."
>
  <Questions slot="before-proof" />
</HomeVariant>
