<script lang="ts">
  import Visualize from "./components/Visualize.svelte";

  const steps = ["hack", "Hacki", "hAcki", "HACki", "HACK"];
</script>

<div class="flex w-full min-h-screen bg-gray-900 items-center pl-64">
  <Visualize text={steps} duration={800} transition={1500} />
</div>
