<template>
  <div class="layout-content">
    <div class="box">
      <div class="total-score">
        <span>当前总分:</span>
        <span class="score_style">{{ totalScore }}</span>
        <span>分</span>
      </div>
      <div class="layout-setting">
        <div class="layout-top">
          <span>布局</span>
          <span class="layout-edit" @click="openSettingModal">修改</span>
        </div>
        <div class="layout-bottom">
          <div>{{ sheetSizeLabel }}</div>
          <div>{{ sheetColumnLabel }}</div>
          <div>{{ sheetTypeLabel }}</div>
        </div>
      </div>
    </div>
    <setting-modal
      ref="settingModal"
      @update-settings="updateSettings"
    />
  </div>
</template>

<script>
import AnswerSheet, { SHEET_SIZE_LABEL, SHEET_COLUMN, SHEET_TYPE } from '@/models/answer-sheet'
// dialog
import settingModal from '@/components/setting-modal'

export default {
  components: {
    settingModal
  },

  props: {
    sheet: {
      type: AnswerSheet,
      default: null
    }
  },

  computed: {
    totalScore () {
      if (!this.sheet) return 0
      // TODO: compute score by this.sheet
      return 23
    },

    sheetSizeLabel () {
      return this.sheet
        ? SHEET_SIZE_LABEL[this.sheet.settings.size]
        : SHEET_SIZE_LABEL[AnswerSheet.AllowedSheetSize[0]]
    },

    sheetColumnLabel () {
      return this.sheet
        ? `${this.sheet.settings.column}栏`
        : `${SHEET_COLUMN[AnswerSheet.AllowedSheetSize[0]][0]}栏`
    },
    sheetTypeLabel () {
      return this.sheet
        ? `${this.sheet.settings.type}`
        : `${SHEET_TYPE[0]}`
    }
  },

  mounted () {
    if (!this.sheet) this.openSettingModal()
  },

  methods: {
    openSettingModal () {
      if (this.sheet) {
        this.$confirm(
          `<div class="Prompt_info">
            <i class="el-icon-question"></i>修改后将会清空所有手动修改的内容，确定修改吗？
          </div>`,
          '提示',
          {
            dangerouslyUseHTMLString: true
          }
        ).then(() => {
          this.$refs.settingModal.open(this.sheet)
        }).catch(() => {
          console.log('cancel')
        })
      } else {
        this.$refs.settingModal.open(this.sheet)
      }
    },

    updateSettings (settings) {
      if (this.sheet) {
        this.sheet.updateSettings(settings)
      } else {
        this.$emit('create-sheet', {
          settings
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/publicColor.less';
  .layout-content{
    .box{
      position: fixed;
      top: 90px;
      left: 10px;
      z-index: 99;
    }
  }
  .total-score{
    font-size: 14px;
    min-width: 110px;
    .score_style{
      font-size: 18px;
      font-weight: 500;
      margin: 0 5px;
      color: @main
    }
  }
  .layout-setting{
    border: 1px solid @main;
    min-width: 93px;
    max-width: 100px;
    background: @white;
    margin-top: 10px;
    font-size: 14px;
    .layout-top{
      background-color: @font-f7f8;
      padding: 5px 8px;
    }
    .layout-edit {
      color: @mainFont !important;
      cursor: pointer;
      float: right;
    }
    .layout-bottom {
      background-color: @white;
      padding: 10px 8px;
      line-height: 22px;
    }
  }
</style>

<style lang="less">
  @import '~@/assets/css/publicColor.less';
  .Prompt_info {
    height: 50px;
    font-size: 14px;
    padding-top: 20px;
    i {
      font-size: 24px;
      color: @warning;
      position: relative;
      top: 3px;
      margin-right: 5px;
    }
  }
  .el-message-box__header{
    text-align: center;
    padding: 10px 0;
    background-color: #f8f8f8;
    .el-message-box__headerbtn{
      top:10px
    }
  }
</style>
