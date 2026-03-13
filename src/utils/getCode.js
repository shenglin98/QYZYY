
// 发布函数
function getCode() {
  return new Promise((resolve, reject) => {
    var appid = "wxdf37b33cfb977208"; //个人公众号appid(),在微信公众平台获取
    // 这里用的静默授权
    const code = handleGetUrlParam("code"); // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
    const local = window.location.href;
    if (!code) {
      //url中没有code,重定向到微信接口获取code，此时code在url中
      this.$dialog
        .confirm({
          title: "提醒",
          message: `"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          ${appid} +
          "&redirect_uri=" +
          ${encodeURIComponent(local)} +
          "&response_type=code&scope=snsapi_base&state=1#wechat_redirect`,
        })
        .then(() => {
        })

      window.location.href =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
        appid +
        "&redirect_uri=" +
        encodeURIComponent(local) +
        "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
      reject('');
    } else {
      this.$toast.fail(code);
      this.$dialog
        .confirm({
          title: "提醒",
          message: code,
        })
        .then(() => {
        })
      resolve(code);  //把code传给后台获取用户信息
    }
  });

}
function handleGetUrlParam(name) {
  // 获取url指定参数
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标的正则表达式对象
  var r = window.location.search.substr(1).match(reg) // 匹配目标参数
  if (r != null) return unescape(r[2])
  return null // 返回参数值

}


export default getCode
