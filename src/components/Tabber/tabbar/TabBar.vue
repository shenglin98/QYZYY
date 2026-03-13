<template>
  <!-- tabbar组件外层 -->
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>
<style lang="scss" scoped>
@import '../../../assets/css/tabbar.scss';
</style>