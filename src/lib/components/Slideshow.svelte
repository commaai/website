<script>
  import { swipe } from "$lib/utils/swipe.js";

  import ChevronDownIcon from "$lib/icons/icon-chevron.svg?raw";

  export let images = [];

  export let selectedIndex = 0;

  const nextSlide = () => {
    selectedIndex = (selectedIndex + 1) % images.length;
  };

  const prevSlide = () => {
    selectedIndex = (selectedIndex - 1 + images.length) % images.length;
  };

  const keydownNextSlide = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    }
  }

  const keydownPrevSlide = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      prevSlide();
    }
  }

  const changeSlide = (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  }

  let slideOffsets = [];

  $: selectedIndex, slideOffsets = getSlideOffsets();

  const getSlideOffsets = () => {
    return images.map((_, index) => {
      if (selectedIndex === 0) {
        return index === images.length - 1 ? `-${images.length * 100}%` : '0%';
      } else if (selectedIndex === images.length - 1) {
        return index === 0 ? '100%' : `-${selectedIndex * 100}%`;
      } else {
        return `${selectedIndex * -100}%`;
      }
    });
  }
</script>

<div class="slideshow" role="region" aria-label="image carousel" use:swipe on:swipeRight={prevSlide} on:swipeLeft={nextSlide}>
  <div class="mask" id="slideshow-mask">
    {#each images as image, i}
      <div
        class="slide"
        aria-label={`${i + 1} of ${images.length}`}
        aria-hidden={i !== selectedIndex}
        role="group"
        style={`transform: translateX(${slideOffsets[i]})`}
      >
        <img src={image} loading="eager" alt="" />
      </div>
    {/each}
    <div aria-live="off" aria-atomic="true">Slide {selectedIndex + 1} of {images.length}.</div>
  </div>
  <div class="navigation-arrows">
    <div class="arrow-left" role="button" tabindex="0" aria-controls="slideshow-mask" aria-label="previous image" on:click={prevSlide} on:keydown={keydownPrevSlide}>
      {@html ChevronDownIcon}
    </div>
    <div class="arrow-right" role="button" tabindex="0" aria-controls="slideshow-mask" aria-label="next image" on:click={nextSlide} on:keydown={keydownNextSlide}>
      {@html ChevronDownIcon}
    </div>
  </div>
  <div class="pages">
    {#each images as _image, i}
      <div
        class="dot"
        class:active={i === selectedIndex}
        aria-label={`Show slide ${i + 1} of ${images.length}`}
        aria-pressed={i === selectedIndex}
        role="button"
        tabindex={i === selectedIndex ? '0' : '-1'}
        on:keydown={changeSlide}
        on:click={() => selectedIndex = i}
      />
    {/each}
  </div>
</div>

<style>
  .slideshow {
    display: flex;
    flex: 1;
    align-items: center;
    flex-direction: column;
    position: relative;
    max-height: 80vh;
  }

  .mask {
    display: flex;
    flex: 1;
    align-items: center;
    position: relative;
    left: 0;
    right: 0;
    padding: 0 5rem;
    overflow: hidden;
  }


  @media screen and (max-width: 768px) {
    .mask {
      padding: 0;
    }

    .arrow-left, .arrow-right {
      opacity: 0;
    }
  }

  .slide {
    transition: transform 500ms, opacity 500ms;
    transform: translateX(0px);
    opacity: 1;
    display: inline-block;
    vertical-align: top;

    & {
      min-width: 100%;
      height: 100%;
      max-height: 90%;
    }

    & img {
      min-width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &[aria-hidden="true"] {
      opacity: 0;
    }
  }

  .navigation-arrows {
    & .arrow-left, & .arrow-right {
      position: absolute;
      max-height: 50%;
      width: 50%;
      top: 0;
      right: 0;
      bottom: 10%;
      left: 0;
      margin: auto;
      cursor: pointer;
      overflow: hidden;

      & svg {
        width: 24px;
        height: 100%;
        transition: width 0.2s;
      }

      &:focus {
        outline: none;

        & svg {
          width: 30px;
        }
      }
    }

    & .arrow-left {
      right: auto;
      text-align: start;
      margin-left: 3rem;

      & svg {
        transform: rotate(90deg);
      }
    }

    & .arrow-right {
      left: auto;
      text-align: end;
      margin-right: 3rem;

      & svg {
        transform: rotate(270deg);
      }
    }
  }

  .pages {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;

    & .dot {
      width: 1rem;
      height: 1rem;
      margin: 0 6px;
      border-radius: 50%;
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.4);
      transition: background-color 0.2s, color 0.2s;

      &.active {
        background-color: white;
      }
    }
  }
</style>
