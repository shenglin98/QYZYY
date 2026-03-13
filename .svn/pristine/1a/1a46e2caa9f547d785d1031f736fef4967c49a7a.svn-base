<template>
  <div class="unitReserva">
    <van-image class="body_bg" :src="bgImg" />
    <div class="info_box">
      <el-input
        class="employ_input"
        placeholder="请输入手机号或身份证号"
        v-model="searchKey"
        clearable
        @keyup.enter.native="handleJumpUnitInfo"
      >
      </el-input>
      <el-input
        class="employ_input"
        placeholder="请输入您的姓名"
        v-model="searchName"
        clearable
        @keyup.enter.native="handleJumpUnitInfo"
      >
      </el-input>
      <van-button
        round
        color="#27a7e0"
        type="primary"
        size="normal"
        @click="handleJumpUnitInfo"
        >查 询</van-button
      >
    </div>
  </div>
</template>
<script>
import { getUnitInfo } from "@/api/unit.js";
export default {
  name: "",

  components: {},

  data() {
    return {
      bgImg: require("@/assets/images/unitReserva.png"),
      searchKey: "",
      searchName: "",
    };
  },

  mounted() {},

  methods: {
    // 跳转单位查询信息
    handleJumpUnitInfo() {
      if (!this.searchKey) {
        this.$toast.fail("请输入您的身份证或手机号!");
        return;
      }
      if (!this.searchName) {
        this.$toast.fail("请输入您的姓名!");
        return;
      }
      getUnitInfo({
        businesstype: "CompanyRegisterInfo",
        code: this.searchKey,
        whereitems: [
          {
            key: "checkorder",
            value: "1",
          },
          {
            key: "name",
            value: this.searchName,
          },
        ],
      }).then((res) => {
        if (res.data.count == 0) {
          this.$toast.fail("查询不到数据!");
          this.searchKey = "";
          this.searchName = "";
          setTimeout(() => {
            this.$router.push("/unitregister");
          }, 800);
          return;
        }
        if (!res.data.result) return;
        let value = JSON.parse(JSON.stringify(this.searchKey));
        this.$router.push({ path: "/unitInfo", query: { search: value } });
        this.searchKey = "";
        this.searchName = "";
      });
    },
  },

  watch: {},

  computed: {},
};
</script>
<style lang='scss' scoped>
.unitReserva {
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
    height: 180px;
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