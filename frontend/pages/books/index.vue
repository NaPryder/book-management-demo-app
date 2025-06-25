<script setup>

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

</script>

<template>
  <section class="flex flex-col justify-start items-center gap-2 overflow-hidden ">

    <BookList />

  </section>
</template>
