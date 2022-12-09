<script>
  import { onMount } from "svelte";

  export let src;
  export let tooltip;
  let _tooltip;
  export let callback = () => {};

  onMount(() => {
    // Set tooltip left position based on tooltip text length
    _tooltip.style.left = `calc(50% - ${_tooltip.offsetWidth / 2}px)`;
  });
</script>

<div class="group relative">
  <button
    on:click="{callback}"
    class="{`w-12 h-12 motion-safe:transition motion-safe:ease-in-out
    motion-safe:hover:scale-110 motion-safe:duration-200 
    relative flex items-center justify-center p-1 my-4 mx-2 rounded-md hover:rounded-xl hover:bg-slate-600 group-active:scale-90 ${
      $$props.class ?? ''
    }`}">
    <img src="{src}" alt="" />
  </button>

  <span
    bind:this="{_tooltip}"
    class="absolute w-auto p-2 m-4 -mx-1 min-w-max -top-12 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold
    transition-all duration-200 origin-center scale-0 group-hover:scale-100">
    {tooltip}
  </span>
</div>
