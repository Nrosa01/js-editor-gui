<script>
  import { onMount } from "svelte";

  let bar;

  onMount(() => {
    // Set bar position to middle of screen in the x-axis
    bar.style.left = `calc(50% - ${bar.offsetWidth / 2}px)`;
    // Set y to bottom of screen plus some botton margin
    bar.style.top = `calc(100% - ${bar.offsetHeight}px)`;
    // Add 2 pixels to bar top
    bar.style.top = `calc(${bar.style.top} - 1rem)`;
  });
</script>

<div
  bind:this="{bar}"
  class="{`fixed top-0 left-0 rounded-full h-16 px-4 w-fit m-0 z-[1000] flex flex-row items-center justify-center bg-gray-700 text-slate-100 shadow-lg ${$$props.class ?? ''}`}">
  <slot />
</div>
