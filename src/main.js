import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'
import { Integrations } from '@sentry/tracing'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

import VueCompositionApi from '@vue/composition-api'
import ImageUploader from './components/ImgUploader.vue'
import RouteWrapper from './components/RouteWrapper'
import VueEditor from './components/VueEditor.vue'
import DetailItem from './components/DetailItem'
import LoadSelect from './components/LoadSelect'
import Pagination from './components/Pagination'
import BreadCrumb from './components/BreadCrumb'
import Avatar from './components/Avatar'
import router from './router'
import directive from './utils/directive'
import './styles/index.scss'
import * as consts from './consts'
import * as api from './api'
import { store } from './store'
import ElementUI, { Message, MessageBox } from 'element-ui'

Vue.use(VueCompositionApi)
Vue.use(ElementUI)
Vue.use(directive)

Vue.prototype.$confirm = (...args) => {
  return new Promise(function (resolve) {
    MessageBox.confirm(...args)
      .then(resolve)
      .catch(console.log)
  })
}
Vue.config.productionTip = false
Vue.mixin({
  data: function () {
    return {
      consts,
      api,
    }
  },
  methods: {
    $error: error => {
      console.table(error)
      let message = error.response
        ? error.response.errors[0].message
        : error.message
      Message.error(message)
    },
  },
})

Vue.component('DetailItem', DetailItem)
Vue.component('ImageUploader', ImageUploader)
Vue.component('Route', RouteWrapper)
Vue.component('Editor', VueEditor)
Vue.component('Pagination', Pagination)
Vue.component('LoadSelect', LoadSelect)
Vue.component('BreadCrumb', BreadCrumb)
Vue.component('Avatar', Avatar)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn:
      'https://9add3161eaf64557818aef3ac6917b75@o149426.ingest.sentry.io/5419579',
    ignoreErrors: [
      /4\d{2}$/,
      'Network Error',
      '5000',
      /5\d{2}$/,
      'NavigationDuplicated',
      'ResizeObserver',
    ],

    release:
      (process.env.API_ENV === 'https://api.vipkit.net'
        ? 'staging@'
        : 'production@') + require('@/../package.json')['version'],

    integrations: [
      new VueIntegration({
        Vue,
        attachProps: false,
        tracing: true,
      }),
      new Integrations.BrowserTracing(),
    ],
    tracesSampleRate: 1,
    environment: process.env.VUE_APP_ENV,
  })
}
