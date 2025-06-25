<script setup lang="ts">

type metaDataType = {
  hasNextPage: boolean;
  nextCursor?: string;
}

const props = defineProps({
  meta: {
    type: Object as () => metaDataType, // Adjust the type as needed
    required: true,
  },
})

async function loadMore() {
  console.log('---cursor---', props.meta?.nextCursor);
  if (!props.meta?.hasNextPage) return;
  // try {
  //   await books.value.loadNextPage();
  // } catch (error) {
  //   console.error('Failed to load more books:', error);
  // }
}


</script>

<template>
  <ClientOnly>
    <UiButton v-if="meta.hasNextPage" @click="loadMore">
      Load More
    </UiButton>
  </ClientOnly>

</template>
