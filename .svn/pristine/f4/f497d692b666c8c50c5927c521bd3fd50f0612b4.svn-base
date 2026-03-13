<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-icon" src="../../assets/img/tabbar/home.png" alt="" />
      <img
        slot="item-icon-active"
        src="../../assets/img/tabbar/home_active.png"
        alt=""
      />
      <div slot="item-text">首页</div>
    </tab-bar-item>

    <tab-bar-item path="/order" activeColor="blue">
      <img slot="item-icon" src="../../assets/img/tabbar/order.png" alt="" />
      <img
        slot="item-icon-active"
        src="../../assets/img/tabbar/order_active.png"
        alt=""
      />
      <div slot="item-text">订单</div>
    </tab-bar-item>

    <!-- <tab-bar-item path="/categroy" activeColor="blue">
      <img slot="item-icon" src="../../assets/img/tabbar/py.png" alt="" />
      <img slot="item-icon-active" src="../../assets/img/tabbar/py_active.png" alt="" />
      <div slot="item-text">分类</div>
    </tab-bar-item> -->

    <tab-bar-item path="/mine" activeColor="blue">
      <img slot="item-icon" src="../../assets/img/tabbar/mine.png" alt="" />
      <img
        slot="item-icon-active"
        src="../../assets/img/tabbar/mine_active.png"
        alt=""
      />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "./tabbar/TabBar.vue";
import TabBarItem from "./tabbar/TabBarItem.vue";
export default {
  name: "MainTabBar",
  components:{
      TabBar,
      TabBarItem
  }
};
</script>
<style lang="scss" scoped>
// @import '../../assets/css/home.scss';
    .bar-item {
        flex: 1;
        text-align: center;
        height: 49px;

        img {
            width: 24px;
            height: 24px;
            margin-top: 5px;
            vertical-align: top;
        }

        div {
            font-size: 14px;
            margin-bottom: 2px;
        }
    }
</style>