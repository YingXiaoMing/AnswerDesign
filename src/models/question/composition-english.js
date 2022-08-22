import Question from './base'

export default class CompositionEnglishQuestion extends Question {
  static get Title () {
    return '作文'
  }

  constructor (attrs, sheet) {
    super(attrs, sheet)
    this.title = attrs.title || CompositionEnglishQuestion.Title
    this.type = attrs.type || 5
    this.groups = attrs.groups || []
    this.attach = attrs.attach || false
    this.minTitleNuum = attrs.minTitleNuum | 1
    this.score = attrs.score || 1
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
      minTitleNuum: this.minTitleNuum,
      score: this.score,
      groups: this.groups,
      rows: this.rows
    }
  }
}
