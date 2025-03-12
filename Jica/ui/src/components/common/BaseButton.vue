<script setup>

const props = defineProps(['className', 'onClick']);

</script>

<template>
  <button :class="className">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  border: none;
  background: none;
  cursor: pointer;
}

button:hover {
  background: none;
}
</style>
