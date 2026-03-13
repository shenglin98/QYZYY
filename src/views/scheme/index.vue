<template>
  <div class="scheme">
    <div class="s_bg">
      <div class="headbox">
        <!-- <div class="place">
          <i class="el-icon-map-location"></i>
          <div class="place_text">南方医院健康管理中心[广州市]</div>
        </div> -->
        <div class="headtext">
          结合您目前身体情况，为您量身定制了以下不同层次的体检套餐。您可以自主选择添加或删除项目，随着金额的增加、检查项目的增加，对您身体情况的检查会更全面
        </div>
      </div>
      <div class="content">
        <div class="ctt_item" @click="handleCheckSetmealDetails">
          <div class="cttitop">
            <div class="cttiicon">
              <van-icon name="good-job" />
            </div>
            <div class="cttititle">推荐体检方案</div>
          </div>
          <div class="ctttext">
            本方案在基础必查项目的基础上，结合您的健康问诊信息，制定的符合您当前健康检查的个性化体检方案
          </div>
          <div class="cttprice">￥2697.22</div>
        </div>
        <div class="ctt_item top12" @click="handleCheckSetmealDetails">
          <div class="cttitop">
            <div class="cttiicon colorioc1">
              <van-icon name="award" />
            </div>
            <div class="cttititle">精准体检方案</div>
          </div>
          <div class="ctttext">
            本方案在推荐体检项目的基础上，对部分体检项目做了升级，让体检更加精准(费用有所增加，可根据您的体检预算进行选择)
          </div>
          <div class="cttprice colorprice1">￥3278.48</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "scheme",

  components: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {
    // 点击查看套餐详情
    handleCheckSetmealDetails() {
      this.$router.push({
        path: "/setmealDetails",
        query: { setmealcode: "TC10002" },
      });
    },
  },

  watch: {},

  computed: {},
};
</script>
<style lang='scss' scoped>
.scheme {
  height: calc(100vh - 94px);
  background-color: #f2f2f2;
  box-sizing: border-box;
  padding: 8px;
  .s_bg {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: #f6f6f6;
    .headbox {
      height: 22%;
      background-image: linear-gradient(
        to right,
        #609afe,
        #648fff,
        #7689ff,
        #8c87ff,
        #887bfe
      );
      box-sizing: border-box;
      padding-top: 12px;
      .place {
        background-color: rgba(255, 255, 255, 0.3);
        height: 25px;
        display: flex;
        width: 90%;
        border-radius: 4px;
        align-items: center;
        color: #fff;
        margin: 0 auto;
        font-size: 16px;
        > i {
          margin: 0 10px;
        }
      }
      .headtext {
        width: 90%;
        color: #fff;
        font-size: 16px;
        margin: 12px auto;
      }
    }
    .content {
      height: 78%;
      box-sizing: border-box;
      padding: 10px;
      .ctt_item {
        height: 110px;
        border-radius: 8px;
        background-color: #fff;
        box-sizing: border-box;
        padding: 8px;
        position: relative;
        .cttitop {
          display: flex;
          align-items: center;
          .cttiicon {
            background-color: #70adfd;
            color: #fff;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            font-size: 19px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .colorioc1 {
            background-color: #fe844b;
          }
          .cttititle {
            margin-left: 10px;
            font-size: 14px;
            font-weight: 600;
          }
        }
        .ctttext {
          margin-top: 12px;
          font-size: 14px;
          color: #666666;
        }
        .cttprice {
          background-color: #96befc;
          position: absolute;
          top: 0;
          right: 0;
          padding: 5px;
          font-size: 14px;
          color: #fff;
          border-radius: 12px 12px 0 12px;
        }
        .colorprice1 {
          background-color: #fea079;
        }
      }
      .top12 {
        margin-top: 12px;
      }
    }
  }
}
</style>