<script>
  import { onMount } from "svelte";

  export let scale = 1;
  let moving = false;
  let mouseX, mouseY;

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

    const selectableAbsoluteElements = document.querySelectorAll(
      "[data-movable='movable']"
    );

    // Get mouse position
    const newMouseX = e.clientX;
    const newMouseY = e.clientY;

    // Get mouse movement
    const movementX = newMouseX - mouseX;
    const movementY = newMouseY - mouseY;

    // Update mouse position
    mouseX = newMouseX;
    mouseY = newMouseY;

    // Update all movable elements position
    for (const element of selectableAbsoluteElements) {
      const elementStyle = window.getComputedStyle(element);
      const elementWidth = parseInt(elementStyle.width);

      const elementTop = parseInt(elementStyle.top);
      const elementLeft = parseInt(elementStyle.left);

      // Update element position
      element.style.top = elementTop + movementY / scale + "px";
      element.style.left = elementLeft + movementX / scale + "px";
    }
  }
</script>

<svelte:window 
on:mousedown="{onMouseDown}"
on:mousemove="{onMouseMove}"
on:mouseup="{onMouseUp}"
/>
