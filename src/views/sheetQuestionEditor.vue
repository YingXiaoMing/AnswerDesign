<template>
  <div class="basic-set-content">
    <div class="basis-title">
      <span>设置答题卡基础信息</span>
    </div>
    <div class="basis_checkbox" style="margin-left:20px">
      <el-checkbox>密封线</el-checkbox>
      <div style="margin-left:20px;margin-top: 20px;">
        <el-radio-group>
          <el-radio label="考号填涂区"></el-radio>
          <el-radio label="条形码"></el-radio>
          <el-radio label="手写考号"></el-radio>
        </el-radio-group>
        <el-checkbox label="注意事项与缺考标记"></el-checkbox>
        <el-checkbox label="每页填写考号"></el-checkbox>
      </div>

      <div style="margin-top:20px;width: 100%;">
        <el-row style="height:30px">
          <el-col :span="12">
            <el-checkbox>存在AB卷</el-checkbox>
          </el-col>
          <el-col :span="12">
            <el-checkbox>红色答题卡</el-checkbox>
          </el-col>
        </el-row>
        <el-row style="height:30px">
          <el-col :span="12">
            <el-checkbox>客观题竖向排列</el-checkbox>
          </el-col>
          <el-col :span="12">
            <el-checkbox>分区答题卡</el-checkbox>
          </el-col>
        </el-row>
        <el-row style="height:30px">
          <el-col :span="12">
            <el-checkbox>自定义页眉</el-checkbox>
          </el-col>
        </el-row>
      </div>

    </div>
    <div class="basis-title">
      <span>添加题目</span>
    </div>
    <div class="basis_checkbox basic_subject_btn">
      <div class="subjectbtton"
           @click="objectiveDialog">
        客观题
      </div>
      <div class="subjectbtton"
           @click="fillintheblankDialog">
        填空题
      </div>
      <div class="subjectbtton"
           @click="answerDialog">
        解答题
      </div>
      <div class="subjectbtton"
           @click="chooseToDoDialog">
        选做题
      </div>
      <div class="subjectbtton"
           @click="compositionEnglishDialog">
        作文(英)
      </div>
      <div class="subjectbtton"
           @click="compositionChineseDialog">
        作文(语)
      </div>
      <div class="subjectbtton"
           @click="compositionDisableDialog">
        非作答区
      </div>
    </div>
    <div class="basis_checkbox basic_btn save-btn">
      <el-button type="primary">预览</el-button>
      <el-button type="primary">保存</el-button>
      <el-button type="primary">下载</el-button>
    </div>
    <question-editor-modal v-if="sheet"
                           ref="question"
                           :sheet="sheet" />
  </div>
</template>

<script>
import AnswerSheet from '@/models/answer-sheet'

import questionEditorModal from '@/components/QuestionEditorModel/'

import ObjectiveQuestion from '@/models/question/objective'
import FillintheblankQuestion from '@/models/question/fillintheblank'
import AnswerQuestion from '@/models/question/answer'
import ChooseToDoQuestion from '@/models/question/choose-to-do'
import CompositionEnglishQuestion from '@/models/question/composition-english'
import CompositionChineseQuestion from '@/models/question/composition-chinese'
import CompositionDisableQuestion from '@/models/question/composition-disable'

export default {
  components: {
    questionEditorModal
  },

  props: {
    sheet: {
      type: AnswerSheet,
      defualt: new AnswerSheet()
    }
  },

  provide () {
    return {
      sheet: this.sheet
    }
  },

  data () {
    return {
      checked: false
    }
  },

  methods: {
    objectiveDialog () {
      this.$refs.question.open(new ObjectiveQuestion({
        serialNumber: this.sheet.avaliableQuestionSerialNumber,
        subquestions: {
          singleChoice: {
            groups: [],
            subquestions: []
          },
          multipleChoice: {
            groups: [],
            subquestions: []
          },
          judgmentChoice: {
            groups: [],
            subquestions: []
          }
        }
      }, this.sheet))
    },
    fillintheblankDialog () {
      this.$refs.question.open(new FillintheblankQuestion({
        serialNumber: this.sheet.avaliableQuestionSerialNumber,
        subquestions: {
          shortfillintheblank: {
            groups: [],
            subquestions: {
              shortfillintheblankitem: {
                groups: [],
                subquestions: []
              }
            }
          },
          longfillintheblank: {
            groups: [],
            subquestions: []
          }
        }
      }, this.sheet))
    },
    answerDialog () {
      this.$refs.question.open(new AnswerQuestion({
        serialNumber: this.sheet.avaliableQuestionSerialNumber,
        subquestions: []
      }, this.sheet))
    },
    chooseToDoDialog () {
      this.$refs.question.open(new ChooseToDoQuestion({
        serialNumber: this.sheet.avaliableQuestionSerialNumber,
        subquestions: []
      }, this.sheet))
    },
    compositionEnglishDialog () {
      this.$refs.question.open(new CompositionEnglishQuestion({
        serialNumber: this.sheet.avaliableQuestionSerialNumber,
        subquestions: []
      }, this.sheet))
    },
    compositionChineseDialog () {
      this.$refs.question.open(new CompositionChineseQuestion({
        serialNumber: this.sheet.avaliableQuestionSerialNumber,
        subquestions: []
      }, this.sheet))
    },
    compositionDisableDialog () {
      this.$refs.question.open(new CompositionDisableQuestion({
        serialNumber: this.sheet.avaliableQuestionSerialNumber,
        subquestions: []
      }, this.sheet))
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/publicColor.less";
.basis-title {
  border-left: none;
  border-right: none;
  background-color: @bf-f7;
  height: 40px;
  line-height: 40px;
  text-align: left;
  font-size: 16px;
  font-weight: 700;
  padding: 0 30px;
  border-bottom: 1px solid @bs-e3;
}
.basis_checkbox {
  padding: 20px 0;
  border-bottom: 1px solid @shadow;
  display: flex;
  flex-wrap: wrap;
  padding-left: 15px;
  button.el-button.el-button--default {
    width: 90px;
    margin-left: 10px;
    margin-top: 10px;
  }
}
.basic_subject_btn {
  width: 100%;
  height: auto;
  margin: 0 auto;
  .subjectbtton {
    border: 1px solid #1daef8;
    width: 80px;
    margin: 5px 5px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #1daef8;
    font-size: 15px;
    display: inline-block;
    cursor: pointer;
    padding-left: 10px;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURUxpcRCV2xCV2hCW2xCV2xGW2xCW3BCW2xCW2xCW2hCV2xCW2hCV2hCW2xCV2hCP3xGW23Ts7tIAAAAQdFJOUwDvn3CA8FDAv6Dg32+vYBA72b3KAAAAZ0lEQVQ4y+3TSw7AIAgEUKyIxf68/2krTaNx0WnSpDtnh7ywkEDUhV2eCGTPJR4ANaAARANxgE/gWLe5xhlwrZ7k/v7nMOF+XihgEIgxKLsXjTXXuNBq9WObP4HX0xMDgs6bU+L+5QTEhxFPA7KtagAAAABJRU5ErkJggg==");
    background-repeat: no-repeat;
    background-position: 5px center;
    background-size: 10px 10px;
  }
}
.el-button--medium {
  padding: 0 0;
  width: 90px;
  padding: 0;
  height: 38px;
  line-height: 36px;
}
</style>
