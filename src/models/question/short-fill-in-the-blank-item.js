import Question from './base'

export default class ShortfillintheblankitemQuestion extends Question {
  static get Title () {
    return ''
  }

  constructor (attrs, sheet) {
    super(attrs, sheet)

    this.serialNumber = attrs.serialNumber || 0
    this.title = attrs.title || this.constructor.Title
    this.space = attrs.title || 1
    this.score = attrs.score || 1
    this.groups = attrs.groups || []
  }

  toJSON () {
    return {
      uuid: this.uuid,
      type: this.type,
      serialNumber: this.serialNumber,
      title: this.title,
      space: this.space,
      score: this.score,
      groups: this.groups,
      subquestions: this.subquestions.map(item => item.toJSON())
    }
  }
}
