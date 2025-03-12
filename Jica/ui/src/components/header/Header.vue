<script setup>
import searchIcon from '../../assets/images/icons8-search.svg?url';
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper.vue";
import IconButton from '@/components/common/IconButton.vue'

</script>

<template>
  <div class="header-wrapper">
    <max-width-wrapper>
      <header class="header">
          <router-link to="/">
            <img class="site_logo" src="@/assets/images/logo.png" alt="Logo"></img>
          </router-link>
        <nav class="header__nav">
          <ul class="header__nav-items">
            <li class="header__nav-item">
              <router-link to="blog">Blog</router-link>
            </li>
            <li class="header__nav-item">
              <router-link to="about">About</router-link>
            </li>
          </ul>
        </nav>
        <div class="header__actions">
          <icon-button><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: scale(1) rotate(0deg);" class="slgln6u"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></icon-button>
        </div>
      </header>
    </max-width-wrapper>
  </div>

</template>

<style>
.header-wrapper {
  background: var(--primary-color);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.header {
  height: 6rem;
  background: transparent;
  display: flex;
  justify-content: space-between;

  align-items: center;
  gap: 3rem;
}

.site_logo {
  height: 2rem;
}

.header__nav-items {
  gap: 2rem;
  display: flex;
  list-style: none;
  padding: 0;
}

.header__actions {
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
}
</style>
