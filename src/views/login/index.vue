<template>
  <div class="login">
    <!-- 头部 -->
    <div class="top">
      <div class="left" @click="handleJumpIndex">
        <van-icon name="arrow-left" /> 返回
      </div>
      <div class="title">登录/注册</div>
      <div class="mark"></div>
    </div>
    <!-- 主体内容 -->
    <div class="mainbody">
      <van-image class="body_bg" :src="bgImg" />
      <div class="info_box">
        <div class="title">登录 / 注册</div>
        <div class="title_ss">请先登录或注册</div>
        <el-input
          class="employ_input"
          placeholder="请输入姓名"
          v-model="searchName"
          clearable
        >
        </el-input>
        <el-input
          class="employ_input"
          placeholder="请输入电话号码"
          v-model="searchPhone"
          clearable
          @keyup.enter.native="handleSaveLogin"
        >
        </el-input>
        <van-field
          v-model="smscode"
          center
          clearable
          label=""
          class="smscode"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <!-- <van-button size="small" type="primary">发送验证码</van-button> -->
            <el-button
              @click="sendSms"
              :disabled="countdown > 0"
              size="small"
              type="success"
            >
              {{
                countdown > 0 ? `${countdown}秒后重新获取` : "获取验证码"
              }}</el-button
            >
          </template>
        </van-field>
        <van-button
          round
          color="#27a7e0"
          type="primary"
          size="large"
          @click="handleSaveLogin"
          >登录/注册</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { checkH5Login, getUnitInfo, H5SendSMS } from "@/api/unit.js";
import { encryptDataReturn } from "@/utils/jumpRouteLink.js";
import getCode from "@/utils/getCode.js";
import * as http from "@/utils/http";

export default {
  name: "",

  components: {},

  data() {
    return {
      bgImg: require("@/assets/images/unitregister.png"),
      searchName: "",
      searchPhone: "",
      smscode: "",
      countdown: 0, // 计时
      fromUrl: "",
      code: "",
    };
  },

  mounted() {
    this.fromUrl = this.$route.query && this.$route.query.fromUrl;
    this.code = this.handleGetUrlParam("code");
    // this.code = (this.$route.query && this.$route.query.code) || "";
    if (!this.code) {
      //没有code，则跳转首页
      this.handleGetCodeToLogin();
      // this.$router.push({ path: "/" });
    }
  },

  methods: {
    handleGetCodeToLogin() {
      var appid = "wx5493bcb7ba937b9d"; //个人公众号appid(),在微信公众平台获取
      // 这里用的静默授权
      // const code = this.$route.query && this.$route.query.code; // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
      const code = this.handleGetUrlParam("code"); // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
      const local = window.location.href;
      if (!code) {
        //url中没有code,重定向到微信接口获取code，此时code在url中
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          appid +
          "&redirect_uri=" +
          encodeURIComponent(local) +
          "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
      }
    },
    // 点击返回主页
    handleJumpIndex() {
      this.$router.push("/");
    },
    sendSms() {
      if (!this.searchName || !this.searchPhone) {
        this.$toast.fail("请填写完整人员信息!");
        return;
      }
      // 模拟发送短信验证码的操作
      // 设置倒计时的秒数，这里设置为60秒
      this.countdown = 60;
      // 创建倒计时定时器
      const intervalId = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown -= 1;
        } else {
          clearInterval(intervalId); // 倒计时结束，清除定时器
        }
      }, 1000);
      let customercode = `telephone${
        this.searchPhone
      }categoryMobileLogintime${new Date(+new Date() + 8 * 3600 * 1000)
        .toJSON()
        .substr(0, 13)
        .replace("T", "")
        .replaceAll("-", "")}`;
      H5SendSMS({
        telephone: this.searchPhone,
        category: "MobileLogin",
        customercode: this.$md5(customercode),
      })
        .then((res) => {
          this.$toast.success(
            `${res.data.message},今天获取验证码剩余次数：${res.data.result.leftCount}`
          );
        })
        .catch((err) => {
          console.log(err);
          this.$toast.fail(err.data.message);
        });
    },
    handleGetUrlParam(name) {
      // 获取url指定参数
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标的正则表达式对象
      var r = window.location.search.substr(1).match(reg); // 匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; // 返回参数值
    },
    handleGetCode() {
      // var appid = "wxdf37b33cfb977208"; //个人公众号appid(),在微信公众平台获取
      // // 这里用的静默授权
      // const code = this.handleGetUrlParam("code"); // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
      // const local = window.location.href;
      // if (!code) {
      //   //url中没有code,重定向到微信接口获取code，此时code在url中
      //   window.location.href =
      //     "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
      //     appid +
      //     "&redirect_uri=" +
      //     encodeURIComponent(local) +
      //     "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
      // } else {
      //   this.handleGetOpenId(code); //把code传给后台获取用户信息
      // }
    },

    // 点击登录注册
    async handleSaveLogin() {
      if (!this.searchName) {
        this.$toast.fail("姓名不能为空!");
        return;
      }
      if (!this.searchPhone) {
        this.$toast.fail("手机号不能为空!");
        return;
      }
      // let regExp = new RegExp("^1[3578]\\d{9}$");
      // if (!regExp.test(this.searchPhone)) {
      //   this.$toast.fail("手机号格式不合法!");
      //   return;
      // }
      if (!this.smscode) {
        this.$toast.fail("验证码不能为空!");
        return;
      }
      http
        .post(`${location.origin}/api-pay/Register/Register`, {
          Code: this.code,
          MainItem: {
            Telephone: this.searchPhone,
            Name: this.searchName,
            VerifyCode: this.smscode,
          },
        })
        .then(async (Res) => {
          if (Res.data.Result) {
            let data = Res.data.Result;
            this.$toast.success("操作成功!");
            let tempStr = data.licenseKey;
            const forLength = Array.from(
              Array(Math.ceil(tempStr.length / 100))
            );
            const slices = forLength.map((i, k) => {
              return tempStr.slice(k * 100, (k + 1) * 100);
            });
            let rsaArr = [];
            slices.forEach((k) => {
              rsaArr.push(encryptDataReturn(k));
            });
            let licenseKey = rsaArr.join("~");
            localStorage.setItem("operatorcode", data.token);
            data && localStorage.setItem("X-Token", data.token);
            data && localStorage.setItem("LICENSE-KEY", licenseKey);
            data && localStorage.setItem("BEARER-VALUE", data.bearerValue);
            setTimeout(() => {
              location.href = location.origin + location.pathname + "#/index";
            }, 500);
          }
        })
        .catch((error) => {
          this.$toast.fail(error);
        });
      return;
      let res = await checkH5Login({
        Telephone: this.searchPhone,
        Content: this.searchName,
        VerifyCode: this.smscode,
        OpenId: localStorage.getItem("loginCode") || "",
        IsReturnUserCode: false,
        IsOpenIdAndTelephone: true,
      });
      this.$toast.success(res.data.message);
      let tempStr = res.data.licenseKey;
      const forLength = Array.from(Array(Math.ceil(tempStr.length / 100)));
      const slices = forLength.map((i, k) => {
        return tempStr.slice(k * 100, (k + 1) * 100);
      });
      let rsaArr = [];
      slices.forEach((k) => {
        rsaArr.push(encryptDataReturn(k));
      });
      let licenseKey = rsaArr.join("~");
      localStorage.setItem("operatorcode", res.data.userInfoCode);
      res.data && localStorage.setItem("X-Token", res.data.token);
      res.data && localStorage.setItem("LICENSE-KEY", licenseKey);
      res.data && localStorage.setItem("BEARER-VALUE", res.data.bearerValue);
      if (this.fromUrl && this.fromUrl == "/queueQuery") {
        setTimeout(() => {
          this.$router.push({
            path: `/queueQuery`,
            query: {
              telephone: this.searchPhone,
            },
          });
          // this.$router.push({ path: this.fromUrl });
        }, 500);
      } else {
        this.$router.push("/");
      }
    },
    // 点击登录注册
    handleSaveLoginBF() {
      if (!this.searchName) {
        this.$toast.fail("姓名不能为空!");
        return;
      }
      if (!this.searchPhone) {
        this.$toast.fail("手机号不能为空!");
        return;
      }
      let regExp = new RegExp("^1[3578]\\d{9}$");
      if (!regExp.test(this.searchPhone)) {
        this.$toast.fail("手机号格式不合法!");
      }
      getUnitInfo({
        businesstype: "OutUserLogin",
        whereitems: [
          {
            key: "name",
            value: this.searchName,
          },
          {
            key: "mobilephone",
            value: this.searchPhone,
          },
        ],
      }).then((res) => {
        if (res.data.code == 200) {
          this.$toast.success(res.data.message);
          localStorage.setItem("operatorcode", res.data.result.userInfoCode);
          this.$router.push("/");
        } else {
          this.$toast.fail(res.data.message);
          this.searchName = "";
          this.searchPhone = "";
        }
      });
    },
  },

  watch: {},

  computed: {},
};
</script>
<style lang='scss' scoped>
.login {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  //   padding: 8px;
  .top {
    height: 50px;
    color: #fff;
    background-color: #27a7e0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 15px;
    .title {
      font-size: 16px;
      font-weight: 600;
    }
    .left,
    .mark {
      width: 50px;
    }
  }
  .mainbody {
    height: calc(100% - 50px);
    .body_bg {
      // height: 200px;
      width: 100%;
      margin-top: -3px;
    }
    .info_box {
      width: 90%;
      background: #ffffff;
      box-shadow: 1px 2px 18px 0px rgba(172, 172, 172, 0.35);
      border-radius: 10px;
      position: absolute;
      top: 14%;
      left: 50%;
      transform: translateX(-50%);
      box-sizing: border-box;
      padding: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 24px;
        font-weight: 600;
        color: #27a7e0;
        height: 30px;
        text-align: center;
      }
      .title_ss {
        color: red;
        font-size: 20px;
        font-weight: 600;
      }
      .s_title {
        font-size: 14px;
        color: #000;
        text-align: center;
      }
      .el-input {
        margin: 12px 0;
      }
      // .employ_input {
      //   //   border-radius: 20px;

      //   .el-input__inner {
      //     // border: 1px solid #ccc;
      //     border-radius: 20% !important;
      //   }
      // }
    }
  }
}
</style>
<style lang="scss">
.employ_input {
  //   border-radius: 20px;
  .el-input__inner {
    // border: 1px solid #ccc;
    border-radius: 50px !important;
  }
}
</style>