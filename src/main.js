import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

//Markdown编辑预览组件
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});

import "../src/assets/css/color.less"

//引入jquary
const $ = require('jquery');
window.$ = $;

import {createApp} from 'vue';
import App from "@/App";

import router from "@/router/router";
import store from "@/store/store";

const app = createApp(App)


app.use(ElementPlus)
app.use(VueMarkdownEditor)
app.use(router)
app.use(store)
app.mount('#app')
