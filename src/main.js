// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import i18n from '@/lang'
import headline from './views/headline/headline'
Vue.prototype.GLOBAL = headline;

import Base64 from './utils/base64.js'

Vue.prototype.$Base64 = Base64;

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
window.md5 = md5;



import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';

NutUI.install(Vue);

Vue.prototype.API_ROOT = process.env.API_ROOT;
// 引入轮播库
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)
    // 配置elementUI 语言转换关系
Vue.use(ElementUI, {
        i18n: (key, value) => i18n.t(key, value)
    })
    // 富文本
import QuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
Vue.use(QuillEditor)
    // 富文本编辑器
import tinymce from 'tinymce'
import VueTinymce from '@packy-tang/vue-tinymce'
import './utils/zh_CN' // 汉化包
Vue.prototype.$tinymce = tinymce // 将全局tinymce对象指向给Vue作用域下
Vue.use(VueTinymce) // 安装vue的tinymce组件

// 引入vant
import { NavBar, Tabbar, TabbarItem, DropdownMenu, DropdownItem, Icon, Step, Steps, Popover, ActionSheet, Button, PullRefresh, List, Image as VanImage, Collapse, CollapseItem, NoticeBar, Tab, Tabs, Toast, Search, TreeSelect, Sidebar, SidebarItem, Checkbox, CheckboxGroup, Cell, CellGroup, Form, Field, RadioGroup, Radio, DatetimePicker, Popup, Dialog, Picker, AddressList, Col, Row, Notify } from 'vant';

Vue.use(Tabbar).use(TabbarItem).use(DropdownMenu).use(DropdownItem).use(Step).use(Steps).use(NavBar).use(Icon).use(Popover).use(ActionSheet).use(Button).use(PullRefresh).use(List).use(VanImage).use(Collapse).use(CollapseItem).use(NoticeBar).use(Tab).use(Tabs).use(Toast).use(Search).use(TreeSelect).use(Sidebar).use(SidebarItem).use(Checkbox).use(CheckboxGroup).use(Cell).use(CellGroup).use(Form).use(Field).use(RadioGroup).use(Radio).use(DatetimePicker).use(Popup).use(Dialog).use(Picker).use(AddressList).use(Col).use(Row).use(Notify);

Vue.prototype.$dialog = Dialog;
// 挂载axios到原型
import Axios from "axios";
Vue.prototype.$axios = Axios


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    i18n,
    template: '<App/>'
})