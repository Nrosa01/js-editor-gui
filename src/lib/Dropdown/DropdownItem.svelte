<script>
  let data;
</script>

<span bind:this="{data}" class="hidden"><slot /></span>

<div
  on:keydown
  class="option px-2 py-4 cursor-pointer hover:bg-slate-500">
  <h2>{data?.innerText}</h2>
</div>
