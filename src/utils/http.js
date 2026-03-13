/**
 * 封装请求
 */
// import 'es6-promise/auto'

import axios from 'axios'
import diversion from './diversion'
import { getToken } from './auth'
import Vue from 'vue'
import _ from 'lodash'
import Cookies from 'js-cookie'

let baseURL = '';
if (process.env.NODE_ENV == 'production') {
    baseURL = process.env.API_ROOT
}

function defaults() {
    let token = '123456'
        // console.log(token);
    return {
        baseURL: ``,
        headers: {
            'X-Token': localStorage.getItem("X-Token") || "",
            'LICENSE-KEY': localStorage.getItem("LICENSE-KEY") || "",
            'SMS-Token': localStorage.getItem("smsToken") || "",
            'SMS-UniqueId': localStorage.getItem("uniqueid") || "",
            'Authorization': localStorage.getItem("BEARER-VALUE") ? `Bearer ${localStorage.getItem("BEARER-VALUE")}` : "12365465",
            // 'X-Token':token,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }
}

function fetch(...args) {
    const customOptions = args.pop()
    const defaultOptions = defaults()
    const method = args.shift()
    const options = _.merge(defaultOptions, customOptions)

    const res = diversion(() => axios[method](...args, options))
    return new Promise((resolve, reject) => {
        res.then((result) => {
            let newBearerValue = result.headers["new-access-token"];
            newBearerValue && localStorage.setItem("BEARER-VALUE", newBearerValue);
            resolve(result)
        }).catch((err) => {
            console.log(err.response.status);
            console.log(err.response);
            if (err.response.status == 700) {
                // Vue.prototype.$router.push('/login')
                Vue.prototype.$message.error('请先登陆')
            } else if (err.response.status == 500) {
                Vue.prototype.$message.error(`${err.response.data.message}`)
            } else if (err.response.status == 401) {
                Vue.prototype.$message.error(`${err.response.data.message}`)
                if (err.response.data.code == 405) {
                    localStorage.removeItem("smsToken")
                    localStorage.removeItem("uniqueid")
                    location.href = location.origin + location.pathname + '#/report';
                } else if (err.response.data.code == 402) {
                    console.log("111111")
                    localStorage.removeItem("X-Token")
                    localStorage.removeItem("LICENSE-KEY")
                    localStorage.removeItem("BEARER-VALUE")
                    localStorage.removeItem("operatorcode")
                    setTimeout(() => {
                        // location.href = location.origin + location.pathname + '#/login';
                        // location.href = location.origin + location.pathname + '#/index';
                        window.location.reload()
                    }, 500)
                }
            } else {
                Vue.prototype.$message.error(`${err.response.data.msg}`)
                reject(err)
            }
        })
    })
}

export const get = (url, options) => fetch('get', url, options)

export const post = (url, data, options) => fetch('post', url, data, options)

export const put = (url, data, options) => fetch('put', url, data, options)

export const del = (url, options) => fetch('delete', url, options)