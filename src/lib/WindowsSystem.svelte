<script>
  import ObjectLabel from "./labels/ObjectLabel.svelte";
  import MovableWindows from "./MovableWindows.svelte";
  import * as utils from "../assets/utils.js";
  import { onMount } from "svelte";
  import * as objUtils from "../assets/objectUtils.js";
  import { addToApi } from "../assets/api.js";
  import Mover from "./Mover.svelte";

  let container;

  //localStorage.clear();
  const addObj = (obj) => {
    let item = utils.convertToEditorObject({ obj }).obj;
    //console.log("Adding item");
    //console.log(data);
    data.jsItems = [...data.jsItems, item];
    data.htmlItems.length = data.jsItems.length;
    data.htmlItemsData.length = data.jsItems.length;
    //console.log(data);
    //console.log("-----------------");
  };

  function close(event) {
    let id = event.detail;

    //console.log("Closing item with id: " + id);
    //console.log(data);

    data.jsItems = data.jsItems.filter((_, i) => i !== id);
    data.htmlItems.length = data.jsItems.length;
    data.htmlItemsData.length = data.jsItems.length;

    //console.log(data);
    //console.log("-----------------");
  }

  let data = utils.load();
  //data.jsItems = []

  $: {
    // Make sure scale is no less than 0.1
    if (data.scale < 0.1) data.scale = 0.1;
    if (container) container.style.transform = `scale(${data.scale})`;
  }

  const addElmnd = async () => {
    let loadedFile = await utils.loadFile(".js, .json");
    loadedFile = await utils.importUTF8StringAsJSObject(loadedFile);

    if (
      loadedFile !== undefined &&
      typeof loadedFile === "object" &&
      loadedFile.default !== undefined
    )
      addObj(loadedFile.default);
  };

  const loadConfig = async () => {
    let loadedFile = await utils.loadFile(".json");
    loadedFile = objUtils.deserializeJsAsText(loadedFile);
    loadedFile.htmlItems = [];
    // Check if it contains scale, if not or if it's not a number, set it to 1
    if (loadedFile.scale === undefined || isNaN(loadedFile.scale))
      loadedFile.scale = 1;

    if (loadedFile !== undefined && typeof loadedFile === "object") {
      // Check if loaded file contains jsItems and if it's an array
      if (
        loadedFile.jsItems !== undefined &&
        Array.isArray(loadedFile.jsItems)
      ) {
        // Check if each item in jsItems is an object
        for (const item of loadedFile.jsItems) {
          if (typeof item !== "object") {
            alert("Invalid config file");
            return;
          }
        }
      } else {
        alert("Invalid config file");
        return;
      }
      data = loadedFile;
    }

    data.htmlItemsData = loadedFile.htmlItemsData;

    //console.log("Loaded config");
    //console.log(data);
    //console.log("-----------------");
  };

  onMount(() => {
    document.addEventListener("keydown", (event) => {
      const keyToUpper = event.key.toUpperCase();
      // If event is Ctrl + + or Ctrl + - Prevent zoom
      if (event.ctrlKey && (keyToUpper === "+" || keyToUpper === "-")) {
        event.preventDefault();
        data.scale += keyToUpper === "+" ? 0.1 : -0.1;
      }
    });

    //For Google Chrome
    document.addEventListener(
      "mousewheel",
      (event) => {
        if (event.ctrlKey == true) {
          event.preventDefault();
          data.scale += event.deltaY > 0 ? -0.1 : 0.1;
        }
      },
      { passive: false }
    );

    // For Mozilla Firefox
    document.addEventListener(
      "DOMMouseScroll",
      (event) => {
        if (event.ctrlKey == true) {
          event.preventDefault();
          data.scale += event.deltaY > 0 ? -0.1 : 0.1;
        }
      },
      { passive: false }
    );

    // Set autosave every 5 seconds
    // setInterval(() => {
    //   getHTMLItemsData();
    //   utils.save(data);
    // }, 5000);

    //console.log("On mount");
    //console.log(data);
  });

  function getHTMLItemsData() {
    //console.log("Getting HTML items data")
    //console.log(data.htmlItems)
    data.htmlItemsData = [];
    
    for (let i = 0; i < data.htmlItems.length; i++) {
      const element = data.htmlItems[i];
      
      if (element === undefined || element === null) continue;
      
      const style = window.getComputedStyle(element);
      const width = parseInt(style.width);
      const height = parseInt(style.height);
      const left = parseInt(style.left);
      const top = parseInt(style.top);
      const zIndex = parseInt(style.zIndex);
      data.htmlItemsData.push({ width, height, left, top, zIndex });
    }
    
    //console.log("Returning HTML items data")
    return data.htmlItemsData;
  }

  data.getItemData = getHTMLItemsData;

  // On Page Close, save items to localStorage
  window.onbeforeunload = () => {
    getHTMLItemsData();
    utils.save(data);
  };

  // Api functions
  addToApi("add", addObj);
  addToApi("addItem", addElmnd);
  addToApi("clear", () => {
    data.jsItems = [];
    data.htmlItems = [];
    data.htmlItemsData = [];
    localStorage.clear();
  });
  addToApi("getItems", () => data.jsItems);
  addToApi("getScale", () => data.scale);
  addToApi("setScale", (scale) => (data.scale = scale));
  addToApi("saveToFile", () => utils.saveConfigToFile(data, "config.json"));
  addToApi("loadFromFile", loadConfig);
  addToApi("updateView", () => {data = data})
</script>

<Mover items="{data.htmlItems}" scale="{data.scale}" />
<div class="flex flex-col w-full h-full" bind:this="{container}">
  {#each data.jsItems as item, i (item)}
    <MovableWindows
      on:close="{close}"
      id="{i}"
      bind:dragElementNode="{data.htmlItems[i]}"
      windowsName="{item.value.WIN_TITLE?.value + ` ${i}` ?? `Windows ${i}`}"
      attributes="{data.htmlItemsData[i]}">
      <ObjectLabel
        expanded
        parent="{data.jsItems}"
        fieldName=""
        bind:fieldValue="{item}" />
    </MovableWindows>
  {/each}
</div>

<!-- windowsName="{item.WIN_TITLE ?? `Windows ${i}`}" -->
