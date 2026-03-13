<template>
  <div class="orderListPage">
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="handleRefreshPage"
    >
      <van-tabs v-model="active" :swipeable="true" @change="handleChangeTabs">
        <van-tab
          v-for="item in contentList"
          :key="item.code"
          :title="item.title"
          :name="item.code"
        >
          <van-list
            :immediate-check="false"
            v-model="listLoading"
            :finished="finished"
            finished-text="没有更多了"
            @load="handleLoadList"
          >
            <div
              class="order_item"
              v-for="item in listData"
              :key="item.orderid"
            >
              <div class="mess_box" @click="handleLookOrder(item)">
                <div class="item_name">{{ item.name }}</div>
                <div class="item_date">{{ item.operatdate }}</div>
                <div class="item_type">{{ item.companyname }}</div>
                <div class="item_status">{{ item.statuscn }}</div>
              </div>
              <div class="btn_box">
                <van-button
                  v-for="k in item.operateitems"
                  v-show="k.code != 'AddCustomerOrder'"
                  :key="k.code"
                  type="info"
                  size="mini"
                  @click="handleClickOperate(item, k)"
                  >{{ k.name }}</van-button
                >
              </div>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </van-pull-refresh>
    <!-- 选择体检日期弹框 -->
    <van-popup
      v-model="showPelsDate"
      class="pelsdate_popup"
      closeable
      position="bottom"
      :style="{ height: '98%' }"
    >
      <div class="pelsdate_content">
        <van-notice-bar
          class="top_tips"
          text="平台预约不支持医保卡，体检卡支付"
        />
        <div class="top_head">
          <div class="head_title">
            检查日期：{{ chooseDate && chooseDate.title }}
          </div>
          <van-checkbox
            v-model="isReserv"
            icon-size="30px"
            shape="square"
            @change="handleChangeIsReserv"
            >只显示可预约</van-checkbox
          >
        </div>
        <div class="calendar_roll">
          <div
            class="calendar_item"
            :class="chooseDateTitle == item.titleday ? 'calendar_bgl' : ''"
            v-for="item in calendarData"
            :key="item.titleday"
            @click="handleCheckChooseDate(item)"
          >
            <div class="week">{{ item.titleweekday }}</div>
            <div class="date">{{ item.titleday }}</div>
            <div class="today">{{ item.friendlydate }}</div>
            <div class="is_reserv">{{ item.contentvalue }}</div>
          </div>
        </div>
        <div class="top_head" v-if="setcompanymodel == 1">
          <div class="head_title">请选择时段</div>
        </div>
        <div class="times_roll" v-if="setcompanymodel == 1 && chooseDate">
          <div
            class="times_item"
            v-for="(itemss, index) in chooseDate.contentitems"
            :key="index"
            :class="
              chooseTimes && chooseTimes.contentkey == itemss.contentkey
                ? 'times_bgl'
                : ''
            "
            @click="handleCheckChooseTimes(itemss)"
          >
            <div class="ttititle">{{ itemss.contentkey }}</div>
            <div class="tticontent" v-if="chooseData.personalflag == 0">
              余号：{{ itemss.personcount }}
            </div>
            <div class="tticontent" v-else>余号：{{ itemss.companycount }}</div>
          </div>
        </div>
        <div class="pelsdate_btn">
          <van-button
            type="info"
            round
            size="normal"
            @click="handleCheckDateSubmit"
            >确 认</van-button
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import {
  getListData,
  healthCheckForH5Post,
  cancelAppoint,
  timeStatic,
  AlterAppoint,
  TimeStaticForPerson,
} from "@/api/reservation.js";
export default {
  name: "",

  components: {},

  data() {
    return {
      isLoading: false,
      listLoading: false,
      finished: false,
      active: -1,
      contentList: [
        {
          code: -1,
          title: "全部",
        },
        {
          code: 0,
          title: "待支付",
        },
        {
          code: 1,
          title: "已支付",
        },
        {
          code: 2,
          title: "未预约",
        },
        {
          code: 3,
          title: "已预约",
        },
        {
          code: 4,
          title: "未完成",
        },
        {
          code: 5,
          title: "已完成",
        },
      ],
      currentPage: 1,
      pageSize: 10,
      listData: [],
      chooseData: undefined,
      operatorcode: "",
      calendarData: [],
      setcompanymodel: 0,
      showPelsDate: false,
      chooseDate: "",
      chooseTimes: "",
      chooseDateTitle: "",
      isReserv: false,
      userData: "",
    };
  },

  mounted() {
    this.operatorcode = localStorage.getItem("operatorcode") || "";
    if (!this.operatorcode) {
      this.$router.push("/index");
      return false;
    }
    this.active = +this.$route.query.status;
    this.userData = JSON.parse(localStorage.getItem("companyUserInfo")) || "";
    this.handleGetListData();
  },

  methods: {
    // 改变是否只显示可预约
    handleChangeIsReserv(flag) {
      if (flag) {
        this.calendarData = this.calendarSource.filter((k) => {
          return k.status == 1;
        });
      } else {
        this.calendarData = tJSON.parse(JSON.stringify(this.calendarSource));
      }
      // status 1-可预约
      console.log(flag);
    },
    // 点击确认选中日期回调
    handleCheckDateSubmit() {
      if (!this.chooseDate) {
        this.$toast.success("请先选中日期!");
        return;
      }
      if (this.setcompanymodel == 1) {
        if (!this.chooseTimes) {
          this.$toast.success("请先选中预约时段!");
          return;
        }
      }
      AlterAppoint({
        regid: this.chooseData.regid,
        customercode: localStorage.getItem("customercode"),
        selectdate: this.chooseDate.title,
        timeid: this.chooseDate.timeid,
      }).then((res) => {
        this.$toast.success(res.data.message);
        res.data.result.issuccess && this.handleGetListData();
        this.handleClosePelsDate();
      });
    },
    handleClosePelsDate() {
      this.chooseDate = "";
      this.chooseTimes = "";
      this.chooseDateTitle = "";
      this.showPelsDate = false;
    },
    handleChangeTabs(value) {
      this.active = value;
      this.currentPage = 1;
      this.pageSize = 10;
      this.handleGetListData(); // 获取订单详情接口返回
    },
    // 刷新当前页面
    handleRefreshPage() {
      this.isLoading = true;
      this.currentPage = 1;
      this.pageSize = 10;
      this.handleGetListData(); // 获取订单详情接口返回
    },
    // 点击查看订单详情
    handleLookOrder(item) {
      if (!item) return;
      localStorage.setItem("customercode", item.customercode);
      this.$router.push({
        path: "/orderConfirm",
        query: { orderid: item.orderid },
      });
    },
    // 点击操作按钮回调
    handleClickOperate(item, k) {
      if (!item) return;
      this.chooseData = item;
      switch (k.code) {
        case "PayInfo": // 支付页面
          this.handlePayInfo();
          break;
        case "CancelAppoint": // 取消预约
          this.handleCancelAppoint();
          break;
        case "CustomerReportDetail": // 查看报告
          this.handleCustomerReportDetail();
          break;
        case "AddCustomerOrder": // 修改订单
          this.handleAddCustomerOrder();
          break;
        case "AlterRegisterTime": // 修改预约时间
          this.handleCheckDateShow();
          break;
        default:
          break;
      }
    },
    handleCheckChooseTimes(item) {
      this.chooseTimes = item;
      this.chooseDate.timeid = item.timeid;
      console.log(this.chooseDate.timeid);
    },
    // 点击选择日期效果
    handleCheckChooseDate(item) {
      if (!item) return;
      if (item.status != 1) {
        this.$toast.fail("当前日期不可预约!");
        return;
      }
      this.chooseDate = item;
      console.log(this.chooseDate, "this.chooseDate");
      this.chooseDateTitle = item.titleday;
    },
    // 点击选择日期回调
    handleCheckDateShow() {
      let data = null;
      if (this.chooseData.personalflag == 0) {
        TimeStaticForPerson({ setmealcode: this.chooseData.setmealcode })
          .then((res) => {
            this.calendarData = res.data.result.dateitems;
            this.calendarSource = JSON.parse(JSON.stringify(this.calendarData));
            this.setcompanymodel = res.data.result.setcompanymodel;
            this.showPelsDate = true;
          })
          .catch(() => {
            this.$toast.success("没有符合的预约日期!");
          });
      } else {
        data = {
          personflag: this.chooseData.personalflag,
          companycode: this.chooseData.companycode,
          batch: this.chooseData.batch,
        };
        timeStatic(data)
          .then((res) => {
            this.calendarData = res.data.result.dateitems;
            this.calendarSource = JSON.parse(JSON.stringify(this.calendarData));
            this.setcompanymodel = res.data.result.setcompanymodel;
            this.showPelsDate = true;
          })
          .catch(() => {
            this.$toast.success("没有符合的预约日期!");
          });
      }
    },
    // 修改订单页面
    handleAddCustomerOrder() {
      localStorage.setItem("EditOrderid", this.chooseData.orderid);
      this.$router.push({
        path: "/unitInfo",
        query: { search: this.chooseData.idcard },
      });
    },
    // 取消预约接口
    handleCancelAppoint() {
      cancelAppoint([
        `${this.chooseData.regid}-${this.chooseData.customercode}`,
      ]).then((res) => {
        if (res.data.result) {
          this.$toast.success(res.data.message);
          this.handleGetListData(); // 获取订单详情接口返回
        } else {
          this.$toast.fail(res.data.message);
        }
      });
    },
    // 查看报告页面
    handleCustomerReportDetail() {
      this.$router.push({
        path: "/orderMessage",
        query: { obj: this.chooseData.regid },
      });
    },
    // 支付页面接口
    handlePayInfo() {
      healthCheckForH5Post({
        businesstype: "PayInfo",
        code: this.chooseData.orderid,
      }).then((res) => {
        if (!res.data.result) return;
        if (res.data.result.payUrl) {
          window.open(res.data.result.payUrl);
        } else {
          this.$toast.success(res.data.message);
          // this.$router.push({ path: "/orderListPage" });
        }
      });
    },
    // 上划加载分页数据
    handleLoadList() {
      this.pageSize += 10;
      this.handleGetListData();
    },
    // 请求订单列表回调
    handleGetListData() {
      let whereitems = [
        {
          key: "operatorcode",
          value: this.operatorcode,
        },
        {
          key: "status",
          value: this.active,
        },
      ];
      getListData({
        page: this.currentPage,
        limit: this.pageSize,
        businesstype: "OrderList",
        customercode: localStorage.getItem("customercode"),
        whereitems,
      })
        .then((res) => {
          // this.$toast.success("加载完成");
          if (!res.data.result) {
            this.listData = [];
            this.isLoading = false;
            this.listLoading = false;
            this.currentPage = 1;
            this.pageSize = 20;
            this.finished = true;
            return;
          }
          this.isLoading = false;
          this.listLoading = false;
          this.listData = res.data.result;
          if (this.pageSize >= res.data.count) {
            this.finished = true;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.listLoading = false;
          this.finished = true;
        });
    },
  },

  watch: {},

  computed: {},
};
</script>
<style lang='scss' scoped>
.orderListPage {
  height: calc(100vh - 94px);
  background-color: #f2f2f2;
  box-sizing: border-box;
  padding: 5px;
  .van-pull-refresh::-webkit-scrollbar {
    display: none;
  }
  .van-pull-refresh {
    height: 100%;
    background-color: #fff;
    border-radius: 5px;
    overflow-y: auto;
    .van-tabs {
      height: 100%;
      .order_item {
        height: 80px;
        box-sizing: border-box;
        padding: 5px;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #e7e7e8;
        .mess_box {
          flex: 1;
          display: flex;
          align-items: center;
          color: #000;
          font-size: 14px;
          .item_name,
          .item_date,
          .item_type,
          .item_status {
            width: 25%;
            text-align: center;
          }
          .item_status {
            color: red;
          }
        }
        .btn_box {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          box-sizing: border-box;
          padding-right: 20px;
          .van-button {
            text-align: center;
            width: 20%;
          }
        }
      }
    }
    .van-list {
      box-sizing: border-box;
      padding-bottom: 60px;
    }
  }
}
</style>
<style lang="scss">
.orderListPage {
  .van-pull-refresh {
    .van-tabs {
      .van-tabs__content {
        height: 660px !important;
      }
    }
  }
  .pelsdate_popup {
    .pelsdate_content {
      height: 100%;
      box-sizing: border-box;
      padding-top: 12%;
      .top_tips {
        height: 25px;
      }
      .top_head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 38px;
        margin-top: 2px;
        padding: 0 15px;
        box-sizing: border-box;
        border-bottom: 1px solid #d8d8d8;
        .head_title {
          font-size: 16px;
          font-weight: 600;
        }
        .van-checkbox {
          .van-checkbox__label {
            font-size: 16px;
          }
        }
      }
      .times_roll {
        box-sizing: border-box;
        height: 220px;
        display: flex;
        flex-wrap: wrap;
        padding: 15px;
        overflow-y: auto;
        .times_item {
          flex-shrink: 0;
          background-color: #f2f2f2;
          border-radius: 4px;
          width: 100px;
          height: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 9px 9px 0;
          color: #000;
          font-size: 14px;
          border: 1px solid #dcdfe6;
        }
        .times_bgl {
          background-color: #409eff !important;
          .ttititle,
          .tticontent {
            color: #fff !important;
          }
        }
      }
      .calendar_roll {
        box-sizing: border-box;
        height: 300px;
        display: flex;
        flex-wrap: wrap;
        padding: 15px;
        overflow-y: auto;
        .calendar_item {
          flex-shrink: 0;
          background-color: #f2f2f2;
          border-radius: 4px;
          height: 100px;
          width: 75px !important;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 9px 9px 0;
          .week {
            font-size: 16px;
            font-weight: 600;
            color: #000;
          }
          .date {
            font-size: 16px;
            color: #676767;
            margin: 5px 0;
          }
          .today {
            font-size: 14px;
            color: #27a7e0;
          }
          .is_reserv {
            font-size: 16px;
            color: #27a7e0;
          }
        }

        .calendar_bgl {
          background-color: #409eff !important;
          .week,
          .date,
          .today,
          .is_reserv {
            color: #fff !important;
          }
        }
      }
      .pelsdate_btn {
        margin-top: 20px;
        padding: 0 15px;
        box-sizing: border-box;
        text-align: center;
        .van-button {
          width: 220px;
        }
      }
    }
  }
}
</style>