<template lang="pug">
  main.reels
    .content
      template(v-if="isLoaded")
        p.bio
          | {{ reels[0].bio }}
        .awards
          h1 AWARDS
          .row.no-margin
            .col-12
              .award-category(v-for="(awards, category) in awardsData" :key="category" :class="{ collapsed: collapsedCategories[category] }")
                .category-header
                  h3 {{ category }}
                  .toggle-awards(@click="toggleCategory(category)")
                    figure.arrow-icon
                      img(src="../../assets/images/arrow_right_geyser.svg")
                .entries(:style="getEntriesStyle(category)" ref="entries")
                  p(v-for="award in awards" :key="award") {{ award }}
      .loading(v-else)
        | Loading...
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex'
  import VueMarkdown from 'vue-markdown'
  
  export default {
    components: {
      VueMarkdown
    },
  
    data() {
      return {
        collapsedCategories: {},
        categoryHeights: {},
        entries: [],
        awardsHeight: 0,
        awardsData: {}
      }
    },
  
    computed: {
      ...mapGetters({
        reels: 'reels/getReels',
        isLoaded: 'reels/isLoaded',
        getScrollPos: 'navigation/getScrollPos',
        mobile: 'navigation/getMobile'
      })
    },
  
    methods: {
      ...mapActions({
        whiteNav: 'navigation/whiteNav'
      }),
  
      parseAwards() {
        if (this.reels[0].awards) {
          this.awardsData = {};
          Object.entries(this.reels[0].awards).forEach(([category, awards]) => {
            this.awardsData[category] = awards.map(award => 
              award.replace(/^(Title:|Award:)/, '').trim()
            );
            // Initialize collapse state for each category
            this.$set(this.collapsedCategories, category, false);
          });
          this.entries = Object.values(this.awardsData).flat();
          
          // Calculate initial heights after DOM update
          this.$nextTick(() => {
            this.calculateHeights();
          });
        }
      },
  
      calculateHeights() {
        if (!this.$refs.entries) return;
        
        // If entries is a single element, wrap it in an array
        const entriesElements = Array.isArray(this.$refs.entries) 
          ? this.$refs.entries 
          : [this.$refs.entries];
  
        entriesElements.forEach((el, index) => {
          const category = Object.keys(this.awardsData)[index];
          this.$set(this.categoryHeights, category, el.scrollHeight + 'px');
        });
      },
  
      getEntriesStyle(category) {
        return {
          height: this.collapsedCategories[category] ? '0px' : this.categoryHeights[category]
        };
      },
  
      toggleCategory(category) {
        // Ensure height is calculated before toggling
        this.calculateHeights();
        this.$set(this.collapsedCategories, category, !this.collapsedCategories[category]);
      },
  
      measureAwards() {
        const lineHeight = this.mobile ? 50 : 40;
        const categoryPadding = 30;
        let totalHeight = 0;
  
        Object.entries(this.awardsData).forEach(([category, awards]) => {
          totalHeight += categoryPadding;
          totalHeight += awards.length * lineHeight;
        });
  
        this.awardsHeight = `${totalHeight}px`;
      }
    },
  
    mounted() {
      this.whiteNav(false);
      this.parseAwards();
      this.measureAwards();
      window.addEventListener('resize', this.calculateHeights);
    },
  
    beforeDestroy() {
      window.removeEventListener('resize', this.calculateHeights);
    },
  
    watch: {
      reels: {
        handler() {
          this.parseAwards();
          this.measureAwards();
        },
        deep: true
      },
      mobile() {
        this.measureAwards();
        this.$nextTick(() => {
          this.calculateHeights();
        });
      }
    },
  
    fetch({ store }) {
      return Promise.all([
        store.dispatch('reels/fetchReels')
      ])
    }
  }
  </script>
  
  <style lang="sass">
  @import '../../assets/styles/_variables.sass'
  @import '../../assets/styles/_mixins.sass'
  
  .reels
    height: calc(100vh - 6.4rem)
    /* background-color: $leather */
    @media only screen and (min-width: $m)
      height: 100vh
  
  .content
    width: 98.8rem
    padding: 0 2rem
    margin-top: 20rem  // Increased from 10rem
    @media only screen and (min-width: $m)
      padding: 0
      margin: 24rem auto 0  // Increased from 12rem
  
    .bio
      margin: 0 auto 6rem
      
    .loading
      text-align: center
      padding: 4rem
      font-size: 1.8rem
      color: white
      
    .title
      font-size: 2.4rem
      margin-bottom: 2rem
      color: white
      
    .awards
      padding: 30px 30px 0
      margin: 30px auto
      border-top: $geyser solid 1px
      border-bottom: $geyser solid 1px
      position: relative
  
      h1
        color: $geyser
        padding-bottom: 4rem
  
      h2, h3
        color: $geyser
        
      h2
        letter-spacing: 0
        margin-bottom: 30px
        font-size: 1.6rem
  
      h3
        font-size: 1.4rem
        margin-bottom: 15px
        font-weight: bold
  
      .award-category
        margin-bottom: 30px
  
        .category-header
          display: flex
          justify-content: space-between
          align-items: center
          margin-bottom: 15px
  
        .toggle-awards
          cursor: pointer
          transform: rotate(-90deg)
          @include transition(transform, 0.3s, ease)
  
          img
            height: 20px
            @media only screen and (min-width: $m)
              height: 25px
  
        .entries
          transition: height 0.3s ease
          overflow: hidden
  
        &.collapsed
          .toggle-awards
            transform: rotate(90deg)
        
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