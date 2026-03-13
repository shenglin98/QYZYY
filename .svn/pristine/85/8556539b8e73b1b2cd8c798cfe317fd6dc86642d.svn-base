<template>
  <div class="consult">
    <div class="consb">
      <div class="timebox">{{ loadtime }}</div>
      <div class="tips">如您有以下问题，可点击按钮，解决更快哦~</div>
      <div class="btngroup">
        <div class="btn_item">
          <van-icon name="cluster" class="fc1" />
          <div class="btn_text">检前</div>
        </div>
        <div class="btn_item">
          <van-icon name="todo-list" class="fc2" />
          <div class="btn_text">检中</div>
        </div>
        <div class="btn_item">
          <van-icon name="underway" class="fc3" />
          <div class="btn_text">检后</div>
        </div>
        <div class="btn_item">
          <van-icon name="service" class="fc4" />
          <div class="btn_text">疾病咨询</div>
        </div>
      </div>
      <div class="messboxbig">
        <div class="messbox">
          <div
            class="messitem"
            v-for="(item, index) in messagelist"
            :key="index"
          >
            <div class="messitemtext">{{ item }}</div>
            <van-image :src="manUrl" />
          </div>
        </div>
      </div>
    </div>
    <div class="sendbox">
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 3 }"
        v-model="usersend"
      >
      </el-input>
      <van-button type="info" size="small" @click="handleSendMess"
        >发 送</van-button
      >
    </div>
  </div>
</template>
  <script>
export default {
  name: "consult",

  components: {},

  data() {
    return {
      loadtime: "",
      manUrl: require("@/assets/images/man.png"),
      usersend: "",
      messagelist: [],
    };
  },

  mounted() {
    this.loadtime = new Date(+new Date() + 8 * 3600 * 1000)
      .toJSON()
      .substr(11, 5)
      .replace("T", " ");
  },

  methods: {
    handleSendMess() {
      if (!this.usersend) return;
      this.messagelist.push(this.usersend);
      this.usersend = "";
    },
  },

  watch: {},

  computed: {},
};
</script>
<style lang='scss' scoped>
.consult {
  height: calc(100vh - 94px);
  background-color: #f5f5f5;
  box-sizing: border-box;
  padding: 8px;
  .consb {
    width: 100%;
    height: 88%;
    overflow-y: auto;
    .timebox {
      background-color: #dadada;
      color: #fff;
      width: 60px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      font-size: 13px;
      margin: 0 auto;
    }
    .tips {
      width: 80%;
      background-color: #fff;
      border-radius: 5px;
      box-sizing: border-box;
      font-size: 16px;
      padding: 4px 5px;
      margin-top: 12px;
    }
    .btngroup {
      width: 80%;
      background-color: #fff;
      border-radius: 5px;
      box-sizing: border-box;
      margin: 12px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 5px;
      .btn_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .van-icon {
          font-size: 30px;
        }
        .fc1 {
          color: #ff3f4c;
        }
        .fc2 {
          color: #fc8214;
        }
        .fc3 {
          color: #2292fe;
        }
        .fc4 {
          color: #f03b97;
        }
        .btn_text {
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
    .messboxbig {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      .messbox {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: end;
        .messitem {
          margin-top: 8px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .messitemtext {
            background-color: #89d961;
            border-radius: 5px;
            box-sizing: border-box;
            padding: 4px 5px;
            display: inline-block;
            font-size: 14px;
            max-width: calc(100% - 38px);
          }
          .van-image {
            width: 30px !important;
            height: 30px;
            margin-left: 8px;
          }
        }
      }
    }
  }
  .sendbox {
    height: 12%;
    display: flex;
    align-items: end;
    .el-textarea {
      width: calc(80% - 8px);
      margin-right: 8px;
    }
    .van-button {
      width: 20%;
    }
  }
}
</style>