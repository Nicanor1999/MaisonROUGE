<template>
  <span ref="keyhole" class="keyhole" aria-hidden="true"></span>

  <span ref="arrow" class="arrow" aria-hidden="true">
    <svg
      width="20"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="-5 -5 30 30"
    >
      <path
        d="M 0 10 H 20 L 10 0 M 20 10 L 10 20"
        stroke-width="4"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
    </svg>
  </span>

  <main class="main">
    <section ref="primarySection" class="section section--primary">
      <div class="section__content">
        <figure>
          <img
            src="https://picsum.photos/id/315/1600/1600"
            width="1600"
            height="1600"
          />
        </figure>

        <h1>Attb vero eos et accusamus.</h1>

        <p>
          Cupiditate non provident, similique sunt in culpa qui officia deserunt
          mollitia.
        </p>

        <p>
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
          suscipit laboriosam.
        </p>
      </div>
    </section>

    <section class="section section--secondary">
      <div class="section__content">
        <h2>Second section</h2>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </section>

    <section class="section section--tertiary">
      <div class="section__content">
        <h2>Third section</h2>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </section>
  </main>
</template>

<script>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'HomeView',
  data() {
    return {
      ctx: null,
    }
  },
  mounted() {
    this.initializeAnimation()
  },
  beforeUnmount() {
    if (this.ctx) {
      this.ctx.revert()
    }
  },
  methods: {
    initializeAnimation() {
      const isAnimationOk = window.matchMedia(
        "(prefers-reduced-motion: no-preference)"
      ).matches;

      const scrub = true;

      if (!isAnimationOk) return;

      this.ctx = gsap.context(() => {
        gsap.from(this.$refs.keyhole, {
          clipPath:
            "polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)",

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
    }
  },
}
</script>

<style lang="scss" scoped>
$primary: #ffeaa7;
$secondary: #a29bfe;
$tertiary: #fab1a0;

$text: #2d3436;
$contrast: #dfe6e9;
$accent: #fdcb6e;

$multiplier: 1.3;

.keyhole {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: $accent;

  clip-path: polygon(
    0% 0%,
    0% 100%,
    0 100%,
    0 0,
    100% 0,
    100% 100%,
    0 100%,
    0 100%,
    100% 100%,
    100% 0%
  );

  z-index: 1;
}

.arrow {
  position: absolute;
  top: 72.5vh;
  left: 50%;
  z-index: 2;

  animation: float 1s ease-in-out infinite alternate both;

  svg {
    transform: rotate(90deg);
    stroke: $text;
    width: 2rem;
    margin-left: -1rem;
    height: auto;
  }
}

html {
  font-size: 100%;
}

body {
  font: 400 1.2rem/1.45 "Mulish", sans-serif;
  background: $contrast;
  color: $text;
}

html,
body {
  max-width: 100%;
  overflow-x: hidden;
}

h1,
h2,
h3,
h4,
h5 {
  font-family: "DM Serif Text", serif;
  line-height: 1;
  font-weight: 400;
}

@for $i from 1 through 5 {
  h#{$i} {
    font-size: #{$multiplier * (5 - $i)}rem;
  }
}

.section {
  &--primary {
    background: $primary;

    figure {
      position: relative;
      left: 50%;
      width: 100vw;
      transform: translateX(-50%);
      margin: 0 0 1em 0;

      img {
        width: 100%;
        object-fit: cover;
        min-height: 100vh;
      }
    }

    .section__content {
      padding-top: 0;
    }
  }

  &--secondary {
    background: $secondary;
  }

  &--tertiary {
    background: $tertiary;
  }

  &__content {
    max-width: 900px;
    margin: 0 auto;
    padding: 80px 40px;
  }
}

@keyframes float {
  from {
    transform: translateY(-50%);
  }

  to {
    transform: translateY(50%);
  }
}
</style>