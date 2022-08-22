import Choice from './index'

export default class SwitchChoice extends Choice {
  static get MaxOptionLength () {
    return 2
  }

  static get OptionLabelQueue () {
    return ['T', 'F']
  }

  constructor (attrs) {
    if (attrs instanceof SwitchChoice) return attrs
    super(attrs)
  }
}
