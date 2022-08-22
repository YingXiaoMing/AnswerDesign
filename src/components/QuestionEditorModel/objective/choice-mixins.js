import ObjectiveQuestion from '@/models/question/objective'
import ChoiceQuestion from '@/models/question/choice_question'

export const IndexMixins = {
  inject: ['sheet'],

  props: {
    question: {
      type: ObjectiveQuestion,
      required: true
    },
    choice: {
      type: ChoiceQuestion,
      required: true
    }
  },

  data () {
    return {
      error: '',
      draftGroup: null
    }
  },

  created () {
    if (!this.choice.groups.length) {
      this.addDraftGroup()
    }
  },

  watch: {
    error () {
      this.$emit('check-fail', this.error)
    }
  },

  methods: {
    resetDraftGroup () {
      if (this.draftGroup) {
        this.draftGroup = {
          ...this.draftGroup,
          startNumber: this.question.avaliableSubquestionSerialNumber
        }
      }
    },

    addGroup (group) {
      this.error = ''
      this.draftGroup = null
      this.choice.addGroup({
        ...group,
        uuid: Date.now()
      })
    },

    updateGroup (group) {
      this.error = ''
      this.choice.updateGroup(group)
    },

    removeGroup (group) {
      this.error = ''
      if (group.uuid) {
        this.choice.removeGroup(group)
      } else {
        this.draftGroup = null
      }
    },

    addDraftGroup () {
      if (this.draftGroup) {
        this.$message({
          message: '已有分段,请添加完小题后,再添加',
          type: 'warning'
        })
      } else {
        this.draftGroup = this.gennerateDraftGroup()
      }
    },

    gennerateDraftGroup () {
      return {}
    }
  }
}

export const GroupMixins = {
  props: {
    group: {
      type: Object,
      required: true
    },
    question: {
      type: Object,
      required: true
    }
  },

  inject: ['sheet'],

  data () {
    return {
      data: null,
      errorMessage: ''
    }
  },

  computed: {
    errorPrompt () {
      const { endNumber, score, startNumber } = this.data
      return endNumber <= 0 ? '结束题号必须大于0'
        : endNumber && startNumber === 0 ? '开始题号必须大于0'
          : endNumber && endNumber < startNumber ? '开始题号不能大于结束题号'
            : endNumber && !score ? '分数不能为空' : ''
    }
  },

  watch: {
    group: {
      immediate: true,
      handler () {
        this.data = {
          ...this.group
        }
      }
    }
  },

  methods: {
    checkGroupValid () {
      this.errorMessage = this.errorPrompt
      if (this.errorMessage) return false

      const { startNumber, endNumber } = this.data
      const serialNumbers = Array.from({ length: endNumber - startNumber + 1 })
        .map((_, index) => index + startNumber)
      return serialNumbers.every(number => {
        if (this.group.uuid && (this.group.startNumber <= number && this.group.endNumber >= number)) return true
        const valid = this.sheet.isSubquestionSerialNumberVaild(number) &&
          !this.question.serialNumberSet.has(number)
        if (!valid) {
          this.errorMessage = `第${number}题已经存在，请勿重复添加`
        }
        return valid
      })
    },

    fireGroupChange () {
      this.checkGroupValid()

      if (this.errorMessage) {
        this.$emit('check-fail', this.errorMessage)
      } else {
        this.$emit('group-valid', { ...this.data })
      }
    }
  }
}
