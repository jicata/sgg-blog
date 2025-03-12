<script setup>

import BaseButton from '@/components/common/BaseButton.vue'
</script>

<template>
<base-button class-name="icon-button">
  <slot></slot>
</base-button>
</template>

<style scoped>
.icon-button {
  position: relative;
  height: 32px;
  width: 32px;
  min-width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  border-radius: 1000px;
  outline-offset: 2px;
}

</style>
