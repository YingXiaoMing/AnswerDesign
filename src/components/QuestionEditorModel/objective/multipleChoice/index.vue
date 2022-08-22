<template>
  <div class="el-tab-panes">
    <!-- 题组信息 -->
    <div class="question-group-wrap">
      <multipleChoiceGroup
        ref="questionGroups"
        v-for="group in choice.groups"
        :key="group.uuid"
        :group="group"
        :question="question"
        @check-fail="error = $event"
        @group-valid="updateGroup"
        @remove="removeGroup"
      />
      <multipleChoiceGroup
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
        v-for="subQuestion in choice.subquestions"
        :key="subQuestion.serialNumber"
        :question="subQuestion"
      />
    </div>
  </div>
</template>

<script>
import multipleChoiceGroup from './group-item'
import questionItem from './question-item'
import { IndexMixins } from '../choice-mixins'

export default {
  components: {
    multipleChoiceGroup,
    questionItem
  },

  mixins: [IndexMixins],

  methods: {
    gennerateDraftGroup () {
      return {
        startNumber: this.question.avaliableSubquestionSerialNumber,
        endNumber: null,
        score: null,
        halfScore: null,
        optionLength: 4
      }
    }
  }
}
</script>
