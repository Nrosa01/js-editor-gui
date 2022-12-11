<script>
  import Accordeon from "../Accordeon.svelte";
  import * as utils from "../../assets/utils.js";
  import ObjectLabel from "./ObjectLabel.svelte";
  import { slide } from "svelte/transition";
  import TextLabel from "./TextLabel.svelte";
  import NumLabel from "./NumLabel.svelte";
  import BoolLabel from "./BoolLabel.svelte";
  import FunctionLabel from "./FunctionLabel.svelte";

  function add() {
    let obj = {};
    Object.assign(obj, objectModel);
    utils.valuesToDefault(obj);
    fieldValue = [...fieldValue, obj];
  }

  function remove() {
    fieldValue = fieldValue.slice(0, -1);
  }

  function inputChange(event) {
    let value = parseInt(event.target.value);
    while (value > Object.entries(fieldValue).length) add();
    while (value < Object.entries(fieldValue).length) remove();
  }

  export let parent;
  export let fieldName;
  export let fieldValue;
  const objectModel = fieldValue[0];
  Object.assign(objectModel, fieldValue[0]);

  const optionsMap = {
    String: TextLabel,
    Number: NumLabel,
    Boolean: BoolLabel,
    Null: TextLabel,
    Array: this,
    Object: ObjectLabel,
    Function: FunctionLabel,
  };
</script>

<div>
  <Accordeon name="{fieldName}">
    <div slot="buttonLeft" class="flex flex-col items-center justify-center">
      <input
        class="px-2 font-bold max-w-[4rem] text-slate-200 bg-slate-600 border-2 border-slate-800/0 mr-2 rounded-md shadow-lg"
        type="number"
        on:change="{inputChange}"
        value="{Object.entries(fieldValue).length}" />
    </div>
    {#each Object.entries(fieldValue) as [key, value], i (value)}
      <div class="flex flex-row" transition:slide|local>
        <svelte:component
          this="{optionsMap[utils.getTypeAsString(value)]}"
          bind:parent="{fieldValue}"
          bind:fieldName="{key}"
          bind:fieldValue="{fieldValue[key]}" />
      </div>
    {/each}
    <div class="flex flex-row items-center justify-end">
      <button
        on:click="{add}"
        class="bg-slate-600 px-2 py-1 font-bold text-xl text-slate-200 shadow-lg rounded-xl my-2 mr-1 hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800"
        >+</button>
      <button
        on:click="{remove}"
        class="bg-slate-600 px-2 py-1 font-extrabold text-xl text-slate-200 shadow-lg rounded-xl my-2 mr-2 hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800"
        >-</button>
    </div>
  </Accordeon>
</div>
