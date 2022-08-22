<template>
  <div class="question_card">
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入答题卡标题"
      v-model="sheet.title">
    </el-input>
    <student-info
      :student="sheet.student"
      @open-student-info-dialog="openStudentInfoDialog"
    />
    <div class="sheet-info">
      <precaution-column />
      <sheet-number-table />
    </div>
  </div>
</template>

<script>
import studentInfo from './subassembly/studentInfo'
import sheetNumberTable from './subassembly/sheetNumberTable'
import precautionColumn from './subassembly/precautionColumn'

export default {
  components: {
    studentInfo,
    sheetNumberTable,
    precautionColumn
  },

  inject: ['sheet'],

  methods: {
    openStudentInfoDialog () {
      this.$emit('open-student-info-dialog')
    }
  }
}
</script>

<style lang="less" >
  @import '~@/assets/css/publicColor.less';
  .el-textarea__inner {
    padding: 0 0 !important;
    border-style: dashed !important;
    border-color: @font-888 !important;
    text-align: center;
    font-size: 22px;
    color: @font-333 !important;
  }
  .layui-btn-xs {
    height: 22px;
    line-height: 22px;
    padding: 0 5px;
    font-size: 12px;
    display: inline-block;
    background-color: @main;
    color: @white;
    white-space: nowrap;
    text-align: center;
    border: none;
    border-radius: 2px;
    cursor: pointer;
  }
  .el-input--medium {
    font-size: 23px !important;
  }
  .el-textarea__inner {
    padding: 0 0 !important;
    border-style: dashed !important;
    border-color: @font-888 !important;
    height: 65px;
  }
  .textVal-style {
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    height: 65px;
    line-height: 65px;
  }
  .el-textarea__inner:focus{
    border-color: @main;
  }

  .sheet-info {
    display: flex;
    align-items: stretch;
    border: 1px solid @font-888;
    margin-top: 15px;

    .column-title {
      height: 38px;
      text-align: center;
      line-height: 38px;
      border-bottom: 2px solid @font-888;
    }
  }
</style>
