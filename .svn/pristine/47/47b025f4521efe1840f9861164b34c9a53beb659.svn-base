<template>
  <div class="searchUnit">
    <div class="mainbody">
      <!-- 头部搜索 -->
      <div class="topsearch">
        <el-input
          size="small"
          placeholder="请输入内容"
          v-model="search"
          clearable
          @clear="handleGetCompanyArchivesLoad"
          @keyup.enter.native="handleGetCompanyArchivesLoad"
        >
        </el-input>
        <van-button
          size="small"
          round
          type="info"
          @click="handleGetCompanyArchivesLoad"
          >搜 索</van-button
        >
      </div>
      <!-- 主体列表 -->
      <div class="bodylist">
        <van-cell-group inset v-if="pageList.length > 0">
          <van-cell
            v-for="item in pageList"
            :key="item.companycode"
            :value="`${item.companycode}　${item.companyname}`"
            @click="handleCheckCompany(item)"
          />
        </van-cell-group>
        <el-empty v-else description="暂无数据"></el-empty>
      </div>
      <!-- 加载效果 -->
      <van-loading
        type="spinner"
        v-if="showLoading"
        vertical
        color="#1989fa"
        size="70px"
        >加载中...</van-loading
      >
    </div>
  </div>
</template>
<script>
import { getCompanyArchivesLoad } from "@/api/unit.js";
export default {
  name: "",

  components: {},

  data() {
    return {
      search: "",
      showLoading: false,
      pageList: [],
    };
  },

  mounted() {},

  methods: {
    // 点击单位选中
    handleCheckCompany(item) {
      if (!item) return;
      this.$dialog
        .confirm({
          title: "提示",
          message: `确认选中当前单位 ${item.companyname}`,
          confirmButtonColor: "#1989fa",
        })
        .then(() => {
          // on confirm
          this.$router.push({
            path: "/unitReserva",
            query: { companycode: item.companycode },
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 获取单位列表
    handleGetCompanyArchivesLoad() {
      if (!this.search.trim()) {
        this.$toast.fail("请输入搜索关键字!");
        this.pageList = [];
        return;
      }
      this.showLoading = true;
      getCompanyArchivesLoad({
        page: 1,
        limit: 10000,
        type: 1,
        key: this.search.trim(),
      }).then((res) => {
        this.showLoading = false;
        if (res.data.code != 200) {
          this.$toast.fail("获取单位失败!");
          return;
        }
        this.pageList = res.data.data;
      });
    },
  },

  watch: {},

  computed: {},
};
</script>
<style lang='scss' scoped>
.searchUnit {
  height: calc(100vh - 94px);
  background-color: #f2f2f2;
  box-sizing: border-box;
  padding: 6px;
  .mainbody {
    background-color: #fff;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    position: relative;

    .topsearch {
      display: flex;
      height: 45px;
      align-items: center;
      box-sizing: border-box;
      padding: 0 8px;
      .el-input {
        margin-right: 5px;
        flex: 1;
      }
      .van-button {
        width: 80px;
      }
    }
    .bodylist {
      height: calc(100% - 60px);
      box-sizing: border-box;
      padding: 0 8px;

      .van-cell-group {
        width: 100%;
        height: 100%;
        margin: 0;
        overflow-y: auto;
        .van-cell {
          padding: 3px 6px;
        }
      }
    }
    .van-loading {
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.7);
    }
  }
}
</style>