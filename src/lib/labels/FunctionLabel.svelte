<script>
  import { api } from "../../assets/api.js";
  export let fieldName = "Button";
  export let fieldValue;
  export let parent;

  function call() {
    fieldValue(parent, api);
  }
</script>

<div
  class="w-full items-center bg-slate-500 text-slate-200 font-bold pl-4 pr-2 py-1">
  <button
    type="button"
    class="w-full inline-block px-6 py-2 bg-slate-700 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-slate-800 hover:shadow-lg focus:bg-slate-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-000 active:shadow-lg transition duration-150 ease-in-out"
    on:click="{call}">
    {fieldName}
  </button>
</div>