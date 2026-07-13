<template>
  <div class="app-container">
    <!-- Mobile Warning Overlay -->
    <div v-if="isMobile" class="mobile-warning">
      <div class="warning-content">
        <div class="icon-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="phone-icon"
          >
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <path d="M12 18h.01"></path>
          </svg>
        </div>
        <h1 class="warning-title">Oups!</h1>
        <p class="warning-text">
          Pour une meilleure expérience, veuillez consulter
          <span class="brand-name">Maison ROUGE</span>
          depuis un ordinateur de bureau.
        </p>
        <p class="warning-subtitle">
          Ce site est optimisé pour les écrans larges et offre une expérience
          visuelle immersive.
        </p>
      </div>
    </div>

    <div v-if="!isMobile" ref="viewContainer">
      <router-view></router-view>
    </div>

    <div v-if="ui.isLoading && !isMobile" class="loader-overlay">
      <div class="loader-content">
        <Vue3Lottie
          :animationData="loaderAnimation"
          :height="200"
          :width="200"
          :loop="true"
        />
        <p class="loader-text">Chargement...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue3Lottie } from "vue3-lottie";
import loaderAnimation from "@/assets/Loading circles.json";
import { useUiStore } from "@/stores/ui";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
      isMobile: false,
      lenis: null,
    };
  },
  mounted() {
    // Detect mobile device
    this.detectMobile();

    // Listen for resize to update mobile detection
    window.addEventListener("resize", this.detectMobile);

    if (!this.isMobile) {
      // Initialize Lenis smooth scrolling
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
        smoothWheel: true,
      });

      // Sync Lenis with ScrollTrigger
      this.lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        this.lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

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
    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.detectMobile);
    if (this.unwatchRoute) {
      this.unwatchRoute();
    }
    // Cleanup Lenis
    if (this.lenis) {
      this.lenis.destroy();
      gsap.ticker.remove((time) => {
        this.lenis.raf(time * 1000);
      });
    }
  },
  methods: {
    detectMobile() {
      // Check if device is mobile/tablet
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileUA =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent.toLowerCase(),
        );
      const isSmallScreen = window.innerWidth < 1024; // Treat screens < 1024px as mobile
      this.isMobile = isMobileUA || isSmallScreen;
    },
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

<style scoped>
.app-container {
  height: auto;
  width: 100%;
  /* overflow-x: hidden; */
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-1);
}

/* Mobile Warning Overlay */
.mobile-warning {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.warning-content {
  text-align: center;
  padding: 2rem;
  max-width: 400px;
}

.icon-wrapper {
  margin-bottom: 1.5rem;
}

.phone-icon {
  color: var(--primary);
  margin: 0 auto;
  display: block;
}

.warning-title {
  font-size: 2.25rem;
  font-weight: bold;
  color: black;
  margin: 0 0 1rem 0;
}

.warning-text {
  color: #000000;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.brand-name {
  color: var(--primary);
  font-weight: 600;
}

.warning-subtitle {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
}

/* Loader Overlay */
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loader-text {
  color: var(--text-color);
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0;
}
</style>
