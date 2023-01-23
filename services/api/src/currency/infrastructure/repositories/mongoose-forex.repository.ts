import { Currency, ICurrencyRepository } from "@app/currency/domain";
import { Forex } from "@app/currency/domain/models/forex";
import { IForexRepository } from "@app/currency/domain/repository/forex-repository.interface";
import { Nullable } from "@app/utils";
import ForexSchema from "../schema/mongoose-forex.schema";
export class MongooseForexRepository implements IForexRepository {
  private toDomain(forexDB) {
    return Forex.fromPrimitives({
      id: forexDB._id,
      fromCurrencyCode: forexDB.fromCurrencyCode,
      fromCurrencyName: forexDB.fromCurrencyName,
      toCurrencyCode: forexDB.toCurrencyCode,
      toCurrencyName: forexDB.toCurrencyName,
      exchangeRate: forexDB.exchangeRate,
      bidPrice: forexDB.bidPrice,
      askPrice: forexDB.askPrice,
      createdAt: forexDB.createdAt
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
      bidPrice: forex.bidPrice,
      askPrice: forex.askPrice,
      createdAt: forex.createdAt
    };
  }

  // async registerForex(forex: Forex): Promise<void> {
  //   const mongooseForex = this.fromDomain(forex);
  //   await ForexSchema.create(mongooseForex);
  // }

  async getCurrentValue(currencyCode: string): Promise<Forex> {
    const currentForexData = await ForexSchema.find({
      fromCurrencyCode: currencyCode,
    }).sort({ createdAt: -1 }).limit(1);
    return currentForexData === null || currentForexData.length === 0 ? null : this.toDomain(currentForexData[0]);
  }

  async getYesterdayValue(currencyCode: string): Promise<Forex> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentForexData = await ForexSchema.find({
      createdAt: {
        $gte: yesterday,
        $lt: today
      },
      fromCurrencyCode: currencyCode
    }).sort({ createdAt: -1 }).limit(1);
    return currentForexData === null || currentForexData.length === 0 ? null : this.toDomain(currentForexData[0]);
  }
}