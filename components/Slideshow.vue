<template lang="pug">
  .slideshow(v-if="slides.length > 0")
    .swiper(v-swiper:stillsSwiper="swiperOptions" v-show="!mobile")
      .swiper-wrapper
        .swiper-slide(v-for="slide in slides")
          figure
            img(:src="slide")
    .swiper(v-swiper:stillsSwiperMobile="swiperOptionsMobile" v-show="mobile")
      .swiper-wrapper
        .swiper-slide(v-for="slide in slides")
          figure
            img(:src="slide")
    .navigation
      .nav-prev
        figure
          img(src="../assets/images/gallery_arrow_left.svg")
      .nav-next
        figure
          img(src="../assets/images/gallery_arrow_right.svg")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      swiperOptions: {
        slidesPerView: 1.28,
        spaceBetween: 39,
        centeredSlides: true,
        allowTouchMove: false,
        navigation: {
          nextEl: '.nav-next',
          prevEl: '.nav-prev'
        }
      },

      swiperOptionsMobile: {
        slidesPerView: 1,
        centeredSlides: true,
        allowTouchMove: true,
        navigation: {
          nextEl: '.nav-next',
          prevEl: '.nav-prev'
        }
      }
    }
  },

  props: ['slides'],

  computed: {
    ...mapGetters({
      mobile: 'navigation/getMobile'
    })
  }
}
</script>

<style lang="sass">
  .slideshow
    position: relative
    .navigation
      position: absolute
      bottom: -4.1rem
      right: 11.2vw
      width: 5.8rem
      display: flex
      justify-content: space-between
      .nav-prev, .nav-next
        opacity: 1
        transition: opacity .25s ease-in-out
      .swiper-button-disabled
        opacity: 0.3
        transition: opacity .25s ease-in-out
      figure
        width: 2.4rem
        margin: 0
      div
        background-image: none !important
        width: 2.4rem
        height: 2.4rem
        position: static
        cursor: pointer
        &:focus
          outline: none !important
</style>
