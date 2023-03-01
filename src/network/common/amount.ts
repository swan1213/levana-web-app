import BigNumber from "bignumber.js"

const maxDecimalPlaces = 6

export default class Amount {
  readonly initial: string
  private normalizedNumber: BigNumber

  constructor(amount: string | number, isFractional = false) {
    if (new BigNumber(amount).isNaN()) {
      amount = "0"
    }

    this.initial = `${amount}`

    this.normalizedNumber = new BigNumber(amount)
      .shiftedBy(isFractional ? maxDecimalPlaces : 0)
      .decimalPlaces(0)
  }

  toInt() {
    return this.normalizedNumber.toNumber()
  }

  toString() {
    return this.normalizedNumber.toString()
  }

  toDecimal(zeroTrim: boolean): string
  toDecimal(maxPlaces?: number, zeroTrim?: boolean): string
  toDecimal(argument?: number | boolean, zeroTrim = false) {
    let maxPlaces = maxDecimalPlaces

    if (typeof argument === "boolean") {
      zeroTrim = argument
    } else if (argument !== undefined) {
      maxPlaces = argument
    }

    const invertedPlaces =
      Math.max(0, Math.min(maxDecimalPlaces, maxPlaces)) - maxDecimalPlaces
    const precision = this.normalizedNumber.precision(true)

    if (!precision || precision + invertedPlaces <= 0) {
      return "0"
    }

    const value = this.normalizedNumber
      .shiftedBy(-maxDecimalPlaces)
      .toPrecision(precision + invertedPlaces)

    if (zeroTrim) {
      return new BigNumber(value).toString()
    }

    return value
  }

  toAbbreviate() {
    const number = new BigNumber(this.toDecimal(2))
    const precision = number.precision(true)
    const abbreviatedPrecision = (precision % 3) + 3

    const abbreviatedNumber = number
      .precision(abbreviatedPrecision)
      .shiftedBy(abbreviatedPrecision - precision)

    const suffix: string = (() => {
      switch (true) {
        case precision <= 3:
          return ""
        case precision <= 6:
          return "K"
        case precision <= 9:
          return "M"
        case precision <= 12:
          return "B"
        case precision <= 15:
          return "T"
        default:
          return ""
      }
    })()

    return abbreviatedNumber.toString() + suffix
  }
}
