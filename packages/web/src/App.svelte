<script>
  import { initClient, query } from '@urql/svelte';
  import { HelloDocument } from './generated/graphql';

  let todos;

  initClient({ url: 'http://localhost:4000/graphql' });
  const i = 0;
  $: helloQuery = query({
    query: HelloDocument,
  });
</script>

<style global type="text/scss">
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';
</style>

<div class="p-5">
  {#if $helloQuery.fetching}
    <p>Loading...</p>
  {:else if $helloQuery.error}
    <p>Oh no! {$helloQuery.error.message}</p>
  {:else}
    <h1 class="text-5xl font-sans antialiasing font-bold text-gray-900">
      {$helloQuery.data.hello} from the Boilerplate server.
    </h1>
  {/if}
</div>
