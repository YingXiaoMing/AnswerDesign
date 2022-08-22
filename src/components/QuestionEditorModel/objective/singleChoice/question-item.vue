<template>
  <div
    class="grouping-detail-info"
  >
    <div class="question-number">{{data.serialNumber}}</div>
    <div class="question-info">
      <el-input v-model.number="data.score" size="mini" />
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
import Choice from '@/models/question/choice'
export default {
  props: {
    question: {
      type: Choice,
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
