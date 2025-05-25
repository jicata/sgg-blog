<script setup>
const props = defineProps({'grid-row' : 1})
</script>

<template>
  <aside class="nav-menu-container" :style="props.grid-row">
    <slot name="heading"></slot>
      <ul class="nav-menu">
        <slot name="nav-menu__items"></slot>
      </ul>
  </aside>
</template>

<style scoped>
.nav-menu-container {
  grid-column: 3;
  justify-self: center;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: sticky;
  top:10rem;
}
.nav-menu {
  padding: 0;
  margin-top:1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  list-style: none;
}
</style>
