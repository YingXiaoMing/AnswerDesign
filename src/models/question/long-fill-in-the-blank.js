import ChoiceQuestion from './choice_question'

export default class ShortfillintheblankQuestion extends ChoiceQuestion {
  static get Title () {
    return '长填空'
  }

  constructor (attrs, sheet) {
    super(attrs, sheet)

    this.title = attrs.title || this.constructor.Title
    this.rows = attrs.rows || 1
    this.score = attrs.score || 1
    this.groups = attrs.groups || []
  }

  toJSON () {
    return {
      uuid: this.uuid,
      type: this.constructor.name,
      serialNumber: this.serialNumber,
      title: this.title,
      rows: this.rows,
      score: this.score,
      groups: this.groups,
      subquestions: this.subquestions.map(item => item.toJSON())
    }
  }
}
