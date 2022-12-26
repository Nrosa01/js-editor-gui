<script>
  import { onMount } from "svelte";

  onMount(() => {
    const selected = document.querySelector(".selected");
    const optionsContainer = document.querySelector(".options-container");

    const optionsList = document.querySelectorAll(".option");

    selected.addEventListener("click", () => {
      optionsContainer.classList.toggle("active");
    });

    optionsList.forEach((o) => {
      o.addEventListener("click", () => {
        selected.innerHTML = o.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active");
      });
    });
  });
</script>

<div class="select-box">
  <div class="options-container active">
    <div class="option">
      <input type="radio" class="radio" id="automobiles" name="category" />
      <label for="automobiles">Automobiles</label>
    </div>

    <div class="option">
      <input type="radio" class="radio" id="film" name="category" />
      <label for="film">Film & Animation</label>
    </div>

    <div class="option">
      <input type="radio" class="radio" id="science" name="category" />
      <label for="science">Science & Technology</label>
    </div>

    <div class="option">
      <input type="radio" class="radio" id="art" name="category" />
      <label for="art">Art</label>
    </div>

    <div class="option">
      <input type="radio" class="radio" id="music" name="category" />
      <label for="music">Music</label>
    </div>

    <div class="option">
      <input type="radio" class="radio" id="travel" name="category" />
      <label for="travel">Travel & Events</label>
    </div>

    <div class="option">
      <input type="radio" class="radio" id="sports" name="category" />
      <label for="sports">Sports</label>
    </div>

    <div class="option">
      <input type="radio" class="radio" id="news" name="category" />
      <label for="news">News & Politics</label>
    </div>

    <div class="option">
      <input type="radio" class="radio" id="tutorials" name="category" />
      <label for="tutorials">Tutorials</label>
    </div>
  </div>

  <div class="selected">Select Video Category</div>
</div>

<style>
  * {
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Roboto", sans-serif;
    background: #f7f6ff;
  }

  h2 {
    margin: 16px;
  }

  .container {
    margin-top: 100px;
    padding: 32px;
  }

  .select-box {
    display: flex;
    width: 400px;
    flex-direction: column;
  }

  .select-box .options-container {
    background: #2f3640;
    color: #f5f6fa;
    max-height: 0;
    width: 100%;
    opacity: 0;
    transition: all 0.4s;
    border-radius: 8px;
    overflow: hidden;

    order: 1;
  }

  .selected {
    background: #2f3640;
    border-radius: 8px;
    margin-bottom: 8px;
    color: #f5f6fa;
    position: relative;

    order: 0;
  }

  .selected::after {
    content: "";
    background-size: contain;
    background-repeat: no-repeat;

    position: absolute;
    height: 100%;
    width: 32px;
    right: 10px;
    top: 5px;

    transition: all 0.4s;
  }

  .select-box .options-container.active {
    max-height: 240px;
    opacity: 1;
    overflow-y: scroll;
  }

  .select-box .options-container.active + .selected::after {
    transform: rotateX(180deg);
    top: -6px;
  }

  .select-box .options-container::-webkit-scrollbar {
    width: 8px;
    background: #0d141f;
    border-radius: 0 8px 8px 0;
  }

  .select-box .options-container::-webkit-scrollbar-thumb {
    background: #525861;
    border-radius: 0 8px 8px 0;
  }

  .select-box .option,
  .selected {
    padding: 12px 24px;
    cursor: pointer;
  }

  .select-box .option:hover {
    background: #414b57;
  }

  .select-box label {
    cursor: pointer;
  }

  .select-box .option .radio {
    display: none;
  }
</style>
