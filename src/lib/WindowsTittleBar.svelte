<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let windowsName = "Windows";
  export let node;

  function close() {
    dispatch("close");
  }
</script>

<nav
  bind:this="{node}"
  class="flex justify-between bg-slate-800 text-white min-w-full cursor-move">
  <div class="flex w-full items-center">
    <h1 class="text-lg mx-8 py-2 font-bold font-heading select-none">
      {windowsName}
    </h1>
    <!-- Empty space, without this it doesn wotk -->
    <ul
      class="flex px-4 mx-auto font-semibold font-heading space-x-12 cursor-move">
    </ul>
    <!-- Header Icons -->
    <button
      on:click="{close}"
      class="flex flex-col items-center justify-center w-12 h-full group">
      <img
        src="close.png"
        alt=""
        class="flex items-center w-6 p-1 rounded-lg transition-all duration-150 group-hover:rotate-12 group-hover:bg-red-400" />
    </button>
  </div>
</nav>