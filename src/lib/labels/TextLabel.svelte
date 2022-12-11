<script>
  import { processFieldName } from "../../assets/utils.js";
  import { checkLabelHidden } from "../../assets/utils.js";

  export let parent;
  export let fieldValue;
  export let fieldName = "Name";
  let isReadonly = false;
  let hiddenLabel = checkLabelHidden(fieldValue);

  let inputClasses =
    "border rounded-md focus:outline-none focus:ring-1 box-content px-2 py-1 my-1 mx-2 read-only:text-slate-400 col-span-2 first-letter:px-2 font-bold text-slate-200 bg-slate-600 border-2 border-slate-800/0 mr-2 rounded-md shadow-lg ";
</script>

<div
  class="relative grid grid-cols-3 w-full items-center bg-slate-500 text-slate-200 font-bold pl-4">
  <h3 class="{hiddenLabel ? "hidden" : ""}">{processFieldName(fieldName)}</h3>
  <input
    readonly="{isReadonly}"
    bind:value="{fieldValue.value}"
    type="text"
    class="{inputClasses} {hiddenLabel ? "col-span-3" : ""}"
    placeholder="{fieldValue?.inputLabel ?? 'Introduce texto'}" />
</div>
