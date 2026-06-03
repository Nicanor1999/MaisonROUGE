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
            <div class="word1">MAISON</div>
            <div class="image-wrapper">
              <img v-for="(img,index) in imgList" :key="index" :src="img" alt="" :class="{active: activeIndex === index}">
            </div>
            <div class="word2">ROUGE</div>
          </div>
          <div class="nav">
            <ul>
              <li><a href="" class="primary-light" @mouseenter="activeIndex = 0" @click.prevent="handleLinkClick('/')">Accueil</a></li>
              <li><a href="" class="primary-light" @mouseenter="activeIndex = 1" @click.prevent="handleLinkClick('/accomodation')">Hébergement</a></li>
              <li><a href="" class="primary-light" @mouseenter="activeIndex = 2" @click.prevent="handleLinkClick('/restaurant')">Restaurant</a></li>
              <li><a href="" class="primary-light" @mouseenter="activeIndex = 3" @click.prevent="handleLinkClick('/services')">Services</a></li>
              <li><a href="" class="primary-light" @mouseenter="activeIndex = 4" @click.prevent="handleLinkClick('/expositions')">Expositions</a></li>
              <li><a href="" class="primary-light" @mouseenter="activeIndex = 5" @click.prevent="handleLinkClick('/contact')">Nous Contacter</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { useUiStore } from "@/stores/ui";
import photo1 from "@/assets/pictures/photo1.png";
import photo2 from "@/assets/pictures/photo5.jpg";
import photo3 from "@/assets/pictures/photo3.jpg";
import photo4 from "@/assets/pictures/photo8.jpg";
import photo5 from "@/assets/pictures/photo4.jpg";
import photo6 from "@/assets/pictures/photo6.jpg";

export default {
  name: "FullNavbarComponent",
  data() {
    return {
      ui: useUiStore(),
      imgList:[photo1,photo2,photo3,photo4,photo5,photo6],
      activeIndex: 0,
    };
  },
  methods: {
    handleLinkClick(route) {
      this.ui.closeMenu();
      setTimeout(() => {
        if (route.startsWith('/')) {
          this.$router.push(route);
        } else if (route.startsWith('#')) {
          // Handle smooth scrolling for hash links
          const element = document.querySelector(route);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 600); // wait for animate__slideOutUp to finish
    }
  },
  computed:{
    getActiveIndex(){
      console.log(this.activeIndex);
      // return this.activeIndex;
    }
  },
  mounted(){
    // Computed properties are accessed as properties, not called as functions
    console.log(this.getActiveIndex);
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
  // background-color: teal;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.container .containerContent {
  height: 80%;
  width: 95%;
  // background-color: darkred;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container .containerContent .image {
  height: 100%;
  width: 60%;
  // background-color: black;
  position: relative;
}

.container .containerContent .image .word1{
  position: absolute;
  top: -20%;
  left: -8%;
  z-index: 2;
  font-size: 6rem;
    font-family: "Futura LT", sans-serif;
    color: var(--primary);

}

.container .containerContent .image .word2{
  position: absolute;
  bottom: -20%;
  right: -10%;
  z-index: 2;
  font-size: 6rem;
  color: var(--primary);
    font-family: "Futura LT", sans-serif;

}

.container .containerContent .image .image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.container .containerContent .image .image-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.05);
  transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

.container .containerContent .image .image-wrapper img.active {
  opacity: 1;
  transform: scale(1);
}

.container .containerContent .nav {
  height: 80%;
  width: 25%;
  // background-color: darkslateblue;
}

.container .containerContent .nav ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
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
  transition: all 0.4s ease-in-out;
}

.container .containerContent .nav ul li a:hover {
  opacity: 100%;
  text-decoration: underline dotted;
  // font-weight: bolder;
}


</style>