<template>
  <div class="single-choice-group question-group-item">
    <span>从</span>
    <el-input v-model.number="data.startNumber" size="mini" @blur="fireGroupChange"/>
    <span>题到</span>
    <el-input v-model.number="data.endNumber" size="mini" @blur="fireGroupChange"/>
    <span>题,每题</span>
    <el-input v-model.number="data.score" size="mini" @blur="fireGroupChange"/>
    <span>分,少选得</span>
    <el-input v-model.number="data.halfScore" size="mini" @blur="fireGroupChange"/>
    <span>分,每题</span>
    <el-input
      v-model.number="data.optionLength"
      size="mini"
      @blur="fireGroupChange"
    />
    <span>个选项</span>
    <i class="el-icon-delete" @click="$emit('remove', group)"></i>
  </div>
</template>

<script>
import { GroupMixins } from '../choice-mixins'

export default {
  mixins: [GroupMixins]
}
</script>
