<template>
  <div
    class="grouping-detail-info"
  >
     <div class="question-number"      >题{{data.serialNumber}}</div>
    <div class="question-info">
      <span>共</span>
      <el-input v-model.number="data.rows"
                size="mini" />
      <span>行</span>
      <el-input v-model.number="data.score"
                size="mini" />
      <span>分</span>
      <span style="margin-left:150px;color: blue;cursor: pointer;">+添加小题</span>
      <span style="margin-left:10px;margin-right:20px;color: blue;cursor: pointer;">-</span>
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
