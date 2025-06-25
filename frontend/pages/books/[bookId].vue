<script setup>

const config = useRuntimeConfig();
const BASE_URL = config.public.backendServerUrl;

const route = useRoute();
const bookId = route.params.bookId

const { data: book, pending, refresh } = await useFetch(
  () => `${BASE_URL}/books/${bookId}`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
);

</script>

<template>
  <section class="container mx-auto px-0">
    <NuxtLink to="/books" class="flex items-center ">
      <Icon name="stash:chevron-left-duotone" size="2rem" />

      <p>Back to Books List</p>
    </NuxtLink>


    <NuxtImg src="/img/no-image.jpg" height="300px" width="'100%'" class="mx-auto" />

    <UiCard>
      <UiCardContent>
        <div class="p-4 flex items-center gap-4">
          <h1 class="text-2xl font-bold">
            {{ book.title }}
          </h1>

          <!-- Update Icon -->
          <BookUpdatingDialog :book="book" @update:success="refresh">
            <template v-slot:trigger>
              <UiButton variant="default" size="icon">
                <Icon name="pepicons-pencil:pen" />
              </UiButton>
            </template>
          </BookUpdatingDialog>

          <!-- Delete Icon -->
          <BookDeletingDialog :book="book">
            <template v-slot:trigger>
              <UiButton variant="destructive" size="icon" class="ml-auto">
                <Icon name="line-md:trash" />
              </UiButton>
            </template>
          </BookDeletingDialog>

        </div>

        <div class="p-2 flex flex-col gap-2">
          <p>
            <strong>Author:</strong> {{ book.author }}
          </p>
          <p>
            <strong>Published Year:</strong> {{ book.publishedYear }}
          </p>

          <hr>
          <i class="text-muted-foreground text-xs">
            <strong>Created At:</strong> {{ formatReadableDateTime(book.createdAt) }}
          </i>
          <i class="text-muted-foreground text-xs">
            <strong>Last Update:</strong> {{ formatReadableDateTime(book.updatedAt) }}
          </i>

        </div>
      </UiCardContent>
    </UiCard>


  </section>
</template>
