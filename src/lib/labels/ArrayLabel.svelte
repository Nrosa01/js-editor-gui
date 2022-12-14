<script>
  import Accordeon from "../Accordeon.svelte";
  import * as utils from "../../assets/utils.js";
  import ObjectLabel from "./ObjectLabel.svelte";
  import { slide } from "svelte/transition";
  import TextLabel from "./TextLabel.svelte";
  import NumLabel from "./NumLabel.svelte";
  import BoolLabel from "./BoolLabel.svelte";
  import FunctionLabel from "./FunctionLabel.svelte";
  import ArrayLabel from "./ArrayLabel.svelte";
  import { onMount } from "svelte";
  import { getAttribute, processFieldName } from "../../assets/utils.js";

  function add() {
    let obj = {};
    Object.assign(obj, objectModel);
    utils.valuesToDefault(obj.value);
    fieldValue.value = [...fieldValue.value, obj];
  }

  function remove() {
    if (fieldValue.value.length > 0) fieldValue.value.length--;
  }

  function inputChange(event) {
    let value = parseInt(event.target.value);
    while (value > fieldValue.value.length) add();
    while (value < fieldValue.value.length) remove();
  }

  export let parent;
  export let fieldName;
  export let fieldValue;

  const objectModel = fieldValue.value[0];
  Object.assign(objectModel, fieldValue.value[0]);

  const optionsMap = {
    String: TextLabel,
    Number: NumLabel,
    Boolean: BoolLabel,
    Null: TextLabel,
    Object: ObjectLabel,
    Array: ArrayLabel,
    Function: FunctionLabel,
  };

  // Iterate all values, if they don't have attributes$jsonEditor, add them
  function addHiddenLabelAttribute() {
    for (let i = 0; i < fieldValue.value.length; i++) {
      if (!fieldValue.value[i].attributes$jsEditor) {
        fieldValue.value[i].attributes$jsEditor = ["HIDE_LABEL"];
      } // Add HIDE_LABEL if it's not there
      else {
        if (!fieldValue.value[i].attributes$jsEditor.includes("HIDE_LABEL")) {
          fieldValue.value[i].attributes$jsEditor.push("HIDE_LABEL");
        }
      }
    }
  }

  function addReadOnlyAttribute() {
    for (let i = 0; i < fieldValue.value.length; i++) {
      if (!fieldValue.value[i].attributes$jsEditor) {
        fieldValue.value[i].attributes$jsEditor = ["READ_ONLY"];
      } // Add READ_ONLY if it's not there
      else {
        if (!fieldValue.value[i].attributes$jsEditor.includes("READ_ONLY")) {
          fieldValue.value[i].attributes$jsEditor.push("READ_ONLY");
        }
      }
    }
  }

  let read_only = false;
  let expanded = false;
  let mounted = false;

  $:
  {
    if(fieldValue !== null && mounted)
    {
      read_only = getAttribute(fieldValue, "READ_ONLY");
      expanded = getAttribute(fieldValue, "EXPANDED");
    }
  }
  
  onMount(() => {
    read_only = getAttribute(fieldValue, "READ_ONLY");

    addHiddenLabelAttribute();
    if (read_only) addReadOnlyAttribute();
    mounted = true;
  });

  function onToggle(event) {
    if (event.detail) utils.addAttribute(fieldValue, "EXPANDED");
    else utils.removeAttribute(fieldValue, "EXPANDED");
  }
</script>

<div>
  <Accordeon
    on:toggle="{onToggle}"
    expanded="{expanded}"
    name="{processFieldName(fieldName, "Array")}"
    class="{!read_only ? 'text-slate-100' : 'text-slate-400'}">
    <div slot="buttonLeft" class="flex flex-col items-center justify-center">
      <input
        class="px-2 font-bold max-w-[4rem] {!read_only
          ? 'text-slate-200'
          : 'text-slate-400'} bg-slate-600 border-2 border-slate-800/0 mr-2 rounded-md shadow-lg"
        type="number"
        on:change="{inputChange}"
        disabled="{read_only}"
        value="{fieldValue.value.length}" />
    </div>
    {#each Object.entries(fieldValue.value) as [key, value], i (value)}
      <div class="flex flex-row" transition:slide|local>
        <svelte:component
          this="{optionsMap[value.type$jsEditor]}"
          parent="{fieldValue.value}"
          fieldName="{utils.getItemArrayName(value.value, i)}"
          bind:fieldValue="{fieldValue.value[key]}" />
      </div>
    {/each}
    <div class="flex flex-row items-center justify-end">
      <button
        on:click="{add}"
        disabled="{read_only}"
        class="bg-slate-600 px-2 py-1 font-bold text-xl {!read_only
          ? 'text-slate-200'
          : 'text-slate-400'} shadow-lg rounded-xl my-2 mr-1 hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800"
        >+</button>
      <button
        on:click="{remove}"
        disabled="{read_only}"
        class="bg-slate-600 px-2 py-1 font-extrabold text-xl {!read_only
          ? 'text-slate-200'
          : 'text-slate-400'}shadow-lg rounded-xl my-2 mr-2 hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800"
        >-</button>
    </div>
  </Accordeon>
</div>
