import { Types } from "mongoose";
import { CurrencyNotSubscribedError, IncorrectCurrencyError } from "../errors";

export class Forex {
  private _id: Types.ObjectId;
  private _fromCurrencyCode: string;
  private _fromCurrencyName: string;
  private _toCurrencyCode: string;
  private _toCurrencyName: string;
  private _exchangeRate: string;
  // private _date: string;
  private _bidPrice: string;

  private constructor({ id, fromCurrencyCode, fromCurrencyName,toCurrencyCode, toCurrencyName, exchangeRate, bidPrice }) {
    this._id = id;
    this._fromCurrencyCode = fromCurrencyCode;
    this._fromCurrencyName = fromCurrencyName;
    this._toCurrencyCode = toCurrencyCode;
    this._toCurrencyName = toCurrencyName;
    this._exchangeRate = exchangeRate;
      //this._date = string;
    this._bidPrice = bidPrice;
  }

  static fromPrimitives({ id, fromCurrencyCode, fromCurrencyName,toCurrencyCode, toCurrencyName, exchangeRate, bidPrice }) {
    return new Forex({
      id: id,
      fromCurrencyCode: fromCurrencyCode,
      fromCurrencyName: fromCurrencyName,
      toCurrencyCode: toCurrencyCode,
      toCurrencyName: toCurrencyName,
      exchangeRate: exchangeRate,
      bidPrice: bidPrice
    });
  }

  static create({ id = new Types.ObjectId(), fromCurrencyCode, fromCurrencyName,toCurrencyCode, toCurrencyName, exchangeRate, bidPrice }) {
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
      bidPrice: bidPrice
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
  get exchangeRate(): string {
    return this._exchangeRate;
  }
  get bidPrice(): string {
    return this._bidPrice;
  }

  // unsubscribe() {
  //   if (!this._hasSubscription) {
  //     return CurrencyNotSubscribedError.withCode(this._code);
  //   }

  //   this._hasSubscription = false;
  // }
}
