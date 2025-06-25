<script setup lang="ts">

const props = defineProps({
  totalPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
})

const emit = defineEmits(['page:change'])

</script>


<template>
  <div class="max-w-lg flex items-center gap-1 divide-x divide-gray-100">
    <UiButton v-for="pageNumber in totalPage" :key="pageNumber" @click="emit('page:change', pageNumber - 1)" :variant="(pageNumber - 1) === props.currentPage ?
      'default' : 'outline'">
      {{ pageNumber }}
    </UiButton>
  </div>
</template>
