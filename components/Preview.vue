<template lang="pug">
  .preview
    .hero(:style="heroStyle")
      figure.scroll-icon(:style="fadeStyle")
        img(src="../assets/images/scroll_triangle.svg")
    .overlay
      figure
        img(:src="wordmarkLink")
    transition(name="fade")
      .content(:style="contentStyle")
        figure.wordmark(v-html="svg" v-if="svgLoaded")
        figure.wordmark
          img(:src="wordmarkBlackLink")
        .grid
          .row.no-margin
            div(:class="descriptionWidth")
              div.preview-body(v-html="description")
              .watch-on(v-if="watchOnLink && watchOnLogo")
                a(:href="watchOnLink" target="_blank")
                  h3
                    | WATCH ON
                  figure
                    img(:src="watchOnLogo")
            .col-3-lg.col-6-xs
              .links
                .link(v-if="script")
                  a(:href="script" target="_blank")
                    figure.script
                      img(src="../assets/images/script_icon.svg")
                  a.download(:href="script" target="_blank" v-if="script")
                    p.preview-label(
                      v-for="(scriptText, index) in scriptLinkText"
                      :key="`scriptText_${index}`"
                    ) {{ scriptText }}
                hr(v-if="lookbook && script")
                .link(v-if="lookbook")
                  a(:href="lookbook" target="_blank")
                    figure.lookbook
                      img(src="../assets/images/lookbook_icon.svg")
                  a.download(:href="lookbook" target="_blank" v-if="lookbook")
                    p.preview-label(
                      v-for="(lookbookText, index) in lookbookLinkText"
                      :key="`lookbookText_${index}`"
                    ) {{ lookbookText }}
                hr(v-if="(lookbook || script) && sizzle")
                .link(v-if="sizzle")
                  a(:href="sizzle" target="_blank")
                    figure.sizzle
                      img(src="../assets/images/sizzle_icon.svg")
                  a.download(:href="sizzle" target="_blank" v-if="sizzle")
                    p.preview-label(
                      v-for="(sizzleText, index) in sizzleLinkText"
                      :key="`sizzleText_${index}`"
                    ) {{ sizzleText }}
    credits(:fields="this.fields" :preview="true")
    awards(:fields="this.fields" :preview="true")
    transition(name="fade")
      slideshow.stills(:slides="stills")
    transition(name="fade" v-if="contactEmail")
      .preview-contact
        p.preview-contact-body
          | FOR MORE INFO ON {{ title }}, CONTACT:
        a.preview-contact-email(:href="contactEmail")
          | {{ contactEmail }}
</template>

<script>
import { mapGetters } from 'vuex'
import Slideshow from './Slideshow.vue'
import axios from 'axios'
import Credits from "./Credits";
import Awards from "./Awards.vue"; 
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  data () {
    return {
      // userPass: '',
      // master: 'PatWood1932',
      // protected: true,
      // wrongPass: false,
      svgLoaded: false,
      svg: '',
      // localStorageItems: {},
      // validated: false
    }
  },

  props: ['currentFilm'],

  components: {
    Credits,
    Awards,
    Slideshow
  },

  methods: {},

  computed: {
    ...mapGetters({
      getScrollPos: 'navigation/getScrollPos'
    }),

    fields () {
      return this.currentFilm.fields
    },

    description () {
      return this.fields.descriptionHtml ? documentToHtmlString(this.fields.descriptionHtml) : ''
    },

    descriptionWidth () {
      return 'col-12-lg'
      //return !this.script && !this.lookbook ? 'col-10-lg' : 'col-7-lg'
    },

    fadeStyle () {
      return { opacity: 1 - this.getScrollPos}
    },

    previewImage () {
      return this.fields.previewImage ? 'https:' + this.fields.previewImage.fields.file.url : false
    },

    heroStyle () {
      return this.previewImage ? 'background: url(' + this.previewImage + ') no-repeat center center' : false
    },

    lookbook () {
      return this.fields.lookbook ? 'https:' + this.fields.lookbook.fields.file.url : false
    },

    lookbookLinkText () {
      const text = this.fields.lookbookLinkText

      if (text) {
        return text.split(' ')
      }

      return ['VIEW', 'LOOKBOOK']
    },

    sizzle () {
      return this.fields.sizzle ? this.fields.sizzle : false
    },

    sizzleLinkText () {
      const text = this.fields.sizzleLinkText

      if (text) {
        return text.split(' ')
      }

      return ['WATCH', 'SIZZLE']
    },

    contentStyle () {
      const image = require("../assets/images/works_texture.jpg")
      return 'background: url(' + image + ') no-repeat center center'
    },

    wordmarkLink () {
      return this.fields.wordmark ? 'https:' + this.fields.wordmark.fields.file.url : false
    },

    wordmarkBlackLink () {
      return this.fields.wordmarkBlack ? 'https:' + this.fields.wordmarkBlack.fields.file.url : false
    },

    contactEmail () {
      return this.fields.contactEmail ? this.fields.contactEmail : false
    },

    script () {
      return this.fields.script ? 'https:' + this.fields.script.fields.file.url : false
    },

    scriptLinkText () {
      const text = this.fields.scriptLinkText

      if (text) {
        return text.split(' ')
      }

      return ['DOWNLOAD', 'SCRIPT']
    },

    stills () {
      const f = this.fields
      return f.stills ? f.stills.map(o => { return o.fields.file.url }) : []
    },

    // password () {
    //   return this.fields.password ? this.fields.password : false
    // },

    title () {
      return this.fields.title ? this.fields.title.toUpperCase() : false
    },

    storageTitle () {
      return this.fields.title ? this.fields.title.replace(' ', '_') : false
    },

    watchOnLogo() {
      return this.fields.watchOnLogo
        ? this.fields.watchOnLogo.fields.file.url
        : "";
    },

    watchOnLink() {
      return this.fields.watchOnUrl ? this.fields.watchOnUrl : "";
    },
  },

  mounted () {
    this.svgLoaded = false
    axios.get(this.wordmarkLink)
      .then((response) => {
        this.svg = response.data
        this.svgLoaded = !this.wordmarkBlackLink
      })
  }
}
</script>

<style lang="sass">
  @import '../assets/styles/_variables.sass'
  .preview
    background-color: #000
    //padding-top: 0
    color: $geyser
    position: relative
    .hero
      height: 66.6vw
      width: 100vw
      background-size: cover !important
      transition: filter 1s ease-in-out
      position: relative
      @media only screen and (min-width: $m)
        height: 100vh
        margin-top: 0
      &.protected
        filter: blur(18px)
        height: 100vh
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
    .validator
      width: 58.1rem
      p
        &.label
          font-family: $pn_bold
          font-size: 1.2rem
          line-height: 1.83
          letter-spacing: 4px
          color: $geyser
          width: 21.8rem
          margin: auto
          text-align: center
          margin-bottom: 2.4rem
          @media only screen and (min-width: $m)
            width: 58.1rem
            font-size: 1.5rem
            line-height: 1.67
            letter-spacing: 5px
      .form
        display: flex
        justify-content: center
        input
          width: 53vw
          border: none
          background-color: rgba(0, 0, 0, 0.76)
          height: 3.5rem
          padding: 1.5rem 2.8rem 0.8rem 2.8rem
          font-family: $sb
          font-weight: normal
          font-style: normal
          font-stretch: normal
          line-height: 1.54
          letter-spacing: 4.3px
          font-size: 2.6rem
          text-align: center
          color: $geyser
          @media only screen and (min-width: $m)
            width: 38.5rem
            padding: 2.5rem 4.8rem 1.5rem 4.8rem
            height: 6rem
            font-size: 3.6rem
            line-height: 1.11
            letter-spacing: 6px
        .button
          width: 5.8rem
          height: 5.8rem
          display: flex
          justify-content: center
          align-items: center
          background-color: $cream
          cursor: pointer
          figure
            width: 2.4rem
          @media only screen and (min-width: $m)
            width: 10rem
            height: 10rem
    .overlay
      position: absolute
      top: 0
      left: 0
      width: 100vw
      height: 66.6vw
      background-color: rgba(0, 0, 0, 0.4)
      display: flex
      justify-content: center
      align-items: center
      @media only screen and (min-width: $m)
        height: 100vh
      &.protected
        height: 100vh
        margin-top: -6.4rem
        @media only screen and (min-width: $m)
          margin-top: 0
      figure
        width: 68.75vw
        @media only screen and (min-width: $m)
          width: 43.2vw
    .content
      width: 100vw
      background-size: cover !important
      background-color: $cream
      min-height: 10rem
      padding: 8.8rem 0 9.5rem 0
      @media only screen and (min-width: $m)
        padding: 17.3rem 0 20.5rem 0
      .wordmark
        width: 53.1275vw
        margin: 0 auto 4rem auto
        @media only screen and (min-width: $m)
          margin: 0 auto 4.4rem auto
          width: 22.1875vw
        svg
          *
            fill: #000
      .preview-body
        text-align: center
        max-width: 800px
        margin: auto
      .watch-on
        text-align: center
        a
          display: inline-flex
          width: 15.2rem
          justify-content: space-between
          align-items: center
          margin-top: 2.4rem
          color: #000

          &:hover, &:active, &:focus
            border-bottom-color: red
          @media only screen and (min-width: $m)
            margin-top: 2rem
          figure
            width: 6rem
          h3
            font-size: 1.2rem
            line-height: 2
            letter-spacing: 2.6px
            color: #000
      .links
        //display: flex
        display: none
        flex-direction: row
        border-left: none
        border-top: 1px solid #000
        margin-top: 4rem
        width: 100%
        justify-content: center
        @media only screen and (min-width: $m)
          flex-direction: column
          border-left: 1px solid #000
          border-top: none
          margin: 0 0 0 3.5rem
        .link
          display: flex
          flex-direction: column
          width: 50%
          padding: 3.2rem 0 0 0
          @media only screen and (min-width: $m)
             padding: 0 0 0 3.2rem
          &:nth-of-type(2),
          &:nth-of-type(3)
            border-left: 1px solid #000
            @media only screen and (min-width: $m)
              border: none
        .download
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          color: #000
        figure
          margin: 0 auto 2rem
          &.script
            width: 7.35rem
          &.lookbook
            width: 8.6rem
          &.sizzle
            width: 8.6rem
        hr
          display: none
          @media only screen and (min-width: $m)
            display: block
            margin: 2.1rem 0 2.6rem 0
            width: 100%
            height: 1px
            background-color: #000
            border: none
    .stills
      padding-top: 12.4rem
    .preview-contact
      //height: 100vh;
      height: 33.6vh
      background-color: #000
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
      p
        width: 60vw
        text-align: center
        margin-bottom: 2rem
        @media only screen and (min-width: $m)
          width: auto
          margin-bottom: 0
</style>
