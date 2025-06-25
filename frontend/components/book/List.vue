<script setup lang="ts">

const config = useRuntimeConfig();
const BASE_URL = config.public.backendServerUrl;

const currentPage = ref(0)
const pending = ref(true)
const { data, refresh } = await useFetch<BookListResponse>(
  () => `${BASE_URL}/books?page=${currentPage.value}&perPage=30`,
  {
    key: `books-${currentPage.value}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  },
)

function changePage(pageNumber: number) {
  currentPage.value = pageNumber
  refresh()
}

function createNewBook() {
  currentPage.value = 0
  refresh()
}
</script>

<template>

  <div v-if="data?.data" class="flex flex-col gap-2 mx-auto ">
    <div class="flex items-center justify-between w-full max-w-4xl p-4">
      <BookCreatingDialog @create:success="createNewBook" />
    </div>
    <div class="w-full  grid grid-cols-[230px] sm:grid-cols-[230px_230px] md:grid-cols-[230px_230px_230px] gap-2 ]">
      <div v-for="book in data?.data" :key="book.id" class="w-full h-[280px]">

        <BookCard :book="book" />
      </div>
    </div>

    <BookPagination :totalPage="data?.metaData?.totalPage" :currentPage="currentPage" :perPage="data?.metaData.perPage"
      @page:change="changePage" />
  </div>

  <div v-else-if="pending" class="flex flex-col items-center justify-center h-screen">
    <Icon name="line-md:loading-spinner-loop" size="2rem" class="animate-spin mx-auto mt-4" />
    <p class="text-center">Loading books...</p>
  </div>
</template>