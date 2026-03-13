<template>
  <div class="index">
    <van-nav-bar
      class="index_top"
      :title="showTitle || this.GLOBAL.colorList"
      :fixed="true"
      :placeholder="true"
      @click-left="back"
      @click-right="View_report"
    >
      <template #left>
        <div
          class="back_btn"
          v-if="
            !['/index', '/orderListPage', '/personalCenter'].includes(
              $route.path
            )
          "
        >
          <van-icon name="arrow-left" />
          <span class="title">返回</span>
        </div>
      </template>
      <template #right>
        <div
          class="fan"
          v-if="$route.name == 'orderMessage'"
          @click="View_report"
        >
          查看报告
        </div>
      </template>
    </van-nav-bar>
    <div class="subject" v-if="$route.path == '/index'">
      <div class="body">
        <div class="bodyItemClas">
          <van-image
            class="homeimageClas"
            width="100%"
            height="100%"
            fit="contain"
            :src="require('@/assets/images/homeBacImage.jpg')"
          />
        </div>
        <div class="bodyItemClas">
          <div class="useImageBox" @click="!userform.name && handleGoLogin()">
            <div class="imageClas">
              <van-image
                class="homeimageClas"
                width="100%"
                height="100%"
                fit="contain"
                :src="require('@/assets/images/头像.png')"
              />
            </div>
            <div class="userClass">
              <span class="itemName" v-if="userform.name"
                >{{ userform.name }}&#x3000;{{ userform.telephone }}</span
              >
              <span class="itemName" v-else>未登录</span>
              <div class="switchClas" @click="togglUse">切换体检人</div>
            </div>
          </div>
          <!-- <div class="switchClas flex" style="width: 20%">
            <span>体检码</span>
            <van-image
              class="homeimageClas"
              width="20%"
              height="20%"
              fit="contain"
              :src="require('@/assets/images/二维码.png')"
            />
          </div> -->
        </div>
        <div class="body2ItemClas">
          <!-- jumpReservation(1) -->
          <div class="item1" @click="handleTips">
            <div class="imagebox">
              <div class="image">
                <van-image
                  class="homeimageClas"
                  width="100%"
                  height="100%"
                  fit="contain"
                  :src="require('@/assets/images/ticeng7.png')"
                />
              </div>
              <div class="txtBox">
                <div class="titleClas">个人预约</div>
                <div class="txt">快捷预约通道</div>
              </div>
            </div>
          </div>
          <!-- jumpGroupsCheck -->
          <div class="item2" @click="handleTips">
            <div class="imagebox">
              <div class="image">
                <van-image
                  class="homeimageClas"
                  width="100%"
                  height="100%"
                  fit="contain"
                  :src="require('@/assets/images/图层 8.png')"
                />
              </div>
              <div class="txtBox">
                <div class="titleClas">单位体检</div>
                <div class="txt">快捷预约通道</div>
              </div>
            </div>
          </div>
          <!-- handleGetQueueQuery -->
          <div class="item3" @click="handleTips">
            <div class="imagebox">
              <div class="image">
                <van-image
                  class="homeimageClas"
                  width="100%"
                  height="100%"
                  fit="contain"
                  :src="require('@/assets/images/图层 9.png')"
                />
              </div>
              <div class="txtBox">
                <div class="titleClas">体检排队</div>
                <div class="txt">体检排队小助手</div>
              </div>
            </div>
          </div>
          <div class="item4" @click="jumpReportQuery('BGCX')">
            <div class="imagebox">
              <div class="image">
                <van-image
                  class="homeimageClas"
                  width="100%"
                  height="100%"
                  fit="contain"
                  :src="require('@/assets/images/图层 10.png')"
                />
              </div>
              <div class="txtBox">
                <div class="titleClas">体检报告</div>
                <div class="txt">在线领取报告</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bodyItemClas body3ItemClas">
          <div class="top">
            <van-image
              class="homeimageClas"
              width="5%"
              height="100%"
              fit="contain"
              :src="require('@/assets/images/消息.png')"
            />
            <div class="txt">消息提醒</div>
          </div>
          <div class="swperBox">
            <!-- 免费检查糖化血红蛋白等项目(价值400元以上)!现代医学进步需要每个人的参与，诚邀您参加免费科研项目，检查费用由国家重点研发计划“主动健康和人口老龄化”重点专项支持。详情请于体检中心前台咨询。 -->
            <vue-seamless-scroll
              :data="listData"
              :class-option="defaultOption"
              class="warp"
              @ScrollEnd="ScrollEnd"
            >
              <ul class="item">
                <li v-for="(item, index) in listData" :key="index">
                  <span class="title" v-text="item.combinename"></span>
                  <span class="date" v-text="item.inputdate"></span>
                </li>
              </ul>
            </vue-seamless-scroll>
          </div>
        </div>
        <div class="bodyItemClas body4ItemClas">
          <div class="top">
            <van-image
              class="homeimageClas"
              width="5%"
              height="100%"
              fit="contain"
              :src="require('@/assets/images/健康.png')"
            />
            <div class="txt">体检服务</div>
            <!-- <div class="txt">健康在线</div> -->
          </div>
          <div class="bodyBox">
            <div
              class="item"
              v-for="(item, index) in linkList"
              :key="index"
              @click="handleButtonAll(item.codeindex)"
            >
              <van-image
                class="homeimageClas"
                width="100%"
                height="60%"
                fit="contain"
                :src="'data:image/jpeg;base64,' + item.funimgurl"
              />
              <div class="txt">{{ item.funcname }}</div>
            </div>
          </div>
        </div>
        <!-- @click="jumpGryy(item.id)" -->
        <div class="bodyItemClas body5ItemClas">
          <div
            class="itembody"
            id="hospital"
            v-for="item in hospitalItems"
            :key="item.id"
          >
            <div class="imgBox">
              <van-image
                class="homeimageClas"
                width="100%"
                height="100%"
                fit="contain"
                :src="'data:image/jpeg;base64,' + item.fileUrl"
              />
            </div>
            <div class="detailTxt">
              <div class="title">{{ item.hospitalname }}</div>
              <div class="mapBox">
                <div class="address">
                  <div class="mapImgBox">
                    <van-image
                      id="vantImage"
                      class="homeimageClas"
                      width="100%"
                      height="60%"
                      fit="contain"
                      :src="require(`@/assets/images/定位.png`)"
                    />
                  </div>
                  <div class="txt">{{ item.address || "暂无" }}</div>
                </div>
                <div class="detailAddress"><!-- 详细地址 --></div>
              </div>
              <div class="phoneBox">
                <div class="imgBox">
                  <van-image
                    class="homeimageClas"
                    width="100%"
                    height="100%"
                    fit="contain"
                    :src="require(`@/assets/images/电话.png`)"
                  />
                </div>
                <div>{{ item.telephone }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 报告查询 -->
      <div class="query" v-show="query">
        <div class="register">
          <!-- 请先挂号 -->
          <p class="titlecc">请先挂号</p>
          <p class="determine" @click="determine">确定</p>
        </div>
      </div>
    </div>
    <router-view v-else></router-view>
    <van-popup
      v-model="hospitalFlag"
      closeable
      position="bottom"
      :style="{ height: '83%' }"
    >
      <ul class="hospitalClas">
        <li
          class="itemleft"
          :style="userform.id == item.id ? 'border-color:#5777E5;' : ''"
          v-for="(item, index) in userList"
          :key="index"
          @click="handleSetSubmit(item)"
        >
          <div class="usericonbox">
            <van-icon class="usericon" name="manager-o" />
          </div>
          <div class="itemcontent">
            <div class="itemtop">
              <div class="name">{{ item.name }}</div>
              <div class="sex">
                {{ item.sex == 1 ? "男" : item.sex == 2 ? "女" : "未知" }}
              </div>
              <div class="phone">{{ item.telephone }}</div>
              <div class="marriage">{{ item.marriage }}</div>
            </div>
            <div class="idcard">{{ item.idcard }}</div>
          </div>
        </li>
      </ul>
      <div class="btn_bom">
        <van-button round size="small" type="primary" @click="handleAddUser"
          >新 增</van-button
        >
      </div>
    </van-popup>
    <van-tabbar route fixed>
      <van-tabbar-item replace to="/" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/orderListPage" icon="notes-o"
        >我的体检</van-tabbar-item
      >
      <van-tabbar-item replace to="/personalCenter" icon="contact"
        >个人中心</van-tabbar-item
      >
    </van-tabbar>
    <el-dialog
      title=""
      class="printDia"
      :visible.sync="dialogVisible"
      width="70%"
      :show-close="false"
      @close="handleClosePrintDia"
    >
      <span>
        <!-- <el-button type="primary" @click="handleViewGuideSing"
          >体格检查表</el-button
        > -->
        <el-button type="primary" class="printRebort" @click="handleViewReport"
          >个人报告书</el-button
        >
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClosePrintDia" size="mini" plain type="primary"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <van-dialog
      class="setmealwarnmsg_dia"
      v-model="showDialog"
      messageAlign
      :title="showDialogTitle"
    >
      <div class="setmealwarnmsg">
        <!-- <div class="warnmsg_content" v-html="dialogContent"></div> -->
        <quill-editor v-model="dialogContent" ref="myQuillEditor" disabled>
        </quill-editor>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
import Header from "@/components/header/index.vue";
export default {
  name: "",

  components: {
    Header,
    vueSeamlessScroll,
  },

  data() {
    return {};
  },
  computed: {},
  mounted() {},

  methods: {},

  watch: {
    $route(to, from) {
      console.log(to.meta.title);
      this.showTitle = to.meta.title;
      if (this.$route.path == "/index") {
        this.show = false;
      } else {
        this.show = true;
      }
    },
  },
};
</script>
<script src="./index.js" lang="js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.scss" lang="scss" scoped></style>
<style lang="scss">
.quill-editor::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: transparent;
}
.quill-editor {
  position: relative;
  .ql-container.ql-snow {
    border: none !important ;
  }
  .ql-toolbar.ql-snow {
    display: none !important;
  }

  .ql-editor {
    border: none !important;
  }
}
.van-nav-bar.van-hairline--bottom::after {
  border-bottom-width: 0 !important;
}
.van-nav-bar {
  background: #27a7e0;
  .van-nav-bar__title {
    color: white;
  }
  .van-nav-bar__left {
    .van-icon {
      color: #fff !important;
    }
    .back_btn {
      color: #fff !important;
    }
  }
}
.employ {
  .employ_input {
    width: 70%;
    margin-top: 8px;
    border-radius: 20px;

    .el-input__inner {
      // border: 1px solid #ccc;
      border-radius: 20px;
    }
  }
  .employ_btn {
    width: 70%;
    margin-top: 8px;
  }
}
.for_box {
  height: 100%;
  padding: 50px 10px 20px 10px;
  box-sizing: border-box;
  overflow-y: auto;
  .goods-card.van-card {
    margin-bottom: 15px;
    border-radius: 8px;
    background: url("../../assets/images/背景.png");
    .van-card__title {
      color: #fff;
      font-size: 16px;
      font-weight: 600;
    }
    .van-card__desc {
      margin-top: 10px;
      color: #444f61;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .active {
    border: 1px solid #409eff;
  }
}
</style>
