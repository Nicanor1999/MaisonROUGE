<template>
  <div class="container">
    <div class="heroSection">
      <video class="hero__video" autoplay muted loop playsinline preload="auto">
        <source src="@/assets/videos/c.mp4" type="video/mp4" />
      </video>
      <div v-if="!ui.isLeavingHero" class="scroll">
        <span>SCROLLEZ</span>
        <div class="scrollBar"></div>
      </div>
    </div>
    <div class="firstSection">
      <div class="welcomePart">
        <div class="part1">
          <div class="subPart1 font">MAISON</div>
          <div class="subPart2">
            <div class="africa">
              <video
                class="hero__video"
                autoplay
                muted
                loop
                playsinline
                preload="auto"
              >
                <source src="@/assets/videos/c.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div class="subPart3 font">ROUGE</div>
        </div>
        <div class="part2">
          <div class="subPart4 font">COTONOU</div>
          <div class="subPart5">
            <div class="box">
              <div class="bar"></div>
              <div class="text">BENIN</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bioPart">
        <div class="bio">
          <p>
            <span class="drop-cap">À</span> l’hôtel Maison Rouge Cotonou, on ne
            s’occupe que de vous ! Vous organisez un voyage d’affaires à Cotonou
            ou vous prévoyez des vacances auBénin ? Vous recherchez un hôtel de
            luxe, central et insolite ? Venez découvrir l’hôtel Maison Rouge
            Cotonou, l’adresse incontournable pour un séjour d’exception dans la
            capitale économique du Bénin ! Vous serez accueilli chaleureusement
            et vous profiterez de tous les services premium de notre hôtel 4
            étoiles.
          </p>
        </div>
        <div class="specialButton">
          <!-- From Uiverse.io by Creatlydev -->
          <button class="button">
            <p class="button__text">
              <span style="--index: 0">D</span>
              <span style="--index: 1">É</span>
              <span style="--index: 2">C</span>
              <span style="--index: 3">O</span>
              <span style="--index: 4">U</span>
              <span style="--index: 5">V</span>
              <span style="--index: 6">R</span>
              <span style="--index: 7">I</span>
              <span style="--index: 8">R</span>
              <span style="--index: 9"> </span>
              <span style="--index: 10">M.</span>
              <span style="--index: 11">R</span>
              <span style="--index: 12">O</span>
              <span style="--index: 13">U</span>
              <span style="--index: 14">G</span>
              <span style="--index: 15">E</span>
              <!-- <span style="--index: 16">E</span> -->
              <!-- <span style="--index: 17">N</span> -->
            </p>

            <div class="button__circle">
              <svg
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="button__icon"
                width="14"
              >
                <path
                  d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                  fill="currentColor"
                ></path>
              </svg>

              <svg
                viewBox="0 0 14 15"
                fill="none"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
                class="button__icon button__icon--copy"
              >
                <path
                  d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
    <div class="secondSection">
      <div class="card">
        <img src="@/assets/pictures/photo10.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useUiStore } from "@/stores/ui";

// const ui = useUiStore()

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "HomeeView",
  data() {
    return {
      ctx: null,
      lastScrollPosition: 0,
      ui: useUiStore(),
    };
  },
  mounted() {
    this.initializeAnimation();
  },
  beforeUnmount() {
    ScrollTrigger.clearScrollMemory();
    gsap.killTweensOf(".africa");
    if (this.ctx) {
      this.ctx.kill();
      this.ctx = null;
    }
  },
  methods: {
    initializeAnimation() {
      const isAnimationOk = window.matchMedia(
        "(prefers-reduced-motion: no-preference)",
      ).matches;

      const scrub = 0.5;

      if (!isAnimationOk) return;

      this.ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".heroSection",
            start: "top top",
            end: "+=600",
            scrub,
            markers: false,
            onEnter: () => {
              this.ui.isScrolling = true;
            },
            onLeave: () => {
              this.ui.isLeavingHero = true;
              this.animateSvg();
            },
            onEnterBack: () => {
              this.ui.isLeavingHero = false;
              this.animateBackSvg();
              this.ui.isScrolling = false;
            },
          },
        });

        // 1. Shrink and morph over 100% of the scroll duration (0.0 to 1.0)
        tl.fromTo(
          ".heroSection .hero__video",
          {
            width: "100vw",
            height: "100vh",
            position: "fixed",
            left: "0%",
            top: "0%",
            xPercent: 0,
            yPercent: 0,
            webkitMaskSize: "1500% 1500%",
            maskSize: "1500% 1500%",
            opacity: 1,
          },
          {
            width: "300px",
            height: "300px",
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            webkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            duration: 1,
            ease: "none",
          },
        );

        // 2. Smoothly fade out starting at 75% of the scroll timeline (0.75 to 1.0)
        tl.to(
          ".heroSection .hero__video",
          {
            opacity: 0,
            duration: 0.01,
            ease: "power1.out",
          },
          0.99,
        );

        // gsap.to(this.$refs.arrow, {
        //   opacity: 0,

        //   scrollTrigger: {
        //     trigger: this.$refs.primarySection,
        //     start: "top top",
        //     end: "+=200",
        //     scrub,
        //   },
        // });
      });
    },
    animateSvg() {
      if (!this.ui.isLeavingHero) return;

      gsap.to(".africa", {
        opacity: 1,
        scale: 0.8,
        duration: 0,
        ease: "power2.inOut",
        delay: 0.3,
      });
    },
    animateBackSvg() {
      gsap.to(".africa", {
        opacity: 0,
        scale: 0.8,
        duration: 0,
        ease: "power2.inOut",
        delay: 0.3,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 300vh;
  // background-color: teal;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.heroSection {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.heroSection .hero__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  // background: $accent;

  mask-image: url("data:image/svg+xml,%3Csvg width='800px' height='800px' viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23000000' d='M201.56 19.495l-87.79 9.131-73.745 94.814v52.676l56.186 61.805 64.615-13.344 49.164 9.832-10.535 37.926 33.711 61.103-16.855 42.842 39.79 116.225 53.62-8.768 49.164-55.484 4.213-38.629 31.605-23.879-6.322-69.531 83.594-106.994-51.989 7.263-79.363-138.359-125.016-8.428-14.046-30.2zm252.346 319.8l-14.402 20.86-13.408.496c-11.849 24.321-12.598 38.019-13.907 66.547l17.383 4.471 21.852-52.147 2.482-40.226z'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg width='800px' height='800px' viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23000000' d='M201.56 19.495l-87.79 9.131-73.745 94.814v52.676l56.186 61.805 64.615-13.344 49.164 9.832-10.535 37.926 33.711 61.103-16.855 42.842 39.79 116.225 53.62-8.768 49.164-55.484 4.213-38.629 31.605-23.879-6.322-69.531 83.594-106.994-51.989 7.263-79.363-138.359-125.016-8.428-14.046-30.2zm252.346 319.8l-14.402 20.86-13.408.496c-11.849 24.321-12.598 38.019-13.907 66.547l17.383 4.471 21.852-52.147 2.482-40.226z'/%3E%3C/svg%3E");
  mask-size: 1500% 1500%;
  -webkit-mask-size: 1500% 1500%;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-position: center;
}

.heroSection .scroll {
  width: 5%;
  height: 10%;
  // background-color: darkgoldenrod;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.heroSection .scroll span {
  color: white;
  font-family: "Quattrocento Sans", sans-serif;
  font-size: 0.8rem;
}

.heroSection .scroll .scrollBar {
  width: 0.08rem;
  height: 80%;
  background-color: white;
}

.firstSection {
  height: 138vh;
  width: 100%;
  position: relative;
  top: 20vh;
  margin-bottom: 70vh;
  // background-color: darkcyan;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

.firstSection .welcomePart {
  height: 88vh;
  width: 90%;
  // background-color: darkgoldenrod;
}

.firstSection .welcomePart .part1 {
  height: 60%;
  width: 100%;
  // background-color: aqua;
  display: flex;
}

.firstSection .welcomePart .part1 .subPart1 {
  // border: 1px solid red;
  width: 33.33%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.firstSection .welcomePart .part1 .subPart2 {
  // border: 1px solid red;
  width: 33.33%;
  height: 100%;
  display: flex;
  // justify-content: center;
  align-items: center;
}

.firstSection .welcomePart .part1 .subPart2 .africa {
  mask-image: url("data:image/svg+xml,%3Csvg width='800px' height='800px' viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23000000' d='M201.56 19.495l-87.79 9.131-73.745 94.814v52.676l56.186 61.805 64.615-13.344 49.164 9.832-10.535 37.926 33.711 61.103-16.855 42.842 39.79 116.225 53.62-8.768 49.164-55.484 4.213-38.629 31.605-23.879-6.322-69.531 83.594-106.994-51.989 7.263-79.363-138.359-125.016-8.428-14.046-30.2zm252.346 319.8l-14.402 20.86-13.408.496c-11.849 24.321-12.598 38.019-13.907 66.547l17.383 4.471 21.852-52.147 2.482-40.226z'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg width='800px' height='800px' viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23000000' d='M201.56 19.495l-87.79 9.131-73.745 94.814v52.676l56.186 61.805 64.615-13.344 49.164 9.832-10.535 37.926 33.711 61.103-16.855 42.842 39.79 116.225 53.62-8.768 49.164-55.484 4.213-38.629 31.605-23.879-6.322-69.531 83.594-106.994-51.989 7.263-79.363-138.359-125.016-8.428-14.046-30.2zm252.346 319.8l-14.402 20.86-13.408.496c-11.849 24.321-12.598 38.019-13.907 66.547l17.383 4.471 21.852-52.147 2.482-40.226z'/%3E%3C/svg%3E");
  mask-size: contain;
  -webkit-mask-size: contain;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-position: center;
  width: 400px;
  height: 400px;
  background-color: black;
  opacity: 0;
}

.firstSection .welcomePart .part1 .subPart3 {
  // border: 1px solid red;
  width: 33.33%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.firstSection .welcomePart .part2 {
  height: 40%;
  width: 100%;
  // background-color: orangered;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  // justify-content: space-between;
}

.firstSection .welcomePart .part2 .subPart4 {
  // border: 1px solid red;
  width: 100%;
  height: 50%;
}

.firstSection .welcomePart .part2 .subPart5 {
  // border: 1px solid red;
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.firstSection .welcomePart .part2 .subPart5 .box {
  width: 10%;
  height: 80%;
  // background-color: pink;
  position: relative;
  display: flex;
  align-items: center;
  z-index: 0;
}

.firstSection .welcomePart .part2 .subPart5 .box .bar {
  width: 100%;
  height: 10%;
  background-color: var(--primary);
  position: absolute;
  z-index: 1;
}

.firstSection .welcomePart .part2 .subPart5 .box .text {
  font-family: "Futura LT", sans-serif;
  font-weight: lighter;
  color: var(--primary);
  font-size: 1.8rem;
  position: absolute;
  z-index: 4;
  top: -10%;
  left: 12%;
  background-color: var(--bg-1);
}

.firstSection .bioPart {
  height: 40vh;
  width: 90%;
  // background-color: darkred;
  display: flex;
  justify-content: center;
  position: relative;
}

.firstSection .bioPart .bio {
  height: 100%;
  width: 62%;
  // background-color: cyan;
  display: flex;
  align-items: flex-end;
}

.firstSection .bioPart .bio p {
  line-height: 1.6;
  text-align: justify;
  /*     margin-bottom: 1.5em; */
  color: #7a2e2e;
}

.firstSection .bioPart .bio p .drop-cap {
  float: left;
  font-size: 5.6em; /* roughly 3 lines tall */
  line-height: 0.8;
  padding-right: 0.5rem;
  padding-top: 0.3rem;
  // font-family: "Garamond", serif;
  color: #7a2e2e;
}

.secondSection {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.secondSection .card {
  width: 90%;
  max-width: 1200px;
  aspect-ratio: 1080 / 885; /* Matches photo10.jpg's exact proportions */
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
}

.secondSection .card img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Fills perfectly, no distortion */
  display: block;
}

.font {
  font-size: 5rem;
  color: var(--primary);
  font-family: "Futura LT", sans-serif;
  // font-weight: ;
}

.specialButton {
  // padding-left: 2rem;
  position: absolute;
  bottom: 0.8rem;
  right: 5rem;
}

/* From Uiverse.io by Creatlydev */
.specialButton .button {
  cursor: pointer;
  border: none;
  background: var(--primary-variant);
  color: #fff;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: grid;
  place-content: center;
  transition:
    background 300ms,
    transform 200ms;
  font-weight: 600;
}

.specialButton .button__text {
  position: absolute;
  inset: 0;
  animation: text-rotation 8s linear infinite;

  > span {
    position: absolute;
    transform: rotate(calc(19deg * var(--index)));
    inset: 7px;
  }
}

.specialButton .button__circle {
  position: relative;
  width: 40px;
  height: 40px;
  overflow: hidden;
  background: #fff;
  color: var(--primary-variant);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.specialButton .button__icon--copy {
  position: absolute;
  transform: translate(-150%, 150%);
}

.specialButton .button:hover {
  background: var(--primary);
  transform: scale(1.05);
}

.specialButton .button:hover .button__icon {
  color: var(--primary);
}

.specialButton .button:hover .button__icon:first-child {
  transition: transform 0.3s ease-in-out;
  transform: translate(150%, -150%);
}

.specialButton .button:hover .button__icon--copy {
  transition: transform 0.3s ease-in-out 0.1s;
  transform: translate(0);
}

@keyframes text-rotation {
  to {
    rotate: 360deg;
  }
}
</style>
