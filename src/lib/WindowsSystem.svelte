<script>
  import ObjectLabel from "./ObjectLabel.svelte";
  import MovableWindows from "./MovableWindows.svelte";
  import * as utils from "../assets/utils.js";
  import { onMount } from "svelte";
  import * as objUtils from "../assets/objectUtils.js";

  //localStorage.clear();
  const addObj = (obj) => {
    data.jsItems = [...data.jsItems, obj];
  };

  let data = utils.load();
  utils.sharedData.add = addObj;

  const addElmnd = async () => {
    let loadedFile = await utils.loadFile(".js, .json");
    loadedFile = await utils.importUTF8StringAsJSObject(loadedFile);

    if (
      loadedFile !== undefined &&
      typeof loadedFile === "object" &&
      loadedFile.default !== undefined
    )
      data.jsItems = [...data.jsItems, loadedFile.default];
  };

  const loadConfig = async () => {
    let loadedFile = await utils.loadFile(".json");
    loadedFile = objUtils.deserializeJsAsText(loadedFile);
    loadedFile.htmlItems = [];

    if (loadedFile !== undefined && typeof loadedFile === "object") {
      data = loadedFile;
    }
  };

  onMount(() => {
    document.addEventListener("keydown", (event) => {
      const keyToUpper = event.key.toUpperCase();
      // Switch statement for key presses
      switch (keyToUpper) {
        case "A":
        case "O":
          addElmnd();
          break;
        case "C":
          data.jsItems = [];
          data.htmlItems = [];
          data.htmlItemsData = [];
          localStorage.clear();
          break;
        case "S":
          utils.saveConfigToFile(data, "config.json");
          break;
        case "L":
        case "T":
          loadConfig();
        default:
          break;
      }

      // Auto save every 15 seconds
      setInterval(() => {
        utils.save(data);
      }, 15000);
    });

    function getHTMLItemsData() {
      data.htmlItemsData = [];
      for (let i = 0; i < data.htmlItems.length; i++) {
        const element = data.htmlItems[i];
        const style = window.getComputedStyle(element);
        const width = parseInt(style.width);
        const height = parseInt(style.height);
        const left = parseInt(style.left);
        const top = parseInt(style.top);
        const zIndex = parseInt(style.zIndex);
        data.htmlItemsData.push({ width, height, left, top, zIndex });
      }

      return data.htmlItemsData;
    }

    data.getItemData = getHTMLItemsData;

    // On Page Close, save items to localStorage
    window.onbeforeunload = () => {
      getHTMLItemsData();
      utils.save(data);
    };
  });

  function close(event) {
    let id = event.detail;

    data.htmlItemsData = data.htmlItemsData.filter((_, i) => i !== id);
    data.htmlItems = data.htmlItems.filter((_, i) => i !== id);
    data.jsItems = data.jsItems.filter((_, i) => i !== id);
  }
</script>

<div class="flex flex-col w-full h-full bg-slate-600">
  {#each data.jsItems as item, i (item)}
    <MovableWindows
      on:close="{close}"
      id="{i}"
      bind:dragElementNode="{data.htmlItems[i]}"
      windowsName="{item.WIN_TITLE ?? `Windows ${i}`}"
      attributes="{data.htmlItemsData[i]}">
      <ObjectLabel expanded fieldName="" bind:fieldValue="{item}" />
    </MovableWindows>
  {/each}
</div>
