import Question from './base'
import Choice from './choice'

export const TRUSTED_ATTR = {
  group: 'gruop',
  subquestion: 'subquestion'
}

export default class ChoiceQuestion extends Question {
  static get Title () {
    return '选择题'
  }

  constructor (attrs, sheet) {
    super(attrs, sheet)

    this.title = attrs.title || this.constructor.Title
    // Array<Group>
    /**
     * Group = {
     *   uuid: Date.now()
     *   startNumber: this.sheet.avaliableSubquestionSerialNumber
     *   endNumber: 10
     *   score: 4
     *   optionLength: 4
     *   halfScore: 3 -- 多选必须
     * }
     */
    this.groups = attrs.groups || []

    this.trustAttr = attrs.trustAttr || TRUSTED_ATTR.group

    this.buildSubquestions(attrs)
  }

  buildSubquestions ({ groups, subquestions }) {
    switch (this.trustAttr) {
      case TRUSTED_ATTR.group: {
        this.subquestions = this.buildSubquestionsFromGroups(groups)
        break
      }
      case TRUSTED_ATTR.subquestion: {
        this.subquestions = subquestions.map(this.buildSubquestion)
        break
      }
      default: {
        this.subquestions = []
      }
    }
  }

  buildSubquestionsFromGroups (groups) {
    this.trustAttr = TRUSTED_ATTR.group
    return groups.reduce((acc, group) => {
      const { startNumber, endNumber, uuid, ...rest } = group
      return acc.concat(
        Array.from({ length: endNumber - startNumber + 1 })
          .map((_, index) => {
            return this.buildSubquestion({
              serialNumber: startNumber + index,
              ...rest
            })
          })
      )
    }, [])
  }

  buildSubquestion (attrs) {
    return new Choice(attrs)
  }

  updateGroup (group) {
    const index = this.groups.findIndex(g => g.uuid === group.uuid)
    if (index > -1) {
      this.groups.splice(index, 1, group)
      this.subquestions = this.buildSubquestionsFromGroups(this.groups)
    }
  }

  addGroup (group) {
    this.groups.push(group)
    this.subquestions = this.buildSubquestionsFromGroups(this.groups)
  }

  removeGroup (group) {
    const index = this.groups.findIndex(g => g.uuid === group.uuid)
    if (index > -1) {
      this.groups.splice(index, 1)
      this.subquestions = this.buildSubquestionsFromGroups(this.groups)
    }
  }

  updateSubquestion (subquestion) {
    const index = this.subquestions.findIndex(q => q.serialNumber === subquestion.serialNumber)
    if (index > -1) {
      this.trustAttr = TRUSTED_ATTR.subquestion
      this.subquestions.splice(index, 1, this.buildSubquestion(subquestion))
    }
  }

  removeSubquestion (question) {
    const index = this.subquestions.findIndex(q => q.serialNumber === question.serialNumber)
    if (index > -1) {
      this.trustAttr = TRUSTED_ATTR.subquestion
      this.subquestions.splice(index, 1)
    }
  }

  toJSON () {
    return {
      uuid: this.uuid,
      type: this.constructor.name,
      serialNumber: this.serialNumber,
      title: this.title,
      groups: this.groups,
      trustAttr: this.trustAttr,
      subquestions: this.subquestions.map(item => item.toJSON())
    }
  }
}
