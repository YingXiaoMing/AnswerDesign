import ShortfillintheblankitemQuestion from './short-fill-in-the-blank-item'
import ChoiceQuestion from './choice_question'
export default class ShortfillintheblankQuestion extends ChoiceQuestion {
  static get Title () {
    return '短填空'
  }

  constructor (attrs, sheet) {
    super(attrs, sheet)

    this.title = attrs.title || this.constructor.Title
    this.serialNumber = attrs.serialNumber || 0
    this.groups = attrs.groups || []
    this.space = attrs.space || 4
    this.subquestions = {
      shortfillintheblankitem: new ShortfillintheblankitemQuestion(attrs.subquestions.shortfillintheblankitem, sheet)
    }
  }

  get serialNumberSet () {
    return new Set([
      ...this.subquestions.shortfillintheblankitem.serialNumberSet
    ])
  }

  get avaliableSubquestionSerialNumber () {
    let number = this.sheet.avaliableSubquestionSerialNumber
    while (
      !this.sheet.isSubquestionSerialNumberVaild(number) ||
      !this.isSerialNumberValid(number)
    ) {
      number += 1
    }
    return number
  }

  buildSubquestion (attrs) {
    return new ShortfillintheblankitemQuestion(attrs)
  }

  toJSON () {
    return {
      uuid: this.uuid,
      type: this.constructor.name,
      serialNumber: this.serialNumber,
      title: this.title,
      groups: this.groups,
      space: this.space,
      subquestions: {
        shortfillintheblankitem: this.subquestions.shortfillintheblankitem.toJSON()
      }
    }
  }
}
