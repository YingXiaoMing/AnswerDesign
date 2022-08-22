export default class Choice {
  static get MaxOptionLength () {
    return 10
  }

  static get OptionLabelQueue () {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  }

  constructor (attrs) {
    if (attrs instanceof this.constructor) return attrs
    this.serialNumber = attrs.serialNumber || 1
    this.score = attrs.score
    this.optionLength = Math.min(attrs.optionLength, Choice.MaxOptionLength)
  }

  get totalScore () {
    return this.score
  }

  get optionLabels () {
    return this.constructor.OptionLabelQueue.slice(0, this.optionLength)
  }

  updateOption (attrs) {
    Object.assign(this, attrs, {
      optionLength: Math.min(attrs.optionLength || this.optionLength, Choice.MaxOptionLength)
    })
  }

  toJSON () {
    return {
      uuid: this.uuid,
      serialNumber: this.serialNumber,
      score: this.score,
      optionLength: this.optionLength
    }
  }
}
