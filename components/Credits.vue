<template lang="pug">
  .credits(:class="{ nocredits: credits.length === 0, collapsed: collapsed, preview: this.preview }")
    h2
      | CREDITS
    .toggle-credits(@click="toggleCredits")
      figure.arrow-icon
        img(src="../assets/images/arrow_right_geyser.svg")
    .row.no-margin.flex(:style="{ height: creditsHeight }")
      .col.col-lg-3.col-sm-6(v-for="credit in credits")
        .role(v-for="role in credit")
          h3
            | {{ role.role }}
          .names
            p(v-for="name in role.names")
              | {{ name }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['fields', 'preview'],

  data() {
    return {
      collapsed: false,
      credits: [],
      creditsHeight: 0
    };
  },

  mounted() {
    this.credits = [];
    if (this.fields.credits) {
      console.log(this.fields.credits)
      Object.keys(this.fields.credits).map(col => {
        let column = [];
        Object.keys(this.fields.credits[col]).map(role => {
          if(!isNaN(parseInt(role))) {
            let value = this.fields.credits[col][role].split(',');
            value = value.join(',').split(':');
            if(value.length === 2) {
              column.push({
                "role": value[0],
                "names": value[1].split(',')
              })
            }
          } else {
            column.push({
              "role": role.replace(/_/g, ' '),
              "names": this.fields.credits[col][role].split(',')
            })
          }
        });
        this.credits.push(column);
      })
    }
    // console.log(this.credits)
    this.measureCredits();
    return this.credits
  },

  computed: {
    ...mapGetters({
      getScrollPos: 'navigation/getScrollPos',
      mobile: 'navigation/getMobile'
    })
  },

  methods: {
    toggleCredits() {
      this.collapsed = !this.collapsed;
      this.measureCredits();
    },

    measureCredits() {
      let height = 0,
        lineH = 40;
      if(this.mobile) {
        lineH = 50;
      }
      this.credits.map(col => {
        let h = 0;
        col.map(role => {
          h += 46
          role.names.map(n => { h += lineH })
        });
        if(this.mobile) {
          height += h;
        } else {
          if(h > height) {
            height = h;
          }
        }
      })
      this.creditsHeight = `${height}px`;
    }
  },
}
</script>

<style lang="sass">
@import '../assets/styles/_variables.sass'
@import '../assets/styles/_mixins.sass'

.credits
  padding: 30px 30px 0
  margin: 30px auto
  border-top: $geyser solid 1px
  border-bottom: $geyser solid 1px
  position: relative

  -ms-overflow-style: none /* for Internet Explorer, Edge */
  scrollbar-width: none /* for Firefox */
  &::-webkit-scrollbar
    display: none /* for Chrome, Safari, and Opera */
  > .row
    -ms-overflow-style: none /* for Internet Explorer, Edge */
    scrollbar-width: none /* for Firefox */
    &::-webkit-scrollbar
      display: none /* for Chrome, Safari, and Opera */

  .toggle-credits
    cursor: pointer
    right: 30px
    top: 25px
    position: absolute
    transform: rotate(-90deg)
    @include transition(transform, 0.3s, ease)

    img
      height: 20px
      @media only screen and (min-width: $m)
        height: 25px
  h2
    letter-spacing: 0
    margin-bottom: 30px
    font-size: 1.6rem

  &.preview
    margin: auto

  &.nocredits
    display: none

  &.collapsed
    .toggle-credits
      transform: rotate(90deg)
    .row
      height: 0 !important
      overflow: hidden

  .row
    overflow: scroll
    @include transition(height, 0.3s, ease)
    .col
      .role
        text-transform: uppercase
        margin-bottom: 30px

        h3
          font-size: 1.6rem

        div > p
          margin: 10px auto
          font-family: $sb
          font-size: 1.6rem
          line-height: 1.38
          letter-spacing: normal
          color: $geyser
</style>
