<script>
  import Grid from "$lib/components/Grid.svelte";

  import PlayIcon from "$lib/icons/ui/play.svg?raw";

  import VideoThumbnail1Image from "$lib/images/featured-videos/video-player-bg-01.jpeg";
  import VideoThumbnail2Image from "$lib/images/featured-videos/video-player-bg-02.jpeg";
  import VideoThumbnail3Image from "$lib/images/featured-videos/video-player-bg-03.jpeg";
  import VideoThumbnail4Image from "$lib/images/featured-videos/video-player-bg-04.jpeg";
  import VideoThumbnail5Image from "$lib/images/featured-videos/video-player-bg-05.jpeg";
  import VideoThumbnail6Image from "$lib/images/featured-videos/video-player-bg-06.jpeg";

  const videos = [
    { poster: VideoThumbnail1Image, duration: "00:19:24", videoUrl: "https://www.youtube.com/watch?v=VxiR4iyBruo" },
    { poster: VideoThumbnail2Image, duration: "00:17:26", videoUrl: "https://www.youtube.com/watch?v=NmBfgOanCyk" },
    { poster: VideoThumbnail3Image, duration: "00:05:14", videoUrl: "https://www.youtube.com/watch?v=-IkImTe1NYE" },
    { poster: VideoThumbnail4Image, duration: "00:21:33", videoUrl: "https://www.youtube.com/watch?v=wJxjDd42gGA" },
    { poster: VideoThumbnail5Image, duration: "00:01:07", videoUrl: "https://www.youtube.com/watch?v=Ebxt_EPovE8" },
    { poster: VideoThumbnail6Image, duration: "00:07:05", videoUrl: "https://www.youtube.com/watch?v=heRIesnxvqI" },
  ];
</script>

<Grid columns={3} alignItems="center" rowGap="1rem" size="medium">
  {#each videos as video, i}
    <div class="item">
      <a href={video.videoUrl} target="_blank" class="video-poster">
        <img
          src={video.poster}
          alt={`example driving session ${i + 1}`}
        />
        {@html PlayIcon}
        <span>{video.duration}</span>
      </a>
    </div>
  {/each}
</Grid>

<style>
  .item {
    & .video-poster {
      min-width: 100%;
      max-height: 100%;
      display: inline-block;
      position: relative;

      & img {
        min-width: 100%;
        height: 220px;
        object-fit: cover;
      }

      @media screen and (max-width: 1024px) {
        & img {
          height: 190px;
        }
      }

      & svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      & span {
        position: absolute;
        top: auto;
        left: auto;
        bottom: 0;
        right: 0;
        margin-bottom: 1rem;
        margin-right: 1rem;
        color: white;
        font-family: JetBrains Mono, monospace;
      }
    }
  }
</style>
