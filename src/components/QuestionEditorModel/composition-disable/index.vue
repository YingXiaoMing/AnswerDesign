<template>
  <div class="question-content-warp">
    <!-- 禁止切换tabs -->
    <div class="no-switching-tabs"
         v-if="noSwitchingTabs" />
    <div class="el-tab-panes">
      <div class="question-group-wrap">
        <div class="single-choice-group">
          <div style="margin-top: 10px; text-align: center;">
            <el-row>
              <el-col :span="8"
                      style=" text-align: right; margin-right: 20px;height:30px;line-height:30px;">位置:</el-col>
              <el-col :span="10">
                <el-row>
                  <el-col :span="24">
                    <el-select v-model="question.position"
                               placeholder=""
                               size="small">
                      <el-option v-for="(item,index) in 10"
                                 :key="index"
                                 :value="item"
                                 :label="item"></el-option>
                    </el-select>
                  </el-col>

                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div style=" font-size: 10px; color: darkgrey;text-align: left;">注：非作答区将加在选中的大框后</div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>

          <div style="height:30px;line-height:30px;margin-top: 10px;text-align: center">
            <el-row>
              <el-col :span="8"
                      style=" text-align: right; margin-right: 20px;">高度:</el-col>
              <el-col :span="10">
                <el-input v-model.number="question.row"
                          size="small"
                          @blur="fireGroupChange" />
              </el-col>
              <el-col :span="2"> <span style="margin-left:10px">行</span></el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import CompositionDisableQuestion from '@/models/question/composition-disable'

export default {
  components: {

  },
  props: {
    questionData: {
      type: CompositionDisableQuestion,
      required: true
    }
  },

  inject: ['sheet'],

  data () {
    return {
      question: new CompositionDisableQuestion(this.questionData.toJSON(), this.sheet),
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
        this.question = new CompositionDisableQuestion(question.toJSON(), this.sheet)
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
</style>
