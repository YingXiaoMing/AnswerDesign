<template>
  <div class="page-container">
    <div :style="pageSize"
         class="page_number_content">
      <answer-sheet-info @open-student-info-dialog="openStudentInfoDialog" />
      <div v-for="(question,index) in questions"
           :key="index + Date.now()">
        <objective-question v-if="question&&question.type==1"
        @edit_question="edit_question"
        @delete_question="delete_question"
        :question="question"/>
        <fill-blank-question v-if="question&&question.type==2" :question="question"/>
      </div>
    </div>
    <student-info-editor-modal ref="studentInfoEditorModal"
                               :student="sheet.student" />
    <question-editor-modal v-if="sheet"
                           ref="question"
                           :sheet="sheet" />
  </div>
</template>

<script>
import AnswerSheet, { PAGE_SIZE } from '@/models/answer-sheet'
import AnswerSheetInfo from '../answerSheet/answerSheetInfo'
import studentInfoEditorModal from '@/components/student-info-editor-modal'
import questionEditorModal from '@/components/QuestionEditorModel/'
import ObjectiveQuestion from '@/models/question/objective'
import objectiveQuestion from './objective'
import fillBlankQuestion from './fillBlank'

export default {
  components: {
    AnswerSheetInfo,
    questionEditorModal,
    studentInfoEditorModal,
    objectiveQuestion,
    fillBlankQuestion
  },
  data () {
    return {
      question: null
    }
  },
  props: {
    sheet: {
      type: AnswerSheet,
      required: true
    }
  },

  provide () {
    return {
      sheet: this.sheet
    }
  },

  computed: {
    pageSize () {
      return {
        width: `${this.sheet.sheetSize}px`,
        height: `${PAGE_SIZE}px`
      }
    },

    questions () {
      return this.sheet.questions
    }
  },

  methods: {
    openStudentInfoDialog () {
      this.$refs.studentInfoEditorModal.open()
    },
    edit_question (question) {
      this.$refs.question.open(new ObjectiveQuestion(question.toJSON(), this.sheet), false)
    },
    delete_question (question) {
      this.sheet.removeQuestion(question)
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/assets/css/publicColor.less";
.page-container {
  position: relative;
  padding-top: 30px;
  width: calc(100% - 330px);
  height: calc(100% - 20px);
  overflow: auto;
  float: left;

  .page_number_content {
    border: 1px solid @font-333;
    overflow: hidden;
    background: @white;
    border-radius: 3px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 20px;
    .question_card {
      position: relative;
      width: calc(100% - 38px);
      margin-left: 19px;
      margin-top: 20px;
    }
  }
}
</style>
