<script>
  import AppBar from "./lib/AppBar.svelte";
  import AppBarIcon from "./lib/AppBarIcon.svelte";
  import WindowsSystem from "./lib/WindowsSystem.svelte";
  import { api } from "./assets/api.js";
  import icons from "./assets/icons.js";
</script>

<main>
  <div
    class="relative flex flex-col items-start align-center w-full h-screen bg-slate-600  overflow-hidden">
    <WindowsSystem />
    <AppBar>
      <AppBarIcon src="{icons.add}" tooltip="Add Item" callback="{api.addItem}"/>
      <AppBarIcon src="{icons.crossc}" tooltip="Clear Board" callback="{api.clear}"/>
      <AppBarIcon src="{icons.download}" tooltip="Downlaod Board" callback="{api.saveToFile}"/>
      <AppBarIcon src="{icons.upload}" tooltip="Load Board" callback="{api.loadFromFile}"/>
    </AppBar>
  </div>
</main>
