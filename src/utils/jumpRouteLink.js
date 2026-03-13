/**
 * 用于路由跳转。比如页面之间跳转 第一次进入缓存
 * @param {当前vue的this} _this 
 * @param {返回的路由对象} targetUrl
 */
import JSEncrypt from "jsencrypt";
export function jumpRouteLink(_this, targetUrl) {
    // 设置vuex中tabs值
    _this.$store.commit("handlerSetTabsArr", targetUrl);
}




export function encryptedData(data) {
    let encryptor = new Encrypt()
    encryptor.setPublicKey(window.pubKey)
    return encryptor.encryptLong(data)
}

export function decryptData(data) {
    let decrypt = new Encrypt()
    decrypt.setPrivateKey(window.priKey)
    return decrypt.decryptLong(data)
}

export function encryptDataReturn(data) {
    var encryptor = new JSEncrypt(); // 创建加密对象实例
    //之前ssl生成的公钥，复制的时候要小心不要有空格
    encryptor.setPublicKey(`MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApMs/AHYOSGcN/FyxON6q
    Ev5Fwc8ZPOTfkd28NLg9CV+WrXsy02GpNgeM56i7DGYNEvJAxBeHv1PItG3o5Kvq
    OrJXrK/m+qJVhUlCOGkQkH+n2+sO3MfV0jsm/EY11/e5vN/3CGedFjbFZW0mJD10
    pU+TBCL2ZMldxHdxeSouucO1+4SIETYFyld7NE+3LJmh419zjJHXXFV2gquwp9LD
    9kfwnP9lvxJ1CjFWPokkUvQB8FVZZQOFOICm0xaOrgjK+JyrJI9MSEjALA35KwBQ
    eSOKJ/IvOLQyG2yjqk8qZwxJN1dVQwJKr9yqX7chqX66fAQLnlFzW6Poe0E7h8Nc
    7QIDAQAB`); //设置公钥
    // encryptor.setPublicKey(window.pubKey); //设置公钥
    return encryptor.encrypt(data); // 对内容进行加密
}