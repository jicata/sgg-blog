<script setup>
import { colors } from '../utils/utils.js'
import SectionContainer from '@/components/common/SectionContainer.vue'
import MaxWidthWrapper from '@/components/common/MaxWidthWrapper.vue'
import small_svg from '@/assets/images/w40k.svg'

console.log(small_svg)
</script>

<template>
  <section>
    <section-container position="relative">
      <max-width-wrapper class="content-header__wrapper">
          <h1 class="content-header__title">This is the title of the Article</h1>
          <span class="content-header__subtitle">This is the subtitle of the article</span>
        <div style="display: flex;">
          <span class="content-header__info">This is the additional info</span>
        </div>
      </max-width-wrapper>
      <div class="content-header__background-container">
        <svg class="content-header__background-svg" width="5120" height="357" viewBox="0 0 5120 357"
             fill="none" preserveAspectRatio="none"
             xmlns="http://www.w3.org/2000/svg">
          <!-- Upper Warhammer-Themed Section with Jagged, Gothic Elements -->
          <path fill="var(--primary-color-500)"
                d="M2970.83 162.311c-80.18 35.471-73.69 108.447-47.7 124.208 26 15.762 93.47 40.054 93.47 40.054h1305s57.5 19.5 57.5-51-94.97-66.296-94.97-66.296 40.27-77.869-52.89-120.793c-93.16-42.924-146.42 13.009-146.42 13.009s-5.54-62.255-95.87-73.305c-90.33-11.05-137.76 48.38-137.76 48.38s-4.64-52.293-92.06-70.127c-87.42-17.834-162.6 40.045-162.6 40.045S3565.05-8.443 3454.48 1.38c-110.56 9.822-137.31 62.814-137.31 62.814s-51.15-37.036-129.29-7.003c-78.15 30.034-77.58 104.275-77.58 104.275s-59.3-34.626-139.47.845zM330 57.505c-98 9-132 69.5-132 69.5l-88 225.5h2094.5v-.5s-11-77-135.5-89-147 17-159.5 16.5-46-34-131-43.5-154.5 29.5-165 27-32-50-134.5-58-142 20-152 17.5-20-41-100.5-65-162.5 5.5-174 0-5.5-59-110.5-100-166.5 11-181 6.5-40.5-40.5-151.5-40-134.5 53-151.5 54-30-29.5-128-20.5z"></path>

          <!-- Bottom Section for Smooth Transition to White Background -->
          <path fill="var(--color-four)"
                d="M2741.5 299.5c10-1.428 20.5-71 203.5-91.5s216 49 226.5 49 56.5-74 240-49 189 86 199 84.5 49-63.5 226-71 207 63 216 63 71.5-55 243-27.5 181.5 74 195.5 73.5-8.5-102 199-139 247.5 30.5 262 30 85.5-103.5 245-58.5 0 194 0 194H-92s-72-149.5 0-177.5S1 208 12 208s42.5-98.5 250.5-100.5S511 206.5 518 208s97-68 269-34.5 194 134 203 138 88.5-24 256.5-12 186 47.5 192.5 47.5 50.5-66 204.5-65.5 193 51 202 52 68.5-27.5 248-22 215 35.5 226.5 35.5c11.5.001 38-67.142 204-79 166-11.857 207.5 32.929 217.5 31.5z"></path>
        </svg>
        <!--      <img src="@/assets/images/w40k.svg" alt="Your SVG" />-->
      </div>
    </section-container>
    <section-container :background-color="colors['color-four']">
      <article class="content">
        <p class="content__paragraph"> The most exciting thing about container queries, in my
          opinion, is that they expand what’s possible in terms of user interface design. They give
          us new options when it comes to responsive design, creating UIs that would be impractical
          or impossible using traditional media queries. </p>
        <p class="content__paragraph"> In this post, I’ll share the most useful pattern I’ve
          discovered, so that you can start taking full advantage of container queries in your own
          work.</p>
        <aside class="content__aside">
          <strong>Intended audience</strong>
          <p class="content__paragraph">
            This blog post assumes that you understand the fundamentals of CSS container queries. If
            you’re still getting the hang of them, you may wish to start with my other post,
          </p>
        </aside>
        <h2 class="content__heading">The killer pattern</h2>
        <div id="the-killer-pattern" style="max-width: 686px" class="content__image-contained">
          <img src="../assets/images/img.png" alt="" />
        </div>
        <p class="content__paragraph">This layout is used to display newsletter issues.</p>
        <p class="content__paragraph">On desktop, it’s a two-column layout. The email metadata on
          the left, the content on the right. On mobile/tablet, it collapses to a single column:</p>
        <div id="the-killer-pattern" class="content__image-contained"
             style="max-width: 328px">
          <img src="../assets/images/image2.png" alt="" />
        </div>
        <p class="content__paragraph">This is a pretty common design pattern, and it’s easily solved
          using media queries, but it leads to a curious side-effect: the width of each column
          actually <em class="DonthaveANameYet" style="color: inherit;">increases</em> when the
          viewport shrinks below the mobile threshold.</p>
        <p class="content__paragraph">Keep your eye on the width of the left-hand column as you
          shrink the (virtual) window, using the slider:</p>
        <!--        <div class="content__interactive">-->
        <!--          <div class="content__interactive__wrapper">-->
        <!--            <p style="color:white">Interactive Content</p>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="content__end">
          <div class="content__end-date">
            <h3 class="content__end-header">
              Last updated on
            </h3>
            <p class="content__end-date-time">
              January 27th, 2025
            </p>
          </div>
          <div class="content__end-visits">
            <h3 class="content__end-header">
              # of hits
            </h3>
            <p class="content__end-visits-count">
              025 210
            </p>
          </div>
        </div>
      </article>
    </section-container>
  </section>

</template>

<style scoped>

.content-header__wrapper {
  position: relative;
  left: 0;
  right: 0;
  padding-top: 3rem;
  padding-bottom: 10rem;
  margin-inline: auto;
}


.content-header__subtitle {
  display: inline-block;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
}

.content-header__info {
  font-style: italic;
  display: block;
}

.content-header__background-container {
  bottom: 0;
  left: 0;
  right: 0;
  overflow: clip;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

.content-header__background-svg {
  min-width: 5120px;
}

.content {
  display: grid;
  padding: 0 2rem;
  /*grid-template-columns: 1fr min(44rem, calc(100% - var(--viewport-padding) * 2)) 1fr; */
  grid-template-columns: 1fr 42.875rem 21.875rem 1fr;
  overflow: clip;
}

.content > * {
  grid-column: 2;
}

.content__paragraph {
  font-size: 1.125rem;
  margin-bottom: 1.25rem;
}

.content__aside {
  background: var(--color-five);
  padding: 2rem;
  margin-top: 2rem;
  margin-inline: -2rem;
  margin-bottom: 4rem;
  border-radius: 0.5rem;
  border-left: 3px solid transparent;
}

.content__heading {
  font-size: calc(32 / 16 * 1rem);
  color: var(--tertiary-color);
  margin-top: 1.5em;
  margin-bottom: 1em;
}

.content__image-contained {
  margin: 16px auto 64px;
  max-width: 498px; /* VARIABLE BASED ON IMAGE  WIDTH/2*/
  width: 100%;
}

.content__end {
  padding-top: 4.5rem;
  display: flex;
  justify-content: space-between;
}

.content__end-header {
  color: grey;
  font-size: 0.8125rem;
  font-weight: lighter;
  font-family: Monaco;
  font-style: italic;
  -webkit-font-smoothing: subpixel-antialiased;
}

/*
.content__interactive{
  --color-background: #0d0f12;
  margin-top: 8px;
  margin-inline: calc(var(--viewport-padding)* -1);
  margin-bottom: 48px;
  padding: var(--viewport-padding);
  background: var(--color-background);
  isolation: isolate;
  max-width: 100vw;
  border-radius: 6px;
  outline-offset: -1px;
}

.content__interactive__wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20rem; // defined by content
}
*/

</style>
