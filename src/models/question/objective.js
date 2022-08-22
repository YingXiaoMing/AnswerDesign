import Question from './base'
import JudgmentChoiceQuestion from './judgment-choice'
import MultipleChoiceQuestion from './multiple-choice'
import SingleChoiceQuestion from './single-choice'

export default class ObjectiveQuestion extends Question {
  static get Title () {
    return '选择题'
  }

  constructor (attrs, sheet) {
    super(attrs, sheet)

    this.title = attrs.title || ObjectiveQuestion.Title
    this.type = attrs.type || 1
    this.groupSize = attrs.groupSize || 5

    this.subquestions = {
      singleChoice: new SingleChoiceQuestion(attrs.subquestions.singleChoice, sheet),
      multipleChoice: new MultipleChoiceQuestion(attrs.subquestions.multipleChoice, sheet),
      judgmentChoice: new JudgmentChoiceQuestion(attrs.subquestions.judgmentChoice, sheet)
    }
  }

  get totalScore () {
    return Object.values(this.subquestions).reduce((acc, question) => {
      return acc + question.totalScore
    }, 0)
  }

  get serialNumberSet () {
    return new Set([
      ...this.subquestions.singleChoice.serialNumberSet,
      ...this.subquestions.multipleChoice.serialNumberSet,
      ...this.subquestions.judgmentChoice.serialNumberSet
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
      groupSize: this.groupSize,
      subquestions: {
        singleChoice: this.subquestions.singleChoice.toJSON(),
        multipleChoice: this.subquestions.multipleChoice.toJSON(),
        judgmentChoice: this.subquestions.judgmentChoice.toJSON()
      }
    }
  }
}
