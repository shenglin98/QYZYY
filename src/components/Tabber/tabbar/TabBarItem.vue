<template>
  <!-- tabbaritem ，子组件 -->
  <div class="bar-item" @click="itemClick">
    <!-- <img src="~_a/img/tabbar/home.png" alt="" />
    <div>首页</div> -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>

    <div :style="activeStyle">
      <!-- slot标签中不能使用组件中data属性或方法 -->
      <!-- <slot :style="activeStyle" name="item-text"></slot> -->
      <slot name="item-text"></slot>
    </div>
    <!-- <slot></slot> -->
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "lime",
    },
  },
  data() {
    return {
      // isActive:true
    };
  },
  methods: {
    itemClick() {
      // console.log(this.path);
      this.$router.replace(this.path);
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
};
</script>
<style scoped>
</style>