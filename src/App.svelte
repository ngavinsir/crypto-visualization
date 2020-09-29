<script lang="ts">
  import Function from "./components/Function.svelte";
  import clsx from "clsx";
  import { CC1, CTC, CC2, CC3 } from "./lib/encrypt";
  import { DCC1, DCTC, DCC2, DCC3 } from "./lib/decrypt";

  const encryptSteps = [CC1, CTC, CC2, CC3];
  const decryptSteps = [DCC3, DCC2, DCTC, DCC1];

  let selected = "encrypt";
</script>

<div
  class="flex flex-col w-full min-h-screen bg-gray-900 items-center justify-center">
  <h1 class="text-pink-400 text-5xl mb-3 font-ibm font-medium">Crypto</h1>
  <div class="flex py-2 space-x-3" style="width: 30rem">
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
  <div
    class="h-64 border-2 border-gray-600 rounded-lg p-4 flex flex-col"
    style="width: 30rem">
    <Function steps={selected === 'encrypt' ? encryptSteps : decryptSteps} />
  </div>
</div>
