import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'
import { Integrations } from '@sentry/tracing'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import './main.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
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
    ],

    release:
      (process.env.API_ENV === 'https://api.zanquan.xyz'
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
  })
}
