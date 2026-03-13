<template>
  <div class="checkuppay">
    <div class="bodymain" v-if="showFlag">
      <!-- 检索组件 -->
      <div class="search_box">
        <el-input
          placeholder="请输入体检号/身份证/手机号"
          size="mini"
          v-model="searchKey"
          clearable
          @keyup.enter.native="handleFindPayForCustomerRegisterList"
        >
        </el-input>
        <el-button
          size="mini"
          type="primary"
          @click="handleFindPayForCustomerRegisterList"
          >查询</el-button
        >
        <el-button size="mini" type="success" @click="handleGotoScan"
          >扫码查询</el-button
        >
      </div>
      <!-- 列表dom -->
      <div class="listpage">
        <div
          :class="[
            chooseObj.regid == item.regid ? 'checklist' : '',
            'listpage_item',
          ]"
          v-for="(item, index) in list"
          :key="item.regid + index"
          @click="handlecheckpeople(item)"
        >
          <div class="ltop">
            <div class="ltname">{{ item.name }}（{{ item.regid }}）</div>
            <div class="lttime">{{ item.checkdate }}</div>
          </div>
          <div class="lcenter">{{ item.companyname }}</div>
          <div class="lcbottom">
            <el-tag size="small" type="info">费用 {{ item.totalMoney }}</el-tag>
            <el-tag size="small">未付 {{ item.notPayMoney }}</el-tag>
            <el-tag size="small" type="danger">已付 {{ item.payMoney }}</el-tag>
          </div>
        </div>
      </div>
      <!-- 详情dom -->
    </div>
    <div class="details" v-else>
      <!-- 缴费信息主体 -->
      <div class="paymain">
        <div class="title">缴费信息</div>
        <van-cell-group>
          <van-cell title="体检号" :value="pageData.regid" />
          <van-cell title="姓名" :value="pageData.name" />
          <van-cell title="证件" :value="pageData.idcard" />
          <van-cell
            title="性别"
            :value="
              pageData.sex == 0
                ? '未知'
                : pageData.sex == 1
                ? '男'
                : pageData.sex == 2
                ? '女'
                : ''
            "
          />
          <van-cell title="开单时间" :value="pageData.regdate" />
          <van-cell title="套餐名称" :value="pageData.setmealname" />
          <van-cell title="体检单位" :value="pageData.companyname" />
          <van-cell title="缴费金额">
            <template #right-icon>
              <div
                v-if="pageData.discountprice > -1"
                style="font-weight: 600; color: red"
              >
                {{ pageData.discountprice }}元
              </div>
            </template>
          </van-cell>
          <!-- <van-cell title="缴费金额" :value="pageData.discountprice +'元'" /> -->
          <van-cell title="缴费状态">
            <template #right-icon>
              <div v-if="pageData.payStatus == 0" style="color: green">
                未缴费
              </div>
              <div v-if="pageData.payStatus == 1" style="color: red">
                已缴费
              </div>
              <div v-if="pageData.payStatus == 2" style="color: orange">
                已退费
              </div>
            </template>
          </van-cell>
          <van-cell title="票据代码" :value="pageData.billCode" />
          <van-cell title="票据号码" :value="pageData.billNo" />
        </van-cell-group>
      </div>
      <!-- 检索组件 -->
      <div class="footer_box">
        <el-button
          style="width: 350px"
          size="small"
          type="primary"
          @click="handleCloseDetails"
          >关 闭</el-button
        >
        <el-button
          v-if="pageData.payStatus == 0"
          style="width: 350px"
          size="small"
          type="primary"
          @click="handlePayInfo"
          >支 付</el-button
        >
        <el-button
          v-if="pageData.payStatus == 1 && pageData.invoiceOutUrl"
          style="width: 350px"
          size="small"
          type="primary"
          @click="handleInvoiceOutUrl"
          >查看发票</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { FindPay, FindPayForCustomerRegisterList } from "@/api/reservation.js";
import wx from "weixin-js-sdk";
import { Toast } from "vant";

export default {
  name: "",

  components: {},

  data() {
    return {
      searchKey: "", // 6600014283
      pageData: {},
      showFlag: true,
      list: [],
      active: "",
      chooseObj: {},
    };
  },

  mounted() {
    if (this.$route.query.result) {
      this.searchKey = this.$route.query.result.split("#")[0] || "";
    }
    this.handleFindPayForCustomerRegisterList();
  },

  methods: {
    // 关闭详情页
    handleCloseDetails() {
      this.active = "";
      this.chooseObj = {};
      this.pageData = {};
      this.showFlag = true;
    },
    // 点击选中用户
    handlecheckpeople(item) {
      this.active = item.regid;
      this.chooseObj = item;
      this.handleFindPay(item.regid);
    },
    // 获取用户列表回调
    handleFindPayForCustomerRegisterList() {
      FindPayForCustomerRegisterList({
        Operatorcode: localStorage.getItem("operatorcode"),
        OrderCode: this.searchKey || this.pageData.regid || "",
      }).then((res) => {
        if (!res.data.result) return;
        this.list = res.data.result;
      });
    },
    // 点击支付
    handlePayInfo() {
      if (this.pageData.discountprice > 0) {
        let wxPayData = {
          OrderCode: this.pageData.regid,
          openid: localStorage.getItem("operatorcode"),
          PayAmount: this.pageData.discountprice,
        };
        Toast.loading({
          message: "加载中...",
          forbidClick: true,
        });
        this.$axios
          .post(`${location.origin}/api-pay/Payment/WxUnifiedOrder`, wxPayData)
          .then((res) => {
            // this.StartWeiXinPay(res.data.data, this.chooseData.orderid);
            let data = res.data.data;
            let str = data.package.split("=")[1];
            wx.miniProgram.navigateTo({
              url: `/pages/h5pay/index?timeStamp=${data.timeStamp}&nonceStr=${data.nonceStr}&package=${str}&signType=MD5&paySign=${data.sign}`,
            });
          });
      }
    },
    // 点击查看发票
    handleInvoiceOutUrl() {
      this.$dialog
        .confirm({
          title: "请复制内容使用浏览器打开以下载!",
          message: `${this.pageData.invoiceOutUrl}`,
          confirmButtonText: "复制",
          confirmButtonColor: "#1989fa",
        })
        .then(() => {
          var input = document.createElement("input"); // 创建input对象
          input.value = this.pageData.invoiceOutUrl; // 设置复制内容
          document.body.appendChild(input); // 添加临时实例
          input.select(); // 选择实例内容
          document.execCommand("Copy"); // 执行复制
          document.body.removeChild(input); // 删除临时实例
          this.$toast.success("已复制!");
        })
        .catch(() => {});
      return;
      window.open(this.pageData.invoiceOutUrl);
    },
    // 点击查询页面信息
    handleFindPay(regid) {
      FindPay({
        OrderCode: regid,
        // OrderCode: this.searchKey.trim(),
        OrderStatus: "-1",
        Operatorcode: localStorage.getItem("operatorcode") || "",
        PayCategory: "CustomerRegister",
      }).then((res) => {
        if (!res.data.result) {
          this.$toast.fail(res.data.message);
          this.searchKey = "";
          this.pageData = {};
          return;
        }
        this.pageData = res.data.result;
        this.showFlag = false;
        this.searchKey = "";
      });
    },
    //
    handleGotoScan() {
      // 小程序环境下逻辑，跳转到小程序的扫描页面地址（/pages/dx-scan-code/scan-code，自己定义的地址）,可以带上页面返回时需要的参数
      wx.miniProgram.navigateTo({
        url: `/pages/h5scancode/index`,
      });
    },
  },

  watch: {},

  computed: {},
};
</script>
<style lang='scss' scoped>
.checkuppay {
  height: calc(100vh - 94px);
  background-color: #f2f2f2;
  box-sizing: border-box;
  .bodymain {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 6px;
    overflow-y: auto;
    padding: 8px;
    padding-bottom: 50px;
    .search_box {
      height: 32px;
      align-items: center;
      display: flex;
      .el-input {
        margin-right: 5px;
      }
    }
    .paymain {
      margin-top: 12px;
      .title {
        font-size: 18px;
        font-weight: 600;
        height: 42px;
      }
    }
    .footer_box {
      margin-top: 12px;
      text-align: center;
    }
    .listpage {
      margin-top: 10px;
      height: calc(100% - 20px);
      overflow-y: auto;
      .listpage_item {
        height: 120px;
        border: 1px solid #dcdbdb;
        border-radius: 5px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 5px;
        box-sizing: border-box;
        .ltop {
          display: flex;
          align-items: center;
          .ltname {
            font-size: 18px;
            font-weight: 600;
          }
          .lttime {
            font-size: 14px;
          }
        }
        .lcenter {
          font-size: 14px;
        }
      }
      .checklist {
        border-color: #409eff;
      }
    }
  }
  .details {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 6px;
    overflow-y: auto;
    padding: 8px;
    padding-bottom: 50px;
    .paymain {
      margin-top: 12px;
      .title {
        font-size: 18px;
        font-weight: 600;
        height: 42px;
      }
    }
    .footer_box {
      margin-top: 12px;
      text-align: center;
    }
  }
}
</style>