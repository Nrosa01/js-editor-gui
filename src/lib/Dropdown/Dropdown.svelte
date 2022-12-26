<script>
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
	import { createEventDispatcher } from 'svelte';

  let selectBox;
  let toggle_ = false;
  export let label = "Default";

  const containerStyle =
    "border rounded-md box-content my-1 mx-2 font-bold text-slate-200 bg-slate-600 border-2 border-slate-800/0 rounded-md shadow-lg";

  function mouseenter() {
    // Wait 0.1s before showing the dropdown
    setTimeout(() => {
      toggle_ = true;
    }, 110);
  }

  function mouseleave() {
    // Wait 0.1s before hiding the dropdown
    setTimeout(() => {
      toggle_ = false;
    }, 100);
  }

  onMount(() => {
    const options = selectBox.querySelectorAll("div.option");

    // Add event listeners to all options
    options.forEach((option) => {
      option.addEventListener("click", optionSelected);
    });
  });

  function optionSelected(event) {
    toggle_ = false;
    console.log(event.srcElement.innerText);
    label = event.srcElement.innerText;
    dispatch("optionSelected", label);
  }

  const dispatch = createEventDispatcher();
</script>

<div
  on:mouseenter="{mouseenter}"
  on:mouseleave="{mouseleave}"
  class="relative {containerStyle} {$$props.class}">
  <button class="w-full px-2 py-1 text-left"
    >{label}</button>
  <div class="absolute w-full h-4 rounded-md z-50"></div>
  <div
    transition:slide
    bind:this="{selectBox}"
    class="transition-transform duration-100 {!toggle_
      ? 'scale-y-0'
      : 'scale-y-1'} origin-top absolute w-full max-h-[12rem] mt-2 bg-slate-700 rounded-md shadow-lg z-50 overflow-auto">
    <slot />
  </div>
</div>
