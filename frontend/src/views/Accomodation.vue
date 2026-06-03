<template>
  <div class="accomodationContainer">
    <!-- Hero Section -->
    <div
      class="heroSection"
      :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${bgImage})` }"
    >
      <div class="heroContent">
        <h1 class="heroTitle">Hébergement</h1>
        <p class="heroSubtitle">Un havre de paix et d'élégance</p>
      </div>

      <div v-if="!ui.isScrolling" class="scroll">
        <span>SCROLLEZ</span>
        <div class="scrollBar"></div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="contentSection">
      <div class="contentWrapper">
        <h2 class="sectionTitle">L'Art de Vivre à la Maison Rouge</h2>
        <div class="divider"></div>
        <p class="descriptionParagraph">
          Découvrez nos chambres et suites conçues pour vous offrir un confort absolu et une expérience inoubliable au cœur de Cotonou. Alliant design moderne et touches artistiques locales, chaque espace est pensé comme un sanctuaire de sérénité. Que vous soyez en voyage d'affaires ou en séjour de détente, Maison Rouge vous propose un cadre raffiné et un service attentionné et personnalisé.
        </p>
        <p class="descriptionParagraph">
          Chaque chambre dispose d'équipements de premier choix, d'une literie d'exception, d'une connexion Wi-Fi haut débit et d'une vue imprenable sur nos jardins ou notre piscine. Laissez-vous séduire par l'élégance de notre architecture et le calme de nos espaces propices au repos.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import bgImage from "@/assets/pictures/photo5.jpg";
import { useUiStore } from "@/stores/ui";

export default {
  name: "AccomodationView",
  data() {
    return {
      bgImage,
      ui: useUiStore(),
    };
  },
};
</script>

<style lang="scss" scoped>
.accomodationContainer {
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-1);
}

.heroSection {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  color: white;

  .heroContent {
    z-index: 2;
    padding: 0 1rem;
    animation: fadeInUp 1s ease-out;

    .heroTitle {
      font-family: "Futura LT", sans-serif;
      font-size: 5rem;
      color: var(--primary);
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      text-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
    }

    .heroSubtitle {
      font-family: "Quattrocento Sans", sans-serif;
      font-size: 1.5rem;
      margin-top: 1rem;
      font-weight: 300;
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    }
  }

  .scroll {
    width: 120px;
    height: 10%;
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    z-index: 2;

    span {
      color: white;
      font-family: "Quattrocento Sans", sans-serif;
      font-size: 0.8rem;
      letter-spacing: 0.15rem;
      animation: bounce 2s infinite;
    }

    .scrollBar {
      width: 0.08rem;
      height: 40px;
      background-color: white;
      margin-top: 0.5rem;
    }
  }
}

.contentSection {
  width: 100%;
  padding: 8rem 0;
  display: flex;
  justify-content: center;
  background-color: var(--bg-1);

  .contentWrapper {
    width: 60%;
    max-width: 800px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    .sectionTitle {
      font-family: "Futura LT", sans-serif;
      font-size: 2.5rem;
      color: var(--primary);
      margin-bottom: 1.5rem;
      letter-spacing: 0.1rem;
    }

    .divider {
      width: 60px;
      height: 2px;
      background-color: var(--primary);
      margin-bottom: 3rem;
    }

    .descriptionParagraph {
      font-family: "Quattrocento Sans", sans-serif;
      font-size: 1.15rem;
      line-height: 1.8;
      color: #dfdfdf;
      margin-bottom: 2rem;
      font-weight: 300;
      text-align: justify;
      text-justify: inter-word;
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(-4px);
  }
}

// Media Queries for responsiveness
@media (max-width: 768px) {
  .heroSection .heroContent .heroTitle {
    font-size: 3.5rem;
  }
  .heroSection .heroContent .heroSubtitle {
    font-size: 1.2rem;
  }
  .contentSection {
    padding: 5rem 0;
    .contentWrapper {
      width: 85%;
    }
  }
}
</style>