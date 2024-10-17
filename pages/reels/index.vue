<template lang="pug">
    main.contact
      .content
        p.contact-label
          | ADDRESS
        .street
          p.contact-body
            | {{ info.address }}
        p.contact-body
          | {{ info.street }}, {{ info.city }}
        p.contact-label.email
          | EMAIL
        a(href="contactEmail" target="_blank")
          p.contact-body
            | {{ info.email }}
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex'
  
  export default {
    computed: {
      ...mapGetters({
        getContactInfo: 'contact/getContactInfo'
      }),
  
      info () {
        return this.getContactInfo
      },
  
      contactEmail () {
        return `mailto:${this.getContactInfo.email}`
      }
    },
  
    methods: {
      ...mapActions({
        whiteNav: 'navigation/whiteNav'
      })
    },
  
    mounted() {
      this.whiteNav(false)
    },
  
    fetch({store, params}) {
      return Promise.all([
        store.dispatch("contact/fetchContactInfo"),
      ]);
    }
  }
  </script>
  
  <style lang="sass">
    @import '../../assets/styles/_variables.sass'
    .contact
      height: calc(100vh - 6.4rem)
      background-color: $leather
      display: flex
      justify-content: center
      align-items: center
      @media only screen and (min-width: $m)
        height: 100vh
      .content
        width: 35.4rem
        p
          text-align: center
          &.contact-label
            margin-bottom: 2rem
        .street
          width: 100%
          display: flex
          justify-content: center
          p
            &:first-of-type
              margin-right: .2rem
        .email
          margin-top: 8rem
  </style>
  