import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './plugins/element.js'
import './assets/globel.css'
import './assets/reset.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */)

axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config=>{
  config.headers.Authorization=sessionStorage.getItem('token')
  return config
})
window.msgTemplate={
  catchInfo:'网络请求失败,请检查网络'
}
Vue.prototype.$http=axios


Vue.config.productionTip = false

Vue.component('tree-table',TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
