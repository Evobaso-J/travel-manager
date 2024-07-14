<template>
  <NuxtImg
    :class="`inline-block h-10 w-10 rounded-full ring-2 ring-primary-500 cursor-pointer`"
    :src="`${src}${unsplashResizingSuffix}`"
    :alt
    fit="cover"
    @click.stop="toggleLargeImage"
  />
  <Teleport to="body">
    <div
      v-if="showLargeImage"
      class="fixed inset-0 z-10 flex animate-fade justify-center p-2 backdrop-blur-sm items-center sm:pl-64"
      @click="toggleLargeImage"
    >
      <NuxtImg
        class="h-52 w-52 sm:h-60 sm:w-60 md:h-96 md:w-96 lg:h-[30rem] lg:w-[30rem] rounded-full ring-8 ring-primary-300 cursor-pointer"
        :src="`${src}${unsplashResizingSuffix}`"
        :alt
        fit="cover"
      />
    </div>
  </Teleport>
</template>

<script setup lang='ts'>
defineComponent({ name: 'AvatarField' })
type AvatarFieldProps = {
  alt: string
  src: string
}
defineProps<AvatarFieldProps>()

const showLargeImage = ref(false)

const toggleLargeImage = () => {
  showLargeImage.value = !showLargeImage.value
}

const unsplashResizingSuffix = '?w=400&h=400&fit=crop'
</script>
