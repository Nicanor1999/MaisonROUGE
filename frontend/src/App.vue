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
      unwatchRoute: null,
    };
  },
  mounted() {
    // Show loader on initial page load
    this.ui.showLoader();
    this.$nextTick(() => {
      this.waitForPageReady();
    });

    // For every route navigation, show loader then wait for content
    if (this.$router) {
      this.unwatchRoute = this.$router.afterEach(() => {
        this.ui.showLoader();
        this.$nextTick(() => {
          this.waitForPageReady();
        });
      });
    }
  },
  beforeUnmount() {
    if (this.unwatchRoute) {
      this.unwatchRoute();
    }
  },
  methods: {
    /**
     * Automatically detects when the current page is ready by:
     * 1. Waiting for all <img> elements to finish loading
     * 2. Waiting for all <video> elements to reach readyState >= 3
     * 3. Giving GSAP a brief moment to settle after everything loads
     */
    waitForPageReady() {
      // Collect all media elements inside the current view
      const images = Array.from(document.querySelectorAll("img"));
      const videos = Array.from(document.querySelectorAll("video"));
      let pending = 0;

      // Count elements that actually need to load
      const imagesToLoad = [];
      const videosToLoad = [];

      images.forEach((img) => {
        // Images that are not already complete AND have a src
        if (!img.complete && img.src && img.src !== window.location.href) {
          imagesToLoad.push(img);
        }
      });

      videos.forEach((vid) => {
        // Videos that haven't reached HAVE_FUTURE_DATA (readyState >= 3)
        if (vid.readyState < 3) {
          videosToLoad.push(vid);
        }
      });

      pending = imagesToLoad.length + videosToLoad.length;

      // If nothing needs to load, hide loader after a brief settling period
      if (pending === 0) {
        setTimeout(() => {
          this.ui.hideLoader();
        }, 300);
        return;
      }

      let resolved = 0;
      let hasHidden = false;

      const checkDone = () => {
        if (hasHidden) return;
        resolved++;
        if (resolved >= pending) {
          hasHidden = true;
          // Small buffer to let GSAP / CSS transitions settle
          setTimeout(() => {
            this.ui.hideLoader();
          }, 200);
        }
      };

      // Watch every image that needs to load
      imagesToLoad.forEach((img) => {
        const onLoad = () => checkDone();
        const onError = () => checkDone(); // Don't block on error
        img.addEventListener("load", onLoad, { once: true });
        img.addEventListener("error", onError, { once: true });
      });

      // Watch every video that needs to load
      videosToLoad.forEach((vid) => {
        const onLoaded = () => checkDone();
        const onError = () => checkDone();
        vid.addEventListener("loadeddata", onLoaded, { once: true });
        vid.addEventListener("error", onError, { once: true });
      });

      // Safety timeout: force hide after 8 seconds no matter what
      setTimeout(() => {
        if (!hasHidden) {
          hasHidden = true;
          this.ui.hideLoader();
        }
      }, 8000);
    },
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
