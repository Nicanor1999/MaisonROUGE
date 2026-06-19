<template>
  <div class="layout-wrapper">
    <NavbarComponent class="NavbarComponent"></NavbarComponent>
    <main class="main-content">
      <router-view></router-view>
    </main>
    <FullNavbarComponent data-aos="fade"></FullNavbarComponent>
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
import FullNavbarComponent from "@/components/FullNavbarComponent.vue";
import { useUiStore } from "@/stores/ui";

export default {
  name: "LayoutView",
  components: {
    NavbarComponent,
    FullNavbarComponent,
  },
  data() {
    return {
      ui: useUiStore(),
    };
  },
  methods: {
    handleScroll() {
      const isHome = this.$route.path === "/" || this.$route.path === "/home";
      if (!isHome) {
        const threshold = window.innerHeight * 0.8;
        this.ui.isScrolling = window.scrollY > threshold;
      }
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        // Auto-close menu overlay when route changes
        this.ui.closeMenu();

        const isHome = to.path === "/" || to.path === "/home";
        if (isHome) {
          // Home page relies on GSAP ScrollTrigger, but reset initially if scrolled to top
          if (window.scrollY === 0) {
            this.ui.isScrolling = false;
            this.ui.isLeavingHero = false;
          }
        } else {
          // For subpages, check scroll position immediately
          const threshold = window.innerHeight * 0.8;
          this.ui.isScrolling = window.scrollY > threshold;
        }
      },
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.NavbarComponent {
  position: fixed;
  z-index: 99;
}

.main-content {
  width: 100%;
  flex: 1;
}
</style>
