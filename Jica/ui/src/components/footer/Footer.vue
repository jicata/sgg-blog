<script setup>

import IconButton from '@/components/common/IconButton.vue'
import IconLink from '@/components/common/IconLink.vue'
import MaxWidthWrapper from '@/components/common/MaxWidthWrapper.vue'


</script>

<template>
  <footer class="footer">
    <svg viewBox="0 0 1557 213" width="1590" height="213" xmlns="http://www.w3.org/2000/svg"
         preserveAspectRatio="none" class="footer__background-secondary-background-svg">
      <path
        d="M1331 165.5C1320.5 162.5 1311 112 1221.5 92.4999C1132 72.9999 1104.5 114 1093.5 112C1082.5 110 1052 6.04351 903.5 1.00011C771 -3.49989 732.5 90 722.5 92.4999C712.5 94.9998 647.5 54.0001 535.5 73.9999C423.5 93.9997 421.5 165.5 411.5 165.5C401.5 165.5 359 58.5001 203.5 49.4999C48 40.4998 0.5 136 0.5 209.5C0.5 283 62.5 309.5 62.5 309.5H100.5L1556.5 304.5V232.5C1556.5 215.5 1542.5 159.009 1464 145.5C1368.81 129.118 1341.5 168.5 1331 165.5Z"></path>
    </svg>
    <div class="footer__background-container">
      <svg class="footer__background-svg" width="320rem" height="15.625rem" viewBox="0 10 5120 327"
           fill="none"
           preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2262 93C2122.5 82.5987 2116 21.5 2096.5 21.5C2077 21.5 2070.5 77.5238 1920.5 93C1794.5 106 1786 62 1771.5 63.5C1757 65 1687 155.5 1580 142C1473 128.5 1446.5 90 1435 93C1423.5 96 1448.03 199.005 1340 214C1181.5 236 1155.5 142 1144 142C1132.5 142 1105.5 269 946.5 236C787.5 203 799 115 784 114.5C769 114 732.5 162 544 158C382 154.562 352.5 81 341 84.5C329.5 88 358 269 168 326C-22 383 -75.5 180 -75.5 180V0.5H5189.5L5193.5 46C5193.5 46 5200 94 5069.5 100.5C4939 107 4923.5 21.5 4906.5 21.5C4889.5 21.5 4870 35 4835 93.5C4800 152 4765.5 169.5 4643.5 173.5C4521.5 177.5 4436.5 69 4425.5 76.5C4414.5 84 4413.5 212 4235 222C4056.5 232 4045.5 92 4033.5 89C4021.5 86 3968.5 169.5 3823.5 172.5C3678.5 175.5 3573.5 104 3562.5 106.5C3551.5 109 3553.5 167.5 3396 201C3238.5 234.5 3171.5 168.5 3161 172.5C3150.5 176.5 3164 273 3076.5 294.5C2975.99 319.197 2935 228 2920 225.5C2905 223 2862 276.955 2749 245C2671.4 223.057 2672.5 149 2660.5 151.5C2648.5 154 2622.5 181.04 2548.5 158C2425 119.548 2427.5 53.5 2412 51C2396.5 48.5 2376 101.5 2262 93Z"
          fill="var(--color-four)"></path>
      </svg>
    </div>
    <max-width-wrapper>
      <div class="footer__content">

        <div class="footer__content-intro">
          <router-link to="/">
            <img class="site_logo" src="@/assets/images/logo.png" alt="Logo"></img>
          </router-link>
          <div class="footer__quote">Random quote of the day!!!</div>
        </div>
        <div class="footer__content-newsletter">
          <form class="footer__content-newsletter-form">
            <p class="newsletter__tag">Want to know when I publish new content?
              Enter your email to join my free newsletter:</p>
            <div class="footer__content-newsletter-form-email">
              <input placeholder="your@email.com" type="email" id="newsletter-email">
              <button>K</button>
            </div>
          </form>
        </div>
        <div class="footer__sitemap">
          <div class="footer__sitemap-categories">
            <h2 class="footer__sitemap-title">Browse by Category</h2>
            <ul class="footer__sitemap-list">
              <li class="footer__sitemap-item">
                <router-link to="/">.NET</router-link>
              </li>
              <li class="footer__sitemap-item">
                <router-link to="/">Cloud</router-link>
              </li>
              <li class="footer__sitemap-item">
                <router-link to="/">Architecture</router-link>
              </li>

              <li class="footer__sitemap-item">
                <router-link to="/">Musings</router-link>
              </li>
              <li class="footer__sitemap-item">
                <router-link to="/">Construction</router-link>
              </li>
            </ul>
          </div>
          <div class="footer__sitemap-general">
            <h2 class="footer__sitemap-title">General</h2>
            <ul class="footer__sitemap-flex-list">
              <li class="footer__sitemap-flex-item">
                <router-link to="/">About Me</router-link>
              </li>
              <li class="footer__sitemap-flex-item">
                <router-link to="/">About This Blog</router-link>
              </li>
              <li class="footer__sitemap-flex-item">
                <router-link to="/">Contact</router-link>
              </li>
            </ul>
          </div>
          <div class="footer__sitemap-social">
            <icon-button><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: scale(1) rotate(0deg);" class="slgln6u"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></icon-button>
            <icon-link url="https://github.com/jicata">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </icon-link>
            <icon-link url="https://www.linkedin.com/in/svetlin-galov/">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </icon-link>
          </div>
        </div>
        <div class="footer__content-legal">
          <p class="legal-information">© 2025-present Svetlin Galov. All Rights Reserved.</p>
        </div>
      </div>
    </max-width-wrapper>
  </footer>
</template>

<style scoped>

.footer {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: 192px;
  overflow: clip;
  height: 533px;
  background: linear-gradient(to bottom, var(--primary-color), var(--to-primary-color));
}

.footer__background-container {
  top: 0;
  left: 0;
  right: 0;
  overflow: clip;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}


.footer__background-svg {
  min-width: 5120px;
}

.footer__background-secondary-background-svg {
  position: absolute;
  right: 50%;
  bottom: 0;
  max-width: revert;
  transform: translate(86px);
}

.footer__background-secondary-background-svg path {
  fill: var(--primary-color-100);
}

.footer__content {
  display: grid;
  grid-template-areas:
        "intro links"
        "email links"
        "legal links";
  --icon-hover-color: var(--secondary-color);
  position: relative;
  grid-template-columns: 24rem 1fr;
  grid-gap: 32px 96px;
  gap: 32px 96px;
  justify-content: space-between;
  align-items: end;
  padding-bottom: 40px;
  font-size: .875rem;
  margin-inline: auto;
}

.footer__content-intro {
  grid-area: intro;
}

.footer__content-newsletter {
  grid-area: email;
}

.footer__content-newsletter-form-email {
  background-color: white;
  display: flex;
  max-width: 22rem;
  gap: 8px;
  border-radius: 8px;
  padding: 4px;
  margin-left: -12px;
  margin-right: -12px;
}

.newsletter__tag{
  margin-bottom:1em;
}

.footer__content-newsletter-form-email input {
  border: none;
  padding-left: 1rem;
  flex: 1 1;
}

.footer__sitemap {
  display: grid;
  grid-area: links;
  grid-template-areas:
              "categories general"
              "categories social";
  grid-template-columns: 15rem 10rem;
  gap: 1rem 1rem;
  justify-content: space-between;
}

.footer__sitemap-categories {
  grid-area: categories;
}

.footer__sitemap-general{
  grid-area: general;
}

.footer__sitemap-general .footer__sitemap-title {
  text-align: right;
}


.footer__sitemap-title {
  display: block;
  margin: 0 0 .5rem;
  padding-bottom: .5rem;
  font-size: inherit;
  font-weight: 500;
  text-transform: uppercase;
}

.footer__sitemap-list {
  display: grid;
  list-style: none;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  padding: 0;
}

.footer__sitemap-flex-list{
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 0.5rem;
  padding: 0;
  text-align: right;
}

.footer__sitemap-item {
  text-align: left;
}

.footer__sitemap-social{
  grid-area: social;
  display: flex;
  width: 100%;
  justify-content: space-between;
  transform: translateY(40%);
  gap:1rem;
}

.footer__content-legal{
  grid-area: legal;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 16px;
  font-size: .75rem;
}

.legal-information{
  text-align: left;
}
</style>
