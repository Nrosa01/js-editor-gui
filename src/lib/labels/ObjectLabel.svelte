<script>
  import Accordeon from "../Accordeon.svelte";
  import ArrayLabel from "./ArrayLabel.svelte";
  import * as utils from "../../assets/utils.js";
  import FunctionLabel from "./FunctionLabel.svelte";
  import ObjectLabel from "./ObjectLabel.svelte";
  import TextLabel from "./TextLabel.svelte";
  import NumLabel from "./NumLabel.svelte";
  import BoolLabel from "./BoolLabel.svelte";
  import { getAttribute } from "../../assets/utils.js";
  import { onMount } from "svelte";

  export let parent;
  export let fieldName;
  export let fieldValue;

  export let expanded = false;
  let read_only = false;
  let mounted = false;

  const optionsMap = {
    String: TextLabel,
    Number: NumLabel,
    Boolean: BoolLabel,
    Null: TextLabel,
    Array: ArrayLabel,
    Object: ObjectLabel,
    Function: FunctionLabel,
  };

  onMount(() => {
    onToggle({ detail: expanded });
    mounted = true;
  });

  $: {
    if (fieldValue !== null && mounted) {
      read_only = getAttribute(fieldValue, "READ_ONLY");
      expanded = getAttribute(fieldValue, "EXPANDED");
    }
  }

  function onToggle(event) {
    if (event.detail) utils.addAttribute(fieldValue, "EXPANDED");
    else utils.removeAttribute(fieldValue, "EXPANDED");
  }
</script>

<Accordeon on:toggle="{onToggle}" expanded="{expanded}" name="{fieldName}">
  <div slot="buttonRight" class="flex flex-row">
    <slot />
  </div>
  {#each Object.entries(fieldValue.value) as [key, value], i}
    {#if optionsMap[value.type$jsEditor] && !utils.checkObjectHidden(value)}
      <svelte:component
        this="{optionsMap[value.type$jsEditor]}"
        parent="{fieldValue}"
        fieldName="{key}"
        bind:fieldValue="{fieldValue.value[key]}" />
    {/if}
  {/each}
</Accordeon>
