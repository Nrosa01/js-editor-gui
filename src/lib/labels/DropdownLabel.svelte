<script>
  import { processFieldName } from "../../assets/utils.js";
  import { checkLabelHidden } from "../../assets/utils.js";
  import { getAttribute } from "../../assets/utils.js";
  import Dropdown from "../Dropdown/Dropdown.svelte";
  import DropdownItem from "../Dropdown/DropdownItem.svelte";

  export let parent;
  export let fieldValue;
  export let fieldName = "Name";
  let dropdownOptions = ["Default Value"];
  let read_only = false;
  let hiddenLabel = false;
  let labelToValueMap = new Map();
  let valueToLabelMap = new Map();

  // console.log("DropdownLabel: ", fieldName, fieldValue);

  $: {
    if (fieldValue !== null) {
      read_only = getAttribute(fieldValue, "READ_ONLY");
      hiddenLabel = checkLabelHidden(fieldValue);
      dropdownOptions = fieldValue.options;

      // If the map is empty, fill it with the values
      if (labelToValueMap.size === 0) {
        for (let i = 0; i < dropdownOptions.length; i++) {
          labelToValueMap.set(fieldValue.options[i], fieldValue.values[i]);
          valueToLabelMap.set(fieldValue.values[i], fieldValue.options[i]);
        }
      }
    }
  }

  $: labelROClasses = read_only ? "text-slate-400" : "text-slate-200";

  function optionSelected(event)
  {
    fieldValue.value = labelToValueMap.get(event.detail);
  }
</script>

<div
  class="{`relative grid grid-cols-3 w-full items-center bg-slate-500 text-slate-200 font-bold pl-4`}">
  <h3 class="{hiddenLabel ? 'hidden' : ''} {labelROClasses}">
    {processFieldName(fieldName)}
  </h3>
  <Dropdown
    on:optionSelected="{optionSelected}"
    label={valueToLabelMap.get(fieldValue.value)}
    class="{hiddenLabel ? 'col-span-3' : 'col-span-2'} {read_only
      ? 'text-slate-400'
      : 'text-slate-200'}">
    {#each dropdownOptions as option}
      <DropdownItem>{option}</DropdownItem>
    {/each}
  </Dropdown>
</div>
