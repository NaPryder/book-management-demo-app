<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'

</script>
<template>
  <div>
    <NuxtLayout :name="'default'">
      <main class="p-2 md:p-4 max-w-6xl mx-auto bg-white">
        <NuxtPage />
      </main>

      <Toaster class="pointer-events-auto" />
    </NuxtLayout>
  </div>
</template>
