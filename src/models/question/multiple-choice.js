import MulitpleChoice from './choice/multiple-choice'
import ChoiceQuestion from './choice_question'

export default class MultipleChoiceQuestion extends ChoiceQuestion {
  static get Title () {
    return '多选题'
  }

  buildSubquestion (attrs) {
    return new MulitpleChoice(attrs)
  }
}
