<script>
  import { slide } from "svelte/transition";
  export let name = "Item";
  export let expanded = false;

  function toggle() {
    expanded = !expanded;
  }

  const expandedClass = "rotate-90";
  const collapsedClass = "rotate-0";
  $: iconClass = expanded ? expandedClass : collapsedClass;
</script>

<div class="{`w-full bg-slate-500`}">
  <div class="flex flex-col items-end">
    <div
      class="flex flex-row items-center justify-center w-full {name === ''
        ? 'hidden'
        : 'pt-1'}">
      <div class="flex flex-row mx-1 h-6 w-6">
        <slot name="buttonRight" />
        <img
          on:click="{toggle}"
          on:keydown
          src="caret-right.png"
          alt=""
          class="{`w-8 duration-75 transition-all ${iconClass} hover:bg-slate-600 hover:rounded-lg hover:brightness-125`}" />
      </div>
      <button
        class="w-full inline-block text-start pr-6 mr-2 mb-1 pl-3 py-2 bg-slate-700 text-white font-medium text-xs 
        leading-normal uppercase rounded shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-800 
        focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-900 active:shadow-lg transition duration-150 ease-in-out"
        on:click="{toggle}">{name}</button>
      <slot name="buttonLeft" />
    </div>

    {#if expanded}
      <div
        class="{name === '' ? 'w-full' : 'w-[96%]'} text-start" transition:slide>
          <slot />
      </div>
    {/if}
  </div>
</div>
