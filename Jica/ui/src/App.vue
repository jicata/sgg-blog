<script setup>
import Header from "@/components/header/Header.vue";
import Footer from '@/components/footer/Footer.vue'
</script>

<template>
  <div style="height: 100%">
    <div>
      <Header></Header>
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>

</template>

<style>
@import "assets/base.css";
@import "assets/reset.css";
</style>
