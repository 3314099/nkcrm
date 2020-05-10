import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

// Translation provided by Vuetify (typescript)
// import ru from 'vuetify/src/locale/ru'

export default new Vuetify({
  // lang: {
  //   locales: { ru },
  //   current: 'ru',
  // },
  // methods: {
  //   changeLocale () {
  //     this.$vuetify.lang.current = 'ru'
  //   },
  // },
});

// // Translation provided by Vuetify (javascript)
// import zhHans from 'vuetify/es5/locale/zh-Hans'

// // Your own translation file
// import sv from './i18n/vuetify/ru'

// Vue.component('my-component', {
//   methods: {
//     changeLocale () {
//       this.$vuetify.lang.current = 'ru'
//     },
//   },
// })

// export default new Vuetify({
//   lang: {
//     locales: { zhHans, pl, sv },
//     current: 'zhHans',
//   },
// })
