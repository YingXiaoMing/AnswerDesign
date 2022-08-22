import Question from './base'

export default class CompositionDisableQuestion extends Question {
  static get Title () {
    return '非作答题'
  }

  constructor (attrs, sheet) {
    super(attrs, sheet)
    this.title = attrs.title || CompositionDisableQuestion.Title
    this.type = attrs.type || 7
    this.groups = attrs.groups || []
    this.position = attrs.position || 1
    this.row = attrs.row || 3
  }

  get totalScore () {
    return Object.values(this.subquestions).reduce((acc, question) => {
      return acc + question.totalScore
    }, 0)
  }

  toJSON () {
    return {
      uuid: this.uuid,
      title: this.title,
      type: this.type,
      groups: this.groups,
      position: this.position,
      row: this.row
    }
  }
}
