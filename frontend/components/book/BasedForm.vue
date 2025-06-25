<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'

import * as z from 'zod'

const open = ref(false)
const onOpenChange = (value: boolean) => {
  open.value = value
}

const props = defineProps({
  handleSubmit: {
    type: Function,
    required: true,
  },
  title: {
    type: String,
    default: 'Create New Book',
  },
  description: {
    type: String,
    default: '',
  },
  buttonLabel: {
    type: String,
    default: 'Save',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  keepValues: {
    type: Boolean,
    default: false,
  },

  initialData: {
    type: Object as () => Book | null,
    default: null,
  },
})

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1).max(255),
    author: z.string().min(1).max(255),
    publishedYear: z.number().optional(),
    genre: z.string().max(100).optional().default(''),
  })
)

const yearOptions = [
  { value: 0, label: 'No year selected' },
  ...Array.from({ length: 200 }, (_, i) => {
    const year = new Date().getFullYear() - i
    return { value: year, label: year.toString() }
  })
]

function onSubmit(values: any) {
  props.handleSubmit(values)
    .then(() => {
      onOpenChange(false)
    })
}

</script>

<template>
  <UiForm v-slot="{ handleSubmit }" as="" :initial-values="props?.initialData ?? {}" :validation-schema="formSchema"
    :keep-values="keepValues">
    <UiDialog :open="open" @update:open="() => onOpenChange(!open)">

      <UiDialogTrigger as-child>
        <slot name="trigger" />
      </UiDialogTrigger>

      <UiDialogContent class="sm:max-w-[425px]">
        <UiDialogHeader>
          <UiDialogTitle>
            {{ props.title }}
          </UiDialogTitle>
          <UiDialogDescription>
            {{ props.description }}
          </UiDialogDescription>
        </UiDialogHeader>
        <slot name="form-slot" />

        <form id="dialogForm" class="flex flex-col gap-2 w-full" @submit.prevent="handleSubmit($event, onSubmit)">

          <!-- Title -->
          <UiFormField v-slot="{ componentField }" name="title">
            <UiFormItem>
              <UiFormLabel>Title</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="Book Title" v-bind="componentField" :disabled="props.loading" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>

          <!-- Author -->
          <UiFormField v-slot="{ componentField }" name="author">
            <UiFormItem>
              <UiFormLabel>Author Name</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="Author name" v-bind="componentField" :disabled="props.loading" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>

          <!-- Genre -->
          <UiFormField v-slot="{ componentField }" name="genre">
            <UiFormItem>
              <UiFormLabel>Genre</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="Genre" v-bind="componentField" :disabled="props.loading" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>

          <!-- Published Year -->

          <UiFormField v-slot="{ componentField }" name="publishedYear">
            <UiFormItem>
              <UiFormLabel>Published Year</UiFormLabel>
              <UiSelect v-bind="componentField" :disabled="props.loading">
                <UiFormControl class="w-full">
                  <UiSelectTrigger :disabled="props.loading">
                    <UiSelectValue placeholder=" Select published year" />
                  </UiSelectTrigger>
                </UiFormControl>
                <UiSelectContent>
                  <UiSelectGroup>
                    <UiSelectItem value="0" class="text-sm text-gray-500 w-full text-center cursor-pointer">
                      No year selected
                    </UiSelectItem>
                    <UiSelectItem v-for="year in yearOptions" key="year.value" :value="year.value"
                      class="text-sm text-gray-500 w-full text-center cursor-pointer">
                      {{ year.value }}
                    </UiSelectItem>
                  </UiSelectGroup>
                </UiSelectContent>
              </UiSelect>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
        </form>

        <UiDialogFooter>
          <UiButton type="submit" form="dialogForm" :disabled="props.loading">

            <Icon v-if="props.loading" name="line-md:loading-twotone-loop" size="1.5rem" />
            <p v-else>
              {{ props.buttonLabel }}
            </p>
          </UiButton>
        </UiDialogFooter>

      </UiDialogContent>
    </UiDialog>
  </UiForm>
</template>