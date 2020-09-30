<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";
  import clsx from "clsx";
  import CopyClipBoard from "./Clipboard.svelte";
  export let text: string[] = [];
  export let letterDuration = 200;
  export let gapDuration = 500;
  export let className = "";
  export { className as class };

  const dispatch = createEventDispatcher();

  type VisualText = {
    text: string;
    flag: boolean;
  };

  let step = -1;
  let timeout: number | undefined = undefined;
  let done = false;
  let totalDuration = letterDuration;
  let currentText: VisualText[] = text.length
    ? text[0].split("").map((text) => ({ text, flag: true }))
    : [];

  $: if (text.length) {
    reset();
  }
  $: if (text.length && !timeout) {
    update();
  }

  function update() {
    if (text[step + 1]) {
      updateCurrentText((step = step + 1));
      if (!text[step + 1]) {
        setTimeout(() => {
          done = true;
          dispatch("done");
        }, totalDuration + gapDuration);
      } else {
        timeout = setTimeout(update, totalDuration + gapDuration);
      }
    }
  }

  function updateCurrentText(step: number) {
    for (let i = 0; i < currentText.length; i++) {
      if (currentText[i].text !== text[step][i]) {
        currentText[i] = {
          text: text[step][i],
          flag: !currentText[i].flag,
        };
      }
    }
    if (currentText.length < text[step].length) {
      text[step]
        .split("")
        .slice(currentText.length)
        .forEach((text) =>
          currentText.push({
            text,
            flag: true,
          })
        );
    } else {
      currentText.splice(text[step].length);
    }
    totalDuration = letterDuration * currentText.length;
  }

  function reset() {
    done = false;
    step = -1;
    currentText =
      typeof text === "string"
        ? [{ text, flag: true }]
        : text[0].split("").map((text) => ({ text, flag: true }));
    timeout = undefined;
  }
</script>

<div class={clsx(className, 'flex flex-col w-full')}>
  <div
    class={clsx('flex self-end items-center space-x-3', {
      invisible: !text.length,
      visible: text.length,
    })}>
    <button
      disabled={!done}
      class="text-white disabled:opacity-25 disabled:cursor-not-allowed"
      on:click={reset}>restart</button>
    <svg
      on:click={() => {
        const app = new CopyClipBoard({
          target: document.getElementById('clipboard'),
          props: { name: currentText.map((t) => t.text).join('') },
        });
        app.$destroy();
      }}
      class="w-6 h-6 text-gray-200 cursor-pointer"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"><path
        d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
      <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" /></svg>
  </div>
  <div class="flex h-8 mt-2 flex-wrap">
    {#each currentText as i, index}
      <div class="relative flex items-center justify-center w-5 h-6">
        {#key i.text}
          <span
            in:fly={{ y: 30, duration: letterDuration, delay: (index / currentText.length) * totalDuration }}
            out:fly={{ y: -30, duration: letterDuration, delay: (index / currentText.length) * totalDuration }}
            class={clsx('absolute font-bold text-2xl', {
              'text-orange-400': i.flag,
              'text-pink-400': !i.flag,
            })}>{i.text}</span>
        {/key}
      </div>
    {/each}
  </div>
</div>

<div id="clipboard" />
