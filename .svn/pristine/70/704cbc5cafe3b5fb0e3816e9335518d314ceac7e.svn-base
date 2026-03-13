<template>
  <div class="unitregister">
    <van-image class="body_bg" :src="bgImg" />
    <div class="info_box">
      <div class="title">团检注册查询</div>
      <div class="s_title">
        身份证或者手机号未找到您的团检注册信息， 请先注册
      </div>
      <el-input
        class="employ_input"
        placeholder="请输入团检单位编码"
        v-model="searchKey"
        clearable
        @keyup.enter.native="handleJumpCheckGroup"
      >
      </el-input>
      <van-button
        round
        color="#27a7e0"
        type="primary"
        size="large"
        @click="handleJumpCheckGroup"
        >查 询</van-button
      >
    </div>
  </div>
</template>
  <script>
import { lastRegister } from "@/api/unit.js";

export default {
  name: "",

  components: {},

  data() {
    return {
      bgImg: require("@/assets/images/unitregister.png"),
      searchKey: "",
    };
  },

  mounted() {},

  methods: {
    // 跳转单位查询信息
    handleJumpCheckGroup() {
      if (!this.searchKey) {
        this.$toast.fail("查询内容不允许为空!");
        return;
      }
      lastRegister({
        companycode: this.searchKey,
      }).then((res) => {
        if (!res.data.result) {
          this.$toast.fail(res.data.message);
          this.searchKey = "";
          return;
        }
        if (!res.data.result) return;
        this.$toast.success(res.data.message);
        let value = JSON.parse(JSON.stringify(this.searchKey));
        this.$router.push({ path: "/unitConfirm", query: { search: value } });
        this.searchKey = "";
      });
    },
  },

  watch: {},

  computed: {},
};
</script>
  <style lang='scss' scoped>
.unitregister {
  height: calc(100vh - 94px);
  background-color: #fff;
  box-sizing: border-box;
  position: relative;
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