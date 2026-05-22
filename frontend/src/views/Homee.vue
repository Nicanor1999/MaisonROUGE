<template>
  <div class="container">
    <NavbarComponent class="NavbarComponent"></NavbarComponent>
    <div class="heroSection">
      <video class="hero__video" autoplay muted loop playsinline preload="auto">
        <source src="@/assets/videos/c.mp4" type="video/mp4" />
      </video>
      <div v-if="ui.hideScrollBar" class="scroll">
        <span>SCROLLEZ</span>
        <div class="scrollBar"></div>
      </div>
    </div>
    <div class="firstSection">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nobis
      cupiditate incidunt. Amet nisi quasi fugiat temporibus blanditiis tenetur
      saepe nesciunt soluta eos repellat voluptates similique omnis nobis culpa
      doloremque, rem eligendi alias, maiores animi? Inventore id atque,
      dignissimos autem ab in quas quibusdam velit possimus, saepe, aliquam
      voluptatem impedit et culpa? Debitis nostrum mollitia rerum optio itaque
      autem iusto, cupiditate quo dicta esse atque quia doloremque et maiores
      earum corporis minus voluptatum nobis amet, molestias, nesciunt
      consequuntur. Necessitatibus porro ipsam consectetur sapiente, placeat,
      officiis beatae saepe facere recusandae harum adipisci voluptatem ut ad
      magni ab nostrum, id molestias. Neque rem, nihil provident laboriosam,
      suscipit cumque ut quos nisi commodi beatae quas dicta animi quibusdam
      asperiores accusantium maxime atque tenetur, dolorum odio reprehenderit
      adipisci ipsam reiciendis! Veniam ipsum suscipit praesentium at voluptate
      numquam atque consequatur, velit minus sed eius dicta ipsa sunt inventore,
      magnam molestias nostrum repellat alias distinctio id dolor. Quae magni
      reprehenderit iure, est nulla aliquid, suscipit praesentium non doloremque
      exercitationem ad at odio illo doloribus. Enim explicabo, reiciendis ipsum
      culpa impedit adipisci illum exercitationem cum maiores. Assumenda,
      molestiae provident reiciendis dignissimos ex recusandae maiores, enim
      similique quaerat officiis aut iure dolore deserunt ipsum nisi minima
      nihil eaque totam accusantium vitae! Ipsa atque ad modi est? Eius debitis
      pariatur provident, unde accusamus voluptatibus similique ratione
      veritatis nam tenetur temporibus. Architecto reiciendis beatae vel omnis
      itaque consequatur maiores inventore temporibus. Pariatur consectetur
      minima exercitationem molestias earum enim deleniti soluta molestiae sint
      culpa, doloribus, facilis vel? Cum nostrum, consectetur quasi, quos fugiat
      sit facilis tempora nesciunt explicabo vel laudantium. Cum magnam aut
      saepe voluptatibus ducimus alias ab, porro praesentium doloribus mollitia
      placeat officia deserunt reiciendis minus! Fuga facere reiciendis illum
      animi? Doloremque cum error voluptates deleniti. Natus fugiat nesciunt
      repellendus perspiciatis sapiente consequuntur numquam molestiae aut ad
      facere, et, mollitia distinctio, nobis similique non nisi. Pariatur,
      quibusdam? Quam, dolore? Vero assumenda veniam quaerat repellendus
      aspernatur, soluta laboriosam tenetur, accusamus nemo debitis temporibus
      molestiae. Modi, tenetur blanditiis. Error quibusdam officia optio
      perspiciatis. Aliquid nemo nesciunt, ducimus necessitatibus veniam
      recusandae odio quod perspiciatis corporis quis. Aliquam ullam officiis
      minima assumenda consectetur tempore doloribus enim vero eius ad rerum,
      numquam temporibus, vitae fuga. Molestiae autem in ut architecto, tenetur
      quas! Voluptatum non nostrum, dolorem minima debitis maiores quae cumque
      perferendis? Maiores voluptatibus pariatur tenetur fugit. Ipsum
      dignissimos tenetur ullam mollitia officiis nobis velit quo totam
      laudantium id ducimus eaque quaerat in doloremque laboriosam omnis
      excepturi earum atque distinctio at molestiae, sunt iusto officia
      suscipit! Tempore, magni sint blanditiis modi assumenda corporis velit
      rerum quae cumque minima necessitatibus tenetur possimus fuga adipisci
      magnam deserunt perferendis labore, eum consectetur! Aliquam quaerat,
      culpa iste in asperiores expedita est corrupti eius assumenda debitis
      excepturi doloremque cupiditate magni enim explicabo blanditiis voluptates
      nesciunt impedit et vero voluptate? Ipsum aspernatur, est sunt aut autem
      nulla molestias qui culpa debitis, recusandae mollitia assumenda tempore!
      Dolorem, ab qui tenetur vitae nam laudantium accusamus explicabo
      accusantium quis et officiis. Sed, iure, quam ea cumque autem facere
      obcaecati incidunt eveniet error veniam fuga.
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavbarComponent from "@/components/NavbarComponent.vue";
import { useUiStore } from '@/stores/ui'


const ui = useUiStore()

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
    this.initializeAnimation();
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

      const scrub = 0.5;

      if (!isAnimationOk) return;

      this.ctx = gsap.context(() => {
        gsap.from(".hero__video", {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "fixed",
          clipPath: `polygon(0% 0%,
                            0% 100%,
                            100% 100%,
                            100% 0%)`,
          scrollTrigger: {
            trigger: ".heroSection",
            start: "top top",
            end: "+=1500",
            scrub,
            markers: true,
          },
        });

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

.NavbarComponent {
  position: fixed;
  z-index: 3;
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
  // position: fixed;
  // inset: 0;
  pointer-events: none;
  // background: $accent;

  clip-path: polygon(40% 40%, 40% 60%, 60% 60%, 60% 40%);
}

.heroSection .scroll {
  width: 5%;
  height: 15%;
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
  width: 0.1rem;
  height: 80%;
  background-color: white;
}
</style>
