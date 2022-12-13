<script>
  import { onMount } from "svelte";
  import { dragElement, moveToTop } from "../assets/utils.js";
  import WindowsTittleBar from "./WindowsTittleBar.svelte";
  import { createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";

  const dispatch = createEventDispatcher();

  export let windowsName = "Windows";
  export let attributes = {};
  export let id = 0;

  export let dragElementNode;
  let dragElementChild;

  function initAttribues() {
    // If no attributes are given, set position to center of parent of dragElementNode
    const elementStyle = window.getComputedStyle(dragElementNode);
    const elementWidth = parseInt(elementStyle.width);
    const elementHeight = parseInt(elementStyle.height);

    const parentStyle = window.getComputedStyle(dragElementNode.parentElement);
    const parentWidth = parseInt(parentStyle.width);
    const parentHeight = parseInt(parentStyle.height);

    // Set center as pivot point
    dragElementNode.style.transformOrigin = "center";

    console.log("attributes")
    console.log(attributes)

    if (attributes === null || Object.keys(attributes).length === 0) {
      attributes = {
        top: parentHeight / 2 - elementHeight / 2,
        left: parentWidth / 2 - elementWidth / 2,
        zIndex: document.querySelectorAll(".absolute").length,
      };
    }

    // Set attributes
    for (const [key, value] of Object.entries(attributes)) {
      dragElementNode.style[key.toLowerCase()] = value + "px";
      slot.style[key.toLowerCase()] = value + "px";
    }

    dragElementNode.style.zIndex = attributes.zIndex;
  }

  onMount(() => {
    dragElement(dragElementNode, dragElementChild);
    initAttribues();

    new ResizeObserver((e) => {
      // Make dragElementNode scale with slot
      if (slot === undefined || dragElementNode === null) return;

      dragElementNode.style.width = slot.offsetWidth + "px";
      dragElementNode.style.height = slot.offsetHeight + "px";
    }).observe(slot);
  });

  function close() {
    dispatch("close", id);
  }

  let slot;
</script>

<div
  on:pointerdown="{() =>
    moveToTop(dragElementNode, document.querySelectorAll('.absolute'))}"
  data-movable="movable"
  transition:scale
  bind:this="{dragElementNode}"
  class="bg-slate-500 absolute z-10 text-center rounded-md shadow-lg">
  <WindowsTittleBar
    windowsName="{windowsName}"
    bind:node="{dragElementChild}"
    on:close="{close}" />
  <div bind:this="{slot}" class="overflow-auto resize bg-slate-500 rounded-md">
    <slot />
  </div>
</div>
