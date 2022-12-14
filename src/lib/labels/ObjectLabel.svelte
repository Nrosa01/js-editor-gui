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

  $: {
    if (fieldValue !== null && mounted) {
      read_only = getAttribute(fieldValue, "READ_ONLY");
      expanded = getAttribute(fieldValue, "EXPANDED");
    }
  }

  onMount(() => {
    read_only = getAttribute(fieldValue, "READ_ONLY");
    onToggle({ detail: expanded });
    if (read_only) addReadOnlyAttribute();
    mounted = true;
  });

  function onToggle(event) {
    if (event.detail) utils.addAttribute(fieldValue, "EXPANDED");
    else utils.removeAttribute(fieldValue, "EXPANDED");
  }

  function addReadOnlyAttribute() {
    // Iterate object values, if they don't have attributes$jsonEditor, add them
    for (let i = 0; i < Object.values(fieldValue.value).length; i++) {
      if (!Object.values(fieldValue.value)[i].attributes$jsEditor) {
        Object.values(fieldValue.value)[i].attributes$jsEditor = ["READ_ONLY"];
      } // Add READ_ONLY if it's not there
      else {
        if (!Object.values(fieldValue.value)[i].attributes$jsEditor.includes("READ_ONLY")) 
          Object.values(fieldValue.value)[i].attributes$jsEditor.push("READ_ONLY");
      }
    }
  }
</script>

<Accordeon
  on:toggle="{onToggle}"
  expanded="{expanded}"
  name="{fieldName}"
  class="{!read_only ? 'text-slate-100' : 'text-slate-400'}">
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
