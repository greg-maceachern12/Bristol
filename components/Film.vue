<template lang="pug">
  .film(:class="{ placeholder: !show }")
    .film-container(v-show="show || !vimeoId")
      video-player.video(:vid="vimeoId", :wordmark="wordmarkLink" v-if="vimeoId" @ready="onReady")
      .hero(:style="heroStyle" v-else)
        .wordmark
          figure.wm-icon
            img(:src="wordmarkLink")
        figure.scroll-icon(:style="fadeStyle")
          img(src="../assets/images/scroll_triangle.svg")
      .grid
        .row.no-margin
          .col-10-lg.off-1-lg.no-margin
            .content
              figure.poster
                img(:src="poster")
              .copy
                .film-body
                  vue-markdown(:source='description')
                .watch-on(v-if="vimeoId && watchOnLogos" )
                  a(:href="wol.link" target="_blank" v-for="wol in watchOnLogos")
                    figure
                      img(:src="wol.src" :style="'width: ' + (wol.width) + 'px'")
                a.watch-on.one(:href="watchOnLink" target="_blank" v-if="vimeoId && !watchOnLogos")
                  figure
                    img(:src="watchOnLogo")

                p.film-premiere
                  | {{ premiereSentence }}
      credits(:fields="this.fields")
      awards(:fields="this.fields")
      slideshow(:slides="stills" :class="{ nopress: press.length === 0 }")
      .grid.press(v-if="press.length > 0")
        .row.no-margin(v-for="item in press")
          .col-10-lg.off-1-lg.col-6-xs
            press(:article="item" size="lg")
</template>

<script>
import Press from "./Press.vue";
import Slideshow from "./Slideshow.vue";
import VideoPlayer from "./VideoPlayer.vue";
import Credits from "./Credits.vue";
import Awards from "./Awards.vue"; 
import VueMarkdown from "vue-markdown";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      show: false
    };
  },

  components: {
    Credits,
    Awards,
    Press,
    Slideshow,
    VideoPlayer,
    VueMarkdown
  },

  props: ["currentFilm"],

  computed: {
    ...mapGetters({
      getScrollPos: "navigation/getScrollPos"
    }),

    stills() {
      const f = this.fields;
      return f.stills
        ? f.stills.map(o => {
          return o.fields.file.url;
        })
        : [];
    },

    fields() {
      return this.currentFilm.fields;
    },

    fadeStyle() {
      return {opacity: 1 - this.getScrollPos};
    },

    poster() {
      return this.fields.poster
        ? "https:" + this.fields.poster.fields.file.url
        : "";
    },

    description() {
      return this.fields.description ? this.fields.description : "";
    },

    watchOnLogo() {
      return this.fields.watchOnLogo
        ? "https:" + this.fields.watchOnLogo.fields.file.url
        : "";
    },

    watchOnLogos() {
      let links = [];
      if(this.fields.watchOnUrl) {
        links = this.fields.watchOnUrl.split(',');
      }
      return this.fields.watchOnLogos ?
        this.fields.watchOnLogos.map((logoUrl,i) => {
          return {
            "width": logoUrl.fields.file.details.image.width / 12,
            "src": "https:" + logoUrl.fields.file.url,
            "link": links[i]
          }
        })
        : null;
    },

    watchOnLink() {
      return this.fields.watchOnUrl ? this.fields.watchOnUrl : "";
    },

    premiereSentence() {
      return this.fields.premiereSentence ? this.fields.premiereSentence : "";
    },

    press() {
      return this.fields.press ? this.fields.press : "";
    },

    vimeoId() {
      return this.fields.video_id;
    },

    wordmarkLink() {
      return this.fields.wordmark
        ? "https:" + this.fields.wordmark.fields.file.url
        : false;
    },

    previewImage() {
      return this.fields.previewImage
        ? "https:" + this.fields.previewImage.fields.file.url
        : false;
    },

    heroStyle() {
      return this.previewImage
        ? "background: url(" + this.previewImage + ") no-repeat center center"
        : false;
    }
  },

  methods: {
    onReady() {
      this.show = true;
    }
  }
};
</script>

<style lang="sass">
@import '../assets/styles/_variables.sass'
@import '../assets/styles/_mixins.sass'
.film
  background-color: #000
  padding-top: 0
  min-height: 100vh
  color: $geyser

  &.placeholder
    min-height: 100vh

  .film-container
    .hero
      height: 66.6vw
      width: 100vw
      background-size: cover !important
      margin-bottom: 6rem
      position: relative
      @media only screen and (min-width: $m)
        height: 100vh
        margin-top: 0
        margin-bottom: 18.6rem

    > .grid
      padding: 30px 0

    .wordmark
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index: 99
      width: 75vw
      opacity: 1
      transition: opacity .5s ease-in-out
      cursor: pointer
      @media only screen and (min-width: $m)
        width: 34.22vw

      .wm-icon
        width: 100%

    .scroll-icon
      width: 2rem
      position: absolute
      display: none
      bottom: 5rem
      left: calc(50% - 1rem)
      animation: 1s ease-in-out 3 bounce
      z-index: 99999
      @media only screen and (min-width: $m)
        display: block

    .video
      //margin-bottom: 6rem
      @media only screen and (min-width: $m)
        //margin-bottom: 18.6rem
        position: relative
        min-width: 100%
        max-height: 100vh
        width: auto

    .content
      display: flex
      justify-content: flex-start
      //align-items: top
      flex-direction: column
      @media only screen and (min-width: $m)
        flex-direction: row

      .poster
        width: 89.33vw
        @media only screen and (min-width: $m)
          width: 29.21875vw

      .copy
        width: 89.33vw
        margin: 6rem 0 0 0
        position: relative

        .film-body
          a
            text-decoration: underline

          p
            margin-bottom: 1.5rem

            &:last-child
              margin: 0

        @media only screen and (min-width: $m)
          margin: 12.26vw 0 0 11.09375vw
          width: 37.26vw

        .watch-on
          justify-content: space-between
          align-items: center
          margin-top: 2.4rem
          width: 100%
          min-width: 100%
          overflow: scroll

          @media only screen and (min-width: $m)
            margin-top: 2rem
            overflow: visible
            padding-right: 0

          a
            float: left
            display: block
            //border: red solid 1px
            figure
              margin-right: 10px
              //max-width: 10rem
              display: inline-block

          &.one
            figure
              margin-left: 10px
              margin-bottom: 5px

          h3
            line-height: 2
            float: left
            font-size: 1.6rem
            display: inline-block
            //border: red solid 1px
            letter-spacing: 2.6px

        .film-premiere
          position: absolute
          bottom: 1.48vw

    .slideshow
      margin-top: 8rem
      @media only screen and (min-width: $m)
        margin-top: 25.6rem

      &.nopress
        padding-bottom: 15.6rem

        .navigation
          bottom: 11.5rem

    .press
      margin-top: 12rem
      @media only screen and (min-width: $m)
        margin-top: 26.2rem
</style>

