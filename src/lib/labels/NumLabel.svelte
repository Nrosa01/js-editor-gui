<script>
  import { processFieldName } from "../../assets/utils.js";

  export let parent;
  export let fieldValue;
  export let fieldName = "Name";
  let isReadonly = false;

  let inputClasses =
    "border rounded-md focus:outline-none focus:ring-1 box-content px-2 py-1 my-1 mx-2 read-only:text-slate-400 col-span-2 first-letter:px-2 font-bold text-slate-200 bg-slate-600 border-2 border-slate-800/0 mr-2 rounded-md shadow-lg ";
</script>

<div
  class="relative grid grid-cols-3 w-full items-center bg-slate-500 text-slate-200 font-bold pl-4">
  <h3>{processFieldName(fieldName)}</h3>
  <input
    readonly="{isReadonly}"
    bind:value="{fieldValue.value}"
    type="number"
    class="{inputClasses}"
    placeholder="{fieldValue?.inputLabel ?? 'Introduce un numero'}" />
</div>
