import Question from './base'

export default class ChooseToDoQuestion extends Question {
  static get Title () {
    return '选做题'
  }

  constructor (attrs, sheet) {
    super(attrs, sheet)
    this.title = attrs.title || ChooseToDoQuestion.Title
    this.type = attrs.type || 4
    this.groups = attrs.groups || []
    this.maxNum = attrs.maxNum || 1
    this.minNum = attrs.minNum | 1
    this.score = attrs.score || 1
    this.startNum = attrs.startNum || 1
    this.endNum = attrs.endNum || 2
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
      maxNum: this.maxNum,
      minNum: this.minNum,
      score: this.score,
      groups: this.groups,
      startNum: this.startNum,
      endNuum: this.endNuum,
      Horizontalline: this.Horizontalline,
      rows: this.rows
    }
  }
}
