<template>
  <div class="orderList">
    <!-- <div class="left_nav">
                <div :class="['nav_list',{'active' : item.active}]" v-for="(item,index) in orderList" :key="index">
                    <img :src="item.image" alt="">
                    <span class="nospace">{{item.combinename}}</span>
                </div> 
            </div>
  

            <div class="right_table">
                原本注銷頭<div class="title">{{item.combinename}}</div> 原本注销尾
                <table class="table">
                    <thead>
                        <tr>
                            <th>项目</th>
                            <th>结果</th>
                            <th>单位</th>
                            <th>参考范围</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(user,indexs) in user" :key="indexs">
                        <td>{{user.itemname}}</td>
                        <td>{{user.result}}</td>
                        <td>{{user.unit}}</td>
                        <td>{{user.reslower}}-{{user.resupper}}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="summary">小结</div>
                原本注銷頭<div class="summary_conent">{{item.conclusion}}</div> 原本注销尾
                <div class="summary_conent">{{xiaojie}}</div>
            </div>
        原本注銷頭</nut-tab-panel>
            </nut-tab>原本注销尾 -->

    <div class="left_nav">
      <div
        class="nav_list"
        :class="hue == index ? 'active' : ''"
        v-for="(item, index) in report"
        :key="index"
        @click="activeindex(item, index)"
      >
        <img class="imgse" :src="images" alt="" />
        <div class="nospace">{{ item.deptname }}</div>
      </div>

      <!-- <div
        class="nav_list"
        :class="hue == length ? 'active' : ''"
        @click="activeindextwo(length)"
        v-if="status > 6"
      >
        <img class="imgse" :src="imgags" alt="" />
        <div class="nospace">总检</div>
      </div> -->
    </div>
    <!-- <div class="interval">

        </div>  -->
    <div class="right_table">
      <div v-for="(item, index) in report" :key="index">
        <div class="tablefather" v-if="item.deptname == Data_name">
          <div class="tableSON" v-for="(item, index) in reportone" :key="index">
            <div class="table_title">{{ item.combinename }}</div>
            <table class="table">
              <thead>
                <tr>
                  <th class="th" :class="item.viewgroup == 3 ? 'ths' : 'th'">
                    项目
                  </th>
                  <th class="th" :class="item.viewgroup == 3 ? 'ths' : 'th'">
                    结果
                  </th>
                  <th class="th" v-if="item.viewgroup != 3">单位</th>
                  <th class="th" v-if="item.viewgroup != 3">参考范围</th>
                </tr>
              </thead>
              <!-- <tbody>
                                <tr v-for="(user, indexs) in reportwo" :key="indexs">
                                    <td>{{ user.itemname }}</td>
                                    <td>{{ user.result }}</td>
                                    <td class="th" v-if="item.viewgroup != 3">{{ user.unit }}</td>
                                    <td v-if="item.viewgroup != 3 || user.resupper != '' && user.resupper != null">{{
                                        user.reslower }}-{{ user.resupper }}</td>
                                </tr>
                            </tbody> -->

              <tbody>
                <tr
                  v-for="(user, indexs) in item.items"
                  :key="indexs"
                  :class="
                    item.viewgroup == 2 && user.healthstatus == 1
                      ? 'colorred'
                      : ''
                  "
                >
                  <td>{{ user.itemname }}</td>
                  <td>{{ user.result }}</td>
                  <td class="th" v-if="item.viewgroup != 3">{{ user.unit }}</td>
                  <td
                    v-if="
                      item.viewgroup != 3 ||
                      (user.resupper != '' && user.resupper != null)
                    "
                  >
                    {{ user.reslower }}-{{ user.resupper }}
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- <div class="summary">小结</div> -->
            <!-- <textarea class="healthyonxs" name="" id="" cols="50" rows="50">{{item.conclusion }}</textarea> -->
            <!-- <div class="summary_conent">{{ item.conclusion }}</div> -->
          </div>
        </div>
      </div>

      <div
        class="General_inspection"
        v-if="Data_name == 'CustomerReportTotalCheckDetail'"
      >
        <el-tabs
          v-model="activeName"
          stretch
          type="card"
          @tab-click="handleClick"
        >
          <el-tab-pane label="总检综述" name="first">
            <div class="healthyonn" style="white-space: pre-wrap">
              <textarea class="healthyonx" name="" id="" cols="50" rows="50">{{
                summary
              }}</textarea>
            </div>
          </el-tab-pane>
          <el-tab-pane label="健康建议" name="second">
            <div class="healthyone" v-for="item in healthy">
              <div class="healthyt">{{ item.wordname }}</div>
              <div class="healthye" style="white-space: pre-wrap">
                {{ item.healthadvice }}
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script src="./index.vue.js" lang="js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.vue.scss" lang="scss" scoped></style>
<style lang="scss">
.colorred {
  color: red !important;
}
</style>
