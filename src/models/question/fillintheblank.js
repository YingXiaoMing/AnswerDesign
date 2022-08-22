import Question from './base'
import ShortfillintheblankQuestion from './short-fill-in-the-blank'
import LongfillintheblankQuestion from './long-fill-in-the-blank'

export default class FillintheblankQuestion extends Question {
  static get Title () {
    return '填空题'
  }

  constructor (attrs, sheet) {
    super(attrs, sheet)
    this.title = attrs.title || FillintheblankQuestion.Title
    this.type = attrs.type || 2
    this.attach = attrs.attach || false
    this.minshowgrade = attrs.minshowgrade || false

    this.subquestions = {
      shortfillintheblank: new ShortfillintheblankQuestion(attrs.subquestions.shortfillintheblank, sheet),
      longfillintheblank: new LongfillintheblankQuestion(attrs.subquestions.longfillintheblank, sheet)
    }
  }

  get totalScore () {
    return Object.values(this.subquestions).reduce((acc, question) => {
      return acc + question.totalScore
    }, 0)
  }

  get serialNumberSet () {
    return new Set([
      ...this.subquestions.shortfillintheblank.serialNumberSet,
      ...this.subquestions.longfillintheblank.serialNumberSet
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

  toJSON () {
    return {
      uuid: this.uuid,
      title: this.title,
      type: this.type,
      serialNumber: this.serialNumber,
      attach: this.attach,
      minshowgrade: this.minshowgrade,
      subquestions: {
        shortfillintheblank: this.subquestions.shortfillintheblank.toJSON(),
        longfillintheblank: this.subquestions.longfillintheblank.toJSON()
      }
    }
  }
}
