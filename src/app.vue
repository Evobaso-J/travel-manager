<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang='ts'>
useHead({
  titleTemplate: '%s • Travlog',
})
</script>

<style>
.page-enter-active, .page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.page-enter-to, .page-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
