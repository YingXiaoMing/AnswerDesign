import Question from './base'

export default class AnswerQuestion extends Question {
  static get Title () {
    return '解答题'
  }

  constructor (attrs, sheet) {
    super(attrs, sheet)
    this.title = attrs.title || AnswerQuestion.Title
    this.type = attrs.type || 3
    this.attach = attrs.attach || false
    this.groups = attrs.groups || []
    this.startNum = attrs.startNum || 1
    this.endNuum = attrs.endNuum | 1
    this.minshowgrade = attrs.minshowgrade || false
    this.Horizontalline = attrs.Horizontalline || false
    this.rows = attrs.rows || 6
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
      serialNumber: this.serialNumber,
      attach: this.attach,
      groups: this.groups,
      startNum: this.startNum,
      endNuum: this.endNuum,
      minshowgrade: this.minshowgrade,
      Horizontalline: this.Horizontalline,
      rows: this.rows
    }
  }
}
