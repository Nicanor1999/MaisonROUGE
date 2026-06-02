<template>
  <Transition enter-active-class="animate__animated animate__slideInDown"
    leave-active-class="animate__animated animate__slideOutUp">
    <div v-if="ui.isMenuOpen" class="fullNav">
      <!-- Top header bar within the overlay -->
      <div class="menu-header">
        <button class="close-btn" @click="ui.closeMenu()" aria-label="Fermer le menu" id="btn-close-menu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="container">
        <div class="containerContent">
          <div class="image">

          </div>
          <div class="nav">
            <ul>
              <li><a href="" class="primary-light">Accueil</a></li>
              <li><a href="" class="primary-light">Hébergement</a></li>
              <li><a href="" class="primary-light">Restaurant</a></li>
              <li><a href="" class="primary-light">Services</a></li>
              <li><a href="" class="primary-light">Expositions</a></li>
              <li><a href="" class="primary-light">Nous Contacter</a></li>
            </ul>
          </div>
        </div>
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
  display: flex;
  align-items: center;
  justify-content: center;
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

.container {
  height: 85%;
  width: 93%;
  background-color: teal;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.container .containerContent {
  height: 80%;
  width: 95%;
  background-color: darkred;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container .containerContent .image {
  height: 100%;
  width: 60%;
  background-color: black;
}

.container .containerContent .nav {
  height: 80%;
  width: 25%;
  background-color: darkslateblue;
}

.container .containerContent .nav ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: right;
  height: 100%;
  width: 100%;
}

.container .containerContent .nav ul li{
  width: 100%;
  // background-color: aqua;
}

.container .containerContent .nav ul li a{
  text-decoration: none;
  font-size: 1.8rem;
}

.container .containerContent .nav ul li a:hover {
  opacity: 100%;
  text-decoration: underline dotted;
  font-weight: bolder;
}
</style>