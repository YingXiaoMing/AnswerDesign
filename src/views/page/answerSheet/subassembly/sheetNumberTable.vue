<template>
  <div
    class="sheet-number-column"
    :style="{
      'max-width': 26 * sheet.sheetNumberLength + 'px'
    }"
  >
    <div class="column-title">
      准考证号
      <span
        class="precautions_edit layui-btn layui-btn-xs"
        @click="editAdmissionNumber"
        >编辑</span
      >
    </div>
    <table class="table_box" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <th
            v-for="n in sheet.sheetNumberLength"
            :key="n"
            width="25px"
          />
        </tr>
        <tr>
          <td
            v-for="c in sheet.sheetNumberLength"
            :key="c"
            width="25px"
          >
            <div
              v-for="r in 10"
              :key="r"
              class="number-cell"
            >
              [<span>{{ r - 1 }}</span>]
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  inject: ['sheet'],

  methods: {
    editAdmissionNumber () {
      const { sheetNumberRange, sheetNumberLength } = this.sheet
      this.$prompt('考号位数:', '编辑准考证号', {
        customClass: 'edit_admissonNum',
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        inputValue: sheetNumberLength,
        inputValidator: (value) => {
          if (value < sheetNumberRange[0] || value > sheetNumberRange[1]) {
            return false
          } else { return true }
        },
        inputType: 'number',
        inputErrorMessage: `请输入${sheetNumberRange[0]}~${sheetNumberRange[1]}之间的整数`
      }).then(({ value }) => {
        this.sheet.setSheetNumberLength(value)
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/css/publicColor.less';

.sheet-number-column {
  flex-shrink: 0;
  min-width: 224px;
  border-left: 1px solid @font-888;
}

.table_box {
  width: 100%;

  th {
    height: 28px;
    border-bottom: 2px solid @font-888;
  }

  td,
  th {
    border-left: 1px solid @font-333;
    text-align: center;

    &:first-child {
      border-left-color: transparent;
    }
  }

  .number-cell {
    display: flex;
    justify-content: center;
    font-size: 12px;
    text-align: center;
    padding-top: 4px;
    height: 16px;

    &:last-child {
      margin-bottom: 6px;
    }

    span {
      width: 9px;
    }
  }
}
.precautions_edit{
  position: absolute;
  right: 20px;
  margin-top: 8px;
}

.edit_admissonNum{
  .el-message-box__content{
    display: flex;
    justify-content:center;
    margin-top: 15px
  }

  .el-message-box__container{
    width: 75px;
  }

  .el-message-box__input {
    width: calc(100% - 100px);
    margin-left: 25px;
    padding-top: 0;

    input.el-input__inner {
        height: 30px;
        padding: 0 1px;
        text-indent: 1em;
    }
  }
}
</style>
