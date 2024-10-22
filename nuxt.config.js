let config;
try {
  config = require("./.contentful.json");
} catch (e) {
  config = {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_ENVIRONMENT: process.env.CTF_ENVIRONMENT
  };
}

const contentful = require("contentful");
const client = contentful.createClient({
  space: config.CTF_SPACE_ID,
  accessToken: config.CTF_CDA_ACCESS_TOKEN,
  environment: config.CTF_ENVIRONMENT
});
const sitemapFilms = client.getEntries({ content_type: "film" });

module.exports = {
  env: {
    CTF_SPACE_ID: config.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
    CTF_ENVIRONMENT: config.CTF_ENVIRONMENT
  },

  modules: [
    // Simple usage
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-124738033-1"
      }
    ],
    "@nuxtjs/sitemap"
  ],

  /*
   ** Headers of the page
   */
  head: {
    title: "Bristol Pictures",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Founded in 2014 with the intention of channeling classic moviemaking techniques, particularly the styles of the Golden Age of Cinema, while respecting and utilizing new innovations that enhance the art of cinematic storytelling."
      },
      { hid: "og-title", property: "og:title", content: "Bristol Pictures" },
      {
        hid: "og-description",
        property: "og:description",
        content:
          "Founded in 2014 with the intention of channeling classic moviemaking techniques, particularly the styles of the Golden Age of Cinema, while respecting and utilizing new innovations that enhance the art of cinematic storytelling."
      },
      {
        hid: "og-image",
        property: "og:image",
        content: "https://bristolpics.netlify.com/bristol_share.jpg"
      },
      {
        hid: "og-url",
        property: "og:url",
        content: "https://www.bristolpictures.com"
      },
      {
        hid: "twitter-card",
        property: "twitter:card",
        content: "summary_large_image"
      },
      {
        hid: "twitter-description",
        property: "twitter:description",
        content:
          "Founded in 2014 with the intention of channeling classic moviemaking techniques, particularly the styles of the Golden Age of Cinema, while respecting and utilizing new innovations that enhance the art of cinematic storytelling."
      },
      {
        hid: "twitter-title",
        property: "twitter:title",
        content: "Bristol Pictures"
      },
      {
        hid: "twitter-image",
        property: "twitter:image",
        content: "https://bristolpics.netlify.com/bristol_share.jpg"
      }
    ],
    link: [{ rel: "icon", type: "image/png", href: "" }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#FFF" },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    },

    vendor: ["contentful"]
  },

  plugins: [
    { src: "~/plugins/swiper.js", ssr: false },
    { src: "~/plugins/plyr.js", ssr: false }
  ],

  /**
   * global CSS
   * */
  css: [{ src: "assets/styles/main.sass", lang: "sass" }],

  /**
   * Dynamic Sitemap Generation
   * */
  sitemap: {
    path: "/sitemap.xml",
    hostname: "https://www.bristolpictures.com",
    generate: true,
    routes() {
      return client.getEntries({ content_type: "film" }).then(res =>
        res.items.map(
          film =>
            "/" +
            film.fields.title
              .toLowerCase()
              .split(" ")
              .join("-")
        )
      );
    }
  },

  generate: {
    fallback: true,
    minify: {
      collapseWhitespace: false
    },
    routes: function() {
      let films = client.getEntries({ content_type: "film" }).then(res => {
        return res.items.map(films => {
          return (
            "/" +
            films.fields.title
              .toLowerCase()
              .split(" ")
              .join("-")
          );
        });
      });
      let previews = client
        .getEntries({ content_type: "preview" })
        .then(res => {
          return res.items.map(previews => {
            return (
              "/" +
              previews.fields.title
                .toLowerCase()
                .split(" ")
                .join("-")
            );
          });
        });
      return Promise.all([films, previews]).then(values => {
        return values.join().split(",");
      });
    }
  }
};
