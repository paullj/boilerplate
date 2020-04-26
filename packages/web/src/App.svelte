<script>t, query } from '@urql/svelte';
import { HelloDocument } from './types/graphql.ts';

let todos;let $todos;

  initClient({ url: 'http://localhost:4000/graphql' });
  const i = 0;
  $: todos = query({
    query: HelloDocument,
  });
</script>

<style global type="text/scss">
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';
</style>

<h1>Boilerplate</h1>
{#if $todos.fetching}
  Loading...
{:else if $todos.error}
  Oh no! {$todos.error.message}
{:else}{$todos.data.hello;}{/if}
