import { Forex } from "../domain/models/forex";
import { IForexRepository } from "../domain/repository/forex-repository.interface";
import { MongooseForexRepository } from "../infrastructure/repositories/mongoose-forex.repository";

export class RegisterForex {
  private forexRepository: IForexRepository;
  constructor({ forexRepository = new MongooseForexRepository() }) {
    this.forexRepository = forexRepository;
  }

  async execute(forexReq) {
    const newForex = Forex.create({
      fromCurrencyCode: forexReq.fromCurrencyCode,
      fromCurrencyName: forexReq.fromCurrencyName,
      toCurrencyCode: forexReq.toCurrencyCode,
      toCurrencyName: forexReq.toCurrencyName,
      exchangeRate: forexReq.exchangeRate,
      bidPrice: forexReq.bidPrice
    });
    await this.forexRepository.registerForex(newForex as Forex);
    return newForex;
  }
}
