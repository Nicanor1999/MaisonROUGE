<template>
  <Transition name="menu-overlay">
    <div v-if="ui.isMenuOpen" class="fullNav">
      <!-- Top header bar within the overlay -->
      <div class="menu-header">
        <button 
          class="close-btn" 
          @click="ui.closeMenu()" 
          aria-label="Fermer le menu"
          id="btn-close-menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="1.5" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script>
import { useUiStore } from "@/stores/ui";

export default {
  name: "FullNavbarComponent",
  data() {
    return {
      ui: useUiStore(),
    };
  },
  methods: {
    handleLinkClick(route) {
      this.ui.closeMenu();
      if (route.startsWith('/')) {
        this.$router.push(route);
      } else if (route.startsWith('#')) {
        // Handle smooth scrolling for hash links
        const element = document.querySelector(route);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.fullNav {
  position: fixed;
  z-index: 9999; 
  height: 100%;
  width: 100%;
  background-color: var(--bg-1);
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--primary);
  padding: 0.5rem;
  position: absolute;
  top: 1rem;
  right: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);

  &:hover {
    transform: rotate(90deg) scale(1.1);
    color: white;
    background-color: var(--primary);
    // border-color: var(--primary);
  }

  svg {
    width: 28px;
    height: 28px;
  }
}
</style>