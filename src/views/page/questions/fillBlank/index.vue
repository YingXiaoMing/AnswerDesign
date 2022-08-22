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
.question-tiankong {
    display: felx;
    flex-wrap: wrap;
}
</style>