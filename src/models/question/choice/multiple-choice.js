import Choice from './index'

export default class MultipleChoice extends Choice {
  constructor (attrs) {
    if (attrs instanceof MultipleChoice) return attrs
    super(attrs)
    this.halfScore = attrs.halfScore
  }

  toJSON () {
    const supper = super.toJSON()
    return {
      ...supper,
      halfScore: this.halfScore
    }
  }
}
