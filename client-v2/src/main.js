import Vue from 'vue'
import App from './App.vue'
import wysiwyg from 'vue-wysiwyg'
import ElementUI from 'element-ui'
import Loading from 'vue-loading-overlay'
import VueTagsInput from '@johmun/vue-tags-input'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'vue-wysiwyg/dist/vueWysiwyg.css'

Vue.use(ElementUI)
// Vue.use(VueTagsInput) // config is optional. more below
Vue.use(wysiwyg)
Vue.use(VueTagsInput)

Vue.component('Loading', Loading)
// Vue.use(wysiwyg, {
//     hideModules: { "table": true, "image": true },
//     maxHeight: "500px",
//     maxWidth : "600px",
//     forcePlainTextOnPaste: false
// });

new Vue(App).$mount('#app')
