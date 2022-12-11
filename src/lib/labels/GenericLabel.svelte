<script>
  import { onMount } from "svelte";
  import { scale } from "svelte/transition";

  let labelDefault = "Titulo";
  let type = "text";
  export let parent;
  export let fieldValue;
  export let fieldName = "Name";
  let attributes;
  let input;

  let inputClasses = "";

  $: {
    inputClasses =
      "border rounded-md focus:outline-none focus:ring-1 box-content px-2 py-1 my-1 mx-2 read-only:text-slate-400 col-span-2 first-letter:px-2 font-bold text-slate-200 bg-slate-600 border-2 border-slate-800/0 mr-2 rounded-md shadow-lg ";
    
    switch (type) {
      case "number":
      case "text":
        inputClasses += "";
        break;
      case "checkbox":
        inputClasses += "w-fit my-1.5";
        break;
    }
  }

  
  $: checkedClasses = fieldValue ? "scale-100" : "scale-0";

  function typeAction(node) {
    node.type = type;
  }

  function inputChangeEvent() {
    switch (type) {
      case "number":
        fieldValue = parseInt(input.value);
        break;
      case "text":
        fieldValue = input.value;
        break;
    }
  }

  function initAttribues() {
    if (attributes) {
      attributes.forEach((attribute) => {
        if (attribute === "RO") {
          isReadonly = true;
        }
      });
    }
  }

  let isReadonly = false;
  onMount(() => {
    if (type !== "checkbox") {
      input.value = fieldValue;
      input.addEventListener("input", inputChangeEvent);
    }

    initAttribues();
  });
</script>

<div
  class="relative grid grid-cols-3 w-full items-center bg-slate-500 text-slate-200 font-bold pl-4">
  <h3>{fieldName}</h3>
  {#if type !== "checkbox"}
    <input
      readonly="{isReadonly}"
      bind:this="{input}"
      use:typeAction
      class="{inputClasses} "
      placeholder="{labelDefault}" />
  {:else}
    <span
      on:click="{() => {
        fieldValue = !fieldValue;
      }}"
      on:keydown
      class="{inputClasses} flex flex-col items-center justify-center py-0 px-0 m-0 hover:brightness-75">
        <div transition:scale class="rounded-sm transition-transform duration-150 {checkedClasses} w-2 h-2 m-2 bg-slate-200"></div>
    </span>
  {/if}
</div>
