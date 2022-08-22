<template>
  <div class="grouping-detail-info">
    <div class="question-number"
         :class="(show?'down':'right')"
         @click="show=!show">题{{data.serialNumber}}</div>
    <div class="question-info">
      <span>共</span>
      <el-input v-model.number="data.space"
                size="mini" />
      <span>空</span>

      <span>每空</span>
      <el-input v-model.number="data.score"
                size="mini" />
      <span>分</span>

      <span>共{{score}}分</span>

      <span style="margin-left:70px;color: blue;cursor: pointer;">+添加小题</span>
      <span style="margin-left:10px;margin-right:20px;color: blue;cursor: pointer;">-</span>
    </div>

    <div v-show="show" style="border-bottom:1px sold #000000">
      <div v-for="(item,index) in data.subquestions"
           :key="index">
        <span>第{{index+1}}空</span>
        <el-input value="item"
                  size="mini" />
        <span>分</span>
      </div>
    </div>

  </div>
</template>

<script>
import AnswerQuestion from '@/models/question/answer'

export default {
  props: {
    question: {
      type: AnswerQuestion,
      required: true
    }
  },
  data () {
    return {
      data: this.question,
      show: false,
      score: 0
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
<style lang="less">
.question-number {
  padding-left: 15px;
  cursor: pointer;
}
.down {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURUxpcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJuxkb8AAAAPdFJOUwAQ0M+fgKCQUPB/cMC/4NkJcTIAAACDSURBVCjPzdCxDYQwDAXQT0EPnHR9JkCIGsEm6DZhE9iIXQDpipP4BOLEYYETbmx/vcYG/lNpPencDEDPze9Jyx9AspPgRa5XsAXAHZgDsYBfoPDkBDS2l0JOsGQQkgUgpFLgyJoHIKRW4AgVCImAJ0YvvkgEHDHxUyy5AeA9fvCoOgBVnmVlqaz9JQAAAABJRU5ErkJggg==);
  background-repeat: no-repeat;
  background-size: 15px 15px;
  background-position: 10px center;
}
.right {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAhUExURUxpcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL4knnQAAAAKdFJOUwAQoJ/Qz5CAsI/QYRJIAAAASElEQVQoz2NgwAbYJ6AJaC1G5bOtWmWAIsCxahWqEkYvdCUig11JAopAFJqA6KpVi9AVKAw2BRxoCkARpYAWlYvQIzuBATcAALYxNCv6RN4XAAAAAElFTkSuQmCC);
  background-repeat: no-repeat;
  background-size: 15px 15px;
  background-position: 10px center;
}
</style>
