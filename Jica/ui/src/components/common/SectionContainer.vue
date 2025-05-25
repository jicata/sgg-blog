<script setup>
const props = defineProps({
  backgroundColor: '',
  position: '',
})
</script>

<template>
  <div class="section-wrapper" :style="{
    backgroundColor: props.backgroundColor,
    position: props.position,
  }">
    <slot></slot>
  </div>
</template>

<style scoped>
.section-wrapper {
  isolation: isolate;
}
</style>
