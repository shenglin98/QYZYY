<template>
  <div class="checkGroup">
    <div class="mainbody">
      <!-- 数据列表下拉刷新 -->
      <div class="list_content">
        <van-pull-refresh v-model="isLoading" @refresh="handleListRefresh">
          <van-list
            :immediate-check="false"
            v-model="listLoading"
            :finished="finished"
            finished-text="没有更多了"
            @load="handleLoadList"
          >
            <div
              class="list_item"
              :class="
                chooseGroup && chooseGroup.groupid == item.groupid
                  ? 'checkbg'
                  : ''
              "
              v-for="item in listData"
              :key="item.groupcode"
              @click="handleLookGroupDetails(item)"
            >
              <div class="item_left">
                <van-image
                  :src="
                    item.sex == 1
                      ? manUrl
                      : item.sex == 2
                      ? womanUrl
                      : unknownUrl
                  "
                />
                <div class="item_text_box">
                  <div class="item_title">{{ item.groupname }}</div>
                  <div class="ittbox">
                    <div class="item_sex">
                      {{ item.sex == 1 ? "男" : item.sex == 2 ? "女" : "未知" }}
                    </div>
                    <div class="item_marriage">
                      {{ item.marriage }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="item_right">
                <div class="item_text_box">
                  <!-- @click="handleLookDetails(item)" -->
                  <van-icon name="arrow" />
                  <div class="item_num">
                    <span>￥{{ item.discountprice }}</span> /
                    {{ item.combineitems.length || 0 }}项
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
      <!-- 选中开始预约 -->
      <div class="btn_div">
        <van-button type="primary" round size="info" @click="handleUnitConfirm"
          >开始预约</van-button
        >
      </div>
      <van-popup
        v-model="showDetails"
        round
        position="bottom"
        :style="{ height: '90%' }"
      >
        <div class="content">
          <!-- 标题 -->
          <div class="title_b">
            <div class="title_text">套餐项目</div>
          </div>
          <!-- 套餐项 -->
          <div class="content_list" v-if="chooseGroup">
            <div
              class="content_item"
              v-for="item in chooseGroup.combineitems"
              :key="item.combinecode"
            >
              <div class="citem_title">{{ item.combinename }}</div>
              <div class="citem_box">
                <div class="remark">检查意义：{{ item.remark }}</div>
                <div class="remind">注意事项：{{ item.remind }}</div>
              </div>
            </div>
          </div>
          <!-- 按钮组 -->
          <div class="btn_box">
            <van-button
              round
              type="info"
              @click="(showDetails = false), (chooseGroup = undefined)"
              >关 闭</van-button
            >
          </div>
        </div>
      </van-popup>
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
      isLoading: false,
      listLoading: false,
      finished: false,
      currentPage: 1,
      pageSize: 10,
      listData: [],
      search: "",
      manUrl: require("@/assets/images/man.png"),
      womanUrl: require("@/assets/images/woman.png"),
      unknownUrl: require("@/assets/images/unknownUrl.jpg"),
      chooseGroup: undefined,
      groupcode: "",
      query: null,
      sex: 0,
      age: 0,
      showDetails: false,
    };
  },

  mounted() {
    this.search = this.$route.query.search || "";
    this.groupcode = this.$route.query.groupcode || "";
    this.sex = this.$route.query.sex || 0;
    this.age = this.$route.query.age || 0;
    this.query = this.$route.query;
    if (!this.search) {
      this.$toast.fail("获取查询信息失败!");
      setTimeout(() => {
        this.$router.push("/unitregister");
      }, 800);
      return;
    }
    this.handleGetListData();
  },

  methods: {
    handleLookDetails(item) {
      this.chooseGroup = item;
      console.log(this.chooseGroup);
      this.showDetails = true;
    },
    // 点击开始预约提交
    handleUnitConfirm() {
      if (!this.chooseGroup) {
        this.$toast.fail("请先选中分组!");
        return;
      }
      this.query.groupcode = this.chooseGroup.groupcode;
      this.$router.push({
        path: "/unitConfirm",
        query: this.query,
        // query: {
        //   companycode: this.search,
        //   groupcode: this.chooseGroup.groupcode,
        // },
      });
    },
    // 点击查看详情
    handleLookGroupDetails(item) {
      if (!item) return;
      this.chooseGroup = item;
    },
    // 下拉刷新回调列表
    handleListRefresh() {
      // 清空列表数据
      this.currentPage = 1;
      this.pageSize = 10;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.finished = false;
      this.isLoading = true;
      this.listLoading = true;
      this.handleGetListData();
    },
    // 下拉列表刷新回调列表
    handleLoadList() {
      this.pageSize = this.pageSize + 10;
      this.handleGetListData();
    },
    // 主页数据回调
    handleGetListData() {
      lastRegister({
        companycode: this.search,
        age: this.age,
        sex: this.sex,
      }).then((res) => {
        if (!res.data.result) {
          this.listData = [];
          this.isLoading = false;
          this.listLoading = false;
          this.currentPage = 1;
          this.pageSize = 10;
          this.finished = true;
          return;
        }
        this.listData = res.data.result.groupitems;
        // this.listData = res.data.result.groupitems.filter((k) => {
        //   return k.sex == this.sex || k.sex == 0;
        // });
        this.$nextTick(() => {
          if (this.groupcode) {
            let index = this.listData.filter((k) => {
              return k.groupcode === this.groupcode;
            })[0];
            index && (this.chooseGroup = index);
          }
        });
        this.isLoading = false;
        this.listLoading = false;
        if (this.pageSize >= res.data.result.groupitems.length) {
          this.finished = true;
        }
      });
    },
  },

  watch: {},

  computed: {},
};
</script>
<style lang='scss' scoped>
.checkGroup {
  height: calc(100vh - 94px);
  background-color: #f2f2f2;
  box-sizing: border-box;
  padding: 5px;
  .mainbody::-webkit-scrollbar {
    display: none;
  }
  .mainbody {
    .btn_box {
      margin-top: 15px;
    }
    height: 100%;
    box-sizing: border-box;
    // background-color: #fff;
    padding-bottom: 40px;
    // background-color: #fff;
    // border-radius: 5px;
    overflow-y: auto;
    border-radius: 6px;
    .list_content {
      height: calc(100vh - 223px);
      //   background-color: #fff;
      .van-pull-refresh {
        height: 100%;
        width: 100%;
        overflow-y: auto;

        .van-list {
          // height: 100%;
          // width: 100%;
          // overflow-y: auto;
        }
        .list_item {
          height: 100px;
          display: flex;
          box-sizing: border-box;
          justify-content: space-between;
          align-items: center;
          background-color: #fff;
          //   border-bottom: 1px solid #e3e3e3;
          margin: 0 0 10px 0;
          padding: 0 10px;
          border-radius: 6px;
          .item_left {
            display: flex;
            font-size: 14px;
            font-weight: 600;
            max-width: 80%;
            .van-image {
              width: 60px;
              height: 60px;
              > img {
                width: 100%;
                height: 100%;
              }
            }
            .item_text_box {
              margin: 8px 0 0 10px;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              .ittbox {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .item_marriage {
                  margin-left: 50px;
                }
              }
              .item_price {
                color: red;
                margin-top: 10px;
              }
            }
          }
          .item_right {
            height: 80px;
            .item_text_box {
              height: 100%;
              padding: 8px 0 0 10px;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              font-size: 14px;
              font-weight: 600;
              text-align: right;
              color: #ababab;
              .item_num {
                display: flex;
                align-items: center;
                span {
                  font-weight: 600;
                }
                color: red;
                margin-top: 0px;
              }
            }
          }
        }
        .checkbg {
          border: 1px solid #1989fa;
        }
      }
    }
    .btn_div {
      margin-top: 10px;
      text-align: center;
      .van-button {
        width: 70%;
      }
    }
    .van-popup {
      .content {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 10px;
      }
    }
    .title_b {
      height: 38px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
      .title_text {
        width: 90px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f2f2f2;
        border-radius: 20px;
      }
    }
    .content_list {
      height: 72%;
      overflow-y: auto;
      .content_item {
        margin-top: 10px;
        .citem_title {
          width: 100%;
          height: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-weight: 600;
          background-color: #d7d5d5;
        }
        .citem_box {
          width: 100%;
          display: flex;
          background-color: #f2f2f2;
          .remark,
          .remind {
            width: 50% !important;
            padding: 5px;
            box-sizing: border-box;
            min-height: 35px;
            word-wrap: break-word;
            word-break: break-all;
            font-size: 14px;
          }
        }
      }
    }
    .btn_box {
      width: 100%;
      display: flex;
      justify-content: space-around;
      .van-button {
        width: 35%;
      }
    }
  }
}
</style>