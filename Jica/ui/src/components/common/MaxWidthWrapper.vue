<script setup>
const props = defineProps({maxWidth: '', paddingBottom: ''});
</script>

<template>
  <div class="width-limiter">
    <slot></slot>
  </div>
</template>

<style scoped>
.width-limiter {
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: var(--viewport-padding);
  width: 100%;
}
</style>
