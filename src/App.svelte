<script>
  import AppBar from "./lib/AppBar.svelte";
  import AppBarIcon from "./lib/AppBarIcon.svelte";
  import WindowsSystem from "./lib/WindowsSystem.svelte";
</script>

<main>
  <div
    class="relative flex flex-col items-start align-center w-full h-screen bg-slate-600  overflow-hidden">
    <WindowsSystem />
    <AppBar>
      <AppBarIcon src="/baricons/add.png" tooltip="Add Item" callback="{() => {}}"/>
      <AppBarIcon src="/baricons/crossc.png" tooltip="Clear Board" callback="{() => {}}"/>
      <AppBarIcon src="/baricons/download.png" tooltip="Downlaod Board" callback="{() => {}}"/>
      <AppBarIcon src="/baricons/upload.png" tooltip="Load Board" callback="{() => {}}"/>
    </AppBar>
  </div>
</main>
