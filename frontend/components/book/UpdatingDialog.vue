<script setup lang="ts">
import { toast } from 'vue-sonner'
import BasedForm from './BasedForm.vue';
const config = useRuntimeConfig();
const BASE_URL = config.public.backendServerUrl;

const loading = ref(false)

const emit = defineEmits(['update:success'])
const props = defineProps({
  book: {
    type: Object as () => Book,
    required: true,
  },
})


async function handleUpdateBook(values: any) {
  loading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 200)); // Simulate a network request
    const res = await $fetch(`${BASE_URL}/books/${props.book.id}`, {
      method: 'PUT',
      body: values,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    emit('update:success')

  } catch (error) {

  } finally {
    loading.value = false;
  }
  toast('Success', {
    description: "Created a new book",
  })
}
</script>

<template>
  <BasedForm :handleSubmit="handleUpdateBook" title="Create New Book" buttonLabel="Save" :loading="loading"
    :keep-values="true" :initialData="book">
    <template v-slot:trigger>
      <slot name="trigger" />
    </template>
  </BasedForm>
</template>