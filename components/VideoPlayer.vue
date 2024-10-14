<template lang="pug">
  .video-player
    .wordmark(:class="{ hide: playing}" @click="togglePlay")
      figure.wm-icon
        img(:src="wordmark")
      figure.play-icon
        img(src="../assets/images/video_play_large.svg")
    no-ssr
      vue-plyr(
        :options="playerOptions"
        :emit="['play', 'pause', 'timeupdate', 'ready', 'player', 'ended', 'enterfullscreen', 'exitfullscreen']"
        @play="onStatusChange"
        @ended="onStatusChange"
        @timeupdate="onProgress"
        @player="onMount"
        @ready="onReady"
        @pause="onStatusChange"
        @enterfullscreen="enterFullScreen"
        @exitfullscreen="exitFullScreen"
      )
        div(data-plyr-provider="vimeo" :data-plyr-embed-id="vid")
    figure.scroll-icon(:style="fadeStyle")
      img(src="../assets/images/scroll_triangle.svg")
    .controls-container(:class="{ fullscreen: fullscreen }")
      .progress-container( @click="scrub")
        .progress(:style="'width: ' + progress + '%'")
      .controls
        .sub-controls
          .play(@click="togglePlay")
            figure.play-icon(v-if="!playing")
              img(src="../assets/images/video_play.svg")
            figure.pause-icon(v-else)
              img(src="../assets/images/video_pause.svg")
          .mute(@click="toggleMute")
            figure(v-show="!muted")
              img(src="../assets/images/video_mute_off.svg")
            figure(v-show="muted")
              img(src="../assets/images/video_mute_on.svg")
          .volume
            .tip
              no-ssr
                vue-slider(
                  ref="slider"
                  v-model="volumeSlider"
                  tooltip="false"
                  :bg-style="{ backgroundColor: '#fbf8ec', height: '2px', borderRadius: '0'}"
                  :process-style="{ backgroundColor: 'rgba(0, 0, 0, 0)'}"
                  :slider-style="{ width: '10px', height: '10px', backgroundColor: '#000', border: '2px solid #fbf8ec', marginTop: '1px'}"
                )
        .sub-controls
          .time
            | {{ currentTimeFormatted }} / {{ durationFormatted }}
          .fullscreen
            figure(@click="toggleFullscreen")
              img(src="../assets/images/video_fullscreen.svg")
</template>

<script>
import NoSSR from 'vue-no-ssr'
import { mapGetters } from 'vuex'

let components = {
  'no-ssr': NoSSR
}

if (process.browser) {
  let VueSlider = require("vue-slider-component")
  components['vue-slider'] = VueSlider
}

export default {
  props: ['vid', 'wordmark'],

  data () {
    return {
      currentTime: 0,
      duration: 0,
      progress: 0,
      playing: false,
      muted: false,
      player: null,
      playerOptions: {
        clickToPlay: false,
        fullscreen: {
          enabled: true,
          fallback: true,
          iosNative: true
        }
      },
      fullscreen: false,
      volume: 1,
      volumeSlider: 100
    }
  },

  components,

  computed: {
    ...mapGetters({
      getScrollPos: 'navigation/getScrollPos',
      mobile: 'navigation/getMobile'
    }),

    currentTimeFormatted () {
      return this.formatTime(this.currentTime)
    },

    durationFormatted () {
      return this.formatTime(this.duration)
    },

    fadeStyle () {
      return { opacity: 1 - this.getScrollPos}
    }
  },

  methods: {
    formatTime (s) {
      let date = new Date(Math.floor(s)*1000)
      const secs = date.getSeconds()
      const secsF = secs < 10 ? '0' + secs : secs
      return date.getMinutes() + ':' + secsF
    },

    onStatusChange (e) {
      this.playing = !this.playing
      if (this.playing) {
        e.detail.plyr.fullscreen.enter()
      }
    },

    onMount (p) {
      this.player = p
    },

    onReady (e) {
      this.$emit('ready')
      this.duration = e.duration
      this.initControls()
    },

    onProgress (e) {
      const p = e.detail.plyr
      this.currentTime = p.currentTime
      this.duration = p.duration
      this.progress = (this.currentTime / this.duration) * 100
    },

    exitFullScreen () {
      this.togglePlay()
      this.player.pause()
      this.fullscreen = false
    },

    enterFullScreen () {
      this.fullscreen = true
    },

    initControls () {
      const newControls = document.querySelector('.controls-container')
      const newParent = document.querySelector('.plyr')
      newParent.appendChild(newControls)
    },

    scrub (e) {
      if (process.browser) {
        const absSeekTime = (e.clientX / window.innerWidth) * this.duration
        const relSeekTime = absSeekTime - this.currentTime
        if (relSeekTime > 0) {
          this.player.forward(relSeekTime)
        } else {
          this.player.rewind(Math.abs(relSeekTime))
        }
      }
    },

    togglePlay () {
      if (!this.playing) {
        this.player.play()
      } else {
        this.player.pause()
      }
    },

    toggleMute () {
      if (!this.muted) {
        this.player.volume = 0
      } else {
        this.player.volume = this.volume
      }
      this.muted = !this.muted
    },

    toggleFullscreen () {
      if (!this.fullscreen) {
        this.player.fullscreen.enter()
      } else {
        this.player.fullscreen.exit()
      }
      this.fullscreen = !this.fullscreen
    }
  },

  watch: {
    volumeSlider () {
      this.player.volume = this.volumeSlider / 100
    }
  }
}
</script>

<style lang="sass">
  @import '../assets/styles/_variables.sass'
  .video-player
    position: relative
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
      &.hide
        opacity: 0
        transition: opacity .5s ease-in-out
      .wm-icon
        width: 100%
      .play-icon
        width: 2.4rem
        margin: 1.5rem auto 0 auto
        @media only screen and (min-width: $m)
          width: 5.4rem
          margin: 3.8rem auto 0 auto
    .scroll-icon
      width: 2rem
      position: absolute
      display: none
      bottom: 5rem
      left: calc(50% - 1rem)
      animation: 1s ease-in-out 3 bounce
      @media only screen and (min-width: $m)
        display: block
    .plyr__controls, .plyr__control
      display: none !important
    .plyr
      &:not(.plyr--playing)
        max-height: 100vh
      button
        &.plyr__control
          display: none !important
    .controls-container
      width: 100vw
      height: 5.1rem
      display: none
      z-index: 99999999999999
      position: absolute
      bottom: 0
      left: 0
      background-color: #000
      &.fullscreen
        display: block
        @media only screen and (min-width: $m)
          display: block
      .progress-container
        height: 1.6rem
        display: flex
        align-items: center
        width: 100vw
        cursor: pointer
        .progress
          height: .2rem
          width: 0
          transition: width .1s ease-in-out
          background-color: $cream
      .controls
        height: 100%
      .controls, .sub-controls
        display: flex
        justify-content: space-between
        align-items: center
        .sub-controls
          &:first-of-type
            margin-left: 2rem
          &:last-of-type
            margin-right: 2rem
          *
            cursor: pointer
          .mute
            width: 2.9rem
            margin: 0 .7rem 0 3.7rem
            figure
              &:first-of-type
                width: 100%
              &:last-of-type
                width: 1.2rem
          .volume
            width: 6rem
            margin-left: .7rem
          .fullscreen
            width: 2.8rem
            margin-left: 1.6rem
          .play
            width: 1.4rem
            .play-icon
              width: 1.4rem
            .pause-icon
              width: 1.2rem
          .time
            font-family: $pn_bold
            font-size: 1.2rem
            font-weight: bold
            font-style: normal
            font-stretch: normal
            line-height: normal
            letter-spacing: 1.5px
            color: $geyser
</style>
