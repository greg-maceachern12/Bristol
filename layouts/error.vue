<template lang="pug">
  main.four-o-four
    .content
      h1
        | 404
      h2
        | PAGE NOT FOUND
      p.body-four-o-four
        | Sorry, we can’t find the page you’re looking for.
</template>

<script>
export default {
  props: ['error'],
  layout: 'nofooter'
}
</script>

<style lang="sass">
  @import '../assets/styles/_variables.sass'
  .four-o-four
    height: 100vH
    width: 100vw
    display: flex
    justify-content: center
    align-items: center
    background-color: #000
    .content
      width: 50rem
      h1, h2, p
        text-align: center
        color: #FFF
        font-style: normal
        font-stretch: normal
        line-height: normal
         font-weight: normal
      h1
        font-family: $pn_bold
        font-size: 7.2rem
        line-height: 9.6rem
        letter-spacing: 12px
        text-align: center
        color: $geyser
      h2
        font-family: $pn_bold
        font-size: 2.2rem
        font-weight: bold
        letter-spacing: 5px
        color: $full_cream
        margin-bottom: 6rem
      .body-four-o-four
        font-family: $sb
        font-size: 1.6rem
        line-height: 1.38
        letter-spacing: normal
        color: $geyser
</style>

