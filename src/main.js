import 'core-js/stable'
import Vue from 'vue'
import babelPolyfill from 'babel-polyfill'
import CoreuiVue from '@coreui/vue/src'
import App from './App'
import router from './router/index'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import "vue-loading-overlay/dist/vue-loading.css";
import Vuelidate from 'vuelidate';
import VueJwtDecode from 'vue-jwt-decode'
import UUID from 'vue-uuid'
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';

Sentry.init({
  dsn: 'https://305562c5b14546aca7d093a7b68f46ba@o405409.ingest.sentry.io/5270969',
  integrations: [new VueIntegration({Vue, attachProps: true})],
});
Vue.use(babelPolyfill);
Vue.use(Vuelidate);
Vue.use(CoreuiVue);
Vue.use(VueJwtDecode);
Vue.use(UUID);
miniToastr.init()

function toast ({title, message, type, timeout, cb}) {
  return miniToastr[type](message, title, timeout, cb)
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(VueNotifications, options)

new Vue({
  el: '#app',
  router,
  store,
  //CIcon component documentation: https://coreui.io/vue/docs/components/icon
  icons,
  template: '<App/>',
  components: {
    App
  }
})
