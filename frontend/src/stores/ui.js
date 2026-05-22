import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    isScrolling: false,
    isNavOpen: false,
    isLoading: false,
    isMenuOpen: false,
  }),
  actions: {
    showScrollBar() {
      this.isScrolling = true;
    },
    hideScrollBar() {
      this.isScrolling = false;
    },
    showLoader() {
      this.isLoading = true;
    },
    hideLoader() {
      this.isLoading = false;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    openMenu() {
      this.isMenuOpen = true;
    },
  },
});
