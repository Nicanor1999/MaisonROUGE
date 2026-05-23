<template>
  <div class="min-h-screen w-full flex flex-col bg-black">
    <div ref="viewContainer">
      <router-view></router-view>
    </div>

    <div
      v-if="ui.isLoading"
      class="fixed inset-0 bg-[var(--bg-hidden)] flex items-center justify-center z-50"
    >
      <div class="flex flex-col items-center gap-4">
        <Vue3Lottie
          :animationData="loaderAnimation"
          :height="200"
          :width="200"
          :loop="true"
        />
        <p class="text-white text-lg font-medium">Chargement...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue3Lottie } from "vue3-lottie";
import loaderAnimation from "@/assets/Loading circles.json";
import { useUiStore } from "@/stores/ui";

export default {
  name: "App",
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      ui: useUiStore(),
      loaderAnimation,
      lastScrollPosition: 0,
    };
  },
  methods: {
    handleScroll() {
      const currentScrollPosition = window.scrollY;
      this.ui.isLeavingHero =
        currentScrollPosition > this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
      console.log(this.ui.isLeavingHero);
    },
  },
  mounted() {
    this.ui.showLoader();

    if (this.$router) {
      this.$router.afterEach(() => {
        this.$nextTick(() => {
          this.ui.hideLoader();
        });
      });
    }
  window.addEventListener("scroll", this.handleScroll);
  },
};
</script>

<style>
#app {
  /* margin: 0; */
  /* padding: 0; */
  /* background-color: darkblue; */
  display: flex;
  /* justify-content: center;
  6 */
  height: auto;
  width: 100%;
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  /* background-color: var(--bg-hidden); */
}
</style>
