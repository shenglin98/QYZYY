<template>
  <div class="guidance">
    <div class="mainbody">
      <div class="personnel">
        <div class="p_item">张三</div>
        <div class="p_item">男</div>
        <div class="p_item">个人体检</div>
        <div class="p_btn">切换体检人</div>
      </div>
      <div class="combine_box">
        <div class="cb_top">
          <div class="ks_box">内 科</div>
          <div class="ks_item">排队号：<span class="bg1">V008</span></div>
          <div class="ks_item bg2">排队中</div>
        </div>
        <div class="cb_item">
          <div class="cb_item_l">等待人数</div>
          <div class="cb_item_r">2人</div>
        </div>
        <div class="cb_item">
          <div class="cb_item_l">预计等待时间</div>
          <div class="cb_item_r">13分钟</div>
        </div>
        <div class="cb_item cbbb">
          <div class="cb_item_l">检查项目</div>
          <div class="cb_item_r">内科检查</div>
        </div>
      </div>
      <div class="combine_box">
        <div class="cb_top">
          <div class="ks_box">B 超 一</div>
          <div class="ks_item">排队号：<span class="bg1">V008</span></div>
          <div class="ks_item bg2">排队中</div>
        </div>
        <div class="cb_item">
          <div class="cb_item_l">等待人数</div>
          <div class="cb_item_r">2人</div>
        </div>
        <div class="cb_item">
          <div class="cb_item_l">预计等待时间</div>
          <div class="cb_item_r">13分钟</div>
        </div>
        <div class="cb_item cbbb">
          <div class="cb_item_l">检查项目</div>
          <div class="cb_item_r bgr">需空腹检查</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",

  components: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {},

  watch: {},

  computed: {},
};
</script>
<style lang='scss' scoped>
.guidance {
  height: calc(100vh - 94px);
  background-color: #f2f2f2;
  .mainbody {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    .personnel {
      box-sizing: border-box;
      padding: 0 6px;
      display: flex;
      width: 100%;
      height: 50px;
      background-color: #27a7e0;
      border-radius: 10px;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      align-items: center;
      justify-content: space-between;
      .p_btn {
        width: 100px;
        height: 30px;
        background-color: #fff;
        border-radius: 15px;
        color: #27a7e0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .combine_box {
      background-color: #fff;
      margin-top: 10px;
      border-radius: 10px;
      .cb_top {
        height: 60px;
        border-bottom: 1px solid #d8d8d8;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 6px;
        font-size: 14px;
        .ks_box {
          width: 160px;
          height: 42px;
          background-image: url("./images/zs.png");
          background-size: 100% 100%;
          font-size: 16px;
          font-weight: 600;
          color: #018e79;
          box-sizing: border-box;
          padding-right: 12px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .bg1 {
          color: #f30909;
        }
        .bg2 {
          color: #289ef0;
        }
      }
      .cb_item {
        height: 50px;
        border-bottom: 1px solid #d8d8d8;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 6px;
        font-size: 14px;
        .cb_item_r {
          color: #7c8586;
        }
        .bgr {
          color: #f30909;
        }
      }
      .cbbb {
        border-bottom: 0 none;
      }
    }
  }
}
</style>