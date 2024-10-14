<template lang="pug">
  main.home
    #anim-container(v-if="animationTrigger < 2")
      #opening-animation
    .bg(v-if="!mobile" v-show="show")
      transition(name="fade")
        .video-container
          video(loop muted autoplay v-show="active(item)" v-for="item in allFilms")
            source(:src="vidFile(item)" type="video/mp4")
          .gradient
      transition(name="fade")
        .teaser-image(:style="teaserImageStyle" v-if="!teaserVid")
          .gradient
    .content(v-if="show")
      h2
        | FEATURES
      .wordmarks
        nuxt-link(:to="{ name: 'film', params: { film: slug(film) }}" v-for="film in features" :key="film.id")
          figure.mobile-preview-image(v-if="mobile" :style="previewImage(film)")
            figure.mobile-wordmark
              img(:src="'https:' + wordmarkLink(film)")
            .mobile-overlay
          figure.wordmark(
            @mouseenter="handleTeaser(allFilms.indexOf(film), 'films')"
            @mouseleave="handleTeaserLeave"
            v-if="!mobile"
          )
            img(:src="'https:' + wordmarkLink(film)")
      h2
        | DOCS
      .wordmarks
        nuxt-link(
          :to="{ name: 'film', params: { film: slug(film) }}"
          v-for="film in docs"
          :key="film.id"
        )
          figure.mobile-preview-image(v-if="mobile" :style="previewImage(film)")
            figure.mobile-wordmark
              img(:src="'https:' + wordmarkLink(film)")
            .mobile-overlay
          figure.wordmark(
            @mouseenter="handleTeaser(allFilms.indexOf(film), 'films')"
            @mouseleave="handleTeaserLeave"
            v-if="!mobile"
          )
            img(:src="'https:' + wordmarkLink(film)")
      h2
        | SHORTS
      .wordmarks
        nuxt-link(:to="{ name: 'film', params: { film: slug(film) }}" v-for="film in shorts" :key="film.id")
          figure.mobile-preview-image(v-if="mobile" :style="previewImage(film)")
            figure.mobile-wordmark
              img(:src="'https:' + wordmarkLink(film)")
            .mobile-overlay
          figure.wordmark(
            @mouseenter="handleTeaser(allFilms.indexOf(film), 'films')"
            @mouseleave="handleTeaserLeave"
            v-if="!mobile"
          )
            img(:src="'https:' + wordmarkLink(film)")
      h2
        | IN-THE-WORKS
      .wordmarks
        nuxt-link(:to="{ name: 'film', params: { film: slug(film) }}" v-for="film in previews" :key="film.id")
          figure.mobile-preview-image(v-if="mobile" :style="previewImage(film)")
            figure.mobile-wordmark
              img(:src="'https:' + wordmarkLink(film)")
            .mobile-overlay
          figure.wordmark(
            @mouseenter="handleTeaser(previews.indexOf(film), 'previews')"
            @mouseleave="handleTeaserLeave"
            v-if="!mobile"
          )
            img(:src="'https:' + wordmarkLink(film)")
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import lottie from "lottie-web";

export default {
  data() {
    return {
      currentTitle: 0,
      category: "films",
      show: false,
      hasSeenAnimation: false
    };
  },

  computed: {
    ...mapGetters({
      features: "home/getFeatures",
      docs: "home/getDocs",
      shorts: "home/getShorts",
      previews: "home/getHomePreviews",
      mobile: "navigation/getMobile",
      allFilms: "home/getHomeFilms",
      animationTrigger: "home/getAnimationState",
      animationLottie: "home/getAnimationLottie",
      animationLottieFrames: "home/getAnimationLottieFrames",
    }),

    teaserVid() {
      let film = {};
      if (this.category === "films") {
        film = this.allFilms[this.currentTitle].fields;
      } else {
        film = this.previews[this.currentTitle].fields;
      }
      return film.teaser ? "https:" + film.teaser.fields.file.url : false;
    },

    teaserImageStyle() {
      let film = {};
      if (this.category === "films") {
        film = this.allFilms[this.currentTitle].fields;
      } else {
        film = this.previews[this.currentTitle].fields;
      }
      if (film.previewImage && film.previewImage.fields) {
        return (
          "background: url(https:" +
          film.previewImage.fields.file.url +
          ") no-repeat center center"
        );
      } else {
        return false;
      }
    }
  },

  methods: {
    ...mapActions({
      whiteNav: "navigation/whiteNav",
      changeCurrentFilm: "home/changeCurrentFilm"
    }),

    active(item) {
      return (
        this.allFilms.indexOf(item) === this.currentTitle &&
        this.category === "films"
      );
    },

    wordmarkLink(item) {
      if (item.fields.wordmark) {
        return item.fields.wordmark.fields
          ? item.fields.wordmark.fields.file.url
          : false;
      }
    },

    vidFile(item) {
      return item.fields.teaser
        ? "https:" + item.fields.teaser.fields.file.url
        : false;
    },

    slug(item) {
      return item.fields.title
        .toLowerCase()
        .split(" ")
        .join("-");
    },

    handleTeaser(no, cat) {
      this.currentTitle = no;
      this.category = cat;
      if (process.browser) {
        document.querySelector(".bg").classList.add("show");
      }
    },

    handleTeaserLeave() {
      if (process.browser && !this.mobile) {
        document.querySelector(".bg").classList.remove("show");
      }
    },

    previewImage(film) {
      if (
        film.fields.mobilePreviewImage &&
        film.fields.mobilePreviewImage.fields
      ) {
        return (
          "background: url(https:" +
          film.fields.mobilePreviewImage.fields.file.url +
          ") no-repeat center center"
        );
      } else {
        return false;
      }
    },

    animate() {
      if (this.animationTrigger > 1) {
        this.show = true
      } else {
        let anim,
            frames = 135;
        if (this.animationLottie) {
          anim = lottie.loadAnimation({
            container: document.getElementById("opening-animation"),
            renderer: "svg",
            loop: false,
            autoplay: true,
            animationData: this.animationLottie
          });
          frames = this.animationLottieFrames;
        } else {
          anim = lottie.loadAnimation({
            container: document.getElementById("opening-animation"),
            renderer: "svg",
            loop: false,
            autoplay: true,
            path: "lottie/data.json"
          });
        }
        anim.setSpeed(1);

        //*******  Start & stop
        //* Found bug on production that kills the user journey if they navigate
        //* back to the home page too quickly after landing on the site. This method
        //* starts and stops the animation then the view mounts
        //* instead of destroying the animation frame.

        anim.addEventListener("enterFrame", () => {
          anim.play();
          if (Math.floor(anim.currentFrame) >= frames) {
            anim.removeEventListener("enterFrame");
            anim.stop();
            document.getElementById("anim-container").classList.add("fade");
            this.show = true;
          }
        });
      }
    }
  },

  mounted() {
    this.whiteNav(true);
    this.animate();
  },

  fetch({store, params}) {
    return Promise.all([
      store.dispatch("films/fetchFilms"),
      store.dispatch("previews/fetchPreviews"),
      store.dispatch("home/fetchHomeData"),
      store.dispatch("navigation/fetchGeneralSettings"),
    ]);
  }
};
</script>

<style lang="sass">
@import '../assets/styles/_variables.sass'
.home
  background-color: #000
  padding-top: 4.6rem
  min-height: 100vh
  width: 100vw
  color: #FFF
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  @media only screen and (min-width: $m)
    padding-top: 28.5rem

  #anim-container
    background-color: #fbf8ec
    z-index: 99999999
    width: 100vw
    height: 100vh
    position: fixed
    top: 0
    display: flex
    justify-content: center
    align-items: center

    &.fade
      opacity: 0
      z-index: 0
      transition: opacity .5s ease-in-out, z-index .5s ease-in-out

    #opening-animation
      z-index: 9999
      width: 50%
      @media only screen and (min-width: $m)
        width: 24.375%

  .bg
    position: fixed
    width: 100vw
    height: 100vh
    top: 0
    left: 0
    opacity: 0
    transition: opacity .5s ease-in-out

    &.show
      opacity: 1
      transition: opacity .5s ease-in-out

    .video-container
      position: relative

      video
        position: fixed
        top: 50%
        left: 50%
        min-width: 100%
        min-height: 100%
        width: auto
        height: auto
        z-index: -100
        transform: translate(-50%, -50%)

      .gradient
        position: fixed

    .teaser-image
      width: 100vw
      height: 100vh
      background-size: cover !important

    .gradient
      width: 100vw
      height: 50vh
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #000000 72%)
      position: absolute
      bottom: 0
      z-index: 99

  .content
    width: 100vw
    z-index: 999
    @media only screen and (min-width: $m)
      width: 34.22vw

    h2
      text-align: center
      margin: 3rem 0 2rem 0
      @media only screen and (min-width: $m)
        margin: 23rem 0 7rem 0
        &:first-of-type
          margin: 0 0 7rem 0

    .wordmarks
      position: relative

      .mobile-preview-image
        width: 100vw
        height: 66.66vw
        position: relative
        background-size: cover !important

        .mobile-wordmark
          width: 21.9rem
          position: absolute
          top: 50%
          left: 50%
          transform: translate(-50%, -50%)
          z-index: 9

        .mobile-overlay
          position: absolute
          height: 66.66vw
          width: 100vw
          background-color: rgba(0, 0, 0, 0.2)

      .wordmark
        transition: opacity .5s ease-in-out
        opacity: 1

        &:hover
          transition: opacity .5s ease-in-out
          opacity: 0.5

        @media only screen and (min-width: $m)
          margin-bottom: 20.2rem
          position: static

        img
          width: 100%
          height: 100%
</style>
