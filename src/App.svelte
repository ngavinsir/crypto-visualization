<script lang="ts">
  import Function from "./components/Function.svelte";
  import clsx from "clsx";
  import {
    preprocessing as encryptPre,
    CC1,
    CTC,
    CC2,
    CC3,
  } from "./lib/encrypt";
  import {
    preprocessing as decryptPre,
    DCC1,
    DCTC,
    DCC2,
    DCC3,
  } from "./lib/decrypt";

  const encryptSteps = [encryptPre, CC1, CTC, CC2, CC3];
  const decryptSteps = [decryptPre, DCC3, DCC2, DCTC, DCC1];

  let selected = "encrypt";
</script>

<div
  class="flex flex-col w-full min-h-screen bg-gray-900 items-center p-2 pt-16">
  <h1 class="text-pink-400 text-5xl mb-3 font-ibm font-medium">Crypto</h1>
  <div class="flex py-2 space-x-3 max-w-full" style="width: 30rem">
    <span
      on:click={() => (selected = 'encrypt')}
      class={clsx('p-1 px-2 rounded-lg cursor-pointer', {
        'bg-gray-400 text-gray-900': selected === 'encrypt',
        'text-gray-400': selected !== 'encrypt',
      })}>Encrypt</span>
    <span
      on:click={() => (selected = 'decrypt')}
      class={clsx('p-1 px-2 rounded-lg cursor-pointer', {
        'bg-gray-400 text-gray-900': selected === 'decrypt',
        'text-gray-400': selected !== 'decrypt',
      })}>Decrypt</span>
  </div>
  <div class="max-w-full" style="width: 30rem">
    <Function
      steps={encryptSteps}
      label="encrypt"
      class={clsx({
        hidden: selected !== 'encrypt',
        flex: selected === 'encrypt',
      })} />
    <Function
      steps={decryptSteps}
      label="decrypt"
      class={clsx({
        hidden: selected !== 'decrypt',
        flex: selected === 'decrypt',
      })} />
  </div>
</div>
