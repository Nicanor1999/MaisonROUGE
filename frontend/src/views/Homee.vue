<template>
  <div class="container">
    <NavbarComponent></NavbarComponent>
  </div>
</template>

<script>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavbarComponent from "@/components/NavbarComponent.vue";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "HomeeView",
  components: {
    NavbarComponent,
  },
  data() {
    return {
      ctx: null,
    };
  },
  mounted() {
    // this.initializeAnimation();
  },
  beforeUnmount() {
    if (this.ctx) {
      this.ctx.revert();
    }
  },
  methods: {
    initializeAnimation() {
      const isAnimationOk = window.matchMedia(
        "(prefers-reduced-motion: no-preference)",
      ).matches;

      const scrub = true;

      if (!isAnimationOk) return;

      this.ctx = gsap.context(() => {
        gsap.from(this.$refs.keyhole, {
          clipPath: `polygon(0% 0%,
            0% 100%,
            0% 100%,
            0% 0%,
            100% 0%,
            100% 100%,
            0% 100%,
            0% 100%,
            100% 100%,
            100% 0%)`,

          scrollTrigger: {
            trigger: this.$refs.primarySection,
            start: "top top",
            end: "bottom bottom",
            scrub,
            markers: false,
          },
        });

        gsap.to(this.$refs.arrow, {
          opacity: 0,

          scrollTrigger: {
            trigger: this.$refs.primarySection,
            start: "top top",
            end: "+=200",
            scrub,
          },
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: teal;
  // width: 100%;
}

</style>
