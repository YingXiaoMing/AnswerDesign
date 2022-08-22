<template>
  <div class="precautions-column">
    <div class="column-title">注 意 事 项</div>
    <div class="precautions_content">
      <div
        v-for="(precaution, index) in precautions"
        :key="index"
        :class="['precaution',{'narrow':sheetColumn === 3}]"
      >
        <span>{{ index + 1 }}. </span>
        <span>{{ precaution }}</span>
      </div>
    </div>
    <div
      :class="['tugaifangshi',{'narrow':sheetColumn === 3}]"
    >
      <div class="tugaifangshi-item">
        <span>正确填涂</span>
        <div class="rect rect-solid" />
      </div>
      <div class="tugaifangshi-item">
        <span>缺考标记</span>
        <div class="rect"></div>
      </div>
    </div>
  </div>
</template>

<script>
import AnswerSheet from '@/models/answer-sheet'

export default {
  inject: ['sheet'],

  computed: {
    precautions () {
      return AnswerSheet.Precautions
    },
    sheetColumn () {
      return this.sheet.settings.column
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/css/publicColor.less';

.precautions-column {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .precautions_content {
    padding-top: 7px;
    flex-grow: 1;
    max-height: 180px;
    overflow: hidden;
  }

  .precaution {
    margin-left: 10px;
    padding: 7px 0;
    font-size: 14px;

    &.narrow{
      padding: 2px 0;
    }
  }

  .tugaifangshi {
    height: 48px;
    display: flex;
    align-items: center;
    border-top: 1px solid @font-888;

    .tugaifangshi-item {
      margin-left: 10px;
      min-width: 120px;
      font-size: 18px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    &.narrow{
      .tugaifangshi-item{
        font-size: 16px;
        .rect{
          width: 13px;
          height: 6px;
          margin-top: 3px;
        }
      }
    }

    .rect {
      width: 15px;
      height: 8px;
      margin-left: 20px;
      border: 1px solid @font-333;

      &.rect-solid {
        background-color: @font-333;
      }
    }
  }
}
</style>
