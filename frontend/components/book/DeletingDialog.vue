<script setup lang="ts">
import { toast } from 'vue-sonner'

const config = useRuntimeConfig();
const BASE_URL = config.public.backendServerUrl;

const loading = ref(false)
const open = ref(false)
const onOpenChange = (value: boolean) => {
  open.value = value
}

const props = defineProps({
  book: {
    type: Object as () => Book,
    required: true,
  },
})

async function handleDeleteBook() {
  loading.value = true;
  try {
    await $fetch(
      `${BASE_URL}/books/${props.book.id}`,
      {
        method: 'DELETE',
        onResponseError: () => {
          // revert to original data
          toast.error('Failed to delete book', {
            description: 'Please try again later.',
          });
        }
      },
    )
    toast('Success', {
      description: "Deleted the book",
    })
    navigateTo('/books')
  } catch (error) {
    console.error('Error deleting book:', error);
  } finally {
    loading.value = false
  }

}

</script>



<template>
  <UiDialog :open="open" @update:open="() => onOpenChange(!open)">

    <UiDialogTrigger as-child>
      <slot name="trigger" />
    </UiDialogTrigger>

    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle>
          Delete Book
        </UiDialogTitle>
        <UiDialogDescription>
          Are you sure you want to delete this book?
        </UiDialogDescription>
      </UiDialogHeader>
      <UiDialogFooter>

        <UiButton variant="secondary" @click="onOpenChange(false)" :disabled="loading">
          <Icon v-if="loading" name="line-md:loading-twotone-loop" size="1.5rem" />
          <p v-else>
            Cancel
          </p>
        </UiButton>

        <UiButton variant="destructive" @click="handleDeleteBook" :disabled="loading">

          <Icon v-if="loading" name="line-md:loading-twotone-loop" size="1.5rem" />
          <p v-else>
            Delete
          </p>
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>