<template>
  <el-dialog v-if="question"
             :title="question.title"
             :visible.sync="dialogVisible"
             :width="'620px'"
             :before-close="cancel">
    <div class="question-edit-wrap">
      <!-- 题型参数 -->
      <div class="layui-form"
           v-if="question&&question.type!=7">
        <div class="layui-form-item">
          <div class="label">大题题号:</div>
          <el-select v-model="questionIndex"
                     size="small"
                     placeholder="">
            <el-option v-for="(item,index) in options"
                       :key="index"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="layui-form-item long">
          <div class="label">题目:</div>
          <el-input v-model="question.title"
                    placeholder="请输入内容" />
        </div>
        <div style="float:left;margin-left:20px;line-height: 30px;"
             v-if="question.type!=1&&question.type!=4">
          <el-checkbox label="附加题"
                       v-model="question.attach"></el-checkbox>
        </div>
      </div>
      <!-- 客观题tabs -->
      <objective-question-tabs v-if="question&&question.type==1"
                               ref="objectiveTabs"
                               :question-data="question"
                               @form-validation="formValidation"
                               @confirm-button="isDisabled = $event" />
      <!-- 填空题 -->
      <fillintheblankQuestionTabs v-if="question&&question.type==2"
                                  ref="objectiveTabs"
                                  :question-data="question"
                                  @form-validation="formValidation"
                                  @confirm-button="isDisabled = $event" />
      <!-- 解答题 -->
      <answerQuestionTabs v-if="question&&question.type==3"
                          ref="objectiveTabs"
                          :question-data="question"
                          @form-validation="formValidation"
                          @confirm-button="isDisabled = $event" />
      <!-- 选作题 -->
      <chooseToDoQuestionTabs v-if="question&&question.type==4"
                              ref="objectiveTabs"
                              :question-data="question"
                              @form-validation="formValidation"
                              @confirm-button="isDisabled = $event" />
      <!-- 作文-英语 -->
      <CompositionEnglishQuestionTabs v-if="question&&question.type==5"
                                      ref="objectiveTabs"
                                      :question-data="question"
                                      @form-validation="formValidation"
                                      @confirm-button="isDisabled = $event" />

      <!-- 作文-语文 -->
      <CompositionChineseQuestionTabs v-if="question&&question.type==6"
                                      ref="objectiveTabs"
                                      :question-data="question"
                                      @form-validation="formValidation"
                                      @confirm-button="isDisabled = $event" />

      <!-- 非作答区 -->
      <CompositionDisableQuestionTabs v-if="question&&question.type==7"
                                      ref="objectiveTabs"
                                      :question-data="question"
                                      @form-validation="formValidation"
                                      @confirm-button="isDisabled = $event" />
      <div v-if="errorMessage"
           class="error-message">{{ errorMessage }}</div>
    </div>
    <div class="dialog-footer ">
      <el-button type="cancel"
                 class="cancel"
                 @click="cancel">取 消</el-button>
      <el-button type="cancel"
                 class="confirm"
                 :disabled="isDisabled"
                 @click="handleDetermine">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { QUESTION_NUMBERS } from '@/models/question'

import objectiveQuestionTabs from './objective'
import fillintheblankQuestionTabs from './fillintheblank'
import answerQuestionTabs from './answer'
import chooseToDoQuestionTabs from './choose-to-do'
import CompositionEnglishQuestionTabs from './composition-english'
import CompositionChineseQuestionTabs from './composition-chinese'
import CompositionDisableQuestionTabs from './composition-disable'
export default {
  components: {

    objectiveQuestionTabs,
    fillintheblankQuestionTabs,
    answerQuestionTabs,
    chooseToDoQuestionTabs,
    CompositionEnglishQuestionTabs,
    CompositionChineseQuestionTabs,
    CompositionDisableQuestionTabs
  },
  inject: ['sheet'],

  data () {
    return {
      question: null,
      dialogVisible: false,
      options: QUESTION_NUMBERS.map((label, value) => ({
        label,
        value
      })),
      insertOptions: [
        {
          value: 1,
          label: '一.选择题'
        }
      ],
      insert: true,
      postpone: false,
      errorMessage: '',
      isDisabled: true
    }
  },
  computed: {
    isNewQuestion () {
      if (!this.question) return true
      return !this.sheet.questions[this.question.serialNumber]
    },

    questionIndex: {
      get () {
        return (this.question && this.question.serialNumber) || 0
      },
      set (number) {
        if (this.sheet.questions[number]) {
          console.warn(`大题号${number}已经存在`)
        } else {
          this.question.serialNumber = number
        }
      }
    }
  },
  methods: {
    cancel () {
      this.close()
    },
    close () {
      this.dialogVisible = false
      this.question = null
    },
    open (question, disable) {
      this.question = question
      this.dialogVisible = true
      this.isDisabled = disable ?? true
    },
    handleDetermine () {
      console.log('曾经的恋爱算什么')
      console.log(this.question)
      this.sheet.addQuestion(this.question)
      this.close()
    },
    formValidation (error) {
      this.errorMessage = error
    }
  }
}
</script>

<style lang="less" >
@import "~@/assets/css/questionModal.less";
.layui-form {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 15px;

  .layui-form-item {
    width: 40%;
    display: flex;
    align-items: center;

    .el-input__inner {
      height: 30px;
    }
    .label {
      width: 80px;
    }

    & > .el-input {
      width: calc(100% - 130px);
    }
    .el-select {
      width: calc(100% - 130px);
    }
    &.long {
      .el-input {
        width: calc(100% - 60px);
      }
    }
  }

  &:nth-child(n + 2) {
    margin-top: 20px;
  }
}
// 插入操作样式
.insert-wrap {
  display: flex;
  align-items: center;
  margin-top: 10px;

  .insert-select {
    width: 260px;

    .el-select {
      margin: 0 5px;
      width: 130px;
    }
  }
}
.error-message {
  font-size: 14px;
  color: red;
  margin-top: 10px;
}
</style>
