<script>
  export let src;
  export let tooltip;
  export let callback = () => {};
</script>

<div class="group">
  <button
    on:click="{callback}"
    class="{`w-12 h-12 motion-safe:transition motion-safe:ease-in-out
    motion-safe:hover:scale-110 motion-safe:duration-200 dark:invert 
    relative flex items-center justify-center mt-2 mb-2 mx-2 shadow-lg text-green-500
    hover:bg-green-50 bg-gray-100 rounded-md hover:rounded-xl ${$$props.class ?? ''}`}">
    <img src="{src}" alt="" />
  </button>

  <span
    class="absolute w-auto p-2 m-4 -mx-1 min-w-max top-14 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold
    transition-all duration-200 origin-center scale-0 group-hover:scale-100">
    {tooltip}
  </span>
</div>
