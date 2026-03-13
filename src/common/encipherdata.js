import Base64 from '@/utils/base64.js'
import { GetSysAppKey } from '@/api/reservation.js'


export function encryptedParams(enterdata) {
    return new Promise(async(resolve) => {
        let res = await GetSysAppKey({ conid: "HCJKTJ2025!@#" })
        let appid = "HCJKTJ2025!@#";
        let noise = generateUniqueId();
        let data = Base64.encode(JSON.stringify(enterdata));
        let key = res.data.result || "";
        let version = "V1.0.1";
        let sign = window.md5(`appid=${appid}&data=${data}&noise=${noise}&key=${key}&version=${version}`);
        resolve({
            appid,
            noise,
            version,
            data,
            sign,
        });
    }, 1000);
}

function generateUniqueId() {
    const timestamp = Date.now().toString(36); // 转换为36进制缩短长度
    const random = Math.random().toString(36).substr(2, 9); // 随机部分
    return `${timestamp}-${random}`;
}