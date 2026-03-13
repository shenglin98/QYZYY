import * as http from '@/utils/http'

function paramsObj(obj) {
    let result = '';
    let item;
    for (item in obj) {
        if (obj[item] && String(obj[item])) {
            result += `&${item}=${obj[item]}`;
        }
    }
    if (result) {
        result = '?' + result.slice(1);
    }
    return result;
}

export function getPublicConfig(params) {
    return http.get(`api/SysConfig/GetPublicConfig?cc=${params.cc}`, params)
}

export function getUnitInfo(data) {
    return http.post(`api/HealthCheckForH5/Post`, data)
}

export function getFiles(params) {
    return http.get(`api/Files/Get?ic=${params.ic}`, params)
}
export function lastRegister(params) {
    return http.get(`api/CompanyRegister/LastRegister${paramsObj(params)}`, params)
}

export function addOrUpdateMyFamily(data) {
    return http.post(`/api/HealthCheckForH5/AddOrUpdateMyFamily`, data)
}
export function checkH5Login(data) {
    return http.post(`api/Check/H5Login`, data)
}
export function H5SendSMS(data) {
    return http.post(`api/HealthCheckForH5/SendSMS`, data)
}
export function WxLogin(data) {
    return http.post(`/api-pay/Register/WxLogin`, data)
}