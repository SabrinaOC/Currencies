import { Currency, ICurrencyRepository } from "@app/currency/domain";
import { Forex } from "@app/currency/domain/models/forex";
import { IForexRepository } from "@app/currency/domain/repository/forex-repository.interface";
import { Nullable } from "@app/utils";
import ForexSchema from "../schema/mongoose-forex.schema";
export class MongooseForexRepository implements IForexRepository {
  private toDomain(forexDB) {
    return Forex.fromPrimitives({
      id: forexDB[0]._id,
      fromCurrencyCode: forexDB[0].fromCurrencyCode,
      fromCurrencyName: forexDB[0].fromCurrencyName,
      toCurrencyCode: forexDB[0].toCurrencyCode,
      toCurrencyName: forexDB[0].toCurrencyName,
      exchangeRate: forexDB[0].exchangeRate,
      bidPrice: forexDB[0].bidPrice,
      askPrice: forexDB[0].askPrice,
      createdAt: forexDB[0].createdAt
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
      askPrice: forex.askPrice
    };
  }

  async registerForex(forex: Forex): Promise<void> {
    const mongooseForex = this.fromDomain(forex);
    await ForexSchema.create(mongooseForex);
  }

  async getCurrentValue(currencyCode: string): Promise<Forex> {
    const currentForexData = await ForexSchema.find({
      fromCurrencyCode: currencyCode,
    }).sort({ createdAt: -1 }).limit(1);
    console.log('RESULTADO CONSULTA = ', currentForexData)
    return currentForexData === null ? null : this.toDomain(currentForexData);
  }
}