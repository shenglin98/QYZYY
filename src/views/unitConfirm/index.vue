<template>
  <div class="unitConfirm">
    <!-- 数据主体 -->
    <div class="mainbody">
      <!-- 单位信息 -->
      <div class="unit_box">
        <div class="title">
          <div class="title_text">单位信息</div>
        </div>
        <van-cell-group v-if="mainitem">
          <van-cell title="单位名称:" :value="mainitem.companyname" />
          <van-cell
            title="体检时间:"
            :value="`${mainitem.startdate.substr(0, 10) || ''} 至 ${
              mainitem.enddate.substr(0, 10) || ''
            }`"
          />
        </van-cell-group>
      </div>
      <!-- 个人信息 -->
      <div class="unit_box">
        <div class="title">
          <div class="title_text">个人信息</div>
          <van-button round type="info" size="mini" @click="handleCheckUser"
            >选择体检人</van-button
          >
        </div>
        <van-cell-group>
          <van-cell title="姓名:">
            <template #default v-if="userInfo">{{ userInfo.name }}</template>
          </van-cell>
          <van-cell title="性别:">
            <template #default v-if="userInfo">
              {{
                userInfo.sex == 0
                  ? "未知"
                  : userInfo.sex == 1
                  ? "男"
                  : userInfo.sex == 2
                  ? "女"
                  : ""
              }}
            </template>
          </van-cell>
          <van-cell title="生日:">
            <template #default v-if="userInfo">{{
              userInfo.birthday
            }}</template>
          </van-cell>
          <van-cell title="婚否:">
            <template #default v-if="userInfo">{{
              userInfo.marriage
            }}</template>
          </van-cell>
          <van-cell title="电话:">
            <template #default v-if="userInfo">{{
              userInfo.telephone
            }}</template>
          </van-cell>
          <van-cell title="证件类型:">
            <template #default v-if="userInfo">
              <div v-if="userInfo.idtype == '01'">身份证</div>
              <div v-if="userInfo.idtype == '02'">居民户口簿</div>
              <div v-if="userInfo.idtype == '03'">护照</div>
              <div v-if="userInfo.idtype == '04'">军官证</div>
              <div v-if="userInfo.idtype == '05'">驾驶证</div>
              <div v-if="userInfo.idtype == '06'">港澳居民来往内地通行证</div>
              <div v-if="userInfo.idtype == '07'">台湾居民来往内地通行证</div>
            </template>
          </van-cell>
          <van-cell title="证件号:">
            <template #default v-if="userInfo">{{ userInfo.idcard }}</template>
          </van-cell>
        </van-cell-group>
      </div>
      <!-- 体检分组 -->
      <div class="unit_box">
        <div class="title">
          <div class="title_text">体检分组</div>
          <van-button round type="info" size="mini" @click="handleCheckGroup"
            >选择分组</van-button
          >
        </div>
        <van-cell-group>
          <van-cell title="分组方式:">
            <template #default v-if="chooseGroup">
              {{
                chooseGroup.grouptype == 0
                  ? "固定项目"
                  : chooseGroup.grouptype == 1
                  ? "自选套餐"
                  : chooseGroup.grouptype == 2
                  ? "定额自选"
                  : ""
              }}
            </template>
          </van-cell>
          <van-cell title="体检分组:">
            <template #default v-if="chooseGroup">{{
              chooseGroup.groupname
            }}</template>
          </van-cell>
          <van-cell title="标准金额:">
            <template #default v-if="chooseGroup">{{
              chooseGroup.grouptypeprice
            }}</template>
          </van-cell>
        </van-cell-group>
      </div>
      <!-- 确认开始预约 -->
      <div class="btn_div">
        <van-button
          type="primary"
          round
          size="info"
          @click="handleStartAppointment"
          >开始预约</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { lastRegister, getUnitInfo } from "@/api/unit.js";
import { getListData } from "@/api/reservation.js";
export default {
  name: "",

  components: {},

  data() {
    return {
      search: "",
      groupcode: "",
      mainitem: null,
      userInfo: null,
      chooseGroup: null,
      checkUserId: "",
      operatorcode: "",
    };
  },

  mounted() {
    this.search = this.$route.query.search || "";
    this.groupcode = this.$route.query.groupcode || "";
    this.checkUserId = this.$route.query.checkUser || "";
    this.operatorcode = localStorage.getItem("operatorcode") || "";
    if (!this.search) {
      this.$toast.fail("获取查询信息失败!");
      setTimeout(() => {
        this.$router.push("/");
      }, 800);
      return;
    }
    this.handleGetListData();
    this.checkUserId && this.handleGetUserList();
  },

  methods: {
    // 点击开始预约跳转回调
    handleStartAppointment() {
      if (!this.userInfo) {
        this.$toast.fail("请先选中人员!");
        return;
      }
      if (!this.chooseGroup) {
        this.$toast.fail("请先选中分组!");
        return;
      }
      if (
        this.userInfo.sex != this.chooseGroup.sex &&
        this.chooseGroup.sex != 0
      ) {
        this.$toast.fail("当前人员性别不支持该分组!");
        return;
      }
      let whereitems = [
        {
          key: "companycode",
          value: this.mainitem.companycode,
        },
        {
          key: "batch",
          value: this.mainitem.batch,
        },
        {
          key: "groupcode",
          value: this.chooseGroup.groupcode,
        },
      ];
      getUnitInfo({
        businesstype: "GroupDetail",
        whereitems,
      }).then((result) => {
        if (!result.data.result) return;
        let setmealInfo = result.data.result;
        // 储存提交订单所需字段
        this.userInfo.companycode = this.mainitem.companycode;
        this.userInfo.companyname = this.mainitem.companyname;
        this.userInfo.batch = this.mainitem.batch;
        this.userInfo.groupcode = this.chooseGroup.groupcode;
        this.userInfo.remark = this.mainitem.remark;
        // 储存单位个人信息
        localStorage.setItem("companyUserInfo", JSON.stringify(this.userInfo));
        localStorage.setItem("setmealInfo", JSON.stringify(setmealInfo));
        this.$router.push({
          path: "setmealDetails",
        });
      });
    },
    // 点击选中体检人
    handleCheckUser() {
      let query = this.$route.query;
      query.pageFrom = "unitConfirm";
      this.$router.push({
        path: "/selectUser",
        query,
      });
    },
    // 点击选中分组
    handleCheckGroup() {
      if (!this.userInfo) {
        this.$toast.fail("请先选择体检人!");
        return;
      }
      let query = this.$route.query;
      query.sex = this.userInfo.sex;
      query.age = this.userInfo.age;
      this.$router.push({
        path: "/checkGroup",
        query,
      });
      // query: { search: this.search, groupcode: this.groupcode },
    },
    // 获取列表数据回调
    handleGetUserList() {
      getListData({
        businesstype: "MyCheckPersonList",
        code: this.operatorcode,
        whereitems: [],
      }).then((res) => {
        if (!res.data.result) return;
        let index = res.data.result.filter((k) => {
          return k.id === this.checkUserId;
        })[0];
        index && (this.userInfo = index);
      });
    },
    // 主页单位/分组数据回调
    handleGetListData() {
      lastRegister({
        companycode: this.search,
      }).then((res) => {
        if (!res.data.result) return;
        let data = res.data.result;
        this.mainitem = data.mainitem;
        this.$nextTick(() => {
          if (this.groupcode) {
            let index = data.groupitems.filter((k) => {
              return k.groupcode === this.groupcode;
            })[0];
            index && (this.chooseGroup = index);
          }
        });
      });
    },
  },

  watch: {},

  computed: {},
};
</script>
<style lang='scss' scoped>
.unitConfirm {
  height: calc(100vh - 94px);
  background-color: #f2f2f2;
  box-sizing: border-box;
  padding: 5px;
  .mainbody {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    padding-bottom: 50px;
    .unit_box {
      background-color: #fff;
      border-radius: 6px;
      padding: 8px;
      margin-bottom: 10px;
      .title {
        height: 35px;
        display: flex;
        justify-content: space-between;
        align-self: start;
        .title_text {
          font-weight: 600;
          font-size: 16px;
          color: #000;
          width: 90px;
          height: 26px;
          background-color: #f2f2f2;
          border-radius: 13px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .btn_div {
      padding-top: 10px;
      text-align: center;
      .van-button {
        width: 70%;
      }
    }
  }
}
</style>
<style lang="scss">
.unitConfirm {
  .unit_box {
    .van-cell-group {
      .van-cell {
        .van-cell__title {
          flex: unset;
          width: 25% !important;
        }
        .van-cell__value {
          flex: unset;
          width: 74% !important;
          text-align: left;
        }
      }
    }
  }
}
</style>