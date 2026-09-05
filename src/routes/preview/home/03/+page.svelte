<script>
  import HomeVariant from "../_HomeVariant.svelte";
  import Brain from "../_Brain.svelte";

  import VisionIcon from "$lib/icons/features/360-vision.svg?raw";
  import RoadIcon from "$lib/icons/features/road.svg?raw";
  import SteerIcon from "$lib/icons/features/steer.svg?raw";
  import UpdatesIcon from "$lib/icons/features/ota-updates.svg?raw";

  const features = [
    {
      icon: RoadIcon,
      label: "no lane lines needed",
      note: "it reads the whole road, not two stripes",
    },
    {
      icon: SteerIcon,
      label: "hands off the wheel",
      note: "the camera pointed at you keeps you honest",
    },
    {
      icon: VisionIcon,
      label: "three cameras",
      note: "watching ahead, out to the sides, and you",
    },
    {
      icon: UpdatesIcon,
      label: "a smarter model every couple of months",
      note: "free, over your own wifi",
    },
  ];
</script>

<svelte:head>
  <title>comma.ai — variant 03</title>
</svelte:head>

<HomeVariant
  {features}
  meetSub="openpilot replaces your car's lane keeping and cruise control. it drives like a person because it learned from people."
>
  <Brain slot="after-hero" />
</HomeVariant>
