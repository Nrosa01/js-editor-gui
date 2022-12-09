<script>
  import AppBar from "./lib/AppBar.svelte";
  import AppBarIcon from "./lib/AppBarIcon.svelte";
  import WindowsSystem from "./lib/WindowsSystem.svelte";
  import { api } from "./assets/api.js";
</script>

<main>
  <div
    class="relative flex flex-col items-start align-center w-full h-screen bg-slate-600  overflow-hidden">
    <WindowsSystem />
    <AppBar>
      <AppBarIcon src="add.png" tooltip="Add Item" callback="{api.addItem}"/>
      <AppBarIcon src="crossc.png" tooltip="Clear Board" callback="{api.clear}"/>
      <AppBarIcon src="download.png" tooltip="Downlaod Board" callback="{api.saveToFile}"/>
      <AppBarIcon src="upload.png" tooltip="Load Board" callback="{api.loadFromFile}"/>
    </AppBar>
  </div>
</main>
