<script setup lang="ts">
import { toast } from 'vue-sonner'
import BasedForm from './BasedForm.vue';
const config = useRuntimeConfig();
const BASE_URL = config.public.backendServerUrl;

const loading = ref(false)

const emit = defineEmits(['create:success'])
// const props = defineProps({
//   onUpdateSuccess: {
//     type: Function,
//     required: true,
//   },
// })

async function handleCreateBook(values: any) {
  loading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate a network request
    const res = await $fetch(`${BASE_URL}/books`, {
      method: 'POST',
      body: values,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    emit('create:success')

  } catch (error) {

  } finally {
    loading.value = false;
  }
  toast.success('Success', {
    description: "Created a new book",
  })
}
</script>

<template>
  <BasedForm :handleSubmit="handleCreateBook" title="Create New Book" buttonLabel="Save" :loading="loading">
    <template v-slot:trigger>
      <UiButton variant="default">
        Create Book
      </UiButton>
    </template>
  </BasedForm>
</template>