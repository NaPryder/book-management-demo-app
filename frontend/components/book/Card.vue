<script setup lang="ts">
import DeletingDialog from './DeletingDialog.vue';


const props = defineProps({
  book: {
    type: Object as () => Book,
    required: true,
  },
});

</script>

<template>
  <UiCard class="py-2 grid grid-rows-[auto_2fr_1fr] gap-2 h-full">

    <UiCardHeader class="p-0 ">
      <NuxtImg src="/img/no-image.jpg" height="100" width="'100%'" class="mx-auto min-w-[100px]" />
      <hr>

      <NuxtLink :to="`/books/${props.book.id}`" class="p-0 m-0">
        <h3 class="text-lg font-semibold px-2 hover:underline  hover:underline-offset-4 hover:transition-underline">
          {{ props.book.title }}
        </h3>
      </NuxtLink>
    </UiCardHeader>

    <UiCardContent class="flex flex-col gap-1 px-2">
      <p class="text-gray-600 text-sm">
        by {{ props.book.author }}
      </p>
      <p class="text-gray-600 text-sm italic">
        Published: {{ props.book.publishedYear }}
      </p>
    </UiCardContent>

    <UiCardFooter class="px-2 mt-2">
      <div class="flex flex-col text-xs w-full">
        <i class="text-right">
          Created: {{ formatReadableDateTime(props.book.createdAt) }}
        </i>
      </div>
    </UiCardFooter>
  </UiCard>

</template>
