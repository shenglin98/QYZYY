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

export function getSysConfigInfo(params) {
    return http.get(`api/SysConfig/GetSysConfigInfo?cc=${params.cc}`, params)
}

export function getPublicConfig(params) {
    return http.get(`api/SysConfig/GetPublicConfig?cc=${params.cc}`, params)
}
export function AlterAppoint(data) {
    return http.post(`api/HealthCheckForH5/AlterAppoint`, data)
}
export function getListData(data) {
    return http.post(`api/HealthCheckForH5/Post`, data)
}

export function timeStatic(params) {
    return http.get(`api/HealthCheckForH5/TimeStatic${paramsObj(params)}`, params)
}

export function TimeStaticForPerson(params) {
    return http.get(`api/HealthCheckForH5/TimeStaticForPerson${paramsObj(params)}`, params)
}

export function questionnaire(params) {
    return http.get(`api/CustomerRegister/Questionnaire${paramsObj(params)}`, params)
}

export function addCustomerOrder(data) {
    return http.post(`api/HealthCheckForH5/AddCustomerOrder`, data)
}

export function saveAppoint(data) {
    return http.post(`api/HealthCheckForH5/SaveAppoint`, data)
}

export function healthCheckForH5Post(data) {
    return http.post(`api/HealthCheckForH5/Post`, data)
}


export function HealthCheckForH5(data) {
    return http.post(`api/HealthCheckForH5/Post`, data)
}

export function CheckChooseRule(data) {
    return http.post(`api/HealthCheckForH5/CheckChooseRule`, data)
}


export function cancelAppoint(data) {
    return http.post(`api/HealthCheckForH5/CancelAppoint`, data)
}

export function GetQuestionnaireCombine(data) {
    return http.post(`/api/DicQuestionnaireCombine/GetQuestionnaireCombine`, data)
}

export function Save(data) {
    return http.post(`/api/CustomerQuestionRecord/Save`, data)
}
export function Detail(data) {
    return http.get(`api/CustomerQuestionRecord/Detail?recordid=` + data.recordid, data)
}

// 文件导出
export function getFiles(params) {
    return http.get(`/api/Files/GetFile?id=${params.id}&ct=1`, params)
}

export function Sys_QuestionnaireForH5_ShowCode(data) {
    return http.get(`api/SysConfig/GetSysConfigInfo?cc=Sys_QuestionnaireForH5_ShowCode`, data)
}
export function CheckQuestionMustInput(params) {
    return http.get(`api/HealthCheckForH5/CheckQuestionMustInput?sex=${params.sex}&companycode=${params.companycode}&batch=${params.batch}&groupcode=${params.groupcode}`, params)
}
export function HealthCheckForH5Post(data) {
    return http.post(`api/HealthCheckForH5/Post`, data)
}
export function FirstPageFunc(data) {
    return http.post(`api/HealthCheckForH5/FirstPageFunc`, data)
}

export function GetMedicalCenterList(params) {
    return http.get(`/api/HealthCheckForH5/GetMedicalCenterList${paramsObj(params)}`, params)
}

export function GetPublicConfig(params) {
    return http.get(`/api/SysConfig/GetPublicConfig${paramsObj(params)}`, params)
}

export function TriagShowInfo(params) {
    return http.get(`/api/HealthCheckForH5/TriagShowInfo${paramsObj(params)}`, params)
}

export function DiloagDetail(params) {
    return http.get(`/api/DicPublicIntroduce/Detail?code=${params.code}`, params)
}

export function GetIdCardInfo(params) {
    return http.get(`/api/SysConfig/GetIdCardInfo?cc=${params.cc}&ct=03`, params)
}

export function UpdateOutUser(data) {
    return http.post(`/api/HealthCheckForH5/UpdateOutUser`, data)
}

export function GetSysAppKey(data) {
    return http.post(`api/SysConfig/GetSysAppKey`, data)
}

export function GenSelectCombineForChooseRule(data) {
    return http.post(`api/HealthCheckForH5/GenSelectCombineForChooseRule`, data)
}

export function SaveQuestionnaire(data) {
    return http.post(`api/CustomerRegister/SaveQuestionnaire`, data)
}