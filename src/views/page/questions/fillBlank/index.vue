<template>
    <div class="question_card">
        <div class="question-title">
            <span class="question-serialNumber">{{serialNumber}}. </span>
            <span class="question-title">{{question.title}}</span>
            <span class="question-score">({{question.totalScore}})分</span>
        </div>
        <div class="question-content">
            <div class="question-tiankong">Glorira邓紫棋</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
    question: {
      type: Object,
      default: () => { }
    }
  },
}
</script>


<style lang="less">
@import "~@/assets/css/questionModal.less";
.question-content {
  margin-top: 20px;
}
.question-tiankong {
    display: felx;
    flex-wrap: wrap;
}
</style>