import { Types } from "mongoose";
export class Forex {
  private _id: Types.ObjectId;
  private _fromCurrencyCode: string;
  private _fromCurrencyName: string;
  private _toCurrencyCode: string;
  private _toCurrencyName: string;
  private _exchangeRate: number;
  private _bidPrice: number;
  private _askPrice: number;
  private _createdAt: Date

  private constructor({ id, fromCurrencyCode, fromCurrencyName,toCurrencyCode, toCurrencyName, exchangeRate, bidPrice, askPrice, createdAt }) {
    this._id = id;
    this._fromCurrencyCode = fromCurrencyCode;
    this._fromCurrencyName = fromCurrencyName;
    this._toCurrencyCode = toCurrencyCode;
    this._toCurrencyName = toCurrencyName;
    this._exchangeRate = exchangeRate;
    this._bidPrice = bidPrice;
    this._askPrice = askPrice;
    this._createdAt = createdAt;
  }

  static fromPrimitives({ id, fromCurrencyCode, fromCurrencyName,toCurrencyCode, toCurrencyName, exchangeRate, bidPrice, askPrice, createdAt }) {
    return new Forex({
      id: id,
      fromCurrencyCode: fromCurrencyCode,
      fromCurrencyName: fromCurrencyName,
      toCurrencyCode: toCurrencyCode,
      toCurrencyName: toCurrencyName,
      exchangeRate: exchangeRate,
      bidPrice: bidPrice,
      askPrice: askPrice,
      createdAt: createdAt,
    });
  }

  static create({ id = new Types.ObjectId(), fromCurrencyCode, fromCurrencyName,toCurrencyCode, toCurrencyName, exchangeRate, bidPrice, askPrice, createdAt }) {
    // if (!code) {
    //   return IncorrectCurrencyError.withCode(code);
    // }

    return new Forex({
      id: id,
      fromCurrencyCode: fromCurrencyCode,
      fromCurrencyName: fromCurrencyName,
      toCurrencyCode: toCurrencyCode,
      toCurrencyName: toCurrencyName,
      exchangeRate: exchangeRate,
      bidPrice: bidPrice,
      askPrice: askPrice,
      createdAt: createdAt
    });
  }

  get id(): Types.ObjectId {
    return this._id;
  }

  get fromCurrencyCode(): string {
    return this._fromCurrencyCode;
  }

  get fromCurrencyName(): string {
    return this._fromCurrencyName;
  }
  get toCurrencyCode(): string {
    return this._toCurrencyCode;
  }
  get toCurrencyName(): string {
    return this._toCurrencyName;
  }
  get exchangeRate(): number {
    return this._exchangeRate;
  }
  get bidPrice(): number {
    return this._bidPrice;
  }
  get askPrice(): number {
    return this._askPrice;
  }
  get createdAt(): Date {
    return this._createdAt;
  }

  // unsubscribe() {
  //   if (!this._hasSubscription) {
  //     return CurrencyNotSubscribedError.withCode(this._code);
  //   }

  //   this._hasSubscription = false;
  // }
}
