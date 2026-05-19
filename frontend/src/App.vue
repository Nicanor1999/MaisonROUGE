<template>
  <section class="hero" ref="heroRef">
    <!-- Vidéo en fond -->
    <video class="hero__video" autoplay muted loop playsinline preload="auto">
      <source src="/tenuta.mp4" type="video/mp4" />
    </video>

    <!-- Overlay sombre dégradé -->
    <div class="hero__overlay"></div>

    <!-- Contenu texte -->
    <div class="hero__content" :style="parallaxStyle">
      <p class="hero__eyebrow">Bienvenue à</p>
      <h1 class="hero__title">
        <span class="hero__title-line">Maison</span>
        <span class="hero__title-line hero__title-line--accent">Rouge</span>
      </h1>
      <p class="hero__subtitle">Un lieu d'exception</p>
      <a href="#decouvrir" class="hero__cta">Découvrir</a>
    </div>

    <!-- Flèche scroll -->
    <div class="hero__scroll-hint">
      <span></span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const heroRef = ref(null);
const parallaxStyle = ref({});

const handleScroll = () => {
  const scrollY = window.scrollY;
  // Effet parallax : le texte monte plus lentement que le scroll
  parallaxStyle.value = {
    transform: `translateY(${scrollY * 0.3}px)`,
    opacity: 1 - scrollY / 600,
  };
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300&display=swap");

/* ── Hero wrapper ── */
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  background: #0a0a0a;
}

/* ── Vidéo plein écran ── */
.hero__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
}

/* ── Overlay : dégradé sombre bas + léger haut ── */
.hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.15) 0%,
    rgba(0, 0, 0, 0.3) 40%,
    rgba(0, 0, 0, 0.65) 100%
  );
}

/* ── Contenu centré ── */
.hero__content {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  padding: 0 1.5rem;
  will-change: transform, opacity;
}

/* ── Eyebrow ── */
.hero__eyebrow {
  font-family: "Jost", sans-serif;
  font-weight: 200;
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 1.2rem;
  animation: fadeUp 1.2s ease both;
  animation-delay: 0.2s;
}

/* ── Titre principal ── */
.hero__title {
  font-family: "Cormorant Garamond", serif;
  font-weight: 300;
  font-size: clamp(4rem, 12vw, 9rem);
  line-height: 0.9;
  letter-spacing: 0.05em;
  margin: 0 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1em;
}

.hero__title-line {
  display: block;
  animation: fadeUp 1.2s ease both;
}

.hero__title-line:nth-child(1) {
  animation-delay: 0.4s;
}

.hero__title-line--accent {
  font-style: italic;
  color: #e8c99a;
  animation-delay: 0.6s;
}

/* ── Sous-titre ── */
.hero__subtitle {
  font-family: "Jost", sans-serif;
  font-weight: 200;
  font-size: clamp(0.75rem, 1.8vw, 1rem);
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 2.5rem;
  animation: fadeUp 1.2s ease both;
  animation-delay: 0.8s;
}

/* ── CTA ── */
.hero__cta {
  font-family: "Jost", sans-serif;
  font-weight: 300;
  font-size: 0.75rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #fff;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 0.9em 2.5em;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
  animation: fadeUp 1.2s ease both;
  animation-delay: 1s;
}

.hero__cta:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.9);
}

/* ── Flèche scroll ── */
.hero__scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  animation: fadeUp 1.2s ease both;
  animation-delay: 1.4s;
}

.hero__scroll-hint span {
  display: block;
  width: 1px;
  height: 60px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.6)
  );
  margin: 0 auto;
  animation: scrollPulse 2s ease-in-out infinite;
}

/* ── Animations ── */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scrollPulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scaleY(0.8);
  }
  50% {
    opacity: 1;
    transform: scaleY(1);
  }
}

/* ── Mobile ── */
@media (max-width: 600px) {
  .hero__title {
    font-size: clamp(3.5rem, 18vw, 5rem);
  }
}
</style>
