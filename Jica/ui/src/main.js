import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import BlogPage from "@/pages/BlogPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path: '/blog',
      component: BlogPage,
    }
  ]
});


const app = createApp(App);
app.use(router)

app.mount('#app')
