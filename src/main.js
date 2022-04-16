import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import VMdEditor from '@kangc/v-md-editor';
import githubTheme from '@kangc/v-md-editor/lib/theme/github'
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js'
import java from 'highlight.js/lib/languages/java'
import json from 'highlight.js/lib/languages/json'

import "../src/assets/css/color.less"

import {createApp} from 'vue';
import App from "@/App";

import router from "@/router/router";
import store from "@/store/store";

hljs.registerLanguage('json', json);
hljs.registerLanguage('java', java);
VMdEditor.use(githubTheme, {Hljs: hljs})

const app = createApp(App)


app.use(ElementPlus)
app.use(VMdEditor)
app.use(router)
app.use(store)
app.mount('#app')
