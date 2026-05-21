<template>
  <div class="navBar">
    <div class="container">
      <div class="logo">
        <img src="@/assets/pictures/logo-light.png" alt="" />
      </div>
      <div class="bookPart">
        <div class="lang">
            <button class="fr">FR</button>
            <button class="en">EN</button>
        </div>
        <div class="bookButton">
            
        </div>
        <div class="menuButton">
            <button
              class="menu-icon"
              @mouseenter="isHoveringMenu = true"
              @mouseleave="isHoveringMenu = false"
              :class="{ active: isHoveringMenu }"
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
export default {
  name: "NavbarComponent",
  data() {
    return {
      isHoveringMenu: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.navBar {
  background-color: cyan;
  height: 12%;
  width: 100%;
  display: flex;
  justify-content:center;
  align-items: center;
}

.container{
    background-color: darkmagenta;
    height: 65%;
    width: calc(100% - 70px);
    display: flex;
    justify-content: space-between;
    // align-items: center;
}

img{
    height: 50px;
    width: 50px;
    border-radius: 8px;
}

.bookPart{
    background-color: darkgreen;
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
    background-color: darkred;
}

.menu-icon {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    color: currentColor;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    transition: color 0.2s ease;
}

.menu-icon:hover {
    color: rgba(255, 255, 255, 0.8);
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

.lang{
    width: 20%;
    background-color: darkred;
    height: 60%;
    display: flex;
}

.lang button{
    background-color: transparent;
    border: none;
}

.lang .fr{
    border-right: 1.5px solid white;
        text-align: left;

}

.bookButton{
    width: 35%;
    height: 90%;
        background-color: darkred;

}

</style>
