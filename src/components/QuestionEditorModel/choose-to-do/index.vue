<template>
  <div class="question-content-warp">
    <!-- 禁止切换tabs -->
    <div class="no-switching-tabs"
         v-if="noSwitchingTabs" />
    <div class="el-tab-panes">
      <div class="question-group-wrap">
        <div class="single-choice-group question-group-item">
          <span>几选几:</span>
          <el-input v-model.number="question.startNumber"
                    size="mini"
                    @blur="fireGroupChange" />
          <span>选</span>
          <el-input v-model.number="question.endNumber"
                    size="mini"
                    @blur="fireGroupChange" />
          <span>;每题</span>
          <el-input v-model.number="question.endNumber"
                    size="mini"
                    @blur="fireGroupChange" />
          <span>分</span>
          <span>;题号</span>
          <el-input v-model.number="question.endNumber"
                    size="mini"
                    @blur="fireGroupChange" />
          <span>到</span>
          <el-input v-model.number="question.endNumber"
                    :disabled='true'
                    size="mini"
                    @blur="fireGroupChange" />
        </div>
      </div>
      <!-- 小题详情 -->
      <div class="question-groups-detail">
        <question-item v-for="item in question.subquestions"
                       :key="item.serialNumber"
                       :question="item" />
      </div>
      <div style="margin-top:10px;">
        <span>
          <el-checkbox label="生成解答横线"
                       v-model="question.Horizontalline"></el-checkbox>
        </span>
        <span style="margin-left:20px;">
          行数:
        </span>
        <span>
          <el-input v-model.number="question.rows"
                    size="mini"
                    @blur="fireGroupChange" />
        </span>
        <span>
          行
        </span>
      </div>
    </div>

  </div>
</template>

<script>

import ChooseToDoQuestion from '@/models/question/choose-to-do'
import questionItem from './question-item'

export default {
  components: {
    questionItem
  },
  props: {
    questionData: {
      type: ChooseToDoQuestion,
      required: true
    }
  },

  inject: ['sheet'],

  data () {
    return {
      question: new ChooseToDoQuestion(this.questionData.toJSON(), this.sheet),
      error: ''
    }
  },

  computed: {
    noSwitchingTabs () {
      return Boolean(this.error)
    },

    disabled () {
      return this.noSwitchingTabs || !Object.values(this.question.subquestions)
        .some(question => question.subquestions.length > 0)
    }
  },

  watch: {
    questionData: {
      handler (question) {
        this.question = new ChooseToDoQuestion(question.toJSON(), this.sheet)
      }
    },

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
    },
    fireGroupChange () {
      if (this.errorMessage) {
        this.$emit('check-fail', this.errorMessage)
      } else {
        this.$emit('group-valid', { ...this.data })
      }
    }
  }
}
</script>

<style lang="less">
@import "~@/assets/css/publicColor.less";
.question-content-warp {
  position: relative;

  .no-switching-tabs {
    position: absolute;
    height: 39px;
    background-color: transparent;
    margin-top: 0;
    width: 100%;
    z-index: 9999;
  }
}

.el-tabs--border-card {
  box-shadow: 0 0px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);

  & > .el-tabs__header {
    .el-tabs__item {
      &.is-active {
        color: @main;
      }

      &:not(.is-disabled):hover {
        color: @main;
      }
    }
  }
}
.el-tabs__content {
  min-height: 288px;
}
// 复选框
.el-checkbox__inner {
  &:hover {
    border-color: @main;
  }
}
.question-groups-detail {
  .grouping-detail-info {
    display: flex;
    align-items: center;
    height: 39px;
    line-height: 39px;
    border-bottom: 1px solid @font-888;
    font-size: 14px;
    position: relative;

    &:last-child {
      border-bottom: none;
    }

    .question-number {
      width: 120px;
      flex-shrink: 0;
      order: 0;
      text-indent: 1em;
    }

    .question-info {
      flex-shrink: 1;
      align-self: flex-end;
      order: 1;
      text-align: center;
      display: flex;
      justify-content: flex-end;
      position: absolute;
      right: 0;

      span {
        margin: 0 8px;
      }
    }
  }
}
.el-input {
  &.el-input--mini {
    width: 60px;

    .el-input__inner {
      padding: 0 0;
      text-align: center;
    }
  }
}
</style>
