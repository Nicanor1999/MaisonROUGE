<template>
  <div class="navBar" :class="{ scrolled: ui.isScrolling }">
    <div class="container">
      <div class="logo">
        <img :key="currentlogo" :src="logoSwitch" alt="" />
      </div>
      <div class="bookPart">
        <div class="lang">
          <button class="fr">FR</button>
          <button class="en">EN</button>
        </div>
        <div class="bookButton">
          <div class="buttonCircle"></div>
          <span>RESERVEZ</span>
        </div>
        <div class="menuButton">
          <button
            class="menu-icon"
            @click="ui.toggleMenu()"
            @mouseenter="isHoveringMenu = true"
            @mouseleave="isHoveringMenu = false"
            :class="{ active: isHoveringMenu || ui.isMenuOpen }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path class="line line-top" d="M4 5L25 5" />
              <path class="line line-middle" d="M4 12L25 12" />
              <path class="line line-bottom" d="M4 19L25 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import light from "@/assets/pictures/logo-light.png";
import dark from "@/assets/pictures/logo-dark.jpg";
import { useUiStore } from "@/stores/ui";

export default {
  name: "NavbarComponent",
  data() {
    return {
      ui: useUiStore(),
      isHoveringMenu: false,
      currentlogo: "",
      logoSrc: "",
    };
  },
  computed: {
    logoSwitch() {
      if (this.ui.isScrolling) {
        this.logoSrc = dark;
        return this.logoSrc;
      } else {
        this.logoSrc = light;
        return this.logoSrc;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.navBar {
  background-color: transparent;
  height: 12%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.142);
  transition: all 0.3s ease-in-out;

  &.scrolled {
    background-color: var(--bg-1);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.24);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .lang button {
      color: var(--primary);
    }

    .lang .fr {
      border-right: 1.5px solid var(--primary);
    }

    .bookButton span {
      color: var(--primary);
    }

    .menu-icon {
      color: var(--primary);
    }

    .bookButton .buttonCircle {
      background-color: var(--primary-variant);
    }
  }
}

.container {
  //   background-color: darkmagenta;
  height: 65%;
  width: calc(100% - 70px);
  display: flex;
  justify-content: space-between;
  // align-items: center;
}

img {
  height: 50px;
  width: 50px;
  border-radius: 8px;
}

.bookPart {
  //   background-color: darkgreen;
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  // padding-right: 1rem;
}

.menuButton {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  //   background-color: darkred;
}

.menu-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: color 0.2s ease;
}

.menu-icon:hover {
  color: var(--primary);
}

.menu-icon svg {
  width: 24px;
  height: 24px;
  stroke: currentColor;
}

.line {
  transform-origin: left center;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.line-top {
  transition-delay: 0ms;
}

.line-middle {
  transition-delay: 0.05s;
}

.line-bottom {
  transition-delay: 0.1s;
}

.menu-icon.active .line-top {
  transform: scaleX(0.85) translateX(3px);
}

.menu-icon.active .line-middle {
  transform: scaleX(0.7) translateX(5px);
}

.menu-icon.active .line-bottom {
  transform: scaleX(0.55) translateX(7px);
}

.lang {
  width: 20%;
  //   background-color: darkred;
  height: 50%;
  display: flex;
}

.lang button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: lighter;
  color: #ffffff;
  font-family: "Quattrocento Sans", sans-serif;
}

.lang button:hover {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bolder;
  color: var(--primary);
  font-family: "Quattrocento Sans", sans-serif;
}

.lang .fr {
  border-right: 1.5px solid white;
}

.lang .fr:hover {
  border-right: 1.5px solid white;
}

.bookButton {
  width: 35%;
  height: 70%;
  //   background-color: darkred;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.bookButton .buttonCircle {
  width: 33%;
  height: 100%;
  background-color: var(--primary);
  border-radius: 30px;
  transition: width 0.3s ease-in-out;
  // z-index: 1;
  //     position:relative;
}

.bookButton span {
  position: absolute;
  z-index: 3;
  left: 17%;
  top: 15%;
  color: white;
  font-family: "Quattrocento Sans", sans-serif;
  // font-weight: lighter;
}

.bookButton:hover span {
  color: white;
  font-weight: bolder;
}

.bookButton:hover .buttonCircle {
  width: 100%;
  height: 100%;
  background-color: var(--primary);
  border-radius: 17px;
}
</style>
