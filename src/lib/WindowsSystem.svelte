<script>
  import ObjectLabel from "./labels/ObjectLabel.svelte";
  import MovableWindows from "./MovableWindows.svelte";
  import * as utils from "../assets/utils.js";
  import * as objUtils from "../assets/objectUtils.js";
  import { addToApi } from "../assets/api.js";
  import Mover from "./Mover.svelte";

  let container;

  const addObj = (obj) => {
    let item = utils.convertToEditorObject({ obj }).obj;

    item.windows$jsEditor = null;
    data.jsItems = [...data.jsItems, item];
  };

  function close(event) {
    let id = event.detail;
    data.jsItems = data.jsItems.filter((_, i) => i !== id);
  }

  let data = utils.load();

  $: {
    if (data.canvas.scale < 0.1) data.canvas.scale = 0.1;
    if (data.canvas.scale > 5) data.canvas.scale = 5;
    if (container) container.style.transform = `scale(${data.canvas.scale})`;
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

    utils.tryMakeDataValid(data);
  };

  function onKeydown(event) {
    const keyToUpper = event.key.toUpperCase();
    // If event is Ctrl + + or Ctrl + - Prevent zoom
    if (event.ctrlKey && (keyToUpper === "+" || keyToUpper === "-")) {
      event.preventDefault();
      data.canvas.scale += keyToUpper === "+" ? 0.1 : -0.1;
    }
  }

  function onMouseWheel(event) {
    if (event.ctrlKey == true) {
      event.preventDefault();
      data.canvas.scale += event.deltaY > 0 ? -0.1 : 0.1;
    }
  }

  function saveWindowsData() {
    for (let i = 0; i < data.jsItems.length; i++) {
      const element = data.jsItems[i].windows$jsEditor;
      if (element === undefined || element === null) {
        console.warn("Element is undefined or null");
        return;
      }

      const style = window.getComputedStyle(element);
      const width = parseInt(style.width);
      const height = parseInt(style.height);
      const left = parseInt(style.left);
      const top = parseInt(style.top);
      const zIndex = parseInt(style.zIndex);

      const jsItem = data.jsItems[i];
      jsItem.windowsData$jsEditor = { width, height, left, top, zIndex };
    }
  }

  let appCrashed = false;

  // On Page Close, save items to localStorage
  function onBeforeUnload() {
    save();
    if (!appCrashed) localStorage.setItem("appCrahed", appCrashed.toString());
    console.log("Unload");
  };

  function onError(message, source, lineno, colno, error) {
    if (utils.checkIfErrorCanBeIgnored(message)) return;

    console.log("Error: " + message);
    console.log("Source: " + source);
    console.log("Line: " + lineno);
    console.log("Column: " + colno);

    // Check if the app crashed before
    if (localStorage.getItem("appCrahed") === "true") {
      // Modal to ask if user wants to clear the data
      if (confirm("The app crashed before, do you want to clear the data?")) {
        localStorage.clear();
        data = { jsItems: [], canvas: { scale: 1 } };
      }

      window.location.reload();
      return;
    }

    appCrashed = true;
    console.log(localStorage.getItem("appCrahed"));
    localStorage.setItem("appCrahed", appCrashed.toString());

    // Check if all objects of jsItems are valid
    for (let i = 0; i < data.jsItems.length; i++) {
      const item = data.jsItems[i];
      if (!utils.checkIfValidJsEditorObject(item)) {
        alert(
          `Invalid object at ${i}, turning into valid object (might cause issues)`
        );
        data.jsItems[i] = utils.convertToEditorObject({ item }).item;
        save();
        window.location.reload();
        return;
      }
    }
  }

  function save() {
    saveWindowsData();

    const dataToSave = { ...data };

    // Filter jsItems to remove windows$jsEditor
    dataToSave.jsItems = data.jsItems.map((item) => {
      const { windows$jsEditor, ...rest } = item;
      return rest;
    });

    utils.save(dataToSave);
  }

  function saveToFile() {
    saveWindowsData();

    const dataToSave = { ...data };

    // Filter jsItems to remove windows$jsEditor
    dataToSave.jsItems = data.jsItems.map((item) => {
      const { windows$jsEditor, ...rest } = item;
      return rest;
    });

    utils.saveConfigToFile(dataToSave, "config.json");
  }

  // Api functions
  addToApi("add", addObj);
  addToApi("addItem", addElmnd);
  addToApi("clear", () => {
    data.jsItems = [];
    localStorage.clear();
  });
  addToApi("getItems", () => data.jsItems);
  addToApi("getScale", () => data.canvas.scale);
  addToApi("setScale", (scale) => (data.canvas.scale = scale));
  addToApi("saveToFile", saveToFile);
  addToApi("loadFromFile", loadConfig);
  addToApi("updateView", () => {
    data = data;
  });
</script>

<svelte:window
  on:error="{onError}"
  on:keydown="{onKeydown}"
  on:wheel|nonpassive="{onMouseWheel}"
  on:beforeunload="{onBeforeUnload}" />

<Mover scale="{data.canvas.scale}" />
<div class="flex flex-col w-full h-full" bind:this="{container}">
  {#each data.jsItems as item, i (item)}
    <MovableWindows
      on:close="{close}"
      id="{i}"
      bind:dragElementNode="{item.windows$jsEditor}"
      windowsName="{item.value.WIN_TITLE?.value ?? `Windows ${i}`}"
      attributes="{item.windowsData$jsEditor}">
      <ObjectLabel
        expanded
        parent="{data.jsItems}"
        fieldName=""
        bind:fieldValue="{item}" />
    </MovableWindows>
  {/each}
</div>
