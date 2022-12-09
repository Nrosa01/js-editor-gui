<script>
  import ObjectLabel from "./ObjectLabel.svelte";
  import MovableWindows from "./MovableWindows.svelte";
  import * as utils from "../assets/utils.js";
  import { onMount } from "svelte";
  import * as objUtils from "../assets/objectUtils.js";
  import { addToApi } from "../assets/api.js";

  let container;

  //localStorage.clear();
  const addObj = (obj) => {
    data.jsItems = [...data.jsItems, obj];
  };

  let data = utils.load();

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

  function close(event) {
    let id = event.detail;

    data.htmlItemsData = data.htmlItemsData.filter((_, i) => i !== id);
    data.htmlItems = data.htmlItems.filter((_, i) => i !== id);
    data.jsItems = data.jsItems.filter((_, i) => i !== id);
  }

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
</script>

<div class="flex flex-col w-full h-full" bind:this="{container}">
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
