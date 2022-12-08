<script>
  import Accordeon from "./Accordeon.svelte";
  import ArrayLabel from "./ArrayLabel.svelte";
  import GenericLabel from "./GenericLabel.svelte";
  import * as utils from "../assets/utils.js";
  import FunctionLabel from "./FunctionLabel.svelte";
  import ObjectLabel from "./ObjectLabel.svelte";

  export let fieldName;
  export let fieldValue;
  export let expanded = false;
</script>

<Accordeon name="{fieldName}" bind:expanded="{expanded}">
  <div slot="buttonRight" class="flex flex-row">
    <slot />
  </div>
  {#each Object.entries(fieldValue) as [key, value], i}
    {#if key !== "HIDDEN" && key !== "WIN_TITLE"}
      {#if utils.getTypeAsString(value) === "Array"}
        <ArrayLabel fieldName="{key}" bind:fieldValue="{fieldValue[key]}" />
      {:else if utils.getTypeAsString(value) === "String"}
        <GenericLabel
          type="text"
          attributes="{utils.getAttributes(key)}"
          fieldName="{utils.processFieldName(key)}"
          bind:fieldValue="{fieldValue[key]}" />
      {:else if utils.getTypeAsString(value) === "Null"}
        <GenericLabel
          type="text"
          attributes="{utils.getAttributes(key)}"
          fieldName="{utils.processFieldName(key)}"
          bind:fieldValue="{fieldValue[key]}" />
      {:else if utils.getTypeAsString(value) === "Number"}
        <GenericLabel
          type="number"
          attributes="{utils.getAttributes(key)}"
          fieldName="{utils.processFieldName(key)}"
          bind:fieldValue="{fieldValue[key]}" />
      {:else if utils.getTypeAsString(value) === "Boolean"}
        <GenericLabel
          type="checkbox"
          attributes="{utils.getAttributes(key)}"
          fieldName="{utils.processFieldName(key)}"
          bind:fieldValue="{fieldValue[key]}" />
      {:else if utils.getTypeAsString(value) === "Object"}
        <ObjectLabel
          fieldName="{utils.processFieldName(key)}"
          bind:fieldValue="{fieldValue[key]}" />
      {:else if utils.getTypeAsString(value) === "Function"}
        <FunctionLabel
          fieldName="{utils.processFieldName(key)}"
          bind:parameter="{fieldValue}"
          func="{value}" />
      {/if}
    {/if}
  {/each}
</Accordeon>
