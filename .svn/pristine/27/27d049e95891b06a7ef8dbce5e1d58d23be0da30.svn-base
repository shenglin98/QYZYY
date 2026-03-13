<template>
  <div class="promotion">
    <div class="boxcentent">
      <div class="boxcentent_head">
        <div class="bulletincaption">近期名称</div>
        <div class="starttime">时间</div>
        <div class="statuscn">状态</div>
        <div class="button"></div>
      </div>
      <div class="boxcentent_body">
        <div
          class="boxcentent_body_item"
          v-for="(item, index) in pageList"
          :key="index"
        >
          <div class="bulletincaption">
            <el-link type="primary" @click="handleCheckPromotion(item)">{{
              item.bulletincaption
            }}</el-link>
          </div>
          <div class="starttime">{{ item.starttime }}</div>
          <div class="statuscn">{{ item.statuscn }}</div>
          <div class="button">
            <el-button
              type="primary"
              size="mini"
              :disabled="item.status != 0"
              @click="handleCheckPromotion(item)"
              >预约</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="table_box">
      <el-table
        :data="pageList"
        height="100%"
        style="width: 100%"
        class="table_bg"
        :header-cell-style="{ background: '#E9F3FF', color: '#27A7E0' }"
      >
        <el-table-column
          prop="bulletincaption"
          label="近期名称"
          width="360px"
        >
          <template slot-scope="scope">
            <el-link type="primary" @click="handleCheckPromotion(scope.row)">{{
              scope.row.bulletincaption
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="starttime"
          label="时间"
          width="360px"
        >
        </el-table-column>
        <el-table-column
          prop="statuscn"
          label="状态"
          width="260px"
        >
        </el-table-column>
        <el-table-column
          prop="statuscn"
          label=""
          width="260px"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              :disabled="scope.row.status != 0"
              @click="handleCheckPromotion(scope.row)"
              >预约</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div> -->
    <van-popup
      v-model="showDialog"
      round
      position="bottom"
      :style="{ height: '80%' }"
      v-if="choosePromotion"
    >
      <div class="content">
        <div class="title">{{ choosePromotion.bulletincaption }}</div>
        <div
          class="content_text"
          v-html="choosePromotion.bulletinexplain"
        ></div>
        <div class="content_time">
          活动时间：{{ choosePromotion.starttime }}
        </div>
        <van-button type="primary" round size="large" @click="handleReservation"
          >预 约</van-button
        >
      </div>
    </van-popup>
    <van-dialog
      v-model="showForm"
      title="活动预约信息确认"
      show-cancel-button
      :before-close="newGroupBefColse"
      @confirm="handleConfirmReservation"
      @cancel="handleCancelReservation"
    >
      <!-- 输入任意文本 -->
      <van-field v-model="formName" clearable label="姓名" />
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field v-model="formTelephone" clearable type="tel" label="手机号" />
    </van-dialog>
  </div>
</template>
<script>
import { HealthCheckForH5, ActivityBook } from "@/api/reservation.js";
export default {
  name: "",

  components: {},

  data() {
    return {
      operatorcode: "",
      pageList: [],
      showDialog: false,
      choosePromotion: null,
      showForm: false,
      formName: "",
      formTelephone: "",
    };
  },

  mounted() {
    this.operatorcode = localStorage.getItem("operatorcode") || "";
    this.operatorcode && this.handleGetList();
  },

  methods: {
    // 活动预约确认回调
    handleConfirmReservation() {
      if (!this.formName.trim() || !this.formTelephone.trim()) {
        this.$toast.fail("请填写完整信息!");
        this.showForm = true;
        return;
      }
      ActivityBook({
        operatorcode: this.operatorcode,
        bulletincode: this.choosePromotion.bulletincode,
        bulletincategory: this.choosePromotion.bulletincategory,
        name: this.formName.trim(),
        telephone: this.formTelephone.trim(),
      }).then((res) => {
        this.$toast.text(res.data.message);
        this.handleReset();
        this.operatorcode && this.handleGetList();
      });
    },
    // 重置详情需要数据
    handleReset() {
      this.showDialog = false;
      this.showForm = false;
      this.choosePromotion = null;
      this.formName = "";
      this.formTelephone = "";
    },
    newGroupBefColse(action, done) {
      if (
        action == "confirm" &&
        (!this.formName.trim() || !this.formTelephone.trim())
      ) {
        done(false);
      } else {
        done(true);
      }
    },
    // 活动预约取消回调
    handleCancelReservation() {
      this.formName = "";
      this.formTelephone = "";
    },
    // 点击详情预约按钮
    handleReservation() {
      HealthCheckForH5({
        businesstype: "OutUserInfo",
        code: this.operatorcode,
      }).then((res) => {
        if (!res.data.result) {
          this.showForm = true;
        } else {
          this.formName = res.data.result.name;
          this.formTelephone = res.data.result.mobilePhone;
          this.showForm = true;
        }
      });
    },
    // 点击行预约按钮
    handleCheckPromotion(row) {
      if (!row) return;
      this.choosePromotion = row;
      this.showDialog = true;
    },
    // 获取活动预约列表
    handleGetList() {
      HealthCheckForH5({
        businesstype: "ActivityList",
        code: this.operatorcode,
      }).then((res) => {
        if (!res.data.result) return;
        this.pageList = res.data.result;
      });
    },
  },

  watch: {},

  computed: {},
};
</script>
<style lang='scss' scoped>
// @import url("./css/index.scss");
.promotion {
  height: calc(100vh - 94px);
  .table_box {
    height: 95%;
  }
  .content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0.45rem 0.3rem;
    .title {
      font-size: 0.6rem;
      font-weight: 600;
      text-align: center;
    }
    .content_text {
      margin-top: 0.2rem;
      font-size: 0.4rem;
      max-height: 75%;
      min-height: 40%;
      overflow-y: auto;
    }
    .content_time {
      margin-top: 0.2rem;
      margin-bottom: 0.5rem;
      font-weight: 600;
      font-size: 0.4rem;
    }
  }
  .boxcentent {
    width: 100%;
    height: 98%;
    .boxcentent_body {
      width: 100%;
      height: 90%;
      overflow-y: auto;
      .boxcentent_body_item {
        width: 100%;
        height: 6%;
        display: flex;
        border-bottom: 1px solid #eaeefb;
        .bulletincaption {
          width: 30%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
        }
        .starttime {
          width: 30%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
        }
        .statuscn {
          width: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
        }
        .button {
          width: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
        }
      }
    }
    .boxcentent_head {
      width: 100%;
      height: 8%;
      display: flex;
      background-color: #e9f3ff;
      .bulletincaption {
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #27a7e0;
      }
      .starttime {
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #27a7e0;
      }
      .statuscn {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #27a7e0;
      }
      .button {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #27a7e0;
      }
    }
  }
}
</style>