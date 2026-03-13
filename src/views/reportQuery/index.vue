<template>
  <div class="index">
    <div class="ipt_box">
      <!-- <div class="title">
                <img src="/static/image/rectangular_left.png" alt="">
                智能服务
                <img src="/static/image/rectangular_right.png" alt="">
            </div> -->

      <!-- @selection-change="(selections)=>{handSelectionRules(selections,'参数')}" -->
      <!-- @row-click="jumpOrderList(regid)" -->
      <div class="Information_sheet">
        <el-table
          :data="combination"
          style="width: 100%"
          @row-click="clickData"
        >
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            min-width="70px"
          >
          </el-table-column>
          <el-table-column
            prop="regid"
            label="体检号"
            align="center"
            min-width="130px"
          >
            <template slot-scope="scope">
              <div
                class="text"
                :style="{
                  color: (colorList = '我的体检' ? '#27a7e0' : '#27a7e0'),
                }"
              >
                {{ scope.row.regid }}
              </div>
            </template>
          </el-table-column>

          <!-- <el-table-column  prop="sex" align="center" label="性别" v-if="combination.sex = 2?'女':'男'">{{combination.sex}}
                    </el-table-column> -->
          <!-- <el-table-column prop="price" align="center" width="150" label="费用">
                    </el-table-column> -->
          <!-- <el-table-column prop="regdate" align="center" label="登记日期" width="130">
                    </el-table-column> -->
          <el-table-column
            prop="checkdate"
            align="center"
            label="体检日期"
            min-width="180px"
          >
          </el-table-column>
          <el-table-column
            prop="statusname"
            align="center"
            label="状态"
            min-width="75px"
          >
          </el-table-column>
          <!-- <el-table-column
            prop="isold"
            align="center"
            label="来源"
            min-width="85px"
          >
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.isold">旧</el-tag>
              <el-tag type="success" v-if="!scope.row.isold">新</el-tag>
            </template>
          </el-table-column> -->
          <!-- <el-table-column
            prop="readreportdate"
            align="center"
            label="查询时间"
            min-width="75px"
          >
          </el-table-column> -->
          <!-- <el-table-column label="操作" width="100" prop="" align="center"> -->
          <!-- <template>
                            <el-row >
                                <el-button size="mini" type="primary" @click="jumpOrderList(regid)">详情</el-button>
                            </el-row>
                        </template> -->
          <!-- </el-table-column> -->
        </el-table>
      </div>
    </div>
  </div>
</template>

<script src="./index.vue.js" lang="js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.vue.scss" lang="scss" scoped></style>
