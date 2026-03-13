<template>
  <div class="customized">
    <div class="questionnaire_content">
      <!-- 内容 -->
      <div class="life_habit">
        <!-- 问卷题目 -->
        <!-- 一级标题questionnairelist -->
        <div
          class="Questionnaire"
          v-for="(item, index) in questionnairelist"
          :key="index"
        >
          <div class="life_habit_title">
            <h3>{{ item.itemname }}</h3>
          </div>
          <div class="life_habit_content">
            <!-- 二级标题questionnaireitems -->
            <div
              class="basic_information"
              v-for="item in item.questionnaireitems"
              :key="item.itemcode"
            >
              <div class="two_topic">
                <span>{{ item.itemname }}</span>
                <!-- 二级选项optionitems -->
                <div
                  class="two_options"
                  v-for="(value, index) in item.optionitems"
                  :key="index"
                >
                  <span v-if="value.inputtype === -1">
                    <!-- v-html="value.content.replaceAll('|X|',`1`)" -->
                    <!-- {{ value.content}} -->
                    <!-- 渲染出来的input的值 拼接存到remake的哦 格式  就是这种 2020|x|01 会不会很麻烦
                             -->
                    <!-- <span v-for="(day,index) in value.content" :key="index">{{day+'c'}}</span> -->
                    <template
                      v-for="(val, index) in value.content
                        .split('|X|')
                        .filter((v) => v)"
                    >
                      <myInput
                        :suffix="val"
                        :disabled="item.editstatus == 1"
                        :count="
                          value.content.split('|X|').filter((v) => v).length
                        "
                        :value.sync="value.remark"
                        :index="index"
                        :key="val"
                      />
                    </template>
                    <!--  -->
                    <!-- <input type="text" :ref="'input'" :data-sortIndex="index" :data-remark="value.remark" :key="index" @input="handleTest" />  -->
                    <!-- <template v-for="(val,index) in value.content.split('|X|').filter(v => v )">
                              <el-input size="mini" :ref="val" v-model="obj[index]" :key="index">
                                <template slot="append">{{val}}</template>
                              </el-input>
                            </template> -->
                    <!-- {{value.content.split('|X|').filter(v => v ).map( v => `<span>${v}</span>`)}} -->
                  </span>
                  <el-radio-group
                    style="width: 100%"
                    v-model="item.selectvalue"
                    :disabled="item.editstatus == 1"
                  >
                    <el-radio
                      v-if="[0, 3].indexOf(value.inputtype) !== -1"
                      :label="value.selectvalue"
                      style="margin-right: 5px"
                      :class="
                        value.content.indexOf('|X|') !== -1 ? 'radiobox' : ''
                      "
                    >
                      <span
                        style="width: 100%; display: flex; flex-wrap: wrap"
                        v-if="value.content.indexOf('|X|') !== -1"
                      >
                        <template
                          v-for="(val, index) in value.content.split(',')"
                        >
                          <myInput
                            :content="val"
                            :disabled="val.editstatus == 1"
                            :draggable="value.selectvalue != item.selectvalue"
                            :count="value.content.split(',').length"
                            :value.sync="value.remark"
                            :index="index"
                            :key="val"
                          />
                        </template>
                      </span>
                      <span style="width: 100%" v-else>
                        {{ value.content }}
                        <el-input
                          v-if="[1, 3, 4].indexOf(value.inputtype) !== -1"
                          size="mini"
                          :disabled="value.content != item.selectvalue"
                          v-model="value.remark"
                          :placeholder="value.content"
                          style="width: 4rem"
                        ></el-input>
                      </span>
                    </el-radio>
                  </el-radio-group>
                  <el-checkbox
                    v-if="[2, 4].indexOf(value.inputtype) !== -1"
                    v-model="value.flag"
                    :label="value.content"
                    :true-label="1"
                    :false-label="0"
                    >{{ value.content }}</el-checkbox
                  >
                </div>
                <el-input
                  v-if="[1, 3, 4].indexOf(item.inputtype) !== -1"
                  size="mini"
                  :disabled="item.editstatus == 1"
                  v-model="item.remark"
                  placeholder="请输入"
                  style="width: 4rem"
                ></el-input>
              </div>
              <!-- 三级标题questionnaireitems -->
              <div
                class="three_topic"
                v-for="item in item.questionnaireitems"
                :key="item.itemcode"
              >
                <span v-if="item.itemname.indexOf('|X|') !== -1">
                  <template v-for="(val, index) in item.itemname.split(',')">
                    <myInput
                      :content="val"
                      :count="item.itemname.split(',').length"
                      :value.sync="item.remark"
                      :index="index"
                      :key="val"
                    />
                  </template>
                </span>
                <span v-else>
                  {{ item.itemname }}
                </span>
                <!-- 三级选项optionitems -->
                <div class="three_content">
                  <!-- <el-checkbox-group v-model="checkList"> -->
                  <div
                    class="three_options"
                    v-for="(item, index) in item.optionitems"
                    :key="index"
                  >
                    <span v-if="[-1].indexOf(item.inputtype) !== -1">
                      <span v-if="item.content.indexOf('|X|') !== -1">
                        <template
                          v-for="(val, index) in item.content.split(',')"
                        >
                          <myInput
                            :content="val"
                            :count="item.content.split(',').length"
                            :value.sync="item.remark"
                            :index="index"
                            :key="val"
                          />
                        </template>
                      </span>
                    </span>
                    <el-radio
                      v-model="sexradio"
                      v-if="[0, 3].indexOf(item.inputtype) !== -1"
                      :label="item.content"
                      style="margin-right: 5px"
                    >
                      <span v-if="item.content.indexOf('|X|') !== -1">
                        <template
                          v-for="(val, index) in item.content.split(',')"
                        >
                          <myInput
                            :content="val"
                            :count="item.content.split(',').length"
                            :value.sync="item.remark"
                            :index="index"
                            :key="val"
                          />
                        </template>
                      </span>
                      <span v-else>
                        {{ item.content }}
                      </span>
                    </el-radio>
                    <!-- <el-checkbox v-if="[2,4].indexOf(item.inputtype) !== -1" :label="item.content">{{ item.content }}</el-checkbox> -->
                    <!-- el-input item.content  -->
                    <el-checkbox
                      :label="item.hoyname"
                      v-if="[2, 4].indexOf(item.inputtype) !== -1"
                      v-model="item.flag"
                      :true-label="1"
                      :false-label="0"
                    >
                      <span v-if="item.content.indexOf('|X|') !== -1">
                        <template
                          v-for="(val, index) in item.content.split(',')"
                        >
                          <myInput
                            :content="val"
                            :disabled="item.flag == 0 ? true : false"
                            :count="item.content.split(',').length"
                            :value.sync="item.remark"
                            :index="index"
                            :key="val"
                          />
                        </template>
                      </span>
                      <span v-else>
                        {{ item.content }}
                      </span>
                    </el-checkbox>
                    <el-input
                      v-if="[1].indexOf(item.inputtype) !== -1"
                      size="mini"
                      v-model="item.remark"
                      style="width: 4rem"
                    ></el-input>
                    <el-input
                      v-if="[3, 4].indexOf(item.inputtype) !== -1"
                      :disabled="item.flag == 0"
                      size="mini"
                      v-model="item.remark"
                      style="width: 4rem"
                    ></el-input>
                  </div>
                </div>
                <!-- </el-checkbox-group> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 下一步按钮 -->
      <div class="btn_box">
        <van-button type="info" size="large" @click="handleJump"
          >下一步</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import myInput from "./input";
import { questionnaire } from "@/api/reservation.js";
export default {
  name: "",

  components: { myInput },

  data() {
    return {
      questionnairelist: [], // 问卷
      sexradio: [],
    };
  },

  mounted() {
    this.handleShowQuestionnaire();
  },

  methods: {
    handleJump() {
      this.$router.push("/scheme");
    },
    // 问卷调查点击回调
    handleShowQuestionnaire() {
      // 问卷
      questionnaire({ titlecode: 1006 }).then((res) => {
        this.questionnairelist = res.data.result;
        this.questionnairelist[0].questionnaireitems[0].remark = "王小波";
        this.questionnairelist[0].questionnaireitems[0].editstatus = 0;
        this.questionnairelist[0].questionnaireitems[1].selectvalue = "男";
        this.questionnairelist[0].questionnaireitems[1].editstatus = 0;
        this.questionnairelist[0].questionnaireitems[2].optionitems[0].remark =
          "1985|X|10|X|12";
        this.questionnairelist[0].questionnaireitems[2].editstatus = 0;
        this.questionnairelist[0].questionnaireitems[3].remark =
          "430922198510128914";
        this.questionnairelist[0].questionnaireitems[3].editstatus = 0;
      });
    },
  },

  watch: {},

  computed: {},
};
</script>
<style lang='scss' scoped>
.customized {
  height: calc(100vh - 94px);
  background-color: #f2f2f2;
  box-sizing: border-box;
  padding: 8px;
  position: relative;
  .questionnaire_content {
    border-radius: 8px;
    background-color: #fff;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    overflow-y: auto;
  }
  // 其他信息
  .life_habit {
    // padding-left: 20px;
    height: 90%;
    overflow-y: auto;
    overflow-x: hidden;
    .Questionnaire {
      padding-bottom: 20px;
      border-bottom: 1px solid #cccccc;
      .life_habit_title {
        line-height: 50px;
        display: flex;
        align-items: center;
        margin-top: 10px;
        .el-radio-group {
          margin-left: 20px;
        }
      }
      .life_habit_content {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        .basic_information {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-right: 20px;
          min-width: 60%;
          .two_topic {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .two_options {
              margin-right: 10px;
              .radiobox {
                width: 95vw;
                .el-radio__label {
                  width: 100% !important;
                }
              }
            }
          }
          .three_topic {
            display: flex;
            flex-wrap: wrap;
            padding-left: 20px;
            margin: 8px 0;
            width: 100%;
            .three_title {
              display: flex;
              line-height: 30px;
            }
            .three_content {
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              .three_options {
                display: flex;
                align-items: center;
                padding-left: 20px;
                .el-input {
                  margin-left: 10px;
                }
              }
            }
          }
        }
        span {
          line-height: 40px;
          margin-right: 10px;
          white-space: nowrap;
          .el-input {
            width: 75px;
          }
          .el-radio-group {
            margin-left: 20px;
          }
        }
      }
    }
  }
  .btn_box {
    height: 10%;
    display: flex;
    align-items: end;
  }
}
</style>