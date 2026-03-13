<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import MainTabBar from './components/Tabber/MainTabBar.vue'
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<style lang="scss">
@import "pdfh5/css/pdfh5.css";
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
html,
body {
  height: 100vh;
  background: #ffffff;
}

#app {
  font-family: "PingFang SC", miui, system-ui, -apple-system, BlinkMacSystemFont,
    Helvetica Neue, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

.main-box {
  border-left: 1px solid #e7e7e7;
}

.head {
  width: 100%;
  height: auto;
  padding: 13px 20px;
  box-sizing: border-box;
  background: #27a7e0;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  display: flex;
  justify-content: space-between;
}

.ddd {
  position: relative;
}

.fan {
  /* background: rgb(255, 254, 254); */
  position: absolute;
  border: 1px solid #fff;
  font-size: 12px;
  top: 25%;
  right: 5px;
  white-space: nowrap;
}

.loading {
  width: 100%;
  height: 100%;
  /* background: red; */
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
}

.loadingone {
  height: 100%;
}
.printDia {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 10px;
    span {
      display: flex;
      flex-direction: column;
      .el-button {
        margin: 0;
      }
      .printRebort {
        margin-top: 20px;
      }
    }
  }
  .el-dialog__footer {
    padding: 10px;
    text-align: center;
  }
}
</style>
