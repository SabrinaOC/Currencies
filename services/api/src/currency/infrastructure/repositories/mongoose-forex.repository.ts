import { Currency, ICurrencyRepository } from "@app/currency/domain";
import { Forex } from "@app/currency/domain/models/forex";
import { IForexRepository } from "@app/currency/domain/repository/forex-repository.interface";
import { Nullable } from "@app/utils";
import ForexSchema from "../schema/mongoose-forex.schema";
export class MongooseForexRepository implements IForexRepository {
  private toDomain(forexDB) {
    return Forex.fromPrimitives({
      id: forexDB._id,
      fromCurrencyCode: forexDB._fromCurrencyCode,
      fromCurrencyName: forexDB._fromCurrencyName,
      toCurrencyCode: forexDB._toCurrencyCode,
      toCurrencyName: forexDB._toCurrencyName,
      exchangeRate: forexDB._exchangeRate,
      bidPrice: forexDB._bidPrice
    });
  }

  private fromDomain(forex: Forex) {
    return {
      _id: forex.id,
      fromCurrencyCode: forex.fromCurrencyCode,
      fromCurrencyName: forex.fromCurrencyName,
      toCurrencyCode: forex.toCurrencyCode,
      toCurrencyName: forex.toCurrencyName,
      exchangeRate: forex.exchangeRate,
      bidPrice: forex.bidPrice
    };
  }

  async registerForex(forex: Forex): Promise<void> {
    const mongooseForex = this.fromDomain(forex);
    await ForexSchema.create(mongooseForex);
  }

  async getHistoryCurrency(currencyCode: string): Promise<Forex[]> {
    const minMaxForexData = await ForexSchema.find({
      fromCurrencyCode: currencyCode,
    });

    return minMaxForexData.map((forex) => this.toDomain(forex));
  }

  // async findByCode(code: string): Promise<Nullable<Currency>> {
  //   const currency = await CurrencySchema.findOne({ code: code });
  //   return currency === null ? null : this.toDomain(currency);
  // }

  // async unsubscribe(currency: Currency): Promise<void> {
  //   const document = this.fromDomain(currency);
  //   await CurrencySchema.updateOne(
  //     { _id: currency.id },
  //     { $set: document },
  //     { upsert: true }
  //   );
  // }
}
