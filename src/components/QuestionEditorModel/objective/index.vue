<template>
  <div class="question-content-warp">
    <!-- 禁止切换tabs -->
    <div class="no-switching-tabs" v-if="noSwitchingTabs" />
    <el-tabs
      type="border-card"
      @tab-click="handleTabChange"
    >
      <el-tab-pane
        v-for="(choice, name) in questionData.subquestions"
        :key="name"
        :label="choice.title"
      >
        <component
          :is="name"
          :key="name"
          :choice="choice"
          :question="questionData"
          @check-fail="error = $event"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import ObjectiveQuestion from '@/models/question/objective'
import singleChoice from './singleChoice'
import multipleChoice from './multipleChoice'
import judgmentChoice from './judgmentChoice'

export default {
  components: {
    singleChoice,
    multipleChoice,
    judgmentChoice
  },
  props: {
    questionData: {
      type: ObjectiveQuestion,
      required: true
    }
  },

  inject: ['sheet'],

  data () {
    return {
      error: ''
    }
  },

  computed: {
    noSwitchingTabs () {
      return Boolean(this.error)
    },

    disabled () {
      return this.noSwitchingTabs || !Object.values(this.questionData.subquestions)
        .some(question => question.subquestions.length > 0)
    }
  },

  watch: {
    error () {
      this.$emit('form-validation', this.error)
    },

    disabled () {
      this.$emit('confirm-button', this.disabled)
    }
  },

  methods: {
    handleTabChange (tab) {
      tab.$children[0].resetDraftGroup()
    }
  }
}
</script>

<style lang="less">
  @import '~@/assets/css/publicColor.less';
  .question-content-warp{
    position: relative;

    .no-switching-tabs{
      position: absolute;
      height: 39px;
      background-color: transparent;
      margin-top: 0;
      width: 100%;
      z-index: 9999;
    }
  }

  .el-tabs--border-card{
    box-shadow: 0 0px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);

    &>.el-tabs__header{

      .el-tabs__item{

        &.is-active{
          color:@main
        }

        &:not(.is-disabled):hover{
          color:@main
        }
      }
    }
  }
  .el-tabs__content{
    min-height:288px;
  }
  // 复选框
  .el-checkbox__inner{
    &:hover{
      border-color:@main
    }
  }
  .question-groups-detail{

    .grouping-detail-info{
      display: flex;
      align-items:center;
      height: 39px;
      line-height: 39px;
      border-bottom: 1px solid @font-888;
      font-size: 14px;
      position: relative;

      &:last-child{
        border-bottom: none;
      }

      .question-number{
        width: 120px;
        flex-shrink: 0;
        order:0;
        text-indent: 1em;
      }

      .question-info{
        flex-shrink: 1;
        align-self: flex-end;
        order:1;
        text-align: center;
        display: flex;
        justify-content:flex-end;
        position: absolute;
        right: 0;

        span{
          margin: 0 8px;
        }

        .el-input{
          &.el-input--mini{
            width: 60px;

            .el-input__inner{
              padding: 0 0;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
