import ChoiceQuestion from './choice_question'
import SwitchChoice from './choice/switch-choice'

export default class JudgmentChoiceQuestion extends ChoiceQuestion {
  static get Title () {
    return '判断题'
  }

  buildSubquestion (attrs) {
    return new SwitchChoice(attrs)
  }
}
