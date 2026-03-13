<template>
  <div class="queueQuery">
    <div class="mainbody">
      <div class="headbox">
        <div class="hbtitle">体检人</div>
        <van-button
          round
          icon="replay"
          size="small"
          type="info"
          @click="(loadingBtn = true), handleTriagShowInfo()"
          :loading="loadingBtn"
          loading-text="加载中..."
          >刷新</van-button
        >
        <van-button
          round
          icon="exchange"
          size="small"
          type="info"
          @click="$toast.fail('该功能暂未启用')"
          >切换体检人</van-button
        >
      </div>
      <div class="message">
        <div class="mess_item">{{ personinfo.name }}</div>
        <div class="mess_item">{{ personinfo.sexcn }}</div>
        <div class="mess_item">{{ personinfo.companyname }}</div>
        <div class="mess_item">排队号：{{ personinfo.queueno }}</div>
      </div>
      <div class="current_paidui">
        <div class="current_title">当前排队</div>
        <div class="current_box">
          <div
            class="current_box_item"
            v-for="(item, index) in inQueueItems"
            :key="index + item.queuecode"
          >
            <div class="currentdepart">
              <van-image class="currentdepartimg" :src="currentdepart" />
              <div class="currentdeparttext">{{ item.roomname }}</div>
            </div>
            <div class="currentnum">
              第<span>{{ item.sequence }}</span
              >位
            </div>
            <div class="currenttime">预计等待:{{ item.waittime }}分钟</div>
            <div class="currenttips">{{ item.statusCn }}</div>
          </div>
          <div class="current_tips">
            <van-image class="currenttipsimg" :src="tipspng" />
            <div class="currenttipstext" v-html="warnMsgContent"></div>
          </div>
        </div>
      </div>
      <div class="notinspected">
        <div class="notinspected_title">未检</div>
        <div class="notinspected_box">
          <div
            class="notinspected_box_item"
            v-for="(item, index) in notCheckItems"
            :key="index"
            @click="handleShowDialog(item)"
          >
            {{ item.deptName }}（{{ item.deptCount }}）
          </div>
        </div>
      </div>
      <div class="checked">
        <div class="checked_title">已检</div>
        <div
          class="checked_box"
          v-for="(item, index) in checkItems"
          :key="index"
          @click="handleShowDialog(item)"
        >
          <div class="checked_box_item">
            {{ item.deptName }}（{{ item.deptCount }}）
          </div>
        </div>
      </div>
      <van-dialog
        class="setmealwarnmsg_dia"
        v-model="showDialog"
        messageAlign
        title="组合"
      >
        <div class="setmealwarnmsg">
          <div class="warnmsg_content" v-html="dialogContent"></div>
        </div>
      </van-dialog>
    </div>
  </div>
</template>
<script>
import { TriagShowInfo } from "@/api/reservation.js";
export default {
  name: "",

  components: {},

  data() {
    return {
      currentdepart: require("@/assets/images/currentdepart.png"),
      tipspng: require("@/assets/images/tips.png"),
      personinfo: {},
      inQueueItems: [],
      notCheckItems: [],
      checkItems: [],
      warnMsgContent: "",
      dialogContent: "",
      showDialog: false,
      loadingBtn: false,
      telephone: "",
    };
  },

  mounted() {
    this.telephone = this.$route.query.telephone || "";
    this.handleTriagShowInfo();
  },

  methods: {
    // 点击弹框回调
    handleShowDialog(item) {
      console.log(item);
      if (!item || item.deptDetails.length == 0) {
        this.$toast.fail("暂无组合数据");
        return;
      }
      let content = "";
      for (let i = 0; i < item.deptDetails.length; i++) {
        content += `${item.deptDetails[i].combinename}<br/>`;
      }
      this.dialogContent = content;
      this.showDialog = true;
    },
    handleTriagShowInfo() {
      TriagShowInfo({ telephone: this.telephone })
        .then((res) => {
          if (!res.data.result) return;
          this.$toast.success(res.data.message);
          let data = res.data.result;
          this.personinfo = {
            age: data.age,
            companycode: data.companycode,
            companyname: data.companyname,
            name: data.name,
            queueno: data.queueno,
            regid: data.regid,
            sex: data.sex,
            sexcn: data.sex == 0 ? "未知" : data.sex == 1 ? "男" : "女",
          };
          this.inQueueItems = data.inQueueItems;
          this.notCheckItems = data.notCheckItems;
          this.checkItems = data.checkItems;
          let warnMsgContent = [];
          for (let i = 0; i < this.notCheckItems.length; i++) {
            if (this.notCheckItems[i].warnMsg) {
              warnMsgContent.push(this.notCheckItems[i].warnMsg);
            }
          }
          for (let i = 0; i < warnMsgContent.length; i++) {
            this.warnMsgContent += `${i + 1}.${warnMsgContent[i]}<br/>`;
          }
        })
        .finally(() => {
          this.loadingBtn = false;
        });
    },
  },

  watch: {},

  computed: {},
};
</script>
<style lang='scss' scoped>
.queueQuery {
  height: calc(100vh - 94px);
  background-color: #f2f2f2;
  padding: 10px;
  box-sizing: border-box;
  .mainbody {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .headbox {
      height: 40px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .hbtitle {
        font-size: 18px;
        font-weight: 600;
      }
    }
    .message {
      height: 50px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #27a7e0;
      color: #fff;
      border-radius: 10px;
      padding: 0 10px;
      font-size: 16px;
      font-weight: 500;
      box-sizing: border-box;
    }
    .current_paidui {
      margin-top: 10px;
      // min-height: 180px;
      width: 100%;
      .current_title {
        height: 28px;
        font-size: 18px;
        font-weight: 600;
      }
      .current_box {
        // height: calc(180px - 28px);
        width: 100%;
        border-radius: 10px;
        background-color: #fff;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .current_box_item {
          height: 45px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          font-size: 16px;
          .currentdepart {
            height: 85%;
            width: 80px;
            background-color: #018e79;
            display: flex;
            border-radius: 10px;
            align-items: center;
            justify-content: space-around;
            padding: 4px;
            box-sizing: border-box;

            .currentdepartimg {
              height: 80%;
              width: auto;
            }
            .currentdeparttext {
              color: #fff;
            }
          }
          .currentnum {
            > span {
              color: red;
              margin: 0 4px;
            }
          }
          .currenttime {
          }
          .currenttips {
            color: #289ef0;
          }
        }
        .current_tips {
          display: flex;
          margin-top: 5px;
          .currenttipsimg {
            flex-shrink: 0; /* 禁止缩小 */
            height: 22px;
            width: 22px;
            margin-right: 10px;
            margin-top: 4px;
          }
          .currenttipstext {
            font-size: 16px;
          }
        }
      }
    }
    .notinspected {
      margin-top: 10px;
      width: 100%;
      .notinspected_title {
        height: 28px;
        font-size: 18px;
        font-weight: 600;
      }
      .notinspected_box {
        height: calc(100% - 28px);
        width: 100%;
        border-radius: 10px;
        background-color: #fff;
        padding: 0 10px 10px 10px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        .notinspected_box_item {
          padding: 2px 10px;
          margin-top: 10px;
          height: 20px;
          margin-right: 1.3%;
          font-weight: 500;
          border-radius: 27px;
          border: 1px solid #27a7e0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .checked {
      margin-top: 10px;
      width: 100%;
      .checked_title {
        height: 28px;
        font-size: 18px;
        font-weight: 600;
      }
      .checked_box {
        height: calc(100% - 28px);
        width: 100%;
        border-radius: 10px;
        background-color: #fff;
        padding: 0 10px 10px 10px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        .checked_box_item {
          padding: 2px 10px;
          margin-top: 10px;
          height: 20px;
          margin-right: 1.3%;
          font-weight: 500;
          border-radius: 27px;
          border: 1px solid #27a7e0;
          color: #27a7e0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .setmealwarnmsg_dia {
      width: 320px;
      .setmealwarnmsg {
        width: 100%;
        height: 150px;
        box-sizing: border-box;
        padding: 12px;
        font-size: 14px;
        overflow: auto;
        .warnmsg_content {
          width: 100%;
          height: 100%;
          word-wrap: break-word;
        }
      }
    }
  }
}
</style>