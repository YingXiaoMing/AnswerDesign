<template>
  <div
    class="grouping-detail-info"
  >
    <div class="question-number">{{data.serialNumber}}</div>
    <div class="question-info">
      <el-input v-model.number="data.score" size="mini" />
      <span>分,少选得</span>
      <el-input v-model.number="data.halfScore" size="mini" :max="data.score" />
      <span>分</span>
      <el-input
        v-model.number="data.optionLength"
        size="mini"
      />
      <span>个选项</span>
    </div>
  </div>
</template>

<script>
import MultipleChoice from '@/models/question/choice/multiple-choice'

export default {
  props: {
    question: {
      type: MultipleChoice,
      required: true
    }
  },
  data () {
    return {
      data: this.question
    }
  },
  watch: {
    question: {
      immediate: true,
      handler (question) {
        this.data = question
      }
    }
  }
}
</script>
