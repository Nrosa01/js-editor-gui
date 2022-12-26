<script>
  import { onMount } from "svelte";

  export let config;
  let scale = 1;
  let container;
  let moving = false;
  let mouseX, mouseY;

  onMount(updateContainer);

  function updateContainer() {
    if (container === null) return;
    container.style.transform = `scale(${config.scale})`;
    container.style.transformOrigin = `${config.transform.x}px ${config.transform.y}px`;
    container.style.transformOrigin = `center`;
  }

  $: {
    if (config.scale < 0.1) config.scale = 0.1;
    if (config.scale > 2.5) config.scale = 2.5;
    if (container) {
      container.style.transform = `translate(${config.transform.x}px, ${config.transform.y}px) scale(${config.scale})`;
    }
  }

  function onMouseDown(e) {
    // If not middle mouse button, return
    if (e.button !== 1) return;

    moving = true;
    // Set cursor to move
    document.body.style.cursor = "grab";

    // Get mouse position
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function onMouseUp(e) {
    moving = false;

    // Set cursor to default
    document.body.style.cursor = "default";
  }

  function onMouseMove(e) {
    if (!moving) return;

    // Get mouse position
    const newMouseX = e.clientX;
    const newMouseY = e.clientY;

    // Get mouse movement
    const movementX = newMouseX - mouseX;
    const movementY = newMouseY - mouseY;

    // Update mouse position
    mouseX = newMouseX;
    mouseY = newMouseY;

    // Update canvas position
    config.transform.x += movementX / scale;
    config.transform.y += movementY / scale;
  }
  
  function onKeydown(event) {
    const keyToUpper = event.key.toUpperCase();
    // If event is Ctrl + + or Ctrl + - Prevent zoom
    if (event.ctrlKey && (keyToUpper === "+" || keyToUpper === "-")) {
      event.preventDefault();
      config.scale += keyToUpper === "+" ? 0.1 : -0.1;
    }
  }

  function onMouseWheel(event) {
    if (event.ctrlKey == true) {
      event.preventDefault();
      config.scale += event.deltaY > 0 ? -0.1 : 0.1;
    }
  }
</script>

<svelte:window
  on:mousedown="{onMouseDown}"
  on:mousemove="{onMouseMove}"
  on:mouseup="{onMouseUp}"
  on:keydown="{onKeydown}"
  on:wheel|nonpassive="{onMouseWheel}" />

<div
  bind:this="{container}"
  class="relative w-screen h-screen overflow-visible">
  <slot />
</div>
