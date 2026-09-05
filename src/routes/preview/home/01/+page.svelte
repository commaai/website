<script>
  import HomeVariant from "../_HomeVariant.svelte";
  import Comparison from "../_Comparison.svelte";

  import SteerIcon from "$lib/icons/features/steer.svg?raw";
  import RoadIcon from "$lib/icons/features/road.svg?raw";
  import UpdatesIcon from "$lib/icons/features/ota-updates.svg?raw";
  import RecordingsIcon from "$lib/icons/features/recordings.svg?raw";

  const features = [
    {
      icon: SteerIcon,
      label: "hands off the wheel",
      note: "a camera watches your eyes, not your grip",
    },
    {
      icon: RoadIcon,
      label: "any road, not just the highway",
      note: "worn lines, no lines, construction, dark",
    },
    {
      icon: UpdatesIcon,
      label: "better every couple of months",
      note: "free updates, over your own wifi",
    },
    {
      icon: RecordingsIcon,
      label: "three cameras always rolling",
      note: "check the car from your phone, save a clip",
    },
  ];
</script>

<svelte:head>
  <title>comma.ai — variant 01</title>
</svelte:head>

<HomeVariant
  {features}
  meetSub="openpilot replaces the lane keeping and cruise control your car came with. same buttons, completely different driver."
>
  <Comparison slot="after-hero" />
</HomeVariant>
