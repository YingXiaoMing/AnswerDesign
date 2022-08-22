<template>
  <el-dialog :title="title"
             :visible.sync="dialogVisible"
             :width="'500px'"
             :before-close="close"
             :show-close="false">
    <div class="layout-setting-box">
      <el-row>
        <el-col :span="6">纸张大小</el-col>
        <el-col :span="18"
                class="layout-box">
          <div v-for="item in allowedSize"
               :key="item.value"
               :style="{
              color: size === item.value ? '#1ab394' : '#b4b4b4'
            }"
               class="layout-size"
               @click="size = item.value">
            <div :class="['paper-size',item.value]">{{ item.value }}</div>
            <div>{{ item.label }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">答题卡布局</el-col>
        <el-col :span="18"
                class="layout-box">
          <div v-for="item in allowedColumns"
               :key="item.value"
               :style="{
              color: column === item.value ? '#1ab394' : '#b4b4b4'
            }"
               class="page-column"
               @click="column = item.value">
            <div :class="['paper-size',item.value]" />
            <div>{{ item.label }}</div>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">阅卷方式</el-col>
        <el-col :span="16"
                class="layout-box" style="margin-top:15px;">
                <el-radio-group v-model="type">
                <el-radio v-for="item in allowedType" :key="item.value" :label="item.value"></el-radio>
                </el-radio-group>

        </el-col>
      </el-row>

    </div>
    <div class="dialog-footer ">
      <el-button v-if="editing"
                 type="cancel"
                 class="cancel"
                 @click="close">取 消</el-button>
      <el-button type="confirm"
                 class="confirm"
                 @click="handleDetermine">{{ suretext }}</el-button>
    </div>
  </el-dialog>

</template>

<script>

import AnswerSheet, { SHEET_SIZE_LABEL, SHEET_TYPE } from '@/models/answer-sheet'

export default {
  components: {

  },
  data () {
    return {
      dialogVisible: false,
      editing: false,
      sheet: new AnswerSheet()
    }
  },
  computed: {
    title () {
      return this.editing ? '编辑答题卡' : '创建答题卡'
    },
    suretext () {
      return this.editing ? '确 定' : '创 建'
    },
    size: {
      get () {
        return this.sheet.settings.size
      },
      set (size) {
        this.sheet.updateSettings({
          size,
          column: this.sheet.settings.column,
          type: this.sheet.settings.type
        })
      }
    },
    column: {
      get () {
        return this.sheet.settings.column
      },
      set (column) {
        this.sheet.updateSettings({
          size: this.sheet.settings.size,
          column,
          type: this.sheet.settings.type
        })
      }
    },
    type: {
      get () {
        return this.sheet.settings.type || SHEET_TYPE[0]
      },
      set (type) {
        this.sheet.updateSettings({
          size: this.sheet.settings.size,
          column: this.sheet.settings.column,
          type
        })
      }
    },
    allowedSize () {
      return AnswerSheet.AllowedSheetSize.map(size => ({
        value: size,
        label: SHEET_SIZE_LABEL[size]
      }))
    },
    allowedColumns () {
      return this.sheet.allowedColumns.map(column => ({
        value: column,
        label: `${column}栏`
      }))
    },
    allowedType () {
      return AnswerSheet.AllowedSheetType.map(type => ({
        value: type,
        label: type
      }))
    }
  },
  methods: {
    open (sheet) {
      this.dialogVisible = true
      if (sheet) {
        this.sheet = new AnswerSheet(sheet.toJSON())
        this.editing = true
      }
    },
    handleDetermine () {
      this.close()
      this.$emit('update-settings', {
        size: this.size,
        column: this.column,
        type: this.type
      })
    },

    close () {
      this.dialogVisible = false
      this.editing = false
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/publicColor.less";
.el-col.el-col-6 {
  position: relative;
  top: 10px;
}
.layout-box {
  display: flex;
  flex-wrap: wrap;
}
.layout-size,
.page-column {
  width: 100px;
  text-align: center;
  margin-left: 20px;
}
.paper-size {
  display: inline-block;
  width: 50px;
  height: 40px;
  border: 2px solid;
  border-radius: 3px;
  line-height: 50px;
  cursor: pointer;
  text-align: center;
}
.paper-size.A4 {
  width: 40px;
}
.el-row {
  margin: 20px 0;
}
.dialog-footer {
  border-top: 1px solid #f7f7f7;
}
</style>
