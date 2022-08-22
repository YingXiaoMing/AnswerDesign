<template>
  <div class="question_card">
    <div class="question-title">
      <span class="question-serialNumber">{{serialNumber}}. </span>
      <span class="question-title">{{question.title}}</span>
      <span class="question-score">({{question.totalScore}})分</span>
    </div>
    <div class="question-content">
      <div class="question-editor">
        <span class="btn_addSub_name">每组题数</span>
        <span class="btn_addSub">-</span>
        <span class="btn_addSub_info">{{question.groupSize}}</span>
        <span class="btn_addSub">+</span>
        <span class="layui-btn layui-btn-xs"
              @click="edit_question">编辑</span>
        <span class="layui-btn layui-btn-xs"
              @click="delete_question">删除</span>
      </div>
      <div class="question-choice">
        <div v-for="(group,index) in questionGroup"
             :key="index"
             class="question-choice-list">
          <div v-for="question in group"
               :key="question.serialNumber"
               class="question-choice-item">
            <span class="serial-number">{{question.serialNumber}}</span>
            <span class="choice-item">[<i>A</i>]</span>
            <span class="choice-item">[<i>B</i>]</span>
            <span class="choice-item">[<i>C</i>]</span>
            <span class="choice-item">[<i>D</i>]</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QUESTION_NUMBERS } from '@/models/question'
export default {
  props: {
    question: {
      type: Object,
      default: () => { }
    }
  },

  computed: {
    questionList () {
      return this.question
    },

    serialNumber () {
      return QUESTION_NUMBERS[this.question.serialNumber] || '一'
    },

    questionGroup () {
      const arr = []
      const { subquestions, groupSize } = this.question
      for (const i in subquestions) {
        arr.push(...subquestions[i].subquestions)
      }

      const productData = []
      const num = Math.ceil(arr.length / groupSize)
      for (let i = 0; i < num; i++) {
        productData.push(arr.slice(i * groupSize, i * groupSize + groupSize))
      }
      return productData
    }
  },
  methods: {
    edit_question () {
      this.$emit('edit_question', this.question)
    },
    delete_question () {
      this.$emit('delete_question', this.question)
    }
  }
}
</script>

<style lang="less">
@import "~@/assets/css/questionModal.less";

.question-content {
  margin-top: 20px;
}

.question-choice {
  display: flex;
  flex-wrap: wrap;
}

.question-choice-item {
  display: flex;
  align-items: center;
  font-size: 14px;

  .serial-number {
    font-size: 12px;
    width: 40px;
    text-align: right;
    display: inline-block;
    margin-right: 3px;
  }

  .choice-item {
    margin-left: 8px;
    font-size: 12px;
    position: relative;
    top: -1px;

    i {
      font-style: normal;
      padding: 0 1px;
    }
  }
}
</style>
