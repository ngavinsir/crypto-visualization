<script lang="ts">
  import clsx from "clsx";
  import Visualize from "./Visualize.svelte";
  export let steps: ((p: string, k: string) => string)[] = [];
  export let label = "";
  export let className = "";
  export { className as class };
  let input = "";
  let key = "";

  let text = [];

  async function run() {
    if (!input || !key) return;
    text = [input];
    key = key.toLowerCase();
    steps.reduce((prev, cur) => {
      const res = cur(prev, key);
      text.push(res);
      return res;
    }, input);
    text = [...new Set(text)];
  }
</script>

<div class={clsx(className, 'flex flex-col w-full space-y-4')}>
  <div class="flex flex-col border-2 border-gray-600 rounded-lg p-4">
    <div class="flex text-teal-400">
      <label class="flex flex-col w-1/2 pr-2">
        input
        <input
          bind:value={input}
          spellcheck={false}
          class="border-2 border-gray-600 bg-transparent rounded-lg p-1 px-2
              focus:outline-none focus:border-teal-500" />
      </label>
      <label class="flex flex-col w-1/2 pl-2">
        key
        <input
          bind:value={key}
          spellcheck={false}
          class="border-2 border-gray-600 bg-transparent rounded-lg p-1 px-2
              focus:outline-none focus:border-teal-500" />
      </label>
    </div>
    <span
      class="self-end mt-3 bg-teal-400 text-gray-900 py-1 px-3 rounded-lg flex 
          justify-center items-center cursor-pointer hover:bg-teal-500 shadow-xl"
      on:click={run}>
      {label}
    </span>
  </div>

  <Visualize {text} letterDuration={400} class="p-4" />
</div>
