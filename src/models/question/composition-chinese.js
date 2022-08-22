import Question from './base'

export default class CompositionChineseQuestion extends Question {
  static get Title () {
    return '作文'
  }

  constructor (attrs, sheet) {
    super(attrs, sheet)
    this.title = attrs.title || CompositionChineseQuestion.Title
    this.type = attrs.type || 6
    this.groups = attrs.groups || []
    this.attach = attrs.attach || false
    this.minTitleNum = attrs.minTitleNum | 1
    this.score = attrs.score || 1
    this.minNum = attrs.minNum || 6
    this.numTab = attrs.numTab || 1
    this.numCount = attrs.numCount || 800
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
      minTitleNum: this.minTitleNum,
      score: this.score,
      minNum: this.minNum,
      numTab: this.numTab,
      numCount: this.numCount
    }
  }
}
