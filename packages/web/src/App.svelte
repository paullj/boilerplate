<script>
  import { initClient, query } from '@urql/svelte';
  import { HelloDocument } from './types/graphql.ts';

  let todos;

  initClient({ url: 'http://localhost:4000/graphql' });
  const i = 0;
  $: hello = query({
    query: HelloDocument,
  });
</script>

<style global type="text/scss">
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';
</style>

<div class="p-5">
  {#if $hello.fetching}
    <p>Loading...</p>
  {:else if $hello.error}
    <p>Oh no! {$hello.error.message}</p>
  {:else}
    <h1 class="text-5xl font-sans antialiasing font-bold text-gray-900">
      {$hello.data.hello} from the Boilerplate server.
    </h1>
  {/if}
</div>
