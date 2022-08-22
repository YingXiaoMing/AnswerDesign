<template>
  <div class="el-tab-panes">
    <!-- 题组信息 -->
    <div class="question-group-wrap">
      <JudgmentChoiceGroup
        ref="questionGroups"
        v-for="group in choice.groups"
        :key="group.uuid"
        :group="group"
        :question="question"
        @check-fail="error = $event"
        @group-valid="updateGroup"
        @remove="removeGroup"
      />
      <JudgmentChoiceGroup
        v-if="draftGroup"
        ref="questionGroups"
        :group="draftGroup"
        :question="question"
        @check-fail="error = $event"
        @group-valid="addGroup"
        @remove="removeGroup"
      />
    </div>

    <!-- 分段小题 -->
    <div
      class="add-question-group"
      @click="addDraftGroup"
    >+ 分段添加小题</div>

    <!-- 小题详情 -->
    <div class="question-groups-detail">
      <question-item
        v-for="item in choice.subquestions"
        :key="item.serialNumber"
        :question="item"
      />
    </div>
  </div>
</template>

<script>
import JudgmentChoiceGroup from './group-item'
import questionItem from './question-item'
import SwitchChoice from '@/models/question/choice/switch-choice'
import { IndexMixins } from '../choice-mixins'

export default {
  components: {
    JudgmentChoiceGroup,
    questionItem
  },

  mixins: [IndexMixins],

  methods: {
    gennerateDraftGroup () {
      return {
        startNumber: this.question.avaliableSubquestionSerialNumber,
        endNumber: null,
        score: null,
        optionLength: SwitchChoice.MaxOptionLength
      }
    }
  }
}
</script>
