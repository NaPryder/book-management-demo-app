<script setup>
import { NuxtLink } from '#components';


</script>

<template>
  <div class="flex flex-col gap-2: md:gap-4">
    <h1 class="text-3xl :md:text-4xl">
      Welcome to the Book Management System
    </h1>

    <NuxtLink to="/books" class="text-blue-500 hover:underline text-2xl">
      <div
        class="border rounded-lg p-4 bg-white shadow-md max-w-[200px] h-[100px] flex items-center justify-center hover:shadow-xl ">
        <Icon name="pepicons - pencil: book" />
        Books
      </div>
    </NuxtLink>

  </div>
</template>
