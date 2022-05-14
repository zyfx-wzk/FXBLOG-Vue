//Markdown编辑预览组件
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';

Prism.highlightAll();

let MarkdownIt = require('markdown-it'), md = new MarkdownIt();

VueMarkdownEditor.use(vuepressTheme, {
    Prism, extend(md) {
    }
});

import "../src/assets/css/color.less"

import $ from 'jquery';

import {createApp} from 'vue';
import App from "@/App";

import router from "@/router/router";

import ElementPlus from 'element-plus';

const app = createApp(App)

app.use(ElementPlus)
app.use(VueMarkdownEditor)
app.use(router)
app.mount('#app')
