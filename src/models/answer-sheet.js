import Vue from 'vue'
import Student from './student'

export const SHEET_SIZE = {
  A3: 'A3',
  A4: 'A4'
}

export const SHEET_SIZE_LABEL = {
  [SHEET_SIZE.A4]: 'A4/B5纸',
  [SHEET_SIZE.A3]: 'A3/B4/8K纸'
}

export const PAGE_SIZE = 1165

const PAGE_SIZE_MAP = {
  [SHEET_SIZE.A3]: Math.SQRT2,
  [SHEET_SIZE.A4]: Math.SQRT1_2
}

export const SHEET_COLUMN = {
  [SHEET_SIZE.A3]: ['二', '三'],
  [SHEET_SIZE.A4]: ['一']
}

export const SHEET_TYPE = {
  0: '线上阅卷',
  1: '先阅后扫'
}

// 只有符合 compare 条件的答题卡尺寸才能使用对应的 range
const SHEET_NUMBER_RANGES = [
  {
    range: [4, 9],
    compare ({ size, column }) {
      return (size === SHEET_SIZE.A3) && (column === SHEET_COLUMN[SHEET_SIZE.A3][1])
    }
  },
  {
    range: [4, 12],
    compare ({ size, column }) {
      return (size !== SHEET_SIZE.A3) || (column !== SHEET_COLUMN[SHEET_SIZE.A3][1])
    }
  },
  {
    // 默认的考号范围，该值一定要放最后，以确保前面的匹配不到的时候才会使用该值
    range: [4, 12],
    compare () {
      return true
    }
  }
]

export default class AnswerSheet {
  static get AllowedSheetSize () {
    return Object.values(SHEET_SIZE)
  }

  static get AllowedSheetType () {
    return Object.values(SHEET_TYPE)
  }

  static get Precautions () {
    return [
      '答题前请将姓名、班级、考场、座号和准考证号填写清楚。',
      '客观题答题,必须使用2B铅笔填涂,修改时用橡皮擦干净。',
      '主观题必须使用黑色签字笔书写。',
      '必须在题号对应的答题区域内作答,超出答题区域书写无效。',
      '保持答卷清洁完整。'
    ]
  }

  constructor (attrs = {}) {
    const settings = attrs.settings || {}
    this.title = attrs.title || ''
    this.settings = {}
    this.student = new Student(attrs.student, this)

    this.updateSettings({
      size: this.constructor.AllowedSheetSize.includes(settings.size)
        ? settings.size
        : SHEET_SIZE.A3,
      column: settings.column,
      type: settings.type
    })

    this.setSheetNumberLength(attrs.sheetNumberLength || 8)

    this.questions = []
  }

  get sheetSize () {
    const { size, column } = this.settings
    return PAGE_SIZE_MAP[size] * PAGE_SIZE / column
  }

  // 最近可用的小题编号
  get avaliableSubquestionSerialNumber () {
    let count = 1
    while (!this.isSubquestionSerialNumberVaild(count)) {
      count += 1
    }
    return count
  }

  // 最近可用的大题编号
  get avaliableQuestionSerialNumber () {
    let count = 0
    while (this.questions[count]) {
      count += 1
    }
    return count
  }

  // 准考证号的范围
  get sheetNumberRange () {
    return SHEET_NUMBER_RANGES.find(range => range.compare(this.settings)).range
  }

  get allowedColumns () {
    return SHEET_COLUMN[this.settings.size]
  }

  // 判断一个数字是否可以作为小题编号
  isSubquestionSerialNumberVaild (number) {
    return this.questions.filter(Boolean).every(
      question => !question.serialNumberSet.has(number)
    )
  }

  updateSettings ({
    size,
    column,
    type
  }) {
    console.log(size, column, type)
    if (this.constructor.AllowedSheetSize.includes(size)) {
      if (this.settings.size !== size) {
        this.settings.size = size
        this.settings.column = this.allowedColumns.includes(column)
          ? column
          : this.allowedColumns.includes(this.settings.column)
            ? this.settings.column
            : this.allowedColumns[0]
      }
      if (this.allowedColumns.includes(column)) {
        this.settings.column = column
      }
    }
    this.settings.type = type
    this.setSheetNumberLength(this.sheetNumberLength)
  }

  addQuestion (question) {
    question.sheet = this
    Vue.set(this.questions, question.serialNumber, question)
  }

  removeQuestion (question) {
    Vue.set(this.questions, question.serialNumber, undefined)
  }

  // 设置准考证号的长度
  setSheetNumberLength (length) {
    const [min, max] = this.sheetNumberRange
    this.sheetNumberLength = Math.min(Math.max(min, length), max)
  }

  toJSON () {
    return {
      ...(['title', 'settings', 'sheetNumberLength'].reduce((acc, attr) => {
        acc[attr] = this[attr]
        return acc
      }, {})),
      student: this.student.toJSON(),
      questions: this.questions.filter(Boolean).map(question => question.toJSON())
    }
  }
}
