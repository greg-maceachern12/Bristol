<template lang="pug">
    .awards(:class="{ noawards: entries.length === 0, collapsed: collapsed, preview: this.preview }")
      h2 AWARDS
      .toggle-awards(@click="toggleAwards")
        figure.arrow-icon
          img(src="../assets/images/arrow_right_geyser.svg")
      .row.no-margin.flex(:style="{ height: awardsHeight }")
        .col.col-lg-12
          .award
            .entries
              p(v-for="entry in entries") {{ entry }}
    </template>
    
    <script>
    import { mapGetters } from 'vuex'
    
    export default {
      props: ['fields', 'preview'],
    
      data() {
        return {
          collapsed: false,
          entries: [],
          awardsHeight: 0
        };
      },
    
      mounted() {
        this.parseAwards();
        this.measureAwards();
      },
    
      computed: {
        ...mapGetters({
          getScrollPos: 'navigation/getScrollPos',
          mobile: 'navigation/getMobile'
        })
      },
    
      methods: {
        parseAwards() {
          if (this.fields.awards && this.fields.awards.column1) {
            this.entries = this.fields.awards.column1.map(item => 
              item.replace(/^(Title:|Award:)/, '').trim()
            );
          }
        },
    
        toggleAwards() {
          this.collapsed = !this.collapsed;
          this.measureAwards();
        },
    
        measureAwards() {
          const lineHeight = this.mobile ? 50 : 40;
          let height = this.entries.length * lineHeight;
          this.awardsHeight = `${height}px`;
        }
      },
    }
    </script>
    
    <style lang="sass">
    @import '../assets/styles/_variables.sass'
    @import '../assets/styles/_mixins.sass'
    
    .awards
      padding: 30px 30px 0
      margin: 30px auto
      border-top: $geyser solid 1px
      border-bottom: $geyser solid 1px
      position: relative
    
      -ms-overflow-style: none
      scrollbar-width: none
      &::-webkit-scrollbar
        display: none
    
      .toggle-awards
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
    
      &.noawards
        display: none
    
      &.collapsed
        .toggle-awards
          transform: rotate(90deg)
        .row
          height: 0 !important
          overflow: hidden
    
      .row
        @include transition(height, 0.3s, ease)
        
        .award
          .entries
            p
              margin: 10px auto
              font-family: $sb
              font-size: 1.6rem
              line-height: 1.38
              letter-spacing: normal
              color: $geyser
              text-transform: uppercase
    </style>