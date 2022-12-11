<script>
  import Accordeon from "../Accordeon.svelte";
  import ArrayLabel from "./ArrayLabel.svelte";
  import * as utils from "../../assets/utils.js";
  import FunctionLabel from "./FunctionLabel.svelte";
  import ObjectLabel from "./ObjectLabel.svelte";
  import TextLabel from "./TextLabel.svelte";
  import NumLabel from "./NumLabel.svelte";
  import BoolLabel from "./BoolLabel.svelte";

  export let parent;
  export let fieldName;
  export let fieldValue;
  export let expanded = false;

  const optionsMap = {
    String: TextLabel,
    Number: NumLabel,
    Boolean: BoolLabel,
    Null: TextLabel,
    Array: ArrayLabel,
    Object: this,
    Function: FunctionLabel,
  };
</script>

<Accordeon name="{fieldName}" bind:expanded="{expanded}">
  <div slot="buttonRight" class="flex flex-row">
    <slot />
  </div>
  {#each Object.entries(fieldValue) as [key, value], i}
    {#if key !== "HIDDEN" && key !== "WIN_TITLE"}
      {#if optionsMap[utils.getTypeAsString(value)]}
        <svelte:component
          this="{optionsMap[utils.getTypeAsString(value)]}"
          parent="{fieldValue}"
          bind:fieldName="{key}"
          bind:fieldValue="{fieldValue[key]}" />
      {/if}
    {/if}
  {/each}
</Accordeon>
