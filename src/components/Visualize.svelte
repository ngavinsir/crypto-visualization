<script lang="ts" context="module">
  let play = false;

  export function start() {
    play = true;
  }
</script>

<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import clsx from "clsx";

  export let text: string | string[] = "";
  export let duration = 1000;
  export let transition = 1000;

  type VisualText = {
    text: string;
    flag: boolean;
    init?: boolean;
  };

  let step = 0;
  let interval: number | undefined = undefined;
  let done = false;
  let currentText: VisualText[] =
    typeof text === "string"
      ? [{ text, flag: true, init: true }]
      : text[0].split("").map((text) => ({ text, flag: true, init: true }));

  $: if (!interval && play) {
    interval = setInterval(() => {
      if (text[step + 1]) {
        updateCurrentText((step = step + 1));
        if (!text[step + 1]) {
          clearInterval(interval);
          done = true;
        }
      }
    }, transition);
  }

  function updateCurrentText(step: number) {
    for (let i = 0; i < currentText.length; i++) {
      if (currentText[i].text !== text[step][i]) {
        currentText[i] = {
          text: text[step][i],
          flag: !currentText[i].flag,
          init: false,
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
            init: true,
          })
        );
    } else {
      currentText.splice(text[step].length);
    }
  }

  function inTransition(node: Element, options: { init?: boolean }) {
    if (options.init) return fly(node, { y: 30, duration });
    else return fade(node, { duration });
  }

  function reset() {
    done = false;
    step = 0;
    currentText =
      typeof text === "string"
        ? [{ text, flag: true, init: true }]
        : text[0].split("").map((text) => ({ text, flag: true, init: true }));
    interval = undefined;
  }
</script>

<div class="flex flex-col">
  <div class="flex h-8">
    {#each currentText as i}
      <div class="relative w-5 flex items-center justify-center">
        {#key i.text}
          <span
            in:inTransition={{ init: i.init }}
            out:fly={{ y: -30, duration: duration }}
            class={clsx('absolute font-bold text-2xl', {
              'text-orange-400': i.flag,
              'text-pink-400': !i.flag,
            })}>{i.text}</span>
        {/key}
      </div>
    {/each}
  </div>
  <button
    disabled={!done}
    class="self-start text-white disabled:opacity-25 disabled:cursor-not-allowed"
    on:click={reset}>restart</button>
</div>
