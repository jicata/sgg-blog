<script setup>
const props = defineProps({ 'url': '' })
</script>

<template>
  <a :href=props.url  target="_blank" rel="noopener noreferrer" class="icon-link">
    <slot></slot>
  </a>
</template>

<style scoped>
.icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  color: inherit;
  transform-origin: 50% 85%;
  border-radius: 1000px;
  outline-offset: 2px;
}
</style>
