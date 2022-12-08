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

    if (Object.keys(attributes).length === 0) {
      attributes = {
        top: parentHeight / 2 - elementHeight / 2,
        left: parentWidth / 2 - elementWidth / 2,
        zIndex: document.querySelectorAll('.absolute').length,
      };
    }

    // Set attributes
    for (const [key, value] of Object.entries(attributes)) {
      dragElementNode.style[key.toLowerCase()] = value + "px";
    }

    dragElementNode.style.zIndex = attributes.zIndex;
  }

  onMount(() => {
    dragElement(dragElementNode, dragElementChild);
    initAttribues();
  });

  function close() {
    dispatch("close", id);
    console.log("close");
  }
</script>

<div
  transition:scale
  on:mousedown="{() =>
    moveToTop(dragElementNode, document.querySelectorAll('.absolute'))}"
  bind:this="{dragElementNode}"
  class="w-[25%] max-h-screen max-w-full bg-slate-500 absolute z-10 text-center resize overflow-auto rounded-md shadow-lg">
  <WindowsTittleBar
    windowsName="{windowsName}"
    bind:node="{dragElementChild}"
    on:close="{close}" />
  <slot />
</div>
