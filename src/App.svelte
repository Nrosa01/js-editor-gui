<script>
  import AppBar from "./lib/AppBar.svelte";
  import AppBarIcon from "./lib/AppBarIcon.svelte";
  import WindowsSystem from "./lib/WindowsSystem.svelte";
  import { api } from "./assets/api.js";
  import icons from "./assets/icons.js";
</script>

<main class="overflow-hidden bg-slate-600">
    <WindowsSystem />
    <AppBar>
      <AppBarIcon src="{icons.add}" tooltip="Add Item" callback="{api.addFromFile}"/>
      <AppBarIcon src="{icons.add}" tooltip="Clear Board" callback="{api.clear}" button="rotate-45"/>
      <AppBarIcon src="{icons.download}" tooltip="Downlaod Board" callback="{api.saveToFile}"/>
      <AppBarIcon src="{icons.download}" tooltip="Load Board" callback="{api.loadFromFile}" button="rotate-180"/>
    </AppBar>
</main>
