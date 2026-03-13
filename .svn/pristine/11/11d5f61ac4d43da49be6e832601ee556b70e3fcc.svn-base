// 进行多语言支持配置
import Vue from 'vue' // 引入Vue
import VueI18n from 'vue-i18n' // 引入国际化的插件包
import enLocale from 'element-ui/lib/locale/lang/en' // 引入饿了么的英文包
import zhLocale from 'element-ui/lib/locale/lang/zh-CN' // 引入饿了么的中文包

// 引入自定义中文包
import customZh from './zh' 
// 引入自定义英文包
import customEn from './en' 

Vue.use(VueI18n) // 全局注册国际化包

// console.log(customZh)

// 创建国际化插件的实例
const i18n = new VueI18n({
  // 指定语言类型 zh表示中文  en表示英文
  locale: 'zh',
  // 将elementUI语言包加入到插件语言数据里
  messages: {
    // 英文环境下的语言数据
    en:  Object.assign(customEn.default, enLocale),
    // 中文环境下的语言数据
    zh: Object.assign(customZh.default, zhLocale)
  },
  silentTranslationWarn: true
})

export default i18n;