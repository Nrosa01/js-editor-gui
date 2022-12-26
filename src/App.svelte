<script>
  import AppBar from "./lib/AppBar.svelte";
  import AppBarIcon from "./lib/AppBarIcon.svelte";
  import WindowsSystem from "./lib/WindowsSystem.svelte";
  import { api } from "./assets/api.js";
  import icons from "./assets/icons.js";
    import Dropdown from "./lib/Dropdown/Dropdown.svelte";
    import DropdownItem from "./lib/Dropdown/DropdownItem.svelte";
</script>

<main class="overflow-hidden bg-slate-600">
    <!-- <WindowsSystem />
    <AppBar>
      <AppBarIcon src="{icons.add}" tooltip="Add Item" callback="{api.addItem}"/>
      <AppBarIcon src="{icons.add}" tooltip="Clear Board" callback="{api.clear}" button="rotate-45"/>
      <AppBarIcon src="{icons.download}" tooltip="Downlaod Board" callback="{api.saveToFile}"/>
      <AppBarIcon src="{icons.download}" tooltip="Load Board" callback="{api.loadFromFile}" button="rotate-180"/>
    </AppBar> -->
    <div class="flex items-center justify-center w-screen h-screen bg-slate-100">
      <div class="w-[50%] h-[50%] bg-cyan-200">

        <Dropdown>
          <!-- <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem> -->
        </Dropdown>
      </div>
    </div>
</main>
