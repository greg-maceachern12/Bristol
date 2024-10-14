<template lang="pug">
  header
    nav(:class="[{ leather: getMobileNavActive || transparentBackground }, { hide: hideMenu && !home && !mobile }, { black: solidBG && !transparentBackground && !home || mobile && !getMobileNavActive && getWhite }]")
      nuxt-link(to="/").home-link
        figure.logo
          img(:src="navLogoSrc" :alt="navLogoAlt" v-if="navLogoSrc")
      ul(:class="{ white: getWhite }" v-if="!mobile")
        li
          nuxt-link(to="/about")
            | ABOUT
        li
          nuxt-link(to="/contact")
            | CONTACT
      .hamburger(v-if="mobile" @click="activateMenu")
        figure(v-html="hamburger" :class="{ dark: !getWhite}")
    .mobile-nav-items(v-if="getMobileNavActive")
      ul(v-if="mobile")
        li(@click="activateMenu")
          nuxt-link(to="/about")
            | ABOUT
        li(@click="activateMenu")
          nuxt-link(to="/contact")
            | CONTACT
</template>

<script>
import SvgFiller from 'vue-svg-filler'
import {mapGetters, mapActions} from 'vuex'

export default {
  data() {
    return {
      white: '#fbf8ec',
      dark: '#060606',
      solidBG: false,
      lastScroll: 0,
      hideMenu: false,
      scrollDir: 'down',
      hamburger: '<svg width="26px" height="8px" viewBox="0 0 26 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Production-Detail" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="D_VideoPlayerControls" transform="translate(-829.000000, -790.000000)" fill="#FBF8EC"><g id="M_Hamburger" transform="translate(829.000000, 790.000000)"><rect id="Rectangle-3" x="0" y="0" width="26" height="1"></rect><rect id="Rectangle-3-Copy" x="0" y="7" width="26" height="1"></rect></g></g></g></svg>'
    }
  },

  components: {
    SvgFiller
  },

  computed: {
    ...mapGetters({
      getWhite: 'navigation/getWhite',
      getMobileNavActive: 'navigation/getMobileNavActive',
      mobile: 'navigation/getMobile',
      getScrollPos: 'navigation/getScrollPos',
      navLogoSrc: 'navigation/getNavLogoSrc',
      navLogoAlt: 'navigation/getNavLogoAlt',
      faviconSrc: 'navigation/getFaviconSrc'
    }),

    transparentBackground() {
      return this.$route.path === '/about' || this.$route.path === '/contact'
    },

    home() {
      return this.$route.path === '/'
    },
  },

  methods: {
    ...mapActions({
      toggleMobile: 'navigation/changeMobileState',
      toggleMobileNavActive: 'navigation/changeMobileNavState',
      saveScrollPos: 'navigation/saveScrollPos',
      whiteNav: 'navigation/whiteNav'
    }),

    activateMenu() {
      this.toggleMobileNavActive()
      if (this.$route.name === 'about' || this.$route.name === 'contact') {
        this.whiteNav(false)
      } else {
        this.whiteNav(!this.getWhite)
      }
    },

    handleScroll(e) {
      if (window.scrollY <= 100) {
        this.saveScrollPos(window.scrollY / 100)
      } else if (this.getScrollPos !== 0) {
        this.saveScrollPos(1)
      }

      if (window.scrollY <= window.innerHeight) {
        this.solidBG = false
      } else {
        if (this.scrollDir !== 'down') {
          this.solidBG = true
        }
      }

      if (window.scrollY > this.lastScroll) {
        if (window.scrollY >= window.innerHeight) {
          this.hideMenu = true
        }
        this.scrollDir = 'down'
      } else {
        this.hideMenu = false
        this.scrollDir = 'up'
      }

      this.lastScroll = window.scrollY
    }
  },

  mounted() {
    let handleMobileBreakPoint = (mql) => {
      this.toggleMobile(mql.matches)
    }
    let mql = window.matchMedia('(max-width: 769px)')
    mql.addEventListener("change", () => {
      handleMobileBreakPoint(mql);
    });
    handleMobileBreakPoint(mql);

    window.addEventListener('scroll', this.handleScroll)

    //Fetch
    Promise.all([
      this.$store.dispatch("navigation/fetchGeneralSettings"),
    ]);

    //Set favicon
    let link = document.querySelector("link[rel~='icon']");
    if (link && this.faviconSrc) {
      link.href = this.faviconSrc;
    }
  },

  destroy() {
    window.removeEventListener('scroll', this.handleScroll(e))
  }
}
</script>

<style lang="sass">
@import '../assets/styles/_variables.sass'
header
  z-index: 99999
  position: fixed
  nav
    height: 6.4rem
    margin-top: 0
    width: 100vw
    top: 0
    display: flex
    justify-content: space-between
    align-items: center
    z-index: 99999
    background-color: rgba(0, 0, 0, 0)
    transform: translateY(0)
    transition: background-color .25s ease-in-out, transform 0.5s ease-in-out

    &.leather
      background-color: $leather

    &.black
      background-color: rgba(0, 0, 0, 1)
      transition: background-color .25s ease-in-out, transform 0.5s ease-in-out

    &.hide
      transform: translateY(-12.4rem)
      transition: background-color .25s ease-in-out, transform 0.25s ease-in-out

    @media only screen and (min-width: $m)
      height: 4.9rem
      padding: 3rem 0
      &.leather
        background-color: rgba(0, 0, 0, 0)

    .home-link
      display: block
      width: auto

      .logo
        padding-left: 2rem
        //width: 1.8rem
        width: 100%
        height: 3.2rem
        @media only screen and (min-width: $m)
          //width: 2.7rem
          width: 100%
          height: 4.9rem
          padding-left: 3.5rem
        img
          width: 100%
          height: 100%
          @media only screen and (max-width: $m)
            width: 40px

    .hamburger
      width: 2.6rem
      padding-right: 2rem
      cursor: pointer
      *
        width: 100%
      .dark
        svg
          *
            fill: $geyser !important

      @media only screen and (min-width: $m)
        display: none

    ul
      justify-content: space-between
      padding-right: 6rem
      margin-top: 0.3rem
      display: none
      @media only screen and (min-width: $m)
        display: flex

      &.white
        li
          color: $geyser

      li
        a
          color: $geyser
        &:nth-of-type(2)
          padding-left: 4rem

  .mobile-nav-items
    width: 100vw
    height: calc(100vh - 6.4rem)
    background-color: $leather
    top: 6.4rem
    position: fixed
    display: flex
    align-items: center
    justify-content: center

    li
      width: 100%
      text-align: center

      &:nth-of-type(1)
        margin-bottom: 12rem

  .gradient
    z-index: -1
    position: fixed
    height: 16rem
    margin-top: 7.9rem
    top: 0
    width: 100vw
    background-image: linear-gradient(to bottom, #000000, rgba(0, 0, 0, 0))
    transition: opacity .25s ease-in-out
    opacity: 0

    &.show
      opacity: 1
      transition: opacity .25s ease-in-out
</style>
